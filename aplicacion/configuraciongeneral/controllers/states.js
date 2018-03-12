(function(){
	angular.module('states', ['ui.router', 'oc.lazyLoad', 'session.settings'])
	.config(function ($urlRouterProvider, $stateProvider, session) {

	    var states = [
            { name: '/', dir: session.url_path + '/aplicacion/configuraciongeneral', file: 'formulario' }
	    ];

	    $urlRouterProvider.otherwise("/");

		states.forEach(function (state, index, array) {

			$stateProvider.state(state.name, {
				url: state.name,
				templateUrl: state.dir + '/views/' + state.file + '.html?hash' + (new Date).getTime(),
				controller: function( $scope, $stateParams ){
					$scope.params = $stateParams;
				},
				resolve: {
					include: function( $ocLazyLoad ){
						return $ocLazyLoad.load({
							name: state.file,
							files: [state.dir + '/controllers/' + state.file + '.js?r=' + (new Date).getTime()]
						});
					}
				}
			});
		});
	});
})();