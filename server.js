const express = require('express');
const app = express();
const { Pool, Client } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:Twisted1@localhost:5432/local';
const client = new Client ({
  connectionString: connectionString 
});



app.use(express.static(__dirname));


client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
});

var retrieveAll = function()  {
  var query = 'SELECT * FROM tmp';
  client.query(query, (err, res) => {
    if(err) {
      console.log(err.stack)
    } else{
      console.log(res);
    }
  });
};


// var insertValue = [5];
var insertQuery = function (insertValue) {
  var query = 'INSERT INTO tmp (id) values ('+ insertValue +') returning * ';
  client.query(query, (err, res) => {
    if (err) {
    console.log(err.stack)
    } else {
      console.log(res.rows[0]);
    }
  });
};

var updateQuery = function (updateSetValue, updateQualifierValue)  {
  var query = "UPDATE tmp SET id = "+ updateSetValue+" WHERE id = "+updateQualifierValue + " returning *";
  client.query(query, (err, res) => {
    if (err) {
    console.log(err.stack)
    } else {
      console.log(res.rows[0]);
    }
  });
}
var deleteQuery = function(deleteId)  {
  client.query('DELETE from tmp WHERE id = $1', [deleteId], (err, res) => {
    if (err) {
      console.log(err.stack)
      } else {
        console.log("record id:"+deleteId+" deleted");
      }
  });
}

 // insertQuery(8);
// updateQuery(9,5);
// deleteQuery(9);

app.get('/getStocks', function(req, res) {
  console.log("Getting records ");
  var query = 'SELECT * FROM tmp';
  client.query(query, (err, result) => {
    if(err) {
      console.log(err.stack)
    } else{
      console.log(JSON.stringify(result.rows));
      res.json(JSON.stringify(result.rows));
    }
  });
});

// app.post('/insert', (req, res)  {

// });

app.listen(3000, ()=> console.log('Server running on port 3000'));