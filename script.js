let palavras =  [
    "abacaxi", "banana", "maçã", "laranja", "uva", "morango", "limão", "melancia", "manga", "pêssego",
    "pera", "kiwi", "abacate", "cereja", "figo", "amora", "melão", "framboesa", "caqui", "goiaba",
    "pitaya", "tamarindo", "mirtilo", "carambola", "jabuticaba", "acerola", "guarana", "graviola", "jaca", "caju",
    // Adicione mais frutas conforme necessário...
];
let palavra = palavras[Math.floor(Math.random() * palavras.length)];
let letrasUsuario = [];
let chances = palavra.length;
let ganhou = false;

function atualizarDisplayPalavra() {
    let display = '';
    for (let letra of palavra) {
        if (letrasUsuario.includes(letra.toLowerCase())) {
            display += letra.toUpperCase() + ' ';
        } else {
            display += '_ ';
        }
    }
    document.getElementById('word-display').textContent = display;
}

function atualizarDisplayChances() {
    let displayChances = (chances === 0) ? "Você não tem mais chances" : `Você tem ${chances} chance${chances !== 1 ? 's' : ''}`;
    document.getElementById('chances-display').textContent = displayChances;
}
function atualizarLetrasIncorretas() {
    let letrasIncorretas = letrasUsuario.filter(letra => !palavra.toLowerCase().includes(letra));
    document.getElementById('wrong-letters-display').textContent = letrasIncorretas.join(', ');
}

function makeGuess() {
    let tentativa = document.getElementById('guess-input').value.toLowerCase();
    letrasUsuario.push(tentativa);

    if (!palavra.toLowerCase().includes(tentativa)) {
        chances--;
    }

    ganhou = true;
    for (let letra of palavra) {
        if (!letrasUsuario.includes(letra.toLowerCase())) {
            ganhou = false;
            break;
        }
    }

    if (chances === 0 || ganhou) {
        endGame();
    } else {
        atualizarDisplayPalavra();
        atualizarDisplayChances();
        document.getElementById('guess-input').value = ''; // Limpa o campo de entrada
    }
}


function endGame() {
    atualizarDisplayPalavra();
    if (ganhou) {
        document.getElementById('result-display').textContent = 'Parabéns, você ganhou!';
    } else {
        document.getElementById('result-display').textContent = `Você perdeu! A palavra era: ${palavra}`;
    }
    document.getElementById('guess-input').setAttribute('disabled', 'disabled');
    document.getElementById('guess-button').setAttribute('disabled', 'disabled');
    document.getElementById('restart-button').style.display = 'block'; // Mostra o botão de reiniciar
}

function restartGame() {
    palavra = palavras[Math.floor(Math.random() * palavras.length)];
    letrasUsuario = [];
    chances = palavra.length;
    ganhou = false;
    atualizarDisplayPalavra();
    atualizarDisplayChances();
    document.getElementById('guess-input').value = ''; // Limpa o campo de entrada
    document.getElementById('result-display').textContent = ''; // Limpa o resultado
    document.getElementById('guess-input').removeAttribute('disabled'); // Habilita o campo de entrada
    document.getElementById('guess-button').removeAttribute('disabled'); // Habilita o botão de adivinhar
    document.getElementById('restart-button').style.display = 'none'; // Esconde o botão de reiniciar
}

// Adiciona evento de escuta para a tecla Enter
document.getElementById('guess-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        makeGuess();
    }
});

// Inicia o jogo
atualizarDisplayPalavra();
atualizarDisplayChances();
