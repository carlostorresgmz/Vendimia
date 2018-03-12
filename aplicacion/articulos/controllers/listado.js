(function () {
    angular.module("Articulos", ['dirPagination'])
    .config(function (paginationTemplateProvider) {
        paginationTemplateProvider.setPath('../../Scripts/directivas/dirPagination/dirPagination.tpl.html');
    })
	.controller("ArticulosListadoCtrl", ["$scope", "fnc", "layout", function ($scope, fnc, layout) {
	    fnc.component.showDetail = false;
	    
	    $("#opheader").html("Registrados");
	    $scope.filtros = {};


	    fnc.component.php("articulosCtrl", "Listado", {}, function (data){
	    	$scope.articulos = data;
		});

		$scope.eliminar = function (articulo) 
		{
	        fnc.index($scope.articulos);
	        layout.message.confirm.open("ion-android-delete", "Eliminar articulo", "El articulo '" + articulo.de_articulo + 
	        	"' será eliminado ¿Desea continuar?", function () 
	        {
	            fnc.component.php("articulosCtrl", "Delete", articulo, function (data) {
	                $scope.articulos.splice(articulo.index, 1);
	                layout.message.success("Bien hecho", "El articulo a sido eliminado correctamente");
	            });
	        });
	    };

	    $scope.getTitle = function () {
	        return $scope.mostrarFiltro ? "Ocultar filtros" : "Mostrar filtros";
	    }
	}]);
})();