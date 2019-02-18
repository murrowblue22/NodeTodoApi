const {MongoClient, ObjectID} = require('mongodb')
const dbName = 'TodoApp';
const url = `mongodb://localhost:27017/${dbName}`;


MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server'); 

    let db = client.db(dbName);

    // //deleteMany
    // db.collection('Todos').deleteMany({
    //     text: "Eat lunch"
    //     })
    //     .then((result) => {
    //         console.log(result);
    // }, (err) => {
    //     console.log('Unable to fetch users', err);
    // });

    // //deleteOne
    // db.collection('Todos').deleteOne({
    //     text: "Eat lunch"
    //     })
    //     .then((result) => {
    //         console.log(result.result);
    // }, (err) => {
    //     console.log('Unable to fetch users', err);
    // });

    //findOneAndDelete 
    db.collection('Todos').findOneAndDelete({
        completed: false
        })
        .then((result) => {
            console.log(result);
    }, (err) => {
        console.log('Unable to fetch users', err);
    });

    //db.collection('Users').deleteMany({name: 'Andrew'});

    client.close(); 
});