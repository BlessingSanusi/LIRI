require("dotenv").config();

let request = require("request");
let fs = require("fs");
let keys = require("./keys.js");
let Spotify = require("node-spotify-api");
let axios = require("axios");
let spotify = new Spotify(keys.spotify);

let userOption = process.argv[2];
let userInput = process.argv.slice(3).join(" ");

//function
function liriOption(userInput, userOption) {
  switch (userOption) {
    case "concert-this":
      concertDetails(userInput);
      break;

    case "spotify-this-song":
      songDetails(userInput);
      break;

    case "movie-this":
      movieDetails(userInput);
      break;

    case "do-what-it-says":
      showRandom(userInput);
      break;

    default:
      console.log(
        "choose something: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says"
      );
      break;
  }
}

//band in town info
function concertDetails(userInput) {
  console.log("Concert Details");
  console.log(userInput);
  let url =
    "https://rest.bandsintown.com/artists/" +
    userInput +
    "/events?app_id=codingbootcamp";
  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var event = JSON.parse(body);

      if (event.length < 1) {
        console.log("No concert details");
      }

      for (var i = 0; i < event.length; i++) {
        console.log("_______EVENT INFO_________");
        fs.appendFileSync("log.txt", "_______EVENT INFO_________\n");
        console.log(i);
        fs.appendFileSync("log.txt", i + "\n");
        console.log("Name of artist: " + userInput);
        fs.appendFileSync("log.txt", userInput + "\n");
        console.log("Name of the Venue: " + event[i].venue.name);
        fs.appendFileSync(
          "log.txt",
          "Name of the Venue: " + event[i].venue.name + "\n"
        );
        console.log("Venue Location: " + event[i].venue.city);
        fs.appendFileSync(
          "log.txt",
          "Venue Location: " + event[i].venue.city + "\n"
        );
        console.log("Date of the Event: " + event[i].datetime);
        fs.appendFileSync(
          "log.txt",
          "Date of the Event: " + event[i].datetime + "\n"
        );
        console.log("*****************************");
        fs.appendFileSync("log.txt", "*****************************" + "\n");
      }
    } else {
      console.log("Oops!!!!! an error occured.");
    }
  });
}
//spotify
function songDetails(userInput) {
  if (userInput === "" || userInput === undefined) {
    userInput = "Walking the wire";
  }
  console.log(userInput);
  spotify
    .search({ type: "track", query: userInput })
    .then(function(response) {
      for (var i = 0; i < 5; i++) {
        var songInfo =
          "___________________ Song Info ________________" +
          "\nArtist(s): " +
          response.tracks.items[i].artists[0].name +
          "\nSong Name: " +
          response.tracks.items[i].name +
          "\nAlbum Name: " +
          response.tracks.items[i].album.name +
          "\nPreview Link: " +
          response.tracks.items[i].preview_url;
        console.log(`${songInfo} \n`);

        fs.appendFileSync(
          "log.txt",
          `______________ Song Info _____________ \n`
        );
        fs.appendFileSync("log.txt", `${songInfo} \n`);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

//movie
function movieDetails(userInput) {
  if (userInput === "" || userInput === undefined) {
    userInput = "Mr. Nobody";
    console.log("_________Mr. Noboby________");
    fs.appendFileSync("log.txt", "_________Mr. Noboby________");
    console.log(
      "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/"
    );
    fs.appendFileSync(
      "log.txt",
      "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" +
        "\n"
    );
    console.log("It's on Netflix!");
    fs.appendFileSync("log.txt", "It's on Netflix!\n");
  }

  let queryUrl =
    "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);
  axios
    .get(queryUrl)
    .then(function(response) {
      console.log("___________ Movie Information ___________");
      fs.appendFileSync(
        "log.txt",
        "___________ Movie Information ___________\n"
      );

      console.log("This movie Title is: " + response.data.Title);
      fs.appendFileSync("log.txt", `Title: ${response.data.Title} \n`);

      console.log("This movie was made in the year: " + response.data.Year);
      fs.appendFileSync("log.txt", `Release Year: ${response.data.Year} \n`);

      console.log("IMDB rating: " + response.data.imdbRating);
      fs.appendFileSync(
        "log.txt",
        `IMDB Rating: ${response.data.imdbRating} \n`
      );

      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      fs.appendFileSync(
        "log.txt",
        `Rotten Tomatoes Rating: ${response.data.Ratings[1].value} \n`
      );

      console.log("Language: " + response.data.Language);
      fs.appendFileSync("log.txt", `Language: ${response.data.Language} \n`);

      console.log("This movie was made in: " + response.data.Country);
      fs.appendFileSync("log.txt", `Country: ${response.data.Country} \n`);

      console.log("The plot of this movie is: " + response.data.Plot);
      fs.appendFileSync("log.txt", `Short plot: ${response.data.Plot} \n`);

      console.log("The actors in this movie are: " + response.data.Actors);
      fs.appendFileSync("log.txt", `Casts: ${response.data.Actors} \n`);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function showRandom() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);

    var txtArr = data.split(",");
    console.log(txtArr);
    songDetails(txtArr[1]);

    fs.appendFileSync("log.txt", `Song Info: ${txtArr[1]} \n`);
  });
}
liriOption(userInput, userOption);
