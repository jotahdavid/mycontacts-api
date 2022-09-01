/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
require('express-async-errors');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000'],
}));

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

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
