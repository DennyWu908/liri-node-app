var keysExport = require("./keys.js");
var fs = require("fs");
var request = require('request');
var Twitter = require("twitter");

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: <your spotify client id>,
  secret: <your spotify client secret>
});

var input = process.argv[2];

if (input === myTweets) {

};