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

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, ()=> console.log('Server running on port 3000'));