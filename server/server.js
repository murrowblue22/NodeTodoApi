const express = require('express'); 
const bodyParser = require('body-parser');

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
        console.log("Unable to save todo ", e);
        res.status(400).send(e);
    });
}); 

app.listen(port, () => {
    console.log(`Server is up on port ${port}`); 
});

module.exports = {app};