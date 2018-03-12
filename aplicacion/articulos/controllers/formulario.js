(function(){
    angular.module('articulosFormulario', [])
	.controller("articulosFormularioController", ["$scope", "fnc", "layout", function( $scope, fnc, layout){
	    fnc.component.showDetail = false;

	    $scope.articulo = {};

		if ($scope.params.id_articulo)
		{
			$("#opheader").html("Actualizar");
			fnc.component.php("articulosCtrl", "getByID", { id_articulo: $scope.params.id_articulo }, function (data)
			{
			    $scope.articulo = data[0];
			});
		} 
		else 
		{
			$("#opheader").html("Registrar");
			fnc.component.php("articulosCtrl", "nextID", {}, function (data){
				console.log(data);
				$scope.articulo.id_articulotexto = data[0].id_articulotexto;
			});
		}

		$scope.submit = function ()
		{
		    if (layout.Administrativo.validarFormulario("formularioarticulos"))
		    {	
		    	$scope.articulo.id_usuario = $scope.session.id_usuario;	        

		        if ($scope.params.id_articulo) 
		        {
		        	fnc.component.php("articulosCtrl", "Update", $scope.articulo, function (data) {
		                layout.message.success("Bien hecho", "El articulo a sido actualizado correctamente");
		                location.href = "#/";
		            });
		        }
		        else
		        {		        	
		        	fnc.component.php("articulosCtrl", "Add", $scope.articulo, function (data) {
		                layout.message.success("Bien hecho", "El articulo a sido registrado correctamente");
		                location.href = "#/";
		            });
		        }
		    }
		};

		$scope.cancelar = function()
		{
			layout.message.confirm.open("ion-android-exit", "Cancelar operación", "Estas por salir del registro de articulos ¿Desea continuar?", function ()
			{
				location.href = "#/";
			});
		};
	}]);

})();