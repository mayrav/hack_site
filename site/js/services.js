angular.module("resourceService", ["ngResource"]).
       factory("Resource", function ($resource) {

           return $resource(
               "/api/resources/:_id"
          );
      });

angular.module("projectService", ["ngResource"]).
       factory("Project", function ($resource) {
           return $resource(
               "/api/projects/:_id"   
          );
      });

angular.module("datasetService", ["ngResource"]).
       factory("DataSet", function ($resource) {
           return $resource(
               "/api/datasets/:_id" 
          );
      });
