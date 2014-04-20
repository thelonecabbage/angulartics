
(function(angular) {
'use strict';

/**
 * @ngdoc overview
 * @name angulartics.facebook
 * Enables analytics support for facebook custom audiences tracking
 *
 * ALERT:
 * remember to remove the:
 *
 * window._fbq.push(["track", "PixelInitialized", {}]);
 *
 * from the tracking script provided by facebook
 */
angular.module('angulartics.facebook', ['angulartics'])
.config(['$analyticsProvider', function ($analyticsProvider) {
  angulartics.waitForVendorApi('_fbq', 500, function (_fbq) {
    $analyticsProvider.registerPageTrack(function (path) {
      _fbq.push(["track", "PixelInitialized", {}]);
    });
  });

  angulartics.waitForVendorApi('_fbq', 500, function (_fbq) {
    $analyticsProvider.registerEventTrack(function (action, properties) {
      _fbq.push(['track', action, properties]);
    });
  });
}]);
})(angular);