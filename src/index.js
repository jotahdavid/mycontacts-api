const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);
app.use((error, req, res, next) => {
  if (error.routine === 'string_to_uuid') {
    console.error(error);
    return res.status(404).json({ error: 'Invalid ID syntax for type uuid' });
  }
  console.error(error);
  return res.sendStatus(500);
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
