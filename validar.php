<?php
	require "backend/dbconexion/conexion.php";	
	require "backend/controladores/funciones.php";
	require "backend/controladores/usuariosCtrl.php";
	
	// Turn off error reporting
	error_reporting(0);
	session_name("VendimiaSession");
	session_start();

	//demo
	//Vendimia2018

	//Si no hay usuarios loggeados entonces iniciar sesión
	if(!isset($_SESSION['LoggedIn']))
	{
		$nb_usuario = $_POST["nb_usuario"];
		$de_contrasena = $_POST["de_contrasena"];
		$encrypted_password = funciones::PasswordEncryptDecrypt('encrypt', $de_contrasena);

		$params = array(
			$nb_usuario,
			$encrypted_password
		);

		$conexion = new ConexionBD();		
		$conexion->execute("fun_usuarios_autenticar", $params);
		if( $conexion->getError() )
		{
			$data = [ 'success' => false, 'error' => 'Error en la conexión a la base de datos'];
			header('Content-type: application/json');
			echo json_encode($data, JSON_UNESCAPED_UNICODE);	
			die();
		}
		
		//Si se encontraron coincidencias entonces crear las variables de sesión y redireccionar al index.php
		if( count($conexion->getExecute()->data) == 1 )
		{			
			$usuario = $conexion->getExecute()->data[0];
			$_SESSION['LoggedIn']   		= true;
			$_SESSION['title']  			= 'La Vendimia';
			$_SESSION['id_usuario']  		= $usuario->id_usuario;
			$_SESSION['nb_usuario']  		= $usuario->nb_usuario;	
			$_SESSION['nb_usuariocompleto']	= $usuario->nb_usuariocompleto;	
						
			$data = [ 'success' => true];
			header('Content-type: application/json');
			echo json_encode($data, JSON_UNESCAPED_UNICODE);
		}
		else
		{
			//Login Incorrecto
			$data = [ 'success' => false, 'error' => 'EL usuario o contraseña son incorrectos'];
			header('Content-type: application/json');
			echo json_encode($data, JSON_UNESCAPED_UNICODE);
			die();
		}
	}
	else
	{
		//Hay una sesión iniciada
		header("Location:index.php");
	}
?>