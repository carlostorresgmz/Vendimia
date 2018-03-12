<?php 
	require dirname( dirname(__FILE__) ).'/modelos/configuraciongeneralModel.php';

	class configuraciongeneralCtrl 
	{	
		public static function Add( $arguments )
		{
			$data = configuraciongeneralModel::Add($arguments);	
			return $data;
		}

		public static function Listado( $arguments )
		{
			$data = configuraciongeneralModel::Listado();	
			return $data;
		}

		public static function Update( $arguments )
		{
			$data = configuraciongeneralModel::Update($arguments);	
			return $data;
		}
	}
?>