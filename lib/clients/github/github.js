module.exports = function Github() {

  this.get = function (onResult) {
    var restler = require('restler');
    var url = 'https://api.github.com/';
    restler.get(url + 'users/frojasg').once('complete', function(data){
      restler.get(data.repos_url).once('complete', function(repos){
        data.repos = repos;
        onResult(data);
      });
    });
  };
};

if(require.main == module) {
  var github = new module.exports();
  github.get(function (json){
    console.log(json);
  });
}