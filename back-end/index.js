const express = require('express');

const app = express();

app.listen(8001, () => {
  console.log('app is running at http://localhost:8001');
});
