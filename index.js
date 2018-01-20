var express = require('express');
var bodyParser = require('body-parser');

var app = express();

import add_data from './routes/add_data.js';
import last_blocks from './routes/last_blocks.js';

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/last_blocks/:count', last_blocks)
app.post('/add_data', add_data)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
