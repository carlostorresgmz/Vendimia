<?php 
	class usuarios 
	{
		public static function agregar( $arguments )
		{
			$conexion = ConexionBD::singleton();
			$conexion->begin();
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$encrypted_password = usuarios::PasswordEncryptDecrypt('encrypt', $arguments->cl_contrasena);

			$params = array(
				$arguments->id_usuario,
				$arguments->nb_usuario,
				$encrypted_password,
				$arguments->id_empresa,
				$arguments->id_empleado,
				$arguments->sn_activo = 1,
				$arguments->sn_agenciaviaje,
				$arguments->id_agenciaviajes,
				$arguments->func = "i",
				$arguments->numop = 0
			);

			$conexion->execute("fun_usuarios_abc", $params, false);
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$conexion->commit();
			return $conexion->getExecute();					
		}

		public static function editar( $arguments )
		{
			$conexion = ConexionBD::singleton();
			$conexion->begin();
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$encrypted_password = usuarios::PasswordEncryptDecrypt('encrypt', $arguments->cl_contrasena);
			$params = array(
				$arguments->id_usuario,
				$arguments->nb_usuario,
				$encrypted_password,
				$arguments->id_empresa,
				$arguments->id_empleado,
				$arguments->sn_activo,
				$arguments->sn_agenciaviaje,
				$arguments->id_agenciaviajes,
				$arguments->func = "m", // modificar,
				$arguments->numop = 1 // opción
			);

			$conexion->execute("fun_usuarios_abc", $params, false);
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$conexion->commit();
			return $conexion->getExecute();
		}

		public static function eliminar( $arguments )
		{
			$conexion = ConexionBD::singleton();

			$conexion->begin();
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$params = array(
				$arguments->id_usuario,
				$arguments->nb_usuario,
				$arguments->cl_contrasena,
				$arguments->id_empresa,
				$arguments->id_empleado,
				$arguments->sn_activo,
				$arguments->sn_agenciaviaje,
				$arguments->id_agenciaviajes,
				$arguments->func = "e", // eliminar,
				$arguments->numop = 0 // opción
			);

			$conexion->execute("fun_usuarios_abc", $params, false);
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}

			$conexion->commit();
			return $conexion->getExecute();
		}

		public static function listado( $arguments )
		{
			$conexion = ConexionBD::singleton();
			//$arguments->cl_contrasena = usuarios::PasswordEncryptDecrypt('decrypt', $arguments->cl_contrasena);
			$params = array(
				$arguments->id_usuario,
				$arguments->nb_usuario,
				$arguments->cl_contrasena,
				$arguments->id_usuariobd,
				$arguments->cl_passwordbd,
				$arguments->id_empresa,
				$arguments->id_empleado,
				$arguments->de_correo,
				$arguments->sn_activo,
				$arguments->fh_registro,
				$arguments->nb_usuariocompleto,
				$arguments->sn_agenciaviaje
			);

			$conexion->execute("fun_usuarios_listado", $params);
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}
			
			$decrypted_password = usuarios::PasswordEncryptDecrypt('decrypt', $conexion->getExecute()->data[0]->cl_contrasena);
			$conexion->getExecute()->data[0]->cl_contrasena = $decrypted_password;
			return $conexion->getExecute();
		}

		public static function buscarUsuario( $arguments )
		{
			$conexion = ConexionBD::singleton();
			if($arguments->cl_contrasena) {
				$contrasena = usuarios::PasswordEncryptDecrypt('encrypt', $arguments->cl_contrasena);
			} else {
				$contrasena = null;
			}
			
			$params = array(
				$arguments->id_usuario,
				$arguments->nb_usuario,
				$contrasena,
				$arguments->id_usuariobd,
				$arguments->cl_passwordbd,
				$arguments->id_empresa,
				$arguments->id_empleado,
				$arguments->de_correo,
				$arguments->sn_activo,
				$arguments->fh_registro,
				$arguments->nb_usuariocompleto
			);

			$conexion->execute("fun_usuarios_listado_especifico", $params);
			if( $conexion->getError() ){
				return $conexion->getExecute();
			}
			
			$decrypted_password = usuarios::PasswordEncryptDecrypt('decrypt', $conexion->getExecute()->data[0]->cl_contrasena);
			$conexion->getExecute()->data[0]->cl_contrasena = $decrypted_password;
			return $conexion->getExecute();
		}

		public static function PasswordEncryptDecrypt($action, $string) 
		{
		    $output = false;
		    $encrypt_method = "AES-256-CBC";
		    //$secret_key = 'This is my secret key' NO SE USA;		    
		    $secret_key = 'This is my llave secreta';
		    $secret_iv = 'This is my secret iv';

		    // hash
		    $key = hash('sha256', $secret_key);
		    
		    // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
		    $iv = substr(hash('sha256', $secret_iv), 0, 16);
		    if( $action == 'encrypt' ) {
		        $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
		        $output = base64_encode($output);
		    }
		    else if( $action == 'decrypt' ){
		        $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
		    }
		    return $output;
		}
	}
?>