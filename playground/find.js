const {MongoClient, ObjectID} = require('mongodb')
const dbName = 'TodoApp';
const url = `mongodb://localhost:27017/${dbName}`;


MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server'); 

    let db = client.db(dbName);

    // db.collection('Todos').find({
    //     _id: new ObjectID('5c6b147e5b79a01466ca4d2f')
    //     })
    //     .toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));

    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    db.collection('Users').find({
        name: "John Smith"
        })
        .toArray().then((users) => {
            console.log('Users');
            console.log(JSON.stringify(users, undefined, 2));

    }, (err) => {
        console.log('Unable to fetch users', err);
    });


    client.close(); 
});