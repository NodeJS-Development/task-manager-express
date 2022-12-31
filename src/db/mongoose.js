const mongoose = require('mongoose');

// The different name for the db is on porpuse
mongoose.connect(process.env.MONGODB_URL, {
  // useNewUrlParser: true,
  autoIndex: true,
});
