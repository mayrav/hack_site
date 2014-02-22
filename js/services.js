angular.module("resourceService", ["ngResource"]).
       factory("Resource", function ($resource) {

           return $resource(
               "http://hackapi.hyperninja.net/api/resources/:_id"
          );
      });

angular.module("projectService", ["ngResource"]).
       factory("Project", function ($resource) {
           return $resource(
               "http://hackapi.hyperninja.net/api/projects/:_id"   
          );
      });

angular.module("datasetService", ["ngResource"]).
       factory("DataSet", function ($resource) {
           return $resource(
               "http://hackapi.hyperninja.net/api/datasets/:_id" 
          );
      });