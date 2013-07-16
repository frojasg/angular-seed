module.exports = function Linkedin() {

  this.get = function (onResult) {
    var restler = require('restler');
    var config = require('../../../config/linkedin.config');
    var url = 'https://' + config.hostname + config.path;

    var options = {
      headers: {
        'x-li-format': 'json'
      },
      query: {
        oauth2_access_toke: config.access_token
      }
    };

    restler.get(url, options).on('complete', function(data){
      onResult(200, data);
    });
  };
};

if(require.main == module) {
  var linkedin = new module.exports();
  linkedin.get(function (statusCode, json){
    console.log("Got response: " + statusCode);
    console.log(json);
  });
}