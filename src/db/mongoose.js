const mongoose = require('mongoose');

// The different name for the db is on porpuse
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  // useNewUrlParser: true,
  autoIndex: true,
});
