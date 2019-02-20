const {MongoClient, ObjectID} = require('mongodb')
const dbName = 'TodoApp';
const url = `mongodb://localhost:27017/${dbName}`;


MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server'); 

    let db = client.db(dbName);

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5c6b416aa7f71969f04ebeea')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5c6b17ba3a3c0614761301ad')
    }, {
        $set: {
            name: "Walker Smith"
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    })

    

    client.close(); 
});