// CRUD: Create Read Update Delete

// ODM: Object Document Mapper -> Mongoose is one of them

// const mongodb = require('mongodb');

// const ObjectID = mongodb.ObjectID;
// access to connect to the db to perform CRUD operations
// const MongoClient = mongodb.MongoClient;

const { MongoClient, ObjectID } = require('mongodb');


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectID();
// console.log(id.id.length);
// console.log(id.toHexString().length);

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

    // READ

    // With findOne, if there are many documents that match, you always get the first one
    // db.collection('users').findOne({ _id: ObjectID('63a8dec5640c3b76e7c57ff0') }, (error, user) => {
    //   if (error) {
    //     return console.log('Unable to fetch');
    //   }

    //   console.log(user);
    // });

    // db.collection('users').find({age: 27}).toArray((error, users) => {
    //   console.log(users);
    // });

    // db.collection('users').find({age: 27}).count((error, count) => {
    //   console.log(count);
    // });

    // Challenge
    // db.collection('tasks').findOne({ _id: ObjectID('63a8de85ad02a0766d121d28') }, (error, task) => {
    //   if (error) {
    //     console.log('Unable to fetch');
    //   }

    //   console.log(task);
    // });

    // const tasks = await db.collection('tasks').find({ completed: false }).toArray();
    // console.log(tasks);
    // CREATE

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

    // UPDATE

    // db.collection('users').updateOne(
    //   {
    //     _id: ObjectID('63a8a94c6960c16fa77f0d2e'),
    //   },
    //   {
    //     $inc: {
    //       age: 1,
    //     },
    //   }
    // ).then((result) => {
    //   console.log(result);
    // }).catch((error) => {
    //   console.log(error);
    // });

    // db.collection('tasks').updateMany(
    //   {
    //     completed: true,
    //   },
    //   {
    //     $set: {
    //       completed: false,
    //     },
    //   },
    // )
    //   .then(console.log)
    //   .catch(console.log);

    // DELETE
    // db.collection('users').deleteMany(
    //   {
    //     age: 27,
    //   }
    // )
    //   .then(console.log)
    //   .catch(console.log);

    db.collection('tasks').deleteOne(
      {
        description: 'Get milk',
      }
    )
      .then(console.log())
      .catch(console.log())

  }
);