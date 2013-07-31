var assert = require('assert');
var should = require('should');
var nock = require('nock');
var __ = require('underscore');
var MemJS = require("memjs").Client;
var memjs = MemJS.create();

var Flickr = require('../../../../lib/clients/flickr/flickr.js');

describe('Flickr API client', function(){
  describe('when we call to get a random photo', function(){
    before(function() {
      process.env.flickrApiKey = 'ola';
      memjs.flush();
    });

    it('should get a list of size of one image', function(done){
      nock('http://api.flickr.com/')
        .get('/services/rest/?nojsoncallback=1&format=json&api_key=ola&photoset_id=72157634695438319&method=flickr.photosets.getPhotos')
        .replyWithFile(200, __dirname + '/data/flickr/photoset.json');

      nock('http://api.flickr.com/')
        .filteringPath(/photo_id=[^&]*/g, 'photo_id=9319145856')
        .get('/services/rest/?nojsoncallback=1&format=json&api_key=ola&method=flickr.photos.getSizes&photo_id=9319145856')
        .replyWithFile(200, __dirname + '/data/flickr/photo_id_9319145856.json');

      var flickr = new Flickr();
      Flickr.should.be.a('function');
      flickr.should.be.a('object');

      flickr.getRandomImage(function (photos) {
        photos.should.be.a('object');
        __.find(photos, function(photo) { return photo.label == 'Small 320'; }).should.have.property('source');
        __.find(photos, function(photo) { return photo.label == 'Large'; }).should.have.property('source');
        __.each(photos, function(photo) {
          photo.should.have.property('source');
        });
        done();
      });
    });

    it('should get a default image when the service is down', function(done) {
      nock('http://api.flickr.com/')
        .get('/services/rest/?nojsoncallback=1&format=json&api_key=ola&photoset_id=72157634695438319&method=flickr.photosets.getPhotos')
        .reply(200, {});
      var flickr = new Flickr();
      Flickr.should.be.a('function');
      flickr.should.be.a('object');

      flickr.getRandomImage(function (photos) {
        photos.should.be.a('object');
        __.find(photos, function(photo) { return photo.label == 'Small 320'; }).should.have.property('source');
        __.find(photos, function(photo) { return photo.label == 'Large'; }).should.have.property('source');
        __.each(photos, function(photo) {
          photo.should.have.property('source');
        });
        done();
      });
    });

    it('should', function(done) {
      nock('http://api.flickr.com/')
        .get('/services/rest/?nojsoncallback=1&format=json&api_key=ola&photoset_id=72157634695438319&method=flickr.photosets.getPhotos')
        .replyWithFile(200, __dirname + '/data/flickr/photoset.json');

      nock('http://api.flickr.com/')
        .filteringPath(/photo_id=[^&]*/g, 'photo_id=9319145856')
        .get('/services/rest/?nojsoncallback=1&format=json&api_key=ola&method=flickr.photos.getSizes&photo_id=9319145856')
        .replyWithFile(200, __dirname + '/data/flickr/photo_id_9319145856.json');

        var flickr = new Flickr();
      Flickr.should.be.a('function');
      flickr.should.be.a('object');

      flickr.getRandomImage(function (photos) {
        photos.should.be.a('object');
        __.find(photos, function(photo) { return photo.label == 'Small 320'; }).should.have.property('source');
        __.find(photos, function(photo) { return photo.label == 'Large'; }).should.have.property('source');
        __.each(photos, function(photo) {
          photo.should.have.property('source');
        });
      });

      flickr.getRandomImage(function (photos) {
        photos.should.be.a('object');
        __.find(photos, function(photo) { return photo.label == 'Small 320'; }).should.have.property('source');
        __.find(photos, function(photo) { return photo.label == 'Large'; }).should.have.property('source');
        __.each(photos, function(photo) {
          photo.should.have.property('source');
        });

        done();
      });
    });
  });
});
