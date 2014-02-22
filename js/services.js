angular.module("resourceService", ["ngResource"]).
       factory("Resource", function ($resource) {

           return $resource(
               "http://hyperninja.net:4711/api/resources/:_id"
          );
      });

angular.module("projectService", ["ngResource"]).
       factory("Project", function ($resource) {
           return $resource(
               "http://hyperninja.net:4711/api/projects/:_id"   
          );
      });

angular.module("datasetService", ["ngResource"]).
       factory("DataSet", function ($resource) {
           return $resource(
               "http://hyperninja.net:4711/api/datasets/:_id" 
          );
      });