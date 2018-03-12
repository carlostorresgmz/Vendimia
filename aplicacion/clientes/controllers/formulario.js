(function(){
    angular.module('clientesFormulario', [])/**/
	.controller("clientesFormularioController", ["$scope", "fnc", "layout", function( $scope, fnc, layout){
	    fnc.component.showDetail = false;

	    $scope.cliente = {};

		if ($scope.params.id_cliente)
		{
			$("#opheader").html("Actualizar");
			fnc.component.php("clientesCtrl", "getByID", { id_cliente: $scope.params.id_cliente }, function (data)
			{
			    $scope.cliente = data[0];
			});
		} 
		else 
		{
			$("#opheader").html("Registrar");
			fnc.component.php("clientesCtrl", "nextID", {}, function (data){
				$scope.cliente.id_clientetexto = data[0].id_clientetexto;
			});
		}

		$scope.submit = function ()
		{
		    if (layout.Administrativo.validarFormulario("formularioCliente"))
		    {	
		    	$scope.cliente.id_usuario = $scope.session.id_usuario;	        

		        if ($scope.params.id_cliente) 
		        {
		            fnc.component.php("clientesCtrl", "Update", $scope.cliente, function (data) {
		                layout.message.success("Bien hecho", "El cliente a sido actualizado correctamente");
		                location.href = "#/";
		            });
		        }
		        else
		        {		        	
		            fnc.component.php("clientesCtrl", "Add", $scope.cliente, function (data) {
		                layout.message.success("Bien hecho", "El cliente a sido registrado correctamente");
		                location.href = "#/";
		            });
		        }
		    }
		};

		$scope.cancelar = function()
		{
			layout.message.confirm.open("ion-android-exit", "Cancelar operación", "Estas por salir del registro de clientes ¿Desea continuar?", function ()
			{
				location.href = "#/";
			});
		};
	}]);

})();