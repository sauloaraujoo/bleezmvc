$(function() {
	$(document).on("click", "a#user_list", function(){ getUserList(this); });
	$(document).on("click", "a#product_list", function(){ getProductList(this); });	
	
	$(document).on("click", "a#create_user_form", function(){ getCreateFormUser(this); });	
	$(document).on("click", "a#create_product_form", function(){ getCreateFormProduct(this); });	
	
	$(document).on("click", "button#add_user", function(){ addUser(this); });
	$(document).on("click", "button#add_product", function(){ addProduct(this); });
	
	$(document).on("click", "a.delete_confirm_user", function(){ deleteConfirmationUser(this); });
	$(document).on("click", "a.delete_confirm_product", function(){ deleteConfirmationProduct(this); });
	
	$(document).on("click", "button.delete[tipo=user]", function(){ deleteUser(this); });
	$(document).on("click", "button.delete[tipo=product]", function(){ deleteProduct(this); });
	
	$(document).on("dblclick", "td.edit", function(){ makeEditable(this); });
	
	$(document).on("blur", "input#editboxUser", function(){ removeEditableUser(this) });
	$(document).on("blur", "input#editboxProduct", function(){ removeEditableProduct(this) });
	
	$(document).on("keyup", "input#search", function(){ searchProduct(this) });
	
    $(document).on("keydown", "input#quantity", function(){ return verificaNumero(this); });
	$(document).on("keydown", "input#value", function(){ return verificaNumero(this); });
	$(document).on("keydown", "input#value", function(){ return formataValor(this,28,event,2,'.',',');});
});

//só permite campo com números
function verificaNumero(e) {
	var key = event.which || event.keyCode || event.charCode;
       
   if(!((key >= 96 && key <= 105) || (key >= 48 && key <= 57) || key == 8 || key == 194)){
	   return false;
   }
}

//organiza campo quando for apagar valores, permanecendo em formato monetário
function LimpaValor(valor, validos, tammax) {
var result = "";
var aux;
for (var i=0; i < valor.length; i++) {
	aux = validos.indexOf(valor.substring(i, i+1));
	if (aux>=0) {
		if ( result.length < tammax - 1 ) {
			result += aux;
		}
	}
}
return result;
}

