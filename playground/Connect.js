// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb')
const dbName = 'TodoApp';
const url = `mongodb://localhost:27017/${dbName}`;

var obj = new ObjectID();
console.log(obj)

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server'); 

    //let db = client.db(dbName);

    // db.collection('Todos').insertOne({
    //     text: 'Something to do a third time',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err); 
    //     }

    //     console.log("success\n", JSON.stringify(result.ops, undefined, 2))
    // })
    
    

    // db.collection('Users').insertOne({
    //     name: 'John Smith',
    //     age: '78', 
    //     location: 'Old Town'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert user', err); 
    //     }

    //     console.log("success\n", JSON.stringify(result.ops, undefined, 2))
    // })


    client.close(); 
});