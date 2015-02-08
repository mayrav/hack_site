app = angular.module("hackDirectives",[])


app.directive("technologyContainer", function(){
		return { 
			restrict: "E",
			templateUrl: '/static/partials/projects_page/technology-container.html'
	}
}
);

app.directive("participate", function(){
		return { 
			restrict: "E",
			templateUrl: '/static/partials/projects_page/participate.html'
	}
}
);

app.directive("projectShowcase", function(){
		return { 
			restrict: "E",
			templateUrl: '/static/partials/projects_page/project-showcase.html'
	}
}
);