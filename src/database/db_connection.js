require('env2')('./config.env');

const { Pool } = require('pg');
const url = require('url');
require('env2')('./config.env');

let DB_URL = process.env.BOOKS_URL;
if (process.env.NODE_ENV === "test") {
  DB_URL = process.env.TEST_DB_URL;
}

console.log(DB_URL);


if (!DB_URL) throw new Error("Enviroment variable DB_URL must be set");

const pool = new Pool({
  connectionString: DB_URL,
  ssl: true
});

module.exports = pool;
