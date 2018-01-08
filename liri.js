// Dependencies

var keysExport = require("./keys.js");
var fs = require("fs");
var request = require('request');
var Twitter = require("twitter");

// Adding Twitter API keys from keys.js file

var client = new Twitter({
  consumer_key: keysExport.twitterKeys.consumer_key,
  consumer_secret: keysExport.twitterKeys.consumer_secret,
  access_token_key: keysExport.twitterKeys.access_token_key,
  access_token_secret: keysExport.twitterKeys.access_token_secret
});

var params = {screen_name: 'DennyWu105', count: 20};

// Adding Spotify API keys

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: keysExport.spotifyKeys.id,
  secret: keysExport.spotifyKeys.secret
});

var input = process.argv[2];

// The following two lines are for the do-what-it-says command. The variables are intended to keep the LIRI command and song title separate.
var commandOne = []
var commandTwo = []

// A function for making an OMDB query. The argument is the title of the film.

function omdbInfo (movie) {
  var omdbQuery = movie;
  
  if (omdbQuery === undefined || omdbQuery.length === 0) {    
    request("http://www.omdbapi.com/?t=" + "Mr. Nobody" + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
      body = JSON.parse(body)      
      if (!error && response.statusCode === 200) {
        console.log(body.Title)
        console.log(body.Year)
        console.log(body.Rated)
        console.log(body.Ratings[1].Value)
        console.log(body.Country)
        console.log(body.Language)
        console.log(body.Plot)
        console.log(body.Actors)
      };
    });
  } 
  else {
    request("http://www.omdbapi.com/?t=" + omdbQuery + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
      body = JSON.parse(body)
      if (!error && response.statusCode === 200) {
        console.log(body.Title)
        console.log(body.Year)
        console.log(body.Rated)
        console.log(body.Ratings[1].Value)
        console.log(body.Country)
        console.log(body.Language)
        console.log(body.Plot)
        console.log(body.Actors)
      };
    });
  };
}

// A function for making a Spotify request

function spotifyInfo (song) {
  
  if (song === undefined || song.length === 0) {

    spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    console.log(data);
    });
  }
  else {

    spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    console.log(data);
    });

  }

}

// The LIRI commands

if (input === "movie-this") {

  omdbInfo(process.argv[3])

}
else if (input === "my-tweets") {

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });

}
else if (input === "spotify-this-song") {

  spotifyInfo(process.argv[3])

}
else if (input === "do-what-it-says") {

  fs.readFile("random.txt", "utf8", function(error, response) {
    if (error) {
      console.log(error)
    } 
    else {
      var restart
      if (response.indexOf(",") === -1) {
        for (var i = 0; i < response.length; i++) {          
            commandOne.push(response[i])
        }
        commandOne = commandOne.join("")
      }       
      else {
        for (var i = 0; i < response.length; i++) {
            if (response[i] !== ",") {
                commandOne.push(response[i])
            } 
            else {
            restart = i
            break
          }
        }
        commandOne = commandOne.join("")
        for (var i = restart + 2; i < response.length; i++) {
          commandTwo.push(response[i])
        }
        commandTwo = commandTwo.join("")
        console.log(commandOne);
        console.log(commandTwo);
      }

      if (commandOne === "movie-this") {

        omdbInfo(commandTwo);

      }
    }
  });

}