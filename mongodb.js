// CRUD: Create Read Update Delete

const mongodb = require('mongodb');

// access to connect to the db to perform CRUD operations
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(
  connectionURL,
  {
    useNewUrlParser: true,
  },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    db.collection('users').insertOne({
      name: 'Brayan',
      age: 27,
    });
  }
);