//formata números para ficar em formato monetário
function formataValor(campo,tammax,teclapres,decimal,ptmilhar,ptdecimal) {
var tecla = teclapres.keyCode;
	vr = LimpaValor(campo.value,"0123456789",tammax);
	tam = vr.length;
	dec = decimal;
	if (tam < tammax && tecla != 8){ tam = vr.length + 1 ; }
	if (tecla == 8 ) { tam = tam - 1 ; }
	if ( tecla == 8 || tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 ) {
		if ( tam <= dec ) { campo.value = vr ; }
		else if ( (tam > dec) && (tam <= dec + 3) ){
			campo.value = vr.substr( 0, tam - dec ) + ptdecimal + vr.substr( tam - dec, tam ) ; 
		} else if  ( (tam >= dec + 4) && (tam <= dec + 6) ){
			campo.value = vr.substr( 0, tam - 3 - dec ) + ptmilhar + vr.substr( tam - 3 - dec , 3 ) + ptdecimal + vr.substr( tam - dec , 12 ) ; 
		} else if  ( (tam >= dec + 7) && (tam <= dec + 9) ){
			campo.value = vr.substr( 0, tam - 6 - dec ) + ptmilhar + vr.substr( tam - 6 - dec , 3 ) + ptmilhar + vr.substr( tam - 3 - dec , 3 ) + ptdecimal + vr.substr( tam - dec , 12 ) ; 
		} else if  ( (tam >= dec + 10) && (tam <= dec + 12) ){
			campo.value = vr.substr( 0, tam - 9 - dec ) + ptmilhar + vr.substr( tam - 9 - dec , 3 ) + ptmilhar + vr.substr( tam - 6 - dec , 3 ) + ptmilhar + vr.substr( tam - 3 - dec , 3 ) + ptdecimal + vr.substr( tam - dec , 12 ) ; 
		} else if  ( (tam >= dec + 13) && (tam <= dec + 15) ){
			campo.value = vr.substr( 0, tam - 12 - dec ) + ptmilhar + vr.substr( tam - 12 - dec , 3 ) + ptmilhar + vr.substr( tam - 9 - dec , 3 ) + ptmilhar + vr.substr( tam - 6 - dec , 3 ) + ptmilhar + vr.substr( tam - 3 - dec , 3 ) + ptdecimal + vr.substr( tam - dec , 12 ) ; 
		} else if  ( (tam >= dec + 16) && (tam <= dec + 18) ){
			campo.value = vr.substr( 0, tam - 15 - dec ) + ptmilhar + vr.substr( tam - 15 - dec , 3 ) + ptmilhar + vr.substr( tam - 12 - dec , 3 ) + ptmilhar + vr.substr( tam - 9 - dec , 3 ) + ptmilhar + vr.substr( tam - 6 - dec , 3 ) + ptmilhar + vr.substr( tam - 3 - dec , 3 ) + ptdecimal + vr.substr( tam - dec , 12 ) ; 
		} else if  ( (tam >= dec + 19) && (tam <= dec + 21) ){
			campo.value = vr.substr( 0, tam - 18 - dec ) + ptmilhar + vr.substr( tam - 18 - dec , 3 ) + ptmilhar + vr.substr( tam - 15 - dec , 3 ) + ptmilhar + vr.substr( tam - 12 - dec , 3 ) + ptmilhar + vr.substr( tam - 9 - dec , 3 ) + ptmilhar + vr.substr( tam - 6 - dec , 3 ) + ptmilhar + vr.substr( tam - 3 - dec , 3 ) + ptdecimal + vr.substr( tam - dec , 12 ) ; 
		} else if  ( (tam >= dec + 22) && (tam <= dec + 24) ){
			campo.value = vr.substr( 0, tam - 21 - dec ) + ptmilhar + vr.substr( tam - 21 - dec , 3 ) + ptmilhar + vr.substr( tam - 18 - dec , 3 ) + ptmilhar + vr.substr( tam - 15 - dec , 3 ) + ptmilhar + vr.substr( tam - 12 - dec , 3 ) + ptmilhar + vr.substr( tam - 9 - dec , 3 ) + ptmilhar + vr.substr( tam - 6 - dec , 3 ) + ptmilhar + vr.substr( tam - 3 - dec , 3 ) + ptdecimal + vr.substr( tam - dec , 12 ) ; 
		} else {
			campo.value = vr.substr( 0, tam - 24 - dec ) + ptmilhar + vr.substr( tam - 24 - dec , 3 ) + ptmilhar + vr.substr( tam - 21 - dec , 3 ) + ptmilhar + vr.substr( tam - 18 - dec , 3 ) + ptmilhar + vr.substr( tam - 15 - dec , 3 ) + ptmilhar + vr.substr( tam - 12 - dec , 3 ) + ptmilhar + vr.substr( tam - 9 - dec , 3 ) + ptmilhar + vr.substr( tam - 6 - dec , 3 ) + ptmilhar + vr.substr( tam - 3 - dec , 3 ) + ptdecimal + vr.substr( tam - dec , 12 ) ; 
		}
	}
}

function removeEditableUser(element) { 
	
	$('#indicator').show();
	
	var User = new Object();
	User.id = $('.current').attr('user_id');		
	User.field = $('.current').attr('field');
	User.newvalue = $(element).val();
	
	var userJson = JSON.stringify(User);
	
	$.post('Controller.php',
		{
			action: 'update_user_field_data',			
			user: userJson
		},
		function(data, textStatus) {
			$('td.current').html($(element).val());
			$('.current').removeClass('current');
			$('#indicator').hide();			
		}, 
		"json"		
	);	
}

function removeEditableProduct(element) { 
	
	$('#indicator').show();
	
	var Product = new Object();
	Product.id = $('.current').attr('product_id');		
	Product.field = $('.current').attr('field');
	Product.newvalue = $(element).val();
	
	var productJson = JSON.stringify(Product);
	
	$.post('Controller.php',
		{
			action: 'update_product_field_data',			
			product: productJson
		},
		function(data, textStatus) {
			$('td.current').html($(element).val());
			$('.current').removeClass('current');
			$('#indicator').hide();			
		}, 
		"json"		
	);	
}

function makeEditable(element) { 
	var complementId = '';
	
	if($(element).attr('user_id') != null){
		complementId = "User";
	}
	else{
		complementId = "Product";
	}
	
	$(element).html('<input id="editbox'+ complementId +'" size="'+  $(element).text().length +'" type="text" value="'+ $(element).text() +'">');  
	$('#editbox').focus();
	$(element).addClass('current'); 
}

function deleteConfirmationUser(element) {	
	$("#delete_confirm_modal button:last").attr('tipo', 'user');
	$("#delete_confirm_modal").modal("show");
	$("#delete_confirm_modal input#productuser_id").val($(element).attr('user_id'));
}

