var restler = require('restler');
var MemJS = require("memjs").Client;
var memjs = MemJS.create();

module.exports.memjs = memjs;

module.exports.get = function(url, onceComplete) {
  memjs.get(url, function(err, data) {
    if (data) {
      onceComplete(data.toString());
    } else {
      restler.get(url).once('complete', function(result) {
        memjs.set(url, JSON.stringify(result));
        onceComplete(result);
      });
    }
  });
};

if(require.main == module) {
  console.log('Hello World!');

}