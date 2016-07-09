var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var express = require('express');
var fs = require('fs');
var path = require('path');
var https = require('https');

var app = express();

var filepath = path.join(__dirname, 'output.wav');

app.use(function (req, res, next) {

    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'text');

    next();
});

app.get('/audio', function (req, res) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    var text = req.header("text");

    //getHttp();

    //Lol ===========
    curlShit(text);
    writeData = function () {
        res.set({'Content-Type': 'audio/mpeg'});
        var readStream = fs.createReadStream(filepath);
        readStream.pipe(res);
    }
    setTimeout(writeData, 3000);
    // ======================

    /*
    res.set({'Content-Type': 'audio/mpeg'});
    var readStream = fs.createReadStream(filepath);
    readStream.pipe(res);
    */
})



getHttp = function () {
    var options = {
        host: "https://api.api.ai",
        path: "/v1/intents?v=20150910",
        method: 'GET',
        headers: {
            "Authorization": "Bearer 88f0b9f6ed16438c81450397aa3b2385",
        }
    };
    callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
        str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
        });
    }
    https.request(options, callback).end();
}

curlShit = function(text) {
    var util = require('util');
    var exec = require('child_process').exec;

    var command = 'curl -k -H "Accept-language: en-US" "https://api.api.ai/v1/tts?v=20150910&text=${text}" -o output.wav'
    command = command.replace("${text}", replaceAll(text, " ", "+"));

    child = exec(command, function(error, stdout, stderr){

    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);

    if(error !== null)
    {
        console.log('exec error: ' + error);
    }

    });
}

function replaceAll(string, find, replaceWith) {
    newString = string.replace(find, replaceWith);
    if (newString != string) {
        return replaceAll(newString, find, replaceWith)
    } else {
        return newString;
    }
}

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});
