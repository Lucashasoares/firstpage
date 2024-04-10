document.addEventListener('DOMContentLoaded', function () {
    
    // Valida e Formata Número de Telefone
    document.getElementById('phone').addEventListener('input', function (e) {
        var input = e.target;
        var value = input.value.replace(/\D/g, ''); // Remover todos os caracteres não numéricos
        var formattedValue = '';

        // Adicionar os primeiros 3 dígitos entre parênteses
        if (value.length > 0) {
            formattedValue += '(' + value.substring(0, 3);
        }
        // Adicionar os próximos 3 dígitos após o parêntese
        if (value.length > 3) {
            formattedValue += ') ' + value.substring(3, 6);
        }
        // Adicionar o hífen e os últimos 4 dígitos
        if (value.length > 6) {
            formattedValue += '-' + value.substring(6, 10);
        }

        input.value = formattedValue;
    });


    // Adicionar evento de clique ao botão "Back"
    const btnBack = document.getElementById('btnBack');
    btnBack.addEventListener('click', function () {
        window.location.href = 'index.html';
    });
    //Fim do código para o botão Back


});