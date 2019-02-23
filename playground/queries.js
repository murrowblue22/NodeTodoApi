const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo'); 
const {User} =  require('./../server/models/user');

const id = '5c70d92da7722f2de266d92c';
const userID = '5c6d7e04cbf3261bb754d937';

if(!ObjectID.isValid(id)) {
    console.log('ID is not Valid'); 
}

if(!ObjectID.isValid(userID)) {
    console.log('User ID is not Valid !!!!'); 
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// })

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// })


// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

User.find({
    _id: userID
}).then((users) => {
    console.log('users', users);
})

User.findOne({
    _id: userID
}).then((user) => {
    console.log('User', user);
})


User.findById(userID).then((user) => {
    if(!user) {
        return console.log('Id not found');
    }
    console.log('User By Id', user);
}).catch((e) => console.log(e));