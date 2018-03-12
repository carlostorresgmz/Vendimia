<script type="text/javascript">
	 window.localStorage.clear();
</script>

<?php	
	// Turn off error reporting
	error_reporting(0);
	
    session_name("VendimiaSession");
	session_start();
	if(isset($_SESSION['LoggedIn']) && $_SESSION['LoggedIn']){
		header("Location:index.php");
	}
?>
<!DOCTYPE html>
<html>
	
	<head>
		<meta charset="UTF-8" />
		<title>Vendimia - Inicio de Sesión</title>

		<link href="content/bootstrap/bootstrap.min.css" rel="stylesheet" />
		<link href="content/icons/ionicons.min.css" rel="stylesheet" />
	    <link href="content/color/material-design-color-palette.min.css" rel="stylesheet" />
	    <link href="content/toast/toastr.min.css" rel="stylesheet" />
	    <link href="content/others/sitio.min.css" rel="stylesheet" />

	    <script src="scripts/popper/umd/popper.min.js"></script>
	    <script src="scripts/tether.min.js"></script>
	    <script src="scripts/jquery/jquery-3.2.1.min.js"></script>
	    <script src="scripts/respond.min.js"></script>
	    <script src="scripts/bootstrap/bootstrap.min.js"></script>
	    <script src="scripts/validator/validator.min.js"></script>
	    
	</head>

	<body class="mdc-bg-grey-50">		
		<form id="formLogin">

			<div class="loader" style="display: none;">
            <div class="center">
                <div class="loading"></div>
                <p class="h5 loadingtitle" id="loadingtitle">Iniciando sesión</p>
                <p class="h6 loadinmsje">Espere un momento por favor</p>
            </div>
        </div>

		<div class="col-xl-4 col-lg-5 col-md-6 col-sm-12 col-12 center">

			<div class="card margin" style="box-shadow: 0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);">
            	<h4 class="card-header text-center text-success font-weight-bold pt-2 pb-2">Inicio de sesión</h4>

            	<div class="card-body">

            		<div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon"><i class="icon ion-android-contact"></i></div>
                            <input type="text" id="nb_usuario" name="nb_usuario" class="form-control col-12" 
                            	placeholder="Usuario" autocomplete="off" isrequired/>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon"><i class="icon ion-locked"></i></div>
                            <input type="password" id="de_contrasena" name="de_contrasena" class="form-control col-12" 
                            	placeholder="Contraseña" autocomplete="off" isrequired />
                        </div>
                    </div>

                    <div class="form-group">
                        <button id="btnIniciarSesion" type="submit" class="btn btn-success mt-3 pl-5 pr-5" style="cursor: pointer;">
                        	Iniciar Sesión
                    	</button>
                    </div>

            	</div>
        	</div>

        	<br />
        	<p id="msje_error" class="align-text-bottom text-center mdc-text-red-900 font-weight-bold"></p>

		</div>
		</form>

		
	</body>

	<script type="text/javascript">
        (function(){
            $.validateForm({
                idForm: "formLogin",
                snMsje: false,
            	bgColor: false,
                callback: function ()
                {	  
                	//$(".loader").show();
                	$("#msje_error").text('');
                    var parametros = {
                        nb_usuario: $("#nb_usuario").val(),
                        de_contrasena: $("#de_contrasena").val()
                    };	                    

                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "/vendimia/validar.php",
                        data: parametros,  
                        success: function (response) 
                        {
                        	$(".loader").hide();                            
                            if(!response.success){
                            	$("#msje_error").text(response.error);
                            }
                            else{
                            	window.location.href = 'index.php';
                            }
                        },
                        failure: function (result) 
                        {
                        	$(".loader").hide();
                        	$("#msje_error").text('Falla en el servidor, intente mas tarde');
                        	console.log(result);
                        },
                        error: function (result) 
                        {
                        	$(".loader").hide();
                        	$("#msje_error").text('Error en el servidor, intente mas tarde');
                        	console.log(result);
                        }
                    });
                }
            });
        })();
    </script>
</html>