function deleteConfirmationProduct(element) {	
	$("#delete_confirm_modal button:last").attr('tipo', 'product');
	$("#delete_confirm_modal").modal("show");
	$("#delete_confirm_modal input#productuser_id").val($(element).attr('product_id'));
}

function deleteUser(element) {	
	
	var User = new Object();
	User.id = $("#delete_confirm_modal input#productuser_id").val();
	
	var userJson = JSON.stringify(User);
	
	$.post('Controller.php',
		{
			action: 'delete_user',
			user: userJson
		},
		function(data, textStatus) {
			getUserList(element);
			$("#delete_confirm_modal").modal("hide");
		}, 
		"json"		
	);	
}

function deleteProduct(element) {	
	
	var Product = new Object();
	Product.id = $("#delete_confirm_modal input#productuser_id").val();
	
	var productJson = JSON.stringify(Product);
	
	$.post('Controller.php',
		{
			action: 'delete_product',
			product: productJson
		},
		function(data, textStatus) {
			getProductList(element);
			$("#delete_confirm_modal").modal("hide");
		}, 
		"json"		
	);	
}

function getUserList(element) {
	
	$('#indicator').show();
	
	$.post('Controller.php',
		{
			action: 'get_users'				
		},
		function(data, textStatus) {
			renderUserList(data);
			$('#indicator').hide();
		}, 
		"json"		
	);
}

function getProductList(element) {
	
	$('#indicator').show();
	
	$.post('Controller.php',
		{
			action: 'get_products'				
		},
		function(data, textStatus) {
			renderProductList(data);
			$('#indicator').hide();
		}, 
		"json"		
	);
}

function searchProduct(element){

	$('#indicator').show();
	
	var Product = new Object();
	Product.name = $(element).val();
	
	var productJson = JSON.stringify(Product);
	
	$.post('Controller.php',
		{
			action: 'search_products',
			product: productJson
		},
		function(data, textStatus) {
			searchProductList(data);
			$('#indicator').hide();
		}, 
		"json"		
	);
}

//mostra as lista de usuários cadastrados no sistema
function renderUserList(jsonData) {
	
	var table = '<table width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr><th scope="col">Nome</th><th scope="col">Email</th><th scope="col">Data de Nascimento</th><th scope="col"></th></tr></thead><tbody>';

	$.each( jsonData, function( index, user){     
		table += '<tr>';
		table += '<td class="edit" field="name" user_id="'+user.id+'">'+user.name+'</td>';
		table += '<td class="edit" field="email" user_id="'+user.id+'">'+user.email+'</td>';
		//table += '<td class="edit" field="password" user_id="'+user.id+'">'+user.password+'</td>';
		table += '<td class="edit" field="birthday" user_id="'+user.id+'">'+user.birthday+'</td>';
		table += '<td><a href="javascript:void(0);" user_id="'+user.id+'" class="delete_confirm_user btn btn-danger"><i class="icon-remove icon-white"></i></a></td>';
		table += '</tr>';
    });
	
	table += '</tbody></table>';
	
	$('div#content').html(table);
}

//mostra as lista de produtos cadastrados no sistema
function renderProductList(jsonData) {
	
	var search = '<b>Pesquisa:</b> <input type="text" id="search" value="" class="input-xlarge" />';
	var table = '<table width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr><th scope="col">Nome</th><th scope="col">Quantidade</th><th scope="col">Valor</th><th scope="col"></th></tr></thead><tbody>';

	$.each( jsonData, function( index, product){     
		table += '<tr>';
		table += '<td class="edit" field="name" product_id="'+product.id+'">'+product.name+'</td>';
		table += '<td class="edit" field="quantity" product_id="'+product.id+'">'+product.quantity+'</td>';
		table += '<td class="edit" field="value" product_id="'+product.id+'">'+product.value+'</td>';
		table += '<td><a href="javascript:void(1);" product_id="'+product.id+'" class="delete_confirm_product btn btn-danger"><i class="icon-remove icon-white"></i></a></td>';
		table += '</tr>';
    });
	
	table += '</tbody></table>';
	
	$('div#content').html(search + table);
}

function searchProductList(jsonData){
	var table = '<table width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr><th scope="col">Nome</th><th scope="col">Quantidade</th><th scope="col">Valor</th><th scope="col"></th></tr></thead><tbody>';

	$.each( jsonData, function( index, product){     
		table += '<tr>';
		table += '<td class="edit" field="name" product_id="'+product.id+'">'+product.name+'</td>';
		table += '<td class="edit" field="quantity" product_id="'+product.id+'">'+product.quantity+'</td>';
		table += '<td class="edit" field="value" product_id="'+product.id+'">'+product.value+'</td>';
		table += '<td><a href="javascript:void(1);" product_id="'+product.id+'" class="delete_confirm_product btn btn-danger"><i class="icon-remove icon-white"></i></a></td>';
		table += '</tr>';
    });
	
	table += '</tbody></table>';
	
	$('div#content table').html(table);
}

