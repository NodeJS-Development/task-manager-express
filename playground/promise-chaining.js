require('../src/db/mongoose');
const User = require('../src/models/user');

// 63a9192775b72c038e7c8f8d
User.findByIdAndUpdate('63a9242a5e9fddb9363bf7f6', {
  age: 1,
})
  .then(user => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch(e => console.log(e));