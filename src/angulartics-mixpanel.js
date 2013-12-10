/**
 * @license Angulartics v0.8.5
 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
 * Contributed by http://github.com/L42y
 * License: MIT
 */
(function (angular) {
  'use strict';

  /**
   * @ngdoc overview
   * @name angulartics.mixpanel
   * Enables analytics support for Mixpanel (http://mixpanel.com)
   */
  angular.module('angulartics.mixpanel', ['angulartics'])
    .config(['$analyticsProvider', function ($analyticsProvider) {

      var keyPattern = (/(mp_([\w\W])+$)|^(?!([A-z]{0,2}_)([\w\W])+$)/),
        mpPattern = /mp_([\w\W])+$/;

    angulartics.waitForVendorApi('mixpanel', 500, function (mixpanel) {
      $analyticsProvider.registerPageTrack(function (path) {
        mixpanel.track_pageview(path);
      });
    });

    angulartics.waitForVendorApi('mixpanel', 500, function (mixpanel) {
      $analyticsProvider.registerEventTrack(function (action, properties) {
        var track = {};

        angular.forEach(properties, function eachProperties(prop, key) {
          if (keyPattern.test(key)) {

            if (mpPattern.test(key)) {
              key = key.substr(3);
            }

            track[key] = prop;
          }
        });

        mixpanel.track(action, track);
      });

    });

  }]);

}(angular));
