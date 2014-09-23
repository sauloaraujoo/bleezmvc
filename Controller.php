<?php
function __autoload($className){
	include_once("models/$className.php");	
}

$users=new User("localhost","root","","banco_bleez");
$products=new Product("localhost","root","","banco_bleez");

if(!isset($_POST['action'])) {
	print json_encode(0);
	return;
}

switch($_POST['action']) {
	case 'get_users':
		print $users->getUsers();		
	break;
	
	case 'get_products':
		print $products->getProducts();
	break;
	
	case 'add_user':
		$user = new stdClass;
		$user = json_decode($_POST['user']);
		print $users->add($user);		
	break;
	
	case 'add_product':
		$product = new stdClass;
		$product = json_decode($_POST['product']);
		print $products->add($product);		
	break;
	
	case 'delete_user':
		$user = new stdClass;
		$user = json_decode($_POST['user']);
		print $users->delete($user);		
	break;
	
	case 'delete_product':
		$product = new stdClass;
		$product = json_decode($_POST['product']);
		print $products->delete($product);		
	break;
	
	case 'update_user_field_data':
		$user = new stdClass;
		$user = json_decode($_POST['user']);
		print $users->updateValue($user);				
	break;

	case 'update_product_field_data':
		$product = new stdClass;
		$product = json_decode($_POST['product']);
		print $products->updateValue($product);				
	break;
	
	case 'search_products':
		$product = new stdClass;
		$product = json_decode($_POST['product']);
		print $products->search($product);	
	break;
}

exit();