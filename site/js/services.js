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
angular.module("eventService",["ngResource"]).
        factory("Event", function ($resource) {
          return $resource(
            "http://api.meetup.com/2/events?status=upcoming&order=time&limited_events=False&group_urlname=Code-For-Nova&desc=false&offset=0&photo-host=public&format=json&page=20&fields=&sig_id=11545665&sig=40fe4c201e2189b4c7be742fd6e221fd30c8ba43",
             {callback:"JSON_CALLBACK"}, {"query": {method:"jsonp"}}
             );
        });
