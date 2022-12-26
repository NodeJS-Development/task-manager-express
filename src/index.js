const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

// Will automatically parse incoming json into an object so we can access it into our request handlers 
app.use(express.json());

// USERS

// CREATE
app.post('/users', (req, res) => {
  const user = new User(req.body);

  user.save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// READ
app.get('/users', (req, res) => {

  // empty object as a parameter will fetch all users stored in the db 
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(e => {
      res.status(500).send();
    });
});

app.get('/users/:id', (req, res) => {
  const _id = req.params.id;

  User.findById(_id)
    .then((user) => {
      if (!user) return res.status(404).send();

      res.send(user);

    })
    .catch((e) => {
      res.status(500).send();
    });
});


// TASKS

// CREATE
app.post('/tasks', (req, res) => {
  const task = new Task(req.body);

  task.save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

// READ
app.get('/tasks', (req, res) => {
  Task.find({})
    .then((tasks) => res.send(tasks))
    .catch((e) => res.status(500).send());
});

app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id;

  Task.findById(_id)
    .then((task) => {
      if (!task) return res.status(404).send();

      res.send(task);
    })
    .catch(() => res.status(500).send());

})


// Express setup
app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
})