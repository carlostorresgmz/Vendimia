<?php 

	class articulosModel
	{
		public static function nextID()
		{
			$conexion = ConexionBD::singleton();
			$conexion->setErrorTitle("Error al obtener el siguiente ID del articulo");
			$conexion->setErrorDetail(true);
			$params = array();

			$conexion->execute("fun_select_articulos_nextID", $params);
			return $conexion->getExecute();
		}

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
				$arguments->de_articulo,
				$arguments->de_modelo,
				$arguments->im_precio,
				$arguments->nu_existencia,
				$arguments->id_usuario,
				true,
				"I",0
			);

			$conexion->execute("fun_abc_articulos", $params, false);
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
				$arguments->id_articulo,
				$arguments->de_articulo,
				$arguments->de_modelo,
				$arguments->im_precio,
				$arguments->nu_existencia,				
				$arguments->sn_activo,
				0
			);

			$conexion->execute("fun_select_articulos", $params);
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
		}	
	}
?>