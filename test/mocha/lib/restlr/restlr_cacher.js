var assert = require('assert');
var should = require('should');
var nock = require('nock');
var __ = require('underscore');
var restler = require('restler');

var restlerCacher = require('../../../../lib/restler/restler_cacher.js');

describe('Wrapper for restlr to use cache.', function(){
  before(function() {
    restlerCacher.should.be.a('object');
    restlerCacher.get.should.be.a('function');
    restlerCacher.memjs.should.be.a('object');
    restlerCacher.memjs.flush();
  });

  describe('When we use a get request should check the memcached first.', function(){
    it('should return the values store in memcache', function(done){

      restlerCacher.memjs.set('http://api.flickr.com/greeting', 'Hello World');

      restlerCacher.get('http://api.flickr.com/greeting', function(data, err) {
        data.should.equal('Hello World');
      });

      done();
    });

    it('should return the values from the web', function(done) {
      nock('http://api.flickr.com')
        .get('/somegreeting')
        .reply(200, 'Bye World!');

      restlerCacher.get('http://api.flickr.com/somegreeting', function(data, err) {
        data.should.equal('Bye World!');
        done();
      });
    });
  });

  describe('when a value is fetched from the web it should keep it', function() {
    it('should store the result of the request in memcache', function(done) {
      nock('http://example.com')
        .get('/greeting')
        .reply(200, 'Bye World!');

      restlerCacher.get('http://example.com/greeting', function(http_response) {
        http_response.should.eql('Bye World!');

        restlerCacher.memjs.get('http://example.com/greeting', function(err, data) {
          data.toString().should.equal('"Bye World!"');
          done();
        });
      });
    });
  });
});
