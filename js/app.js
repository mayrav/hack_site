var hackApp = angular.module('hackApp', [
  'ngRoute',
  'hackControllers'
]);
 
hackApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/resources', {
        templateUrl: 'partials/resources.html',
        controller: 'ResourceCtrl'
      }).
      when('/secretadmin_resources', {
        templateUrl: 'partials/resources_admin.html',
        controller: 'ResourceCtrl'
      }).
       when('/projects', {
        templateUrl: 'partials/projects.html',
        controller: 'ProjectCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);