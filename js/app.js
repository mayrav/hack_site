var hackApp = angular.module('hackApp', [
  'ngRoute',
  'hackControllers'
]);
 
hackApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
      }).
      when('/resources', {
        templateUrl: 'partials/resources.html',
        controller: 'ResourceCtrl'
      }).
      when('/secretadmin_resources', {
        templateUrl: 'partials/resources_admin.html',
        controller: 'ResourceCtrl'
      }).
       when('/secretadmin_projects', {
        templateUrl: 'partials/projects_admin.html',
        controller: 'ProjectCtrl'
      }).
       when('/projects', {
        templateUrl: 'partials/projects.html',
        controller: 'ProjectCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
