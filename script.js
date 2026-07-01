/* ==========================================================================
   INTERATIVIDADE DO SITE: CIDADANIA DIGITAL E IA
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Inicializa as funções do site
    gerenciarMenuAtivo();
    criarQuizInterativo();
});

/* ==========================================================================
   1. DESTAQUE AUTOMÁTICO DO MENU AO ROLAR A PÁGINA
   ========================================================================== */
function gerenciarMenuAtivo() {
    const secoes = document.querySelectorAll("section");
    const linksMenu = document.querySelectorAll(".navbar ul li a");

    window.addEventListener("scroll", () => {
        let secaoAtual = "";

        secoes.forEach((secao) => {
            const secaoTop = secao.offsetTop;
            const secaoHeight = secao.clientHeight;
            
            // Verifica se a rolagem da página está sobre a seção atual
            if (window.scrollY >= secaoTop - 150) {
                secaoAtual = secao.getAttribute("id");
            }
        });

        // Remove a classe ativa de todos e adiciona apenas na seção visível
        linksMenu.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${secaoAtual}`) {
                link.classList.add("active");
            }
        });
    });
}

/* ==========================================================================
   2. QUIZ INTERATIVO: DESAFIO DETETIVE DIGITAL
   ========================================================================== */
function criarQuizInterativo() {
    // Seleciona o container principal do HTML para injetar o quiz no final dele
    const containerPrincipal = document.querySelector(".content-container");
    
    if (!containerPrincipal) return;

    // Cria a estrutura da seção do Quiz
    const secaoQuiz = document.createElement("section");
    secaoQuiz.id = "quiz";
    secaoQuiz.className = "card-section";
    
    secaoQuiz.innerHTML = `
        <h2>Edição Especial: Desafio Detetive Digital 🕵️‍♂️</h2>
        <p>Será que você consegue diferenciar a realidade da manipulação por IA? Teste seus conhecimentos abaixo!</p>
        
        <div id="pergunta-container">
            <h3 id="quiz-pergunta" style="margin-bottom: 15px; color: var(--secondary-color);"></h3>
            <div id="quiz-opcoes" style="display: flex; flex-direction: column; gap: 10px;"></div>
        </div>
        
        <div id="quiz-resultado" style="margin-top: 20px; padding: 15px; border-radius: 8px; display: none;"></div>
    `;

    // Insere a nova seção antes do fechamento do container principal
    containerPrincipal.appendChild(secaoQuiz);

    // Dados das perguntas do Quiz
    const perguntas = [
        {
            pergunta: "1. Você recebeu um vídeo de um colega de classe dizendo algo absurdo, mas a voz parece um pouco robótica e ele quase não pisca os olhos. O que você faz?",
            opcoes: [
                "Compartilho imediatamente no grupo da sala para rir com todo mundo.",
                "Desconfio de que seja uma Deepfake, não compartilho e aviso a coordenação ou um professor.",
                "Acredito piamente, afinal, se está em vídeo, é porque é verdade."
            ],
            correta: 1,
            explicacao: "Muito bem! Voz robótica e ausência de piscadas de olhos são sinais clássicos de vídeos manipulados por inteligência artificial (Deepfakes)."
        },
        {
            pergunta: "2. Uma notícia com uma manchete bombástica e cheia de exclamações aparece nas suas redes sociais, mas nenhum grande portal de notícias está falando disso. O que isso significa?",
            opcoes: [
                "É uma notícia secreta que os grandes jornais estão tentando esconder.",
                "Provavelmente é uma Fake News gerada para atrair cliques (clickbait). Devo checar em sites de verificação.",
                "Posso compartilhar com meus amigos sem medo, já que o título é interessante."
            ],
            correta: 1,
            explicacao: "Exato! Títulos exagerados e falta de cobertura em fontes confiáveis são fortes indícios de notícias falsas automatizadas."
        },
        {
            pergunta: "3. Qual é a melhor forma de proteger a sua imagem contra o uso indevido por ferramentas de IA maliciosas?",
            opcoes: [
                "Não postar fotos públicas mostrando detalhes pessoais como a farda da escola, rotinas diárias ou documentos.",
                "Apagar a internet inteira e nunca mais usar redes sociais.",
                "Deixar o perfil totalmente público para que mais pessoas me conheçam."
            ],
            correta: 0,
            explicacao: "Perfeito! Limitar a exposição de dados pessoais e fotos públicas dificulta que pessoas mal-intencionadas usem seu rosto ou voz para treinar ferramentas de IA."
        }
    ];

    let perguntaAtualIndex = 0;

    function carregarPergunta() {
        const dadosPergunta = perguntas[perguntaAtualIndex];
        const elementoPergunta = document.getElementById("quiz-pergunta");
        const elementoOpcoes = document.getElementById("quiz-opcoes");
        const elementoResultado = document.getElementById("quiz-resultado");

        elementoResultado.style.display = "none";
        elementoOpcoes.innerHTML = "";
        
        elementoPergunta.innerText = dadosPergunta.pergunta;

        dadosPergunta.opcoes.forEach((opcao, index) => {
            const botao = document.createElement("button");
            botao.innerText = opacity = opcao;
            
            // Estilização básica dos botões via JS para manter o CSS limpo
            botao.style.padding = "12px";
            botao.style.border = "2px solid var(--secondary-color)";
            botao.style.borderRadius = "6px";
            botao.style.backgroundColor = "#fff";
            botao.style.cursor = "pointer";
            botao.style.textAlign = "left";
            botao.style.fontSize = "1rem";
            botao.style.transition = "all 0.2s ease";

            botao.onmouseenter = () => { botao.style.backgroundColor = "var(--light-accent)"; };
            botao.onmouseleave = () => { botao.style.backgroundColor = "#fff"; };

            botao.addEventListener("click", () => verificarResposta(index, dadosPergunta.correta, dadosPergunta.explicacao));
            elementoOpcoes.appendChild(botao);
        });
    }

    function verificarResposta(selecionada, correta, explicacao) {
        const elementoResultado = document.getElementById("quiz-resultado");
        const botoes = document.getElementById("quiz-opcoes").querySelectorAll("button");

        // Desabilita todos os botões após a escolha
        botoes.forEach(b => b.disabled = true);

        if (selecionada === correta) {
            elementoResultado.style.backgroundColor = "#e8f6f3";
            elementoResultado.style.borderLeft = "5px solid #27ae60";
            elementoResultado.style.color = "#1e8449";
            elementoResultado.innerHTML = `<strong>Acertou! 🎉</strong> <br> ${explicacao}`;
        } else {
            elementoResultado.style.backgroundColor = "#fdf2e9";
            elementoResultado.style.borderLeft = "5px solid var(--accent-color)";
            elementoResultado.style.color = "#c0392b";
            elementoResultado.innerHTML = `<strong>Ops, resposta incorreta! ❌</strong> <br> Lembre-se: ${explicacao}`;
        }

        elementoResultado.style.display = "block";

        // Cria botão para ir para a próxima pergunta ou reiniciar
        const botaoProxima = document.createElement("button");
        botaoProxima.style.marginTop = "15px";
        botaoProxima.style.padding = "10px 20px";
        botaoProxima.style.backgroundColor = "var(--primary-color)";
        botaoProxima.style.color = "#fff";
        botaoProxima.style.border = "none";
        botaoProxima.style.borderRadius = "4px";
        botaoProxima.style.cursor = "pointer";

        if (perguntaAtualIndex < perguntas.length - 1) {
            botaoProxima.innerText = "Próxima Pergunta ➡️";
            botaoProxima.addEventListener("click", () => {
                perguntaAtualIndex++;
                carregarPergunta();
            });
        } else {
            botaoProxima.innerText = "Reiniciar Desafio 🔄";
            botaoProxima.addEventListener("click", () => {
                perguntaAtualIndex = 0;
                carregarPergunta();
            });
        }
        
        elementoResultado.appendChild(botaoProxima);
    }

    // Inicia o quiz pela primeira vez
    carregarPergunta();
}
