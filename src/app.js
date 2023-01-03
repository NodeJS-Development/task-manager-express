const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

// Will automatically parse incoming json into an object so we can access it into our request handlers 
app.use(express.json());

// Routes
app.use(userRouter);
app.use(taskRouter);

module.exports = app;