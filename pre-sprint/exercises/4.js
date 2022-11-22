const fs = require('fs');

function getJSFiles(dir, cb) {
  fs.readdir(dir, 'utf-8', (err, data) => {
    if (err) console.log(err);
    const jsFiles = data.filter(file => file.endsWith('.js'));
    cb(err, jsFiles);
  });
}
// Implement the function getJSFiles, it should take as arguments:
// a directory (string)
// a callback function
// the callback function must be invoked with an error and an array of js files only

getJSFiles('./library', function (error, jsFiles) {
  console.log(`The jsFiles are: `, jsFiles);
});