function addUser(element) {	
	
	$('#indicator').show();
	
	if(!validate()){
		$('#indicator').hide();
		return;
	}
	
	var User = new Object();
	User.name = $('input#name').val();
	User.email = $('input#email').val();
	User.password = $('input#password').val();
	User.birthday = $('input#birthday').val();
	
	var userJson = JSON.stringify(User);
	
	$.post('Controller.php',
		{
			action: 'add_user',
			user: userJson
		},
		function(data, textStatus) {
			getUserList(element);
			$('#indicator').hide();
		}, 
		"json"		
	);
}

function addProduct(element) {	
	
	$('#indicator').show();
	
	if(!validate()){
		$('#indicator').hide();
		return;
	}
	
	var Product = new Object();
	Product.name = $('input#name').val();
	Product.quantity = $('input#quantity').val();
	Product.value = $('input#value').val();
	
	var productJson = JSON.stringify(Product);
	
	$.post('Controller.php',
		{
			action: 'add_product',
			product: productJson
		},
		function(data, textStatus) {
			getProductList(element);
			$('#indicator').hide();
		}, 
		"json"		
	);
}

function validate(){
	var valid = true;
	var errors = "";
	
	$('#content input').each(function(){
		if($(this).val() == "" || ($(this).attr('name') == 'email' && !validateEmail($(this).val()))){
			valid = false;
			$(this).attr('style', 'border-color: red;');
			errors += $(this).attr('campo') + "\n";
		}
	});
	
	if(errors.length != 0){
		alert("Campo(s) Inválido(s): \n" + errors);
	}
	
	return valid;
}

function validateEmail(value){
    var atpos = value.indexOf("@");
    var dotpos = value.lastIndexOf(".");
	
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= value.length) {
        return false;
    }
	
	return true;
}

function getCreateFormUser(element) {
	var form = '<div class="input-prepend">';
		form +=	'<span class="add-on">Nome</span>';
		form +=	'<input type="text" id="name" name="name" campo="Nome" value="" class="input-xlarge" />';		
		form +=	'</div><br/><br/>';

		form +=	'<div class="input-prepend">';
		form +=	'<span class="add-on">E-mail</span>';
		form +=	'<input type="email" id="email" name="email" campo="Email" value="" class="input-xlarge" />';
		form +=	'</div><br/><br/>';
				
		form +=	'<div class="input-prepend">';
		form +=	'<span class="add-on">Senha</span>';
		form +=	'<input type="password" id="password" name="password" campo="Senha" value="" class="input-xlarge" />';
		form +=	'</div><br/><br/>';
				
		form +=	'<div class="input-prepend">';
		form +=	'<span class="add-on">Dt. Nascimento</span>';
		form +=	'<input type="date" id="birthday" name="birthday" campo="Aniversário" value="" class="input-xlarge" />';
		form +=	'</div><br/><br/>';

		form +=	'<div class="input-prepend">';
		form +=	'<div class="">';		
		form +=	'<button type="button" id="add_user" class="btn btn-primary"><i class="icon-ok icon-white"></i> Adicionar Usuário</button>';
		form +=	'</div>';
		form +=	'</div>';
		
		$('div#content').html(form);
}

function getCreateFormProduct(element) {
	var form = '<div class="input-prepend">';
		form +=	'<span class="add-on">Nome</span>';
		form +=	'<input type="text" id="name" name="name" campo="Nome" value="" class="input-xlarge" />';		
		form +=	'</div><br/><br/>';
				
		form +=	'<div class="input-prepend">';
		form +=	'<span class="add-on">Quantidade</span>';
		form +=	'<input type="text" id="quantity" name="quantity" campo="Quantidade" value="" class="input-xlarge"  />';
		form +=	'</div><br/><br/>';
				
		form +=	'<div class="input-prepend">';
		form +=	'<span class="add-on">Valor</span>';
		form +=	'<input type="text" id="value" name="value" size="40" campo="Valor" value="" class="input-xlarge" />';
		form +=	'</div><br/><br/>';

		form +=	'<div class="input-prepend">';
		form +=	'<div class="">';		
		form +=	'<button type="button" id="add_product" class="btn btn-primary"><i class="icon-ok icon-white"></i> Adicionar Produto</button>';
		form +=	'</div>';
		form +=	'</div>';
		
		$('div#content').html(form);
}