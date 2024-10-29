const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/TodoProject')
  .then(() => {
    console.log('Data base is conected');
  })
  .catch(e => {
    console.log(e);
  });

module.exports = mongoose;
