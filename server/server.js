const _ = require('lodash');
const express = require('express'); 
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

const config = require('./config/config');
const {mongoose} = require('./db/mongoose'); 
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

//const port = process.env.PORT || 3000; 

const app = express(); 

app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({extended: true}));

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
}); 

app.get('/', (req, res) => {
    res.send("Hey u reached the home page5!!!!");
})

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id
   
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({Error:"Invalid ID format !!!!"});
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if(!todo) {
            return res.status(404).send("No Todo found");
        }

        res.send({todo}); 
    }, (e) => {
        res.status(400).send({Error: `Error occurred ${e}`});
    });
}); 


app.patch('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null; 
    }

    Todo.findOneAndUpdate(
        {
            _id: id,
            _creator: req.user._id
        }, 
        {$set: body},
        {new: true}
    )
    .then((todo) => {
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});
    })
    .catch((e) => {
        res.status(400).send(e);
    })
});

app.delete('/todos/:id', authenticate, (req, res) => {
    // get the id 
    const id = req.params.id; 
    
    // validate the id -> not valid? return 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({Error: "Invalid ID format for delete request!!!!"});
    }

    Todo.findOneAndDelete({
       
        _id: id,
        _creator: req.user.id
        
    }).then((todo) => {
    
        if(!todo) {
            return res.status(404).send({Error: "No Todo Found to delete"})
        }
        
        res.send({todo}); 
    }, (e) => {
        res.status(400).send({Error: `Error encountered on delete ${e}`})
        console.log(`Error is: {e}`);
    });
}); 

app.post('/users', (req, res) => {
    // res.send("Hey u hit the user route1");
    // const user = _.pick(req.body, ['email', 'password'])
    // console.log(user);
    
    // User.create(user).then((newUser) => {
    //     return newUser.generateAuthToken();
        
    // })
    // .then((token) => {
    //     res.header('x-auth', token).send(user);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // })
    
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
    
});

app.post('/users/mylogin', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    
    console.log(body);
    
    User.findOne({email: body.email}).then((user) => {
        
        if(user) {
            bcrypt.compare(body.password, user.password, (err, result) => {
            if(err) {
                console.log(err);
            }
            
            res.header('x-auth', user.tokens[0].token).send(user);
               
            });
        }
        else {
            const msg = "No value returned for User!!!!"
            console.log(msg); 
            
            res.status(400).send(msg);
        }
        
    }, (err) => {
        res.status(400).send(err);
    })
}); 

app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    })
    .catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send("Successful log out");
    }, () => {
        res.status(400).send();
    });
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log(`Server NodeTodoAPi is up on port ${process.env.PORT}`); 
});

module.exports = {app};