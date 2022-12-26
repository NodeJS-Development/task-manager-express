require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('63a8f2ba12f5ebb3ccd441da')
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then(result => console.log(result))
  .catch(e => console.log(e));