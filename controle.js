window.addEventListener('load', () => {
    const botao = document.getElementById('play-button');

    botao.addEventListener('click', () => {
        botao.style.display = 'none'; // esconde o botão

    // Inicia os sons aqui, quando começar o sketch
        chuvaSom.loop();
        aviaoSom.play();

        loop(); // começa o draw do p5.js
    });
});


