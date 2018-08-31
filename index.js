const express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path');

const api = require('./server/api');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', api);

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function(){
  console.log('Server running on localhost:' + port);
});
