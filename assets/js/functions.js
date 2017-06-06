$( document ).ready(function() {

	// input-servico

	if ( $(".box-bullets-servicos") ) 
	{
		var servico = $("h1").html();
		$("#input-servico").val(servico);
	}


	$("img.lazy").lazyload({
	    effect : "fadeIn",
	    speed: 5
	});


	$(".telefone").mask("(99) 9999-9999?9");
    $(".telefone").blur(function(event) {
        if($(this).val().length == 15){
          $('.telefone').mask('(99) 99999-999?9');
        } else {
          $('.telefone').mask('(99) 9999-9999?9');
        }
    });


	$('#form-contato, #form-contato-servico').submit(function(event){
		
		// console.log($(this).attr("id"));
		event.preventDefault();
		var erro = false;


		$.each( $(this).find("input"), function( key, value ) {
			if ($(value).val().trim() == "")
				erro = true;

			if (erro)
		  		alert( "Preencha todos os campos" );
		});


		if (!erro)
		{
		    var dados = $(this).serializeArray();

		    $.ajax({
		        type: "POST",
		        url: "/send.php",
		        dataType: "json",
		        data: dados,
		        success: function(data)
		        {
		            if (data.sucesso) {
		            	alert("Mensagem enviada com sucesso, em breve retornaremos o contato.");
		            	$("input, textarea").val("");
		            	$('#modalAgendarVisita').modal('hide')
		            } else {
		            	alert("Desculpe, ocorreu um erro ao enviar a mensagem");
		            }
		        }
		    }).fail(function() {
		        alert("Desculpe, ocorreu um erro ao enviar a mensagem");
			});
		}
	    
	});

});