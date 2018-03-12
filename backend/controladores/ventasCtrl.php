<?php 
	require dirname( dirname(__FILE__) ).'/modelos/ventasModel.php';
	require dirname( dirname(__FILE__) ).'/modelos/clientesModel.php';
	require dirname( dirname(__FILE__) ).'/modelos/articulosModel.php';
	require dirname( dirname(__FILE__) ).'/modelos/configuraciongeneralModel.php';

	class ventasCtrl 
	{		
		public static function initData( $arguments )
		{
			//OBTENEMOS ID VENTA
			$data = ventasModel::nextID();	
			if($data->error != null && strlen($data->error) > 0){
				return $data;
			}

			//OBTENEMOS CLIENTES
			$argumentsClientes = new stdclass();
			$argumentsClientes->sn_activo = true;
			$argumentsClientes->nu_opcion = 1;
			$dataClientes = clientesModel::Listado($argumentsClientes);
			if($dataClientes->error != null && strlen($dataClientes->error) > 0){
				return $dataClientes;
			}

			//OBTENEMOS ARTICULOS
			$argumentsArticulos = new stdclass();
			$argumentsArticulos->sn_activo = true;
			$argumentsArticulos->nu_opcion = 1;
			$dataArticulos = articulosModel::Listado($argumentsArticulos);
			if($dataArticulos->error != null && strlen($dataArticulos->error) > 0){
				return $dataArticulos;
			}

			//OBTENEMOS CONFIGURACION
			$argumentsConfiguracion = new stdclass();
			$argumentsConfiguracion->sn_activo = true;
			$argumentsConfiguracion->nu_opcion = 1;
			$dataConfiguracion = configuraciongeneralModel::Listado($argumentsConfiguracion);
			if($dataConfiguracion->error != null && strlen($dataConfiguracion->error) > 0){
				return $dataArticulos;
			}

			//RETORNAMOS OBJETO COMPUESTO
			$result = new stdclass();
			$result->error = "";
			$result->errorTitle = "";
			$result->errorDetail = "";
			$result->snRaiseError = false;
			$result->data = array('id_ventatexto' => $data->data[0]->id_ventatexto, 
				'clientes' => $dataClientes->data, 
				'articulos' => $dataArticulos->data,
				'configuracion' => $dataConfiguracion->data);

			return $result;
		}

		public static function Add( $arguments )
		{
			$data = ventasModel::Add($arguments);	
			return $data;
		}

		public static function Listado( $arguments )
		{
			$data = ventasModel::Listado();	
			return $data;
		}

		/*public static function getByID( $arguments )
		{
			$data = ventasModel::getByID($arguments);	
			return $data;
		}

		public static function Update( $arguments )
		{
			$data = ventasModel::Update($arguments);	
			return $data;
		}

		public static function Delete( $arguments )
		{
			$data = ventasModel::Delete($arguments);	
			return $data;
		}*/
	}
?>