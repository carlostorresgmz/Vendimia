<?php 
	require dirname( dirname(__FILE__) ).'/modelos/clientesModel.php';

	class clientesCtrl 
	{		
		public static function nextID( $arguments )
		{
			$data = clientesModel::nextID();	
			return $data;
		}

		public static function Add( $arguments )
		{
			$data = clientesModel::Add($arguments);	
			return $data;
		}

		public static function Listado( $arguments )
		{
			$data = clientesModel::Listado($arguments);	
			return $data;
		}

		public static function getByID( $arguments )
		{
			$data = clientesModel::getByID($arguments);	
			return $data;
		}

		public static function Update( $arguments )
		{
			$data = clientesModel::Update($arguments);	
			return $data;
		}

		public static function Delete( $arguments )
		{
			$data = clientesModel::Delete($arguments);	
			return $data;
		}
	}
?>