const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// Will automatically parse incoming json into an object so we can access it into our request handlers 
app.use(express.json());

// Routes
app.use(userRouter);
app.use(taskRouter);

// Express setup
app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
})