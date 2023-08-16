require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())

const workflow_token = process.env.ALLOY_WT
const workflow_secret = process.env.ALLOY_WS

let data = `${workflow_token}:${workflow_secret}`;
let buff = new Buffer.from(data);
let base64data = buff.toString('base64');

const config = {
  headers: { 
    Authorization: `Basic ${base64data}`
  },
};

app.post('/post', function (req, res) {
  axios.post('https://sandbox.alloy.co/v1/evaluations', {
    ...req.body.payload
    }, config,
  ).then((response) => {
    res.send(
      {
        status: response.data.summary.outcome
      })
    }).catch(err => {console.log(err)})
});

app.listen((process.env.PORT || 4000), function() {console.log(`listening on port ${process.env.PORT || 4000}!`);
});