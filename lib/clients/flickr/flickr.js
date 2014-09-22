module.exports = function Flickr() {
  var __ = require('underscore');
  var restler = require('restler');
  var extend = require('util')._extend;
  var restlerCacher = require('../../restler/restler_cacher');

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

    var data, photoSize;
    restlerCacher.get(url + getPhotoSetParams(), function(data) {
      if (typeof data == 'string') {
        data = JSON.parse(data);
      }

      if (typeof data == 'undefined' || !data.photoset) {
        return onResult(defaultImage());
      }

      var photo_url = url + getPhotoSizeParam(data.photoset.photo.sort(function() { return 0.5 - Math.random(); } )[0].id);
        restlerCacher.get(photo_url, function(photoSize) {
          if (typeof photoSize == 'string') {
            photoSize = JSON.parse(photoSize);
          }
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

  var defaultImage = function() {
    return [
      {label: 'Small 320', source: 'img/background.jpg'},
      {label: 'Large', source: 'img/background.jpg'}
    ];
  };
};

if(require.main == module) {
  var flickr = new module.exports();
  flickr.getRandomImage(function (json){
  });
}
