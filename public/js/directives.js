'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).directive('backImg', function(){
      return function(scope, element, attrs){
        scope.$watch('background', function(){
          element.css({
            'background-image': 'url(' + scope.background +') ',
            'background-size' : 'cover',
            '-webkit-background-size' : 'cover',
            '-moz-background-size': 'cover',
            '-o-background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-attachment': 'fixed',
            'background-position': 'center',
            'background-center': 'center'
          });
        });

      };
    });

