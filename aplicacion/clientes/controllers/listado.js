(function () {
    angular.module("Clientes", ['dirPagination'])
    .config(function (paginationTemplateProvider) {
        paginationTemplateProvider.setPath('../../Scripts/directivas/dirPagination/dirPagination.tpl.html');
    })
	.controller("ClientesListadoCtrl", ["$scope", "fnc", "layout", function ($scope, fnc, layout) {
	    fnc.component.showDetail = false;
	    
	    $("#opheader").html("Registrados");
	    $scope.filtros = {};


	    fnc.component.php("clientesCtrl", "Listado", {nu_opcion: 0}, function (data){
			$scope.clientes = data;
		});

		$scope.eliminar = function (cliente) 
		{
	        fnc.index($scope.clientes);
	        layout.message.confirm.open("ion-android-delete", "Eliminar cliente", "El cliente '" + cliente.nb_cliente + 
	        	" " + cliente.de_apellidopaterno + " " + cliente.de_apellidomaterno + "' será eliminado ¿Desea continuar?", function () 
	        {
	            fnc.component.php("clientesCtrl", "Delete", cliente, function (data) {
	                $scope.clientes.splice(cliente.index, 1);
	                layout.message.success("Bien hecho", "El cliente a sido eliminado correctamente");
	            });
	        });
	    };

	    $scope.getTitle = function () {
	        return $scope.mostrarFiltro ? "Ocultar filtros" : "Mostrar filtros";
	    }
	}]);
})();