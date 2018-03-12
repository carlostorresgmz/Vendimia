(function () {
    angular.module("ventas", ['dirPagination'])
    .config(function (paginationTemplateProvider) {
        paginationTemplateProvider.setPath('../../Scripts/directivas/dirPagination/dirPagination.tpl.html');
    })
	.controller("ventasListadoCtrl", ["$scope", "fnc", "layout", function ($scope, fnc, layout) {
	    fnc.component.showDetail = false;
	    
	    $("#opheader").html("Activas");
	    $scope.filtros = {};


	    fnc.component.php("ventasCtrl", "Listado", {}, function (data){
	    	$scope.ventas = data;
		});

	    $scope.getTitle = function () {
	        return $scope.mostrarFiltro ? "Ocultar filtros" : "Mostrar filtros";
	    }
	}]);
})();