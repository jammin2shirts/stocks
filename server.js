const express = require("express");
const app = express();
const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://ben:Twisted1@localhost:5432/local';
const client = new Client ({
  connectionString: connectionString 
});


client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
});

client.query('SELECT * from tmp')
.then(res => console.log(res.rows))
.catch(e => console.error(e.stack));

var insertValue = [5];
var insertQuery = function (err, res) {
  client.query('INSERT INTO tmp (id) values ($1) returning *', insertValue)
  .then(res => console.log(res.rows[0]))
  .catch(e => console.error(e.stack))
};

var updateSetValue = [9];
var updateQualifierValue = [5];
var updateQuery = function (err, res) {
  client.query('UPDATE tmp SET id = $1 WHERE id = $2', updateSetValue, updateQualifierValue)
  .then(res => console.log('successful update'))
  .catch(e => console.error(e.stack))
};

//insertQuery();
updateQuery();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, ()=> console.log('Server running on port 3000'));