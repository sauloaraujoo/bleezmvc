<?php

class Product {
	
	private $dbh;
	
	public function __construct($host,$product,$pass,$db)	{		
		$this->dbh = new PDO("mysql:host=".$host.";dbname=".$db,$product,$pass);		
	}

	public function getProducts(){				
		$sth = $this->dbh->prepare("SELECT * FROM products");
		$sth->execute();
		return json_encode($sth->fetchAll());
	}

	public function add($product){		
		$sth = $this->dbh->prepare("INSERT INTO products(name, quantity, value) VALUES (?, ?, ?)");
		$sth->execute(array($product->name, $product->quantity, $product->value));		
		return json_encode($this->dbh->lastInsertId());
	}
	
	public function delete($product){				
		$sth = $this->dbh->prepare("DELETE FROM products WHERE id=?");
		$sth->execute(array($product->id));
		return json_encode(1);
	}
	
	public function updateValue($product){		
		$sth = $this->dbh->prepare("UPDATE products SET ". $product->field ."=? WHERE id=?");
		$sth->execute(array($product->newvalue, $product->id));				
		return json_encode(1);	
	}
	
	public function search($product){
		$sth = $this->dbh->prepare("SELECT * FROM products WHERE name LIKE '%$product->name%'");
		$sth->execute();	
		return json_encode($sth->fetchAll());
	}
}
?>