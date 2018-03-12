<?php

	class ConexionBD 
	{
		// Connection data		
		protected $server = 'localhost';
		protected $port = '5432';
		protected $dbname = 'vendimia';
		protected $user = 'postgres';		
		protected $pass = 'sql';
		protected $connection = null;
		private static $instancia;
		
		protected $data = null;
		public function getData(){ return $this->data; }
		public function setData($data){ $this->data = $data; }

		protected $error = false;
		public function getError(){ return $this->error; }

		protected $errorTitle = null;
		public function getErrorTitle(){ return $this->errorTitle; }
		public function setErrorTitle($title){ $this->errorTitle = $title; }		

		protected $errorDetail = false;
		public function getErrorDetail(){ return $this->errorDetail; }
		public function setErrorDetail($isDetail){ $this->errorDetail = $isDetail; }	

		protected $snRaiseError = false;
		public function getSnRaiseError(){ return $this->snRaiseError; }
		public function setSnRaiseError($isDetail){ $this->snRaiseError = $isDetail; }

		protected $sql= "";
		public function getSQL(){ return $this->sql; }

		protected $transaction = false;

		public function begin(){
			$this->connect();
			// Break process if connection throw an error
			if ( $this->error ){ return false; }

			// Begin transaction to database, brek process if throws an error
			if( !$this->connection->beginTransaction() ){
				$this->error = "Error al iniciar la transacción con la base de datos";
				$this->errorDetail = "Error al iniciar la transacción con la base de datos";
				return false;
			}

			$this->transaction = true;
			return true;
		}

		public function commit(){
			if( !$this->connection->commit() ){
				$this->connection->rollback();
				$this->error = "Error al finalizar la transacción en la base de datos";
				$this->errorDetail = "Error al finalizar la transacción en la base de datos";
				return false;
			}

			// $this->connection->close();
			$this->transaction = false;
			return true;
		}

		private function connect(){
			// If transaction is active, return the current connection
			if( $this->transaction ) return $this->connection;

			$pdoStringCon = 'pgsql:host='.$this->server.';dbname='.$this->dbname;
			try{
				$this->connection = new PDO($pdoStringCon, $this->user, $this->pass);
				$error = isset($this->connection->connect_error);
				if( $error ){
					$this->error = "Error al intentar conectar con la base de datos";
					$this->errorDetail = $this->connection->connect_error;
				}
			} catch(PDOException $ex){
				$this->error = "Error al intentar conectar con la base de datos";
				$this->errorDetail = $ex->getMessage();
			}
		}

		public function execute( $fnc, $args, $fetch = true ){
			$this->error = false;

			$this->connect(); // Create connection

			if ( $this->error ){ return false; } // Return if error

			$argumentList = array(); // Create arguments list
			for($i = 1; $i <= count($args); $i++) {
				$argumentList[$i] = '?';
			}
			
			$this->sql = 'select * from ' . $fnc . ' (' . implode(',', $args) . ')';
			// $executor->query = $sql;
			
			try{
				$this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				// Prepare the call to DB
				$preparedCall = $this->connection->prepare( 'select * from ' . $fnc . ' (' . implode(',', $argumentList) . ')' );
				// Bind params to Store Procedure
				for ($i=0; $i < count($argumentList); $i++) { 
					$preparedCall->bindParam($i+1, $args[$i]);
				} // Execute Store Procedure
				$preparedCall->execute();
				if( $fetch ) {
					$this->data  = array();
					while( $obj = $preparedCall->fetchObject() ) {
						array_push($this->data, $obj);
					}
				}

			}
			catch(Exception $ex){
				if( $this->transaction )
					$this->connection->rollback();

				if($this->errorDetail)
				{
					$this->snRaiseError = true;

					if($ex->getCode() == 'P0001')
                    {   
                        $msg = stristr($ex->getMessage(), 'ERROR:');                        
                        $msg = substr($msg,6,strlen($msg));
                        $msg = substr($msg, 0, strpos($msg, "\n")); 
                    }
                    else
                    {
                        $msg = "Favor de intentar mas tarde";
                    }
					                    
					$this->error = $msg;
					$this->errorDetail = $ex->getMessage();
				}
				else
				{
					$this->snRaiseError = false;
					$this->error = "No se pudo completar la transacción en la base de datos ".$ex->getMessage();
					$this->errorDetail = $ex->getMessage();
				}
			}

			return true;
		}

		public function singleton()
		{
			if (empty(self::$instancia)) {
				self::$instancia = new ConexionBD();
			}
			return self::$instancia;
		}

		// Evita que el objeto se pueda clonar
		public function __clone()
		{
			trigger_error('Clone is not allowed.', E_USER_ERROR);
		}

		public function getExecute(){
			$result 			 = new stdClass;
			$result->error 		 = $this->error;
			$result->errorTitle  = $this->errorTitle;
			$result->errorDetail = $this->errorDetail;
			$result->snRaiseError = $this->snRaiseError;
			$result->data 		 = $this->data;
			return $result;
		}
	}
?>