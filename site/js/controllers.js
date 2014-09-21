var hackControllers = angular.module('hackControllers', ["resourceService","projectService","eventService"]);
 
hackControllers.controller('ResourceCtrl', function ($scope, $http, Resource) {
  $scope.resources = Resource.query();
  $scope.addResource = function () {
  	var newResource = new Resource({name: $scope.newresource.name, description: $scope.newresource.description, link: $scope.newresource.link })
  	newResource.$save();
  	$scope.resources.push(newResource)
  	
  };

  $scope.deleteResource = function (id, item) {
  	Resource.remove({_id: id});
  	$scope.resources.splice(item,1);
  };

});


hackControllers.controller('ProjectCtrl', function ($scope, $http, Project) {
  $scope.projects = Project.query();
  $scope.addProject = function () {
  	var newProject = new Project({name: $scope.newproject.name, description: $scope.newproject.description, github_url: $scope.newproject.github_url, production_url: $scope.newproject.production_url, demo_url: $scope.newproject.demo_url })
  	newProject.$save();
  	$scope.projects.push(newProject)
  	
  };

  $scope.deleteProject = function (id, item) {
  	Project.remove({_id: id});
  	$scope.projects.splice(item,1);
  };

});

hackControllers.controller('EventCtrl', function ($scope,$http, Event){
  $scope.events = Event.query();
})

function HeaderCtrl($scope, $location) 
{ 
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
        //return true;
    };
}