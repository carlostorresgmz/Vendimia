<?php 

	class ventasModel
	{
		public static function nextID()
		{
			$conexion = ConexionBD::singleton();
			$conexion->setErrorTitle("Error al obtener el siguiente ID de venta");
			$conexion->setErrorDetail(true);
			$params = array();

			$conexion->execute("fun_select_ventas_nextid", $params);			
			return $conexion->getExecute();
		}

		public static function Add( $arguments )
		{
			$conexion = ConexionBD::singleton();
			$conexion->setErrorTitle("Error al registrar la venta");
			$conexion->setErrorDetail(true);
			$conexion->begin();
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			//agregamos ventas
			$params = array(
				null,
				$arguments->id_cliente,
				$arguments->im_enganche,
				$arguments->im_bonificacionenganche,
				$arguments->im_total,
				$arguments->id_usuario,
				"I",0
			);

			$conexion->execute("fun_abc_ventas", $params, true);
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			//obtenemos id venta
			$id_venta = $conexion->getExecute()->data[0]->id_venta;
			$conexion->setErrorTitle("Error al registrar el detalle de venta");

			//agregamos detalles de venta
			foreach ($arguments->ventasDetalle as $item) 
			{
				$params = array(
					$id_venta,
					null,
					$item->id_articulo,
					$item->nu_cantidad,
					$item->im_precio,
					$item->im_total,
					"I",0
				);

				$conexion->execute("fun_abc_ventasdetalle", $params, false);
				if( $conexion->getError() ){
					return $conexion->getExecute();
				}
			}

			//agregamos abonos de venta
			$params = array(
				$id_venta,
				null,
				$arguments->ventasAbonos->im_abono,
				null,
				$arguments->ventasAbonos->im_ahorro,
				$arguments->ventasAbonos->nu_plazoAbono,
				"I",0
			);

			$conexion->setErrorTitle("Error al registrar los abonos de venta");
			$conexion->execute("fun_abc_ventasabonosmensuales", $params, false);
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$conexion->commit();
			return $conexion->getExecute();
		}	

		public static function Listado($arguments)
		{
			$conexion = ConexionBD::singleton();
			$conexion->setErrorTitle("Error al obtener los articulos");
			$conexion->setErrorDetail(true);
			$params = array(
				null,
				null,
				null,
				null,
				null,
				0
			);

			$conexion->execute("fun_select_ventas", $params);
			return $conexion->getExecute();
		}

		/*public static function getByID($arguments)
		{
			$conexion = ConexionBD::singleton();
			$conexion->setErrorTitle("Error al obtener el articulo");
			$conexion->setErrorDetail(true);
			$params = array(
				$arguments->id_articulo,
				null,
				null,
				null,
				null,
				2
			);

			$conexion->execute("fun_select_articulos", $params);
			return $conexion->getExecute();
		}

		public static function Update( $arguments )
		{
			$conexion = ConexionBD::singleton();
			$conexion->setErrorTitle("Error al actualizar el articulo");
			$conexion->setErrorDetail(true);
			$conexion->begin();
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$params = array(
				$arguments->id_articulo,
				$arguments->de_articulo,
				$arguments->de_modelo,
				$arguments->im_precio,
				$arguments->nu_existencia,
				$arguments->id_usuario,
				$arguments->sn_activo,
				"M",0
			);

			$conexion->execute("fun_abc_articulos", $params, false);
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$conexion->commit();
			return $conexion->getExecute();
		}	

		public static function Delete( $arguments )
		{
			$conexion = ConexionBD::singleton();
			$conexion->setErrorTitle("Error al eliminar el articulo");
			$conexion->setErrorDetail(true);
			$conexion->begin();
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$params = array(
				$arguments->id_articulo,
				null,
				null,
				null,
				null,
				null,
				null,
				"E",0
			);

			$conexion->execute("fun_abc_articulos", $params, false);
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$conexion->commit();
			return $conexion->getExecute();
		}*/
	}
?>