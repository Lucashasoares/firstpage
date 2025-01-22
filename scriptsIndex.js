document.addEventListener('DOMContentLoaded', function () {
    
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
       

});

// testemunhos
const carouselContent = document.querySelector(".carousel-content");
const testimonials = document.querySelectorAll(".testimonial");
const totalTestimonials = testimonials.length;
let currentIndex = 0;

// Atualiza o carrossel para exibir o testemunho correto com animação deslizante
function updateTestimonial() {
    let offset = -currentIndex * 100; // Move 100% para cada testemunho
    carouselContent.style.transform = `translateX(${offset}%)`;
}

// Muda automaticamente a cada 5 segundos
const autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    updateTestimonial();
}, 5000);

// Botão para voltar ao testemunho anterior
document.getElementById("prevBtn").addEventListener("click", () => {
    clearInterval(autoSlide); // Para o auto-slide ao clicar
    currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonial();
});

// Botão para avançar ao próximo testemunho
document.getElementById("nextBtn").addEventListener("click", () => {
    clearInterval(autoSlide); // Para o auto-slide ao clicar
    currentIndex = (currentIndex + 1) % totalTestimonials;
    updateTestimonial();
});

// Inicializa o primeiro testemunho corretamente
updateTestimonial();

// testemunhos fim