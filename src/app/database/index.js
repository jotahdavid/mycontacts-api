const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

client.connect();

exports.query = async (queryStatement, values) => {
  const { rows } = await client.query(queryStatement, values);
  return rows;
};
