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
  var https = require('https');
  var Linkedin = require('../lib/clients/linkedin/linkedin.js');
  var linkedin = new Linkedin();
  linkedin.get(function (statusCode, json){
    console.log("Got response: " + statusCode);
    res.json(json);
  });
};