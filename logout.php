<?php
	session_name("VendimiaSession");
	session_start();

	if (isset($_SESSION))
	{
		session_destroy();
		header('location: login.php');
	}
?>