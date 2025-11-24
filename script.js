document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inicializa os ícones da biblioteca Lucide
    lucide.createIcons();

    // 2. Lógica da Animação de Scroll
    const revealElements = document.querySelectorAll('.reveal');

    function reveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 150; // Distância do topo para ativar a animação

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            } else {
                // Opcional: Remova o 'else' se quiser que a animação aconteça apenas uma vez
                // element.classList.remove('active'); 
            }
        });
    }

    // Adiciona o evento de scroll
    window.addEventListener('scroll', reveal);

    // Chama a função uma vez no carregamento para mostrar elementos já visíveis (ex: Hero)
    reveal();
});