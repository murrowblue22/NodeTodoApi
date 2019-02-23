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
        return res.status(404).send("Invalid ID format !!!!");
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

app.listen(port, () => {
    console.log(`Server is up on port ${port}`); 
});

module.exports = {app};