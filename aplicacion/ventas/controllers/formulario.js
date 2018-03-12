(function(){
    angular.module('ventasFormulario', ['dirPagination'])
    .config(function (paginationTemplateProvider) {
        paginationTemplateProvider.setPath('../../Scripts/directivas/dirPagination/dirPagination.tpl.html');
    })
	.controller("ventasFormularioController", ["$scope", "fnc", "layout", "$filter", function( $scope, fnc, layout, $filter){
	    fnc.component.showDetail = false;

	    $scope.venta = {
	    	articulosVenta:[],
	    	im_enganche: 0,
	    	im_engancheFormat: "$0.00",
	    	im_bonificacionenganche: 0,
	    	im_bonificacionengancheFormat: "$0.00",
	    	im_total: 0,
	    	im_totalFormat: "$0.00",
	    	abonosmensuales:[]
	    };
	    $scope.auxiliares = {
	    	textoSubmit: "Siguiente",
	    	sn_guardar: false,
	    	nu_cantidad: 0
	    };

		if ($scope.params.id_venta)
		{
			$("#opheader").html("Actualizar");
			fnc.component.php("ventasCtrl", "getByID", { id_venta: $scope.params.id_venta }, function (data)
			{
			    $scope.venta = data[0];
			});
		} 
		else 
		{
			$("#opheader").html("Registrar");
			fnc.component.php("ventasCtrl", "initData", {}, function (data)
			{				
				$scope.venta.id_ventatexto = data.id_ventatexto;
				$scope.clientes = data.clientes;
				$scope.articulos = data.articulos;
				if(data.configuracion.length > 0){
					$scope.configuracion = data.configuracion[0];
				}				

				var dataClientes = [];
				angular.forEach(data.clientes, function (cliente, index) {
					dataClientes.push({
						label: cliente.nb_cliente + ' ' + cliente.de_apellidopaterno + ' ' + cliente.de_apellidomaterno,
						value: cliente.id_clientetexto + ' - ' + cliente.nb_cliente + ' ' + cliente.de_apellidopaterno + ' ' + cliente.de_apellidomaterno,
						id_cliente: cliente.id_cliente,
						id_clientetexto: cliente.id_clientetexto,
						nb_cliente: cliente.nb_cliente,
						de_apellidopaterno: cliente.de_apellidopaterno,
						de_apellidomaterno: cliente.de_apellidomaterno,
						de_rfc: cliente.de_rfc
					});
				});

				var dataArticulos = [];
				angular.forEach(data.articulos, function (articulo, index) {
					dataArticulos.push({
						label: articulo.de_articulo,
						value: articulo.id_articulotexto + ' - ' + articulo.de_articulo,
						id_articulo: articulo.id_articulo,
						id_articulotexto: articulo.id_articulotexto,
						de_articulo: articulo.de_articulo,
						de_modelo: articulo.de_modelo,
						nu_existencia: articulo.nu_existencia,
						im_precio: articulo.im_precio
					});
				});

				$("#nb_cliente").autocomplete({
					source: dataClientes, 
					minLength: 3,
					select: function (event, ui) { 
						$scope.venta.id_cliente = ui.item.id_cliente;
						$scope.venta.nb_cliente = ui.item.nb_cliente + ' ' + ui.item.de_apellidopaterno + ' ' + ui.item.de_apellidomaterno;
						$scope.venta.de_rfccliente = ui.item.de_rfc;
						setTimeout(function(){$("#de_articulo").focus();},50);
					}
				});
				$("#de_articulo").autocomplete({
					source: dataArticulos, 
					minLength: 3,
					select: function (event, ui) { 
						$scope.articuloSelected = {
							id_articulo: ui.item.id_articulo,
							de_articulo: ui.item.de_articulo,
							de_modelo: ui.item.de_modelo,
							nu_existencia: ui.item.nu_existencia,
							im_precio: ui.item.im_precio
						};
					}
				});
			});
		}

		var calcularImportesEnganches = function()
		{
			var pj_enganche = parseFloat($scope.configuracion.pj_enganche);
			var nu_tasafinancimiento = parseFloat($scope.configuracion.nu_tasafinancimiento);
			var nu_plazomaximo = parseFloat($scope.configuracion.nu_plazomaximo);

			var sumImporteTotal = 0;

			$scope.venta.im_enganche = 0;
			$scope.venta.im_bonificacionenganche = 0;
			$scope.venta.im_total = 0;

			if($scope.venta.articulosVenta.length > 0)
			{
				angular.forEach($scope.venta.articulosVenta, function (item, index) {
					sumImporteTotal = sumImporteTotal + parseFloat(item.im_total);
				});	

				var imEnganche = (pj_enganche/100) * parseFloat(sumImporteTotal);
				imEnganche = fnc.formatNumber(imEnganche, 2, '', '');
				imEnganche = parseFloat(imEnganche);

				imEnganche = imEnganche + parseFloat($scope.venta.im_enganche);
				$scope.venta.im_enganche = imEnganche;
				$scope.venta.im_engancheFormat = fnc.formatNumber(imEnganche, 2, '$', ',');

				var imBonificacionEnganche = imEnganche * (nu_tasafinancimiento * nu_plazomaximo/100)					
				imBonificacionEnganche = fnc.formatNumber(imBonificacionEnganche, 2, '', '');
				imBonificacionEnganche = parseFloat(imBonificacionEnganche);

				imBonificacionEnganche = imBonificacionEnganche + parseFloat($scope.venta.im_bonificacionenganche);				
				$scope.venta.im_bonificacionenganche = imBonificacionEnganche;
				$scope.venta.im_bonificacionengancheFormat = fnc.formatNumber(imBonificacionEnganche, 2, '$', ',');

				var imTotal = sumImporteTotal - imEnganche - imBonificacionEnganche;
				imTotal = fnc.formatNumber(imTotal, 2, '', '');
				imTotal = parseFloat(imTotal);

				imTotal = imTotal + parseFloat($scope.venta.im_total);
				$scope.venta.im_total = imTotal;
				$scope.venta.im_totalFormat = fnc.formatNumber(imTotal, 2, '$', ',');		
			}
			else
			{
				$scope.venta.im_engancheFormat = fnc.formatNumber(0, 2, '$', ',');
				$scope.venta.im_bonificacionengancheFormat = fnc.formatNumber(0, 2, '$', ',');
				$scope.venta.im_totalFormat = fnc.formatNumber(0, 2, '$', ',');
			}	

			$("#de_articulo").focus();
		};

		var calcularAbonosMensuales = function()
		{
			var nu_plazoAbono = 0;
			var pj_enganche = parseFloat($scope.configuracion.pj_enganche);
			var nu_tasafinancimiento = parseFloat($scope.configuracion.nu_tasafinancimiento);
			var nu_plazomaximo = parseFloat($scope.configuracion.nu_plazomaximo);
			var im_totalVenta = parseFloat($scope.venta.im_total);

			for(var i=0; i<4; i++)
			{
				nu_plazoAbono = nu_plazoAbono + 3;

				var im_precioContadoAbono = im_totalVenta / (1 + ((nu_tasafinancimiento * nu_plazomaximo)/100));
				im_precioContadoAbono = fnc.formatNumber(im_precioContadoAbono, 2, '', '');
				im_precioContadoAbono = parseFloat(im_precioContadoAbono);

				var im_totalPagar = im_precioContadoAbono * (1 + (nu_tasafinancimiento * nu_plazoAbono)/100);
				im_totalPagar = fnc.formatNumber(im_totalPagar, 2, '', '');
				im_totalPagar = parseFloat(im_totalPagar);

								
				var im_abonoPagar = im_totalPagar / nu_plazoAbono;
				im_abonoPagar = fnc.formatNumber(im_abonoPagar, 2, '', '');
				im_abonoPagar = parseFloat(im_abonoPagar);

				var im_ahorroAbono = im_totalVenta - im_totalPagar;
				im_ahorroAbono = fnc.formatNumber(im_ahorroAbono, 2, '', '');
				im_ahorroAbono = parseFloat(im_ahorroAbono);

				var item = {
					nu_plazoAbono: nu_plazoAbono,
					de_abonos: nu_plazoAbono + " ABONOS DE",
					im_abono: im_abonoPagar,
					im_abonoFormat: fnc.formatNumber(im_abonoPagar, 2, '$', ','),
					im_total: im_totalPagar,
					im_totalFormat: fnc.formatNumber(im_totalPagar, 2, '$', ','),
					im_ahorro: im_ahorroAbono,
					im_ahorroFormat: fnc.formatNumber(im_ahorroAbono, 2, '$', ','),
					sn_check: 0,
					checkValue: i
				};

				$scope.venta.abonosmensuales.push(item);
			}
		};

		$scope.validaCliente = function()
		{
			if(fnc.isNull($scope.venta.nb_clientefull))
			{
				delete $scope.venta.id_cliente;
				delete $scope.venta.de_rfccliente;
				delete $scope.venta.nb_cliente;
			}
		};

		$scope.agregarArticulo = function(articulo)
		{			
			if(fnc.isNull(articulo, 'object')){
				layout.message.error("Artículo requerido", "Favor de seleccionar una articulo");
			}
			else if($filter('filter')($scope.venta.articulosVenta, {id_articulo: articulo.id_articulo}).length > 0)
			{
				layout.message.error("Artículo repetido", "El articulo '" + articulo.de_articulo + "' ya existe en el listado");
				delete $scope.venta.de_articulofull;
				delete $scope.articuloSelected;
			}
			else if(articulo.nu_existencia < 1)
			{
				layout.message.error("Artículo sin existencia", "El artículo seleccionado no cuenta con existencia, favor de verificar");
				delete $scope.venta.de_articulofull;
				delete $scope.articuloSelected;				
			}
			else if(fnc.isNull($scope.configuracion, 'object'))
			{
				layout.message.error("Configuración no encontrada", "No existe una configuracion de financiamiento en el sistema, favor de verificar");
			}
			else
			{
				var imPrecio = articulo.im_precio * (1 + ( parseFloat($scope.configuracion.nu_tasafinancimiento) * parseInt($scope.configuracion.nu_plazomaximo))/100);
				imPrecio = fnc.formatNumber(imPrecio, 2, '', '');
				imPrecio = parseFloat(imPrecio);

				var item = {
					id_articulo: articulo.id_articulo,
					de_articulo: articulo.de_articulo,
					de_modelo: articulo.de_modelo,
					nu_existencia: articulo.nu_existencia,
					im_precio: imPrecio,
					im_precioFormat: fnc.formatNumber(imPrecio, 2, '$', ','),
					im_total: 0,
					im_totalFormat: fnc.formatNumber(0, 2, '$', ',')
				};				

				$scope.venta.articulosVenta.push(item);
				delete $scope.venta.de_articulofull;
				delete $scope.articuloSelected;
			}
		};

		$scope.calcularImporte = function(elemento)
		{			
			var cantidad = parseInt(elemento.nu_cantidad);

			if($scope.auxiliares.nu_cantidad != cantidad || parseFloat(elemento.im_total) == 0)
			{
				if(cantidad > elemento.nu_existencia)
				{
					layout.message.error("Articulo sin existencia", "El artículo seleccionado tiene una existencia maxima de " + elemento.nu_existencia);
					elemento.nu_cantidad = angular.copy(elemento.nu_existencia);
					cantidad = angular.copy(elemento.nu_existencia);
				}
				else
				{
					var imImporte = cantidad * parseFloat(elemento.im_precio);
					imImporte = fnc.formatNumber(imImporte, 2, '', '');
					imImporte = parseFloat(imImporte);

					elemento.im_total = imImporte;
					elemento.im_totalFormat = fnc.formatNumber(imImporte, 2, '$', ',');
					calcularImportesEnganches();
				}
			}
		};

		$scope.saveCantidad = function(cantidad)
		{
			$scope.auxiliares.nu_cantidad = parseInt(angular.copy(cantidad));
		};

		$scope.eliminarArticuloVenta = function(articulo)
		{
			fnc.index($scope.venta.articulosVenta);
			$scope.venta.articulosVenta.splice(articulo.index, 1);
			calcularImportesEnganches();
		};

		$scope.checkAbonoMensual = function(elemento)
		{
			if($filter('filter')($scope.venta.abonosmensuales, {sn_check: 1}).length > 0)
			{
				delete $filter('filter')($scope.venta.abonosmensuales, {sn_check: 1})[0].sn_check;
			}

			elemento.sn_check = 1;
		}

		$scope.submit = function ()
		{
			if(!$scope.auxiliares.sn_guardar)
			{
				if(!$scope.venta.id_cliente)
				{
					layout.message.error("Venta incompleta", "Los datos ingresados no son correctos, favor de verificar el cliente");
				}
				else if($scope.venta.articulosVenta.length == 0){
					layout.message.error("Venta incompleta", "Los datos ingresados no son correctos, favor de verificar la venta");
				}
				else if(parseFloat($scope.venta.im_total) == 0){
					layout.message.error("Venta incompleta", "Los datos ingresados no son correctos, favor de verificar la venta");
				}
				else
				{
					$scope.auxiliares.sn_guardar = true;
					$scope.auxiliares.textoSubmit = "Guardar";
					calcularAbonosMensuales();
				}
			}
			else
			{	
				if($filter('filter')($scope.venta.abonosmensuales, {sn_check: 1}).length == 0)
				{
					layout.message.error("Venta incompleta", "Debe seleccionar un plazo para realizar el pago de su compra");
				}
				else
				{
					var dataSend = {
						id_cliente: $scope.venta.id_cliente,
						im_enganche: $scope.venta.im_enganche,
						im_bonificacionenganche: $scope.venta.im_bonificacionenganche,
						im_total: $scope.venta.im_total,
						id_usuario: $scope.session.id_usuario,
						ventasDetalle: $scope.venta.articulosVenta,
						ventasAbonos: $filter('filter')($scope.venta.abonosmensuales, {sn_check: 1})[0]
					};

					fnc.component.php("ventasCtrl", "Add", dataSend, function (data) {
		                layout.message.success("Bien hecho", "Tu venta a sido registrada correctamente");
		                location.href = "#/";
		            });

				}
			}
		};

		$scope.cancelar = function()
		{
			layout.message.confirm.open("ion-android-exit", "Cancelar operación", "Estas por salir del registro de ventas ¿Desea continuar?", function ()
			{
				location.href = "#/";
			});
		};
	}]);
})();