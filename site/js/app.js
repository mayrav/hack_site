var hackApp = angular.module('hackApp', [
  'ngRoute',
  'hackControllers',
  'hackServices',
  'hackDirectives'
]);
 


hackApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/aboutus', {
        templateUrl: 'partials/aboutus.html',
      }).
      when('/events', {
        templateUrl: 'partials/events.html',
      }).
      when('/resources', {
        templateUrl: 'partials/resources.html',
        controller: 'ResourceCtrl'
      }).
      when('/admin/resources', {
        templateUrl: 'partials/resources_admin.html',
        controller: 'ResourceCtrl',
        resolve: {loginRequired:loginRequired}
      }).
       when('/admin/projects', {
        templateUrl: 'partials/projects_admin.html',
        controller: 'ProjectCtrl',
        resolve: {loginRequired:loginRequired}
      }).
       when('/projects', {
        templateUrl: 'partials/projects.html',
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

