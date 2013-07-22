module.exports = function Flickr() {
  var __ = require('underscore');
  var restler = require('restler');
  var extend = require('util')._extend;

  var config = require('../../../config/flickr.conf');

  var params = {
    api_key: process.env.flickrApiKey,
    format:'json',
    nojsoncallback:'1'
  };

  var paramsToUrl = function(params) {
    return __.map(params, function(value, key){ return  key +  "=" + value; }).join('&');
  };

  var getPhotoSetParams = function () {
    var photoset_params = extend({}, params);
    photoset_params.photoset_id = config.default_photoset_id;
    photoset_params.method = 'flickr.photosets.getPhotos';
    return paramsToUrl(photoset_params);
  };

  this.getRandomImage = function (onResult) {
    var url = config.flickr_url;

    restler.get(url + getPhotoSetParams()).once('complete', function(data){
      var photo_url = url + getPhotoSizeParam(data.photoset.photo.sort(function() { return 0.5 - Math.random(); } )[0].id);
        restler.get(photo_url).once('complete', function(photoSize){
          onResult(photoSize.sizes.size);
        });
    });
  };

  var getPhotoSizeParam = function (photo_id) {
    var photosize_params = extend({}, params);
    photosize_params.method = 'flickr.photos.getSizes';
    photosize_params.photo_id = photo_id;
    return paramsToUrl(photosize_params);
  };

};

if(require.main == module) {
  var flickr = new module.exports();
  flickr.getRandomImage(function (json){
    console.log(json);
  });
}