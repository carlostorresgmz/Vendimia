<?php
	$__depth = "../../";
	require_once $__depth."enviromentApp.php";
?>

<!DOCTYPE html>
<html ng-app="app" ng-controller="appCtrl" ng-init="SessionInit(<?php echo htmlspecialchars(json_encode($__enviroment)); ?>)">
	<head>
		<title><?php echo $__enviroment->title; ?></title>
		<meta charset="UTF-8">	

		<link href="<?php echo $__enviroment->url_path; ?> /content/bootstrap/bootstrap.css" rel="stylesheet" />
	    <link href="<?php echo $__enviroment->url_path; ?> /content/icons/ionicons.min.css" rel="stylesheet" />
	    <link href="<?php echo $__enviroment->url_path; ?> /content/color/material-design-color-palette.min.css" rel="stylesheet" />
	    <link href="<?php echo $__enviroment->url_path; ?> /content/toast/toastr.min.css" rel="stylesheet" />
	    <link href="<?php echo $__enviroment->url_path; ?> /content/others/sitio.min.css" rel="stylesheet" />

	    <script src="<?php echo $__enviroment->url_path; ?> /scripts/popper/umd/popper.min.js"></script>
	    <script src="<?php echo $__enviroment->url_path; ?> /scripts/tether.min.js"></script>
	    <script src="<?php echo $__enviroment->url_path; ?> /scripts/jquery/jquery-3.2.1.min.js"></script>
	    <script src="<?php echo $__enviroment->url_path; ?> /scripts/jquery/jquery-ui.min.js"></script>
	    <script src="<?php echo $__enviroment->url_path; ?> /scripts/respond.min.js"></script>
	    <script src="<?php echo $__enviroment->url_path; ?> /scripts/bootstrap/bootstrap.min.js"></script>

	    <script src="<?php echo $__enviroment->url_path; ?> /scripts/angular/angular.min.js"></script>
    	<script src="<?php echo $__enviroment->url_path; ?> /scripts/angular_ui_router/angular-ui-router.min.js"></script>
    	<script src="<?php echo $__enviroment->url_path; ?> /scripts/oc_lazy_load/ocLazyLoad.min.js"></script>

    	<script src="<?php echo $__enviroment->url_path; ?> /scripts/validator/validator.min.js"></script>
	    <script src="<?php echo $__enviroment->url_path; ?> /scripts/toast/toastr.min.js"></script>	    
	    <script src="<?php echo $__enviroment->url_path; ?> /scripts/js/layout.js?r=" + (new Date).getTime()></script>
	    <script src="<?php echo $__enviroment->url_path; ?> /scripts/js/fnc.js?r=" + (new Date).getTime()></script>
	    <script src="<?php echo $__enviroment->url_path; ?> /scripts/js/appCtrl.js?r=" + (new Date).getTime()></script>
	    <script src="<?php echo $__enviroment->url_path; ?> /scripts/directivas/dirPagination/dirPagination.js"></script>

	    <script src="<?php echo $__enviroment->url_path; ?> /scripts/js/states.js"></script>
	    <script src="<?php echo $__enviroment->url_path; ?> /aplicacion/ventas/controllers/states.js"></script>	    
	</head>

	<body>		
		<?php echo file_get_contents($__depth."aplicacion/compartidos/menu.php") ?>		

		<div class="loader" ng-if="__httpStack.length">
            <div class="center">
                <div class="loading"></div>
                <p class="h5 loadingtitle" id="loadingtitle">Cargando</p>
                <p class="h6 loadinmsje">Espere un momento por favor</p>
            </div>
        </div>

		<div class="body-content ml-0">

			<nav aria-label="breadcrumb block" role="navigation">
			    <ol class="breadcrumb mt-0 pt-2 pb-1">
			        <li class="breadcrumb-item bold" aria-current="page"><a href="#" class="mdc-text-green-700">Ventas</a></li>
			        <li class="breadcrumb-item bold" aria-current="page" id="opheader">Activas</li>
			    </ol>		    
			</nav>

        	<main ui-view></main>
    	</div>
	</body>

	<script type="text/javascript">
        (function ()
        {
        	enviroment = $.parseJSON('<?php echo json_encode($__enviroment); ?>');
        	angular.module('session.settings', []).constant('session', enviroment);
        })();
    </script>
	
</html>