$(function(){
    var myApp = new Framework7();

    var $$ = Dom7;

    var mainView = myApp.addView('.view-main', {
        dynamicNavbar: true
    });
    
    $.ajax({
        type: 'GET',
        url: 'http://localhost/XDK/quizz/analisar.php',
        dataType: 'json',
        data: 'acao=listar',
        success: function(data){
            $.each(data, function(i,val){
                var item = data[i];
                $('ul.quizz').append('<li data-id="'+item.id+'">'+item.titulo+'</li>');
            });
        }
    });
    
    $('body').on('click', '.resposta', function(){
        var tipo = $(this).attr('data-type');
        var cor  = (tipo == 0) ? '#F00' : '#090';
        var next = $(this).parent().next();
        var atual = $(this).parent();
        var indice = atual.index();
        var qtdP  = $('.pergunta').length;
        
        $(this).addClass('escolhido').css('background', cor).promise().done(function(){
            setTimeout(function(){
                if(indice == qtdP - 1){
                    var pontuacao = 0;
                    $('.escolhido').each(function(){
                        var type  = $(this).attr('data-type');
                        pontuacao = (type == 0) ? pontuacao - 1 : pontuacao + 1;
                    });
                    myApp.alert('Sua pontuação foi '+pontuacao,'Pontuação');
                }else{
                    atual.hide();
                    next.show();
                }
            }, 1500);
        });
    });
});