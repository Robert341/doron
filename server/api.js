const router = require('express').Router(),
  mysql = require('mysql'),
  randomName = require('node-random-name'),
  randomEmail = require('random-email'),
  randomWorld = require('random-world');
  require('dotenv').config();

var conn = mysql.createConnection({
  host: process.env.APP_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

const tableName = 'stats';

conn.connect(function(err) {
  if (err) {
    console.log('Error! Couldn\'t set connection.');
  } else {
    console.log('Connection established!');
  }
});

function randomInt(n) {
  return Math.floor(Math.random()*n);
}

router.get('/clear', function(req, res) {
  conn.query('TRUNCATE ' + tableName, function(err) {
      if (err) {
          res.json({ success: false });
      } else {
          res.json({ success: true });
      }
  });
});

router.get('/migrate', function(req, res) {
  var query = "INSERT INTO " + tableName + " VALUES";

  const size = 100;

  for (var i = 0; i < size; i++) {
    query += "(NULL,'" +
      randomName({ random: Math.random }) + "','" +
      randomEmail() + "'," +
      randomInt(100000) + "," +
      randomInt(100000) + "," +
      randomInt(100000) + "," +
      randomInt(100000) + "," +
      randomInt(100000) + "," +
      randomInt(100000) + ",'" +
      randomWorld.city() +
      "')";
    if (i !== size - 1) {
      query += ", ";
    }
  }

  conn.query(query, function(err) {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  });
});

router.get('/get_data', function(req, res) {
  var query = 'SELECT * FROM ' + tableName;

  conn.query(query, function(err, data) {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true, data: data });
    }
  });
});

module.exports = router;
