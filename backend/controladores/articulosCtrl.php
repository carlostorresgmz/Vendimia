<?php 
	require dirname( dirname(__FILE__) ).'/modelos/articulosModel.php';

	class articulosCtrl 
	{		
		public static function nextID( $arguments )
		{
			$data = articulosModel::nextID();	
			return $data;
		}

		public static function Add( $arguments )
		{
			$data = articulosModel::Add($arguments);	
			return $data;
		}

		public static function Listado( $arguments )
		{
			$data = articulosModel::Listado();	
			return $data;
		}

		public static function getByID( $arguments )
		{
			$data = articulosModel::getByID($arguments);	
			return $data;
		}

		public static function Update( $arguments )
		{
			$data = articulosModel::Update($arguments);	
			return $data;
		}

		public static function Delete( $arguments )
		{
			$data = articulosModel::Delete($arguments);	
			return $data;
		}
	}
?>