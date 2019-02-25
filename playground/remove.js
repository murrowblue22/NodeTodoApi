const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo'); 
const {User} =  require('./../server/models/user');

// Todo.remove({})

// Todo.deleteMany({}).then((result) => {
//     console.log(result);
// }, (e) => {
//     console.log(e);
// })

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findOneAndDelete({_id: '5c7394abc5e45e380ffa2024'}).then((todo) => {
    console.log(todo);
}, (e) => {
    console.log(`Error is: {e}`);
});