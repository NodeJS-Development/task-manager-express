const mongoose = require('mongoose');

// The different name for the db is on porpuse
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  // useNewUrlParser: true,
  autoIndex: true,
});

const User = mongoose.model(
  'User',
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    }
  }
);

// const me = new User({
//   name: 'Brayan',
//   age: 'Mike',
// });

// me.save().then(() => {
//   console.log(me);
// }).catch((error) => {
//   console.log(error);
// });

const Task = mongoose.model('Task', {
  description: {
    type: String,
  },
  completed: {
    type: Boolean
  },
});

const task = new Task({
  description: 'Study Node.js',
  completed: false,
});

task.save().then(() => {
  console.log(task);
}).catch((error) => console.log(error));