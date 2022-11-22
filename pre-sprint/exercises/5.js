const fs = require('fs');
const request = require('./request');

// Create a writeJoke function that fetches a joke and writes the joke to a file called joke.txt
// Should take a callback function that is invoked when the file is created

function writeJoke(callBack) {
  request('https://icanhazdadjoke.com/', (err, data) => {
    if (err) console.log(data);
    fs.writeFile('joke.txt', data.joke, (err, data) => {
      if (err) console.log(err);
      callBack(err, 'The file has been made! Hurrah!');
    });
  });
}

writeJoke((err, response) => console.log(response));
