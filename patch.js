// Angular 6 does not export stream anymore, using following workaround to fix it
// taken from: https://gist.github.com/niespodd/1fa82da6f8c901d1c33d2fcbb762947d

const fs = require('fs');
const f = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

fs.readFile(f, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  // example replacements:
  //var result = data.replace(/node: false/g, 'node: {crypto: true, stream: true}');
  //var result = data.replace(/node: false/g, 'node: {crypto: true, stream: true, fs: \'empty\', net: \'empty\'}');

  // but only need to fix node_modules/cipher-base and node_modules/hash-base which can't resolve 'stream'
  var result = data.replace(/node: false/g, 'node: {stream: true}');

  fs.writeFile(f, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});