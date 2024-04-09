document.addEventListener('DOMContentLoaded', function () {
    // Valida Postal Code
    document.getElementById('postalcode').addEventListener('input', function (e) {
        var input = e.target;
        var formattedInput = input.value.toUpperCase(); // Converter todas as letras para maiúsculas

        if (formattedInput.length > 3 && formattedInput.charAt(3) !== ' ') {
            // Adicionar um espaço após o terceiro caractere, se ainda não houver
            formattedInput = formattedInput.slice(0, 3) + ' ' + formattedInput.slice(3);
        }

        if (formattedInput.length > 7 && formattedInput.charAt(7) !== ' ') {
            // Adicionar um espaço após o sétimo caractere, se ainda não houver
            formattedInput = formattedInput.slice(0, 7) + ' ' + formattedInput.slice(7);
        }

        // Remover qualquer caractere que não seja uma letra ou número
        formattedInput = formattedInput.replace(/[^A-Z0-9 ]/g, '');

        // Limitar a entrada a 9 caracteres
        formattedInput = formattedInput.slice(0, 7);

        input.value = formattedInput;
    });

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

    // Valida e Formata Número de Telefone Ralationship Participant
    document.getElementById('phoneRalationshipParticipant').addEventListener('input', function (e) {
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

    // Valida e Formata Número de Telefone
    document.getElementById('phone-form03-8').addEventListener('input', function (e) {
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

    // Mascara para o cartao de credito
    document.getElementById('creditCardInput').addEventListener('input', function (e) {
        var input = e.target;
        var trimmedValue = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, ''); // Remove espaços e caracteres não numéricos

        if (trimmedValue.length > 0) {
            // Aplica a máscara
            trimmedValue = trimmedValue.match(new RegExp('.{1,4}', 'g')).join(' ');
        }

        input.value = trimmedValue;
    });

    //Validar mês e ano de Cartão de crédito
    //...

    // Adicionar evento de clique ao botão "Back"
    const btnBack = document.getElementById('btnBack');
    btnBack.addEventListener('click', function () {
        window.location.href = 'index.html';
    });
    //Fim do código para o botão Back


});