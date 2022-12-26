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
app.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }

});

// READ
app.get('/users', async (req, res) => {

  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

app.get('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) return res.send(404).send();

    res.send(user);

  } catch (error) {
    res.status(500).send();
  }

});


// TASKS

// CREATE
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.send(400).send(e);
  }

});

// READ
app.get('/tasks', async (req, res) => {

  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }

});

app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);

    if (!task) return res.status(404).send();

    res.send(task);

  } catch (e) {
    res.status(500).send();
  }

})


// Express setup
app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
})