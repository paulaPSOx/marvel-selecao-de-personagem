const personagens = document.querySelectorAll('.personagem'); 
const jogador1Imagem = document.getElementById('personagem-jogador-1');
const jogador1Nome = document.getElementById('nome-jogador-1');
const jogador2Imagem = document.getElementById('personagem-jogador-2');
const jogador2Nome = document.getElementById('nome-jogador-2');

const confirmarJogador1 = document.getElementById('confirmar-jogador-1');
const alterarJogador1 = document.getElementById('alterar-jogador-1');
const confirmarJogador2 = document.getElementById('confirmar-jogador-2');
const alterarJogador2 = document.getElementById('alterar-jogador-2');

let jogador1Selecionado = false;
let jogador2Selecionado = false;

let jogador1Personagem = null;
let jogador2Personagem = null;

function randomizarPersonagens() {
    let randomIndex1 = Math.floor(Math.random() * personagens.length);
    let randomIndex2 = Math.floor(Math.random() * personagens.length);

    while (randomIndex2 === randomIndex1) {
        randomIndex2 = Math.floor(Math.random() * personagens.length);
    }

    jogador1Personagem = personagens[randomIndex1];
    jogador2Personagem = personagens[randomIndex2];

    jogador1Imagem.src = `./src/imagens/${jogador1Personagem.id}.png`;
    jogador1Nome.innerText = jogador1Personagem.dataset.name;

    jogador2Imagem.src = `./src/imagens/${jogador2Personagem.id}.png`;
    jogador2Nome.innerText = jogador2Personagem.dataset.name;
}

function aplicarHover(personagem, jogadorImagem, jogadorNome, corClasse) {
    const personagemNome = personagem.dataset.name;
    jogadorImagem.src = `./src/imagens/${personagem.id}.png`;
    jogadorNome.innerText = personagemNome;
    personagem.classList.add(corClasse);
}

function removerBrilhoAntigo(jogadorPersonagem, corClasse) {
    if (jogadorPersonagem) {
        jogadorPersonagem.classList.remove(corClasse);
    }
}

personagens.forEach(personagem => {
    personagem.addEventListener('mouseover', () => {
        if (!jogador1Selecionado) {
            aplicarHover(personagem, jogador1Imagem, jogador1Nome, 'hover-azul');
        } else if (!jogador2Selecionado) {
            aplicarHover(personagem, jogador2Imagem, jogador2Nome, 'hover-vermelho');
        }
    });

    personagem.addEventListener('mouseout', () => {
        personagem.classList.remove('hover-azul', 'hover-vermelho');
    });

    personagem.addEventListener('click', () => {
        if (!jogador1Selecionado) {
            
            removerBrilhoAntigo(jogador1Personagem, 'c-glowing-blue');
            jogador1Personagem = personagem;
            jogador1Imagem.src = `./src/imagens/${personagem.id}.png`;
            jogador1Nome.innerText = personagem.dataset.name;
            jogador1Selecionado = true;
            confirmarJogador1.disabled = false;
            alterarJogador1.disabled = false;
            personagem.classList.add('c-glowing-blue');

            if (jogador2Selecionado) {
                aplicarIndisponibilidade();
            }
        } else if (!jogador2Selecionado && personagem !== jogador1Personagem) {
            
            removerBrilhoAntigo(jogador2Personagem, 'c-glowing-red');
            jogador2Personagem = personagem;
            jogador2Imagem.src = `./src/imagens/${personagem.id}.png`;
            jogador2Nome.innerText = personagem.dataset.name;
            jogador2Selecionado = true;
            confirmarJogador2.disabled = false;
            alterarJogador2.disabled = false;
            personagem.classList.add('c-glowing-red');

            if (jogador1Selecionado) {
                aplicarIndisponibilidade();
            }
        }
    });
});

function aplicarIndisponibilidade() {
    personagens.forEach(personagem => {
        if (personagem !== jogador1Personagem && personagem !== jogador2Personagem) {
            personagem.classList.add('indisponivel');
        } else {
            personagem.classList.remove('indisponivel');
        }
    });
}

function confirmarJogador(jogadorSelecionado, jogadorNome, confirmarBtn, alterarBtn, jogadorPersonagem) {
    if (jogadorSelecionado) {
        jogadorPersonagem.classList.add('hover-yellow');
        confirmarBtn.disabled = true;
        alterarBtn.disabled = true;
    }
}

function alterarJogador(jogadorPersonagem, corClasse, jogadorImagem, jogadorNome, confirmarBtn, outroJogadorPersonagem) {
    removerBrilhoAntigo(jogadorPersonagem, corClasse);
    jogadorPersonagem = null;
    jogadorNome.innerText = "";
    confirmarBtn.disabled = true;

    if (jogadorPersonagem) {
        jogadorImagem.src = `./src/imagens/${jogadorPersonagem.id}.png`;
        jogadorNome.innerText = jogadorPersonagem.dataset.name;
    }
    
    personagens.forEach(personagem => {
        if (personagem !== outroJogadorPersonagem) {
            personagem.classList.remove('indisponivel');
        }
    });
}

confirmarJogador1.addEventListener('click', () => {
    confirmarJogador(jogador1Selecionado, jogador1Nome, confirmarJogador1, alterarJogador1, jogador1Personagem);
});

confirmarJogador2.addEventListener('click', () => {
    confirmarJogador(jogador2Selecionado, jogador2Nome, confirmarJogador2, alterarJogador2, jogador2Personagem);
});

alterarJogador1.addEventListener('click', () => {
    alterarJogador(jogador1Personagem, 'c-glowing-blue', jogador1Imagem, jogador1Nome, confirmarJogador1, jogador2Personagem);
    jogador1Selecionado = false;
});

alterarJogador2.addEventListener('click', () => {
    alterarJogador(jogador2Personagem, 'c-glowing-red', jogador2Imagem, jogador2Nome, confirmarJogador2, jogador1Personagem);
    jogador2Selecionado = false;
});

randomizarPersonagens();