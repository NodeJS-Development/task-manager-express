// CRUD: Create Read Update Delete

// const mongodb = require('mongodb');

// const ObjectID = mongodb.ObjectID;
// access to connect to the db to perform CRUD operations
// const MongoClient = mongodb.MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
console.log(id.id.length);
console.log(id.toHexString().length);

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

    // db.collection('users').insertOne({
    //   _id: id,
    //   name: 'Vikram',
    //   age: 27,
    // }, (error, result) => {
    //   if (error) {
    //     return console.log('Unable to insert user');
    //   }

    //   console.log(result.ops);
    // });

    // db.collection('users').insertMany([
    //   {
    //     name: 'Jen',
    //     age: 28
    //   },
    //   {
    //     name: 'Gunther',
    //     age: 27,
    //   },
    // ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert documents!');
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection('tasks').insertMany([
    //   {
    //     description: 'Get milk',
    //     completed: true,
    //   },
    //   {
    //     description: 'Buy a car',
    //     completed: false,
    //   },
    //   {
    //     description: 'Clean the house',
    //     completed: false,
    //   }
    // ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert documents');
    //     }

    //     console.log(result.ops);
    //   }
    // )
  }
);