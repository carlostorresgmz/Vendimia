(function(){
    angular.module('configuracionGeneralFormulario', [])
	.controller("configuracionGeneralFormularioController", ["$scope", "fnc", "layout", function( $scope, fnc, layout){
	    fnc.component.showDetail = false;

	    $scope.configuraciongeneral = {};
	    $scope.params = {};

		fnc.component.php("configuraciongeneralCtrl", "Listado", {}, function (data){
			if(data.length == 0)
			{
				$("#opheader").html("Registrar");				
			}
			else
			{
				$("#opheader").html("Actualizar");
				$scope.configuraciongeneral = data[0];
				$scope.configuraciongeneralAux = angular.copy($scope.configuraciongeneral);
			}
		});

		$scope.submit = function ()
		{
		    if (layout.Administrativo.validarFormulario("formularioconfiguracionGeneral"))
		    {	
		    	$scope.configuraciongeneral.id_usuario = $scope.session.id_usuario;	    

		        if ($scope.configuraciongeneral.id_configuracion) 
		        {
		        	fnc.component.php("configuraciongeneralCtrl", "Update", $scope.configuraciongeneral, function (data) {
		                layout.message.success("Bien hecho", "La configuración general a sido actualizada correctamente");		                
		            });
		        }
		        else
		        {	
		        	fnc.component.php("configuraciongeneralCtrl", "Add", $scope.configuraciongeneral, function (data) 
		        	{
		                layout.message.success("Bien hecho", "La configuración general a sido registrada correctamente");		                
		                $scope.configuraciongeneral.id_configuracion = data[0].id_configuracion;
		                $("#opheader").html("Actualizar");
		            });
		        }
		    }
		};

		$scope.limpiar = function()
		{
			delete $scope.configuraciongeneral;

			if($scope.configuraciongeneralAux)
			{
				$scope.configuraciongeneral = $scope.configuraciongeneralAux;
			}
			else
			{
				$scope.configuraciongeneral = {};
			}
		};
	}]);

})();