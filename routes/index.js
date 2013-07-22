/*
 * GET home page.
 */

var https = require('https');

exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name +'.ejs');
};

exports.linkedin = function (req, res) {
  var Linkedin = require('../lib/clients/linkedin/linkedin.js');
  var linkedin = new Linkedin();
  linkedin.get(function (statusCode, json){
    console.log("Got response: " + statusCode);
    res.json(json);
  });
};

exports.background = function (req, res) {
  var Flickr = require('../lib/clients/flickr/flickr.js');
  //res.json({'img':'/img/background3.jpg'});
  var flickr = new Flickr();
  flickr.getRandomImage(function (json){
    res.json(json);
  });
};