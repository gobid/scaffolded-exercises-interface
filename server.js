const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const proxy = require('html2canvas-proxy');
const request = require('request');

var app = express();
app.use(express.static(path.join(__dirname, 'build')));
var port = (process.env.PORT || 8080);

app.use("/", proxy());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// app.get('/jokes/random', (req, res) => {
//   request(
//     { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
//     (error, response, body) => {
//       if (error || response.statusCode !== 200) {
//         return res.status(500).json({ type: 'error', message: error.message });
//       }

//       res.json(JSON.parse(body));
//     }
//   )
// });

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log("Server running on port", port);
app.listen(port);

// app.listen(process.env.PORT || 8080);