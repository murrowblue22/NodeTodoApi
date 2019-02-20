const mongoose = require('mongoose'); 

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});

let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true, 
        minlength: 1, 
        trim: true

    }, 
    completed: {
        type: Boolean, 
        default: false
    }, 
    completedAt: {
        type: Number,
        default: null
    }
}); 

let User = mongoose.model('Users', {
    email: {
        type: String,
        required: true, 
        minlength: 1, 
        trim: true

    }
}); 

// let newTodo = new Todo({
//     text: 'Cook dinner', 
//     completed: false, 
//     completedAt: 123
// }); 

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc); 
// }, (e) => {
//     console.log('Unable to save todo', e); 
// });

// const otherTodo = new Todo({
//      text: '  Edit this video ', 
//     // completed: true, 
//     // completedAt: 123
// }); 

// otherTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2)); 
// }, (e) => {
//        console.log('Unable to save todo', e); 
// });

const newUser = new User({
    email: '  user@startup.com  ' 
}); 

newUser.save().then((doc) => {
   console.log(JSON.stringify(doc, undefined, 2)); 
}, (e) => {
      console.log('Unable to save user', e); 
});