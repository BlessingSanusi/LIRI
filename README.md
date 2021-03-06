# LIRI - Language Interpretation and Recognition Interface.

## A command line node app that takes in parameters and gives back data

### The user has the option of choosing from four commands:

- concert-this
- spotify-this-song
- movie-this
- do-what-it-says

### How to run
- Open CMD or Git Bash
- Navigate to the folder(liri)
- Type node liri.js <choose a command> <name of artist name or band name or movie name>
    - Example: spotify-this-song option
      - node liri.js spotify-this-song next to me

## Example of concert-this

![concert-this image](/img/concertInfo.png)

## Example of spotify-this-song

![concert-this image](/img/spotifyAPI.png)

## Example of movie-this

![concert-this image](/img/movieInfo.png)

## Example of do-what-it-says

![concert-this image](/img/random.png)

## Technologies Used

- Javascript
- Nodejs
- Node packages:
  - Node-Spotify-API
  - Request
  - DotEnv
  - Moment
- APIs:
  - Bands In Town API
  - Spotify API
  - OMDB API
