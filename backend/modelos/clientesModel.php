<?php 

	class clientesModel
	{
		public static function nextID()
		{
			$conexion = ConexionBD::singleton();
			$conexion->setErrorTitle("Error al obtener el siguiente ID del cliente");
			$conexion->setErrorDetail(true);
			$params = array();

			$conexion->execute("fun_select_clientes_nextID", $params);
			return $conexion->getExecute();
		}

		public static function Add( $arguments )
		{
			$conexion = ConexionBD::singleton();
			$conexion->setErrorTitle("Error al registrar el cliente");
			$conexion->setErrorDetail(true);
			$conexion->begin();
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$params = array(
				null,
				$arguments->nb_cliente,
				$arguments->de_apellidopaterno,
				$arguments->de_apellidomaterno,
				$arguments->de_rfc,
				$arguments->id_usuario,
				true,"I",0
			);

			$conexion->execute("fun_abc_clientes", $params, false);
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$conexion->commit();
			return $conexion->getExecute();
		}	

		public static function Listado($arguments)
		{
			$conexion = ConexionBD::singleton();
			$conexion->setErrorTitle("Error al obtener los clientes");
			$conexion->setErrorDetail(true);
			$params = array(
				$arguments->id_cliente,
				$arguments->nb_cliente,
				$arguments->de_apellidopaterno,
				$arguments->de_apellidomaterno,
				$arguments->de_rfc,
				$arguments->sn_activo,
				$arguments->nu_opcion,
			);

			$conexion->execute("fun_select_clientes", $params);
			return $conexion->getExecute();
		}

		public static function getByID($arguments)
		{
			$conexion = ConexionBD::singleton();
			$conexion->setErrorTitle("Error al obtener el cliente");
			$conexion->setErrorDetail(true);
			$params = array(
				$arguments->id_cliente,
				null,
				null,
				null,
				null,
				null,
				2
			);

			$conexion->execute("fun_select_clientes", $params);
			return $conexion->getExecute();
		}

		public static function Update( $arguments )
		{
			$conexion = ConexionBD::singleton();
			$conexion->setErrorTitle("Error al actualizar el cliente");
			$conexion->setErrorDetail(true);
			$conexion->begin();
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$params = array(
				$arguments->id_cliente,
				$arguments->nb_cliente,
				$arguments->de_apellidopaterno,
				$arguments->de_apellidomaterno,
				$arguments->de_rfc,
				$arguments->id_usuario,
				$arguments->sn_activo,
				"M",0
			);

			$conexion->execute("fun_abc_clientes", $params, false);
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$conexion->commit();
			return $conexion->getExecute();
		}	

		public static function Delete( $arguments )
		{
			$conexion = ConexionBD::singleton();
			$conexion->setErrorTitle("Error al eliminar el cliente");
			$conexion->setErrorDetail(true);
			$conexion->begin();
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$params = array(
				$arguments->id_cliente,
				$arguments->nb_cliente,
				$arguments->de_apellidopaterno,
				$arguments->de_apellidomaterno,
				$arguments->de_rfc,
				$arguments->id_usuario,
				$arguments->sn_activo,
				"E",0
			);

			$conexion->execute("fun_abc_clientes", $params, false);
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$conexion->commit();
			return $conexion->getExecute();
		}	
	}
?>