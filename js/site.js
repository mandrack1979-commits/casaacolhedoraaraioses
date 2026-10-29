if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registrado com sucesso!', reg))
            .catch(err => console.log('Falha ao registrar Service Worker:', err));
    });
}

// Função simples para animação de entrada nos cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transition = 'opacity 0.5s ease-in-out ' + (index * 0.2) + 's';
        setTimeout(() => {
            card.style.opacity = '1';
        }, 100);
    });
});
