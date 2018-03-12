<?php
	require "backend/dbconexion/conexion.php";

	// Turn off error reporting
	error_reporting(0);
	
 	date_default_timezone_set('America/Denver');
	$__enviroment->url_path = "/vendimia";

	session_name("VendimiaSession");
	session_start();

	//Si no hay usuarios loggeados redireccionar al login
	if( !$_SESSION["LoggedIn"] && (!isset($__public) && !$__public) ){
	 	header("Location: ".$__enviroment->url_path."/login.php");
	 	die();
	}
	
	if( $_SESSION["LoggedIn"] )
	{
		$__enviroment->LoggedIn    			= $_SESSION["LoggedIn"];
		$__enviroment->title  				= 'La Vendimia';
		$__enviroment->id_usuario  			= $_SESSION["id_usuario"];
		$__enviroment->nb_usuario  			= $_SESSION["nb_usuario"];
		$__enviroment->nb_usuariocompleto	= $_SESSION["nb_usuariocompleto"];		
		$__enviroment->currentDate			= date('d/m/Y');
	}


?>