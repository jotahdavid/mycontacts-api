require('dotenv').config();
const { Client } = require('pg');

const { DB_URL } = process.env;

if (!DB_URL) {
  throw new Error('Database URL was not provided!');
}

const client = new Client(DB_URL);

client.connect();

exports.query = async (queryStatement, values) => {
  const { rows } = await client.query(queryStatement, values);
  return rows;
};
