<?php
	// Turn off error reporting
	//error_reporting(0);
	
	$__depth = "../../";
	require_once $__depth."enviromentApp.php";
	
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	header("Content-Type: application/json;");

	// Validar que el componente haya sido enviado y exista en el directorio
	if( isset($request->component) && file_exists($request->component.".php") ){		
		require $request->component.'.php';
	} else {
		$result->error = "Componente no encontrado";
		echo json_encode($result); die();
	}

	// Validar que la función haya sido enviada y exista en el componente importado
	if( !isset($request->func) && !method_exists( $request->component, '::'.$request->func ) ){
		$return->error = "Función no encontrada";
		echo json_encode($result); die();
	}

	// Cachar errores fatales y manejarlos
	register_shutdown_function('fatalErrorShutdownHandler');
	function fatalErrorShutdownHandler()
	{	
		$last_error = error_get_last();
		if ($last_error['type'] === E_ERROR) 
		{
			$return->error = "Error al ejecutar el componente";
			$return->errorDetail = $last_error['message'];
			echo json_encode( $return );
		}
	}

	$request->data->__enviroment = $__enviroment;
	
	$return = call_user_func( $request->component.'::'.$request->func, $request->data );	
	echo json_encode( $return );
?>