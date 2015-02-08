var hackApp = angular.module('hackApp', [
  'ngRoute',
  'hackControllers',
  'hackServices',
  'hackDirectives'
]);
 


hackApp.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/home', {
        templateUrl: '/static/partials/home.html',
      }).
      when('/login', {
        templateUrl: '/static/partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/aboutus', {
        templateUrl: '/static/partials/aboutus.html',
      }).
      when('/events', {
        templateUrl: '/static/partials/events.html',
      }).
      when('/resources', {
        templateUrl: '/static/partials/resources.html',
        controller: 'ResourceCtrl'
      }).
      when('/admin/resources', {
        templateUrl: '/static/partials/resources_admin.html',
        controller: 'ResourceCtrl',
        resolve: {loginRequired:loginRequired}
      }).
       when('/admin/projects', {
        templateUrl: '/static/partials/projects_admin.html',
        controller: 'ProjectCtrl',
        resolve: {loginRequired:loginRequired}
      }).
       when('/projects', {
        templateUrl: '/static/partials/projects.html',
        controller: 'ProjectCtrl'
      }).
        otherwise({
          redirectTo: '/home'
      })
  }]);

var loginRequired = function($location,$q,JWToken){
  var deferred = $q.defer();
  if (!JWToken.get()|| !JWToken.claims().admin ||  JWToken.isExpired()){
    deferred.reject()
    $location.path('/login');
  }
  else{
      deferred.resolve();
  }
    return deferred.promise;
  }

