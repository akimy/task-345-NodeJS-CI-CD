const { pathToRepo } = require('./config');

const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send(`${pathToRepo}`);
});

app.listen(3000, () => {
  process.stdout.write('Приложение запущенно на localhost:3000\n');
});
