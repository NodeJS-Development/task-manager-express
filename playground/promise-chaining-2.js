require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('63a8f2ba12f5ebb3ccd441da')
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then(result => console.log(result))
//   .catch(e => console.log(e));

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);

  const count = await Task.countDocuments({ completed: false });

  return {
    task,
    count,
  };
}

deleteTaskAndCount('63a93390faf3bfe775b469e9')
  .then((count) => console.log(count))
  .catch(e => console.log(e));