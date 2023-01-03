const app = require('./app');

const port = process.env.PORT;

// Express setup
app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
