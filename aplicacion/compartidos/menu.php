<?php
    $__depth = "../../";
    require_once $__depth."enviromentApp.php";
?>

<nav class="navbar fixed-top navbar-expand-lg navbar-dark" style="background-color:#000000;">

	<a class="navbar-brand" href="../../index.php">
        <i class="icon ion-ios-home"></i>&nbsp;&nbsp;{{session.title}}
    </a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" target="_self" role="button" aria-haspopup="true" aria-expanded="false">Inicio</a>
                <div class="dropdown-menu">
                    <div class="dropdown-item p-0" style="cursor:pointer;" ng-click="gotoUrl('aplicacion/ventas/index.php')">
                        <span class="text pl-4">Ventas</span>
                        <div class="dropdown-divider"></div>
                    </div>

                    <div class="dropdown-item" style="cursor:pointer;" ng-click="gotoUrl('aplicacion/clientes/index.php')">
                        <span class="text">Clientes</span>
                    </div>

                    <div class="dropdown-item" style="cursor:pointer;" ng-click="gotoUrl('aplicacion/articulos/index.php')">
                        <span class="text">Articulos</span>
                    </div>

                    <div class="dropdown-item" style="cursor:pointer;" ng-click="gotoUrl('aplicacion/configuraciongeneral/index.php')">
                        <span class="text">Configuración</span>
                    </div>
                </div>
            </li>     
        </ul>

        <div class="form-inline my-2 my-lg-0 mr-5">
        <label class="text-white bold">Fecha: {{session.currentDate}}</label>
    </div>

    <div class="form-inline my-2 my-lg-0">
        <a class="navbar-brand" title="Cerrar Sesión" href="{{session.url_path}}/logout.php">
            <i class="icon ion-android-exit"></i>&nbsp;&nbsp;Salir
        </a>
    </div>
    
    </div>
</nav>