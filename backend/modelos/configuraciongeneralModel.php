<?php 

	class configuraciongeneralModel
	{
		public static function Add( $arguments )
		{
			$conexion = ConexionBD::singleton();
			$conexion->setErrorTitle("Error al registrar el articulo");
			$conexion->setErrorDetail(true);
			$conexion->begin();
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$params = array(
				null,
				$arguments->nu_tasafinancimiento,
				$arguments->pj_enganche,
				$arguments->nu_plazomaximo,
				$arguments->id_usuario,
				"I",0
			);

			$conexion->execute("fun_abc_configuraciongeneral", $params);
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$conexion->commit();
			return $conexion->getExecute();
		}	

		public static function Listado($arguments)
		{
			$conexion = ConexionBD::singleton();
			$conexion->setErrorTitle("Error al obtener la configuración");
			$conexion->setErrorDetail(true);
			$params = array(
				null,
				null,
				null,
				null,
				0
			);

			$conexion->execute("fun_select_configuracion", $params);
			return $conexion->getExecute();
		}

		public static function getByID($arguments)
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
				$arguments->id_configuracion,
				$arguments->nu_tasafinancimiento,
				$arguments->pj_enganche,
				$arguments->nu_plazomaximo,
				$arguments->id_usuario,
				"M",0
			);

			$conexion->execute("fun_abc_configuraciongeneral", $params);
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$conexion->commit();
			return $conexion->getExecute();
		}	
	}
?>