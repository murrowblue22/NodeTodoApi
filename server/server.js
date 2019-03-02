const env = process.env.NODE_ENV || 'development';
console.log('env *****', env);

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}
else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

const _ = require('lodash');
const express = require('express'); 
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose'); 
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

port = process.env.PORT || 3000; 

const app = express(); 

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
}); 

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id
   
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({Error:"Invalid ID format !!!!"});
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send("No Todo found");
        }

        res.send({todo}); 
    }, (e) => {
        res.status(400).send({Error: `Error occurred ${e}`});
    });
}); 


app.patch('/todos/:id', (req, res) => {
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
        {_id: id}, 
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

app.delete('/todos/:id', (req, res) => {
    // get the id 
    const id = req.params.id; 
    
    // validate the id -> not valid? return 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({Error: "Invalid ID format for delete request!!!!"});
    }

    Todo.findOneAndDelete({_id: id}).then((todo) => {
        
        
        if(!todo) {
            return res.status(404).send({Error: "No Todo Found to delete"})
        }
        
        res.send({todo}); 
    }, (e) => {
        res.status(400).send({Error: `Error encountered on delete ${e}`})
        console.log(`Error is: {e}`);
    });
}); 


app.listen(port, () => {
    console.log(`Server is up on port ${port}`); 
});
module.exports = {app};