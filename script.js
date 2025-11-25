// ==========================================
// 1. DADOS DO SISTEMA
// ==========================================

const MECHANISMS_DATA = [
  {
    id: 'natural-selection',
    title: 'Seleção Natural',
    description: 'Indivíduos mais adaptados sobrevivem.',
    iconName: 'filter',
    impact: 'decrease', // Reduz variabilidade
    detailedText: 'Atua como um "filtro". Em novos ambientes, seleciona características divergentes. Favorece o fenótipo ótimo, muitas vezes reduzindo a variação dentro de uma população.'
  },
  {
    id: 'mutation',
    title: 'Mutação',
    description: 'Alterações aleatórias no DNA.',
    iconName: 'dna',
    impact: 'increase', // Aumenta variabilidade
    detailedText: 'É a fonte primária de biodiversidade. Sem mutação, não haveria variação para a seleção natural atuar. Fornece a "matéria-prima" para novas adaptações.'
  },
  {
    id: 'genetic-drift',
    title: 'Deriva Genética',
    description: 'Mudanças aleatórias nas frequências.',
    iconName: 'shuffle',
    impact: 'variable', // Variável
    detailedText: 'Pode fixar ou eliminar características por puro acaso. Comum no efeito fundador (ilhas), acelerando a diferenciação genética inicial.'
  },
  {
    id: 'gene-flow',
    title: 'Fluxo Gênico',
    description: 'Transferência genética entre populações.',
    iconName: 'wind',
    impact: 'increase', // Aumenta variabilidade local
    detailedText: 'A migração introduz novos alelos. Geralmente homogeneíza populações, retardando a especiação, mas sua interrupção é gatilho para a divergência.'
  }
];

const QUIZ_QUESTIONS = [
  {
    question: "Qual a diferença entre radiação adaptativa e convergência?",
    options: [
      "A radiação parte de um ancestral comum; a convergência une linhagens distintas.",
      "A radiação reduz a biodiversidade; a convergência aumenta.",
      "A radiação ocorre apenas em ilhas.",
      "Não há diferença."
    ],
    correctAnswer: 0,
    explanation: "Radiação é divergência de um ancestral (ex: tentilhões). Convergência é semelhança entre distantes (ex: golfinho e tubarão)."
  },
  {
    question: "Qual mecanismo é a fonte primária de variabilidade genética?",
    options: ["Seleção Natural", "Deriva Genética", "Mutação", "Fluxo Gênico"],
    correctAnswer: 2,
    explanation: "A mutação cria novos alelos no DNA. Os outros mecanismos apenas reorganizam o que já existe."
  },
  {
    question: "O que são estruturas análogas?",
    options: [
      "Herdadas de um ancestral recente.",
      "Funções diferentes, mesma origem.",
      "Mesma função, origens diferentes.",
      "Estruturas sem função."
    ],
    correctAnswer: 2,
    explanation: "Análogas têm a mesma função (ex: voar) mas origens diferentes (inseto vs ave), fruto da convergência."
  },
  {
    question: "Onde a Deriva Genética tem maior impacto?",
    options: ["Grandes populações.", "Populações pequenas e isoladas.", "Onde há muito fluxo gênico.", "Sempre igual."],
    correctAnswer: 1,
    explanation: "Em grupos pequenos, o acaso pode eliminar genes bons ou fixar ruins muito mais facilmente."
  }
];

const REFERENCES_DATA = [
  {
    title: "Só Biologia - Evolução",
    author: "Grupo Virtuous",
    link: "https://www.sobiologia.com.br/conteudos/Evolucao/",
    type: "web"
  },
  {
    title: "Khan Academy - Evolução e a árvore da vida",
    author: "Khan Academy",
    link: "https://pt.khanacademy.org/science/biology/her",
    type: "web"
  },
  {
    title: "Brasil Escola - Evolução",
    author: "UOL",
    link: "https://brasilescola.uol.com.br/biologia/evolucao.htm",
    type: "web"
  },
  {
    title: "Toda Matéria - Evolução",
    author: "7Graus",
    link: "https://www.todamateria.com.br/evolucao/",
    type: "web"
  },
  {
    title: "Understanding Evolution",
    author: "University of California Museum of Paleontology",
    link: "https://evolution.berkeley.edu/",
    type: "web"
  }
];

// ==========================================
// 2. LÓGICA DA APLICAÇÃO
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializa ícones
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- Animação de Scroll (Reveal) ---
    const revealElements = document.querySelectorAll('.reveal');
    function reveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', reveal);
    reveal();

    // --- Mecanismos (Cards e Modal) ---
    const mechanismsGrid = document.getElementById('mechanisms-grid');
    const detailContainer = document.getElementById('mechanism-detail');
    const detailContent = document.getElementById('detail-content');
    const closeDetailBtn = document.getElementById('close-detail');

    if (mechanismsGrid) {
        MECHANISMS_DATA.forEach(mech => {
            const card = document.createElement('div');
            card.className = "bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-emerald-200 hover:shadow-lg transition cursor-pointer flex flex-col h-full";
            card.onclick = () => openMechanismDetail(mech);
            
            card.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <div class="p-3 rounded-xl bg-slate-50 text-emerald-600">
                        <i data-lucide="${mech.iconName}" class="w-6 h-6"></i>
                    </div>
                    <span class="text-[10px] uppercase font-bold text-slate-400">Impacto: ${translateImpact(mech.impact)}</span>
                </div>
                <h3 class="text-xl font-bold text-slate-800 mb-2">${mech.title}</h3>
                <p class="text-sm text-slate-500 flex-grow">${mech.description}</p>
                <div class="mt-4 pt-4 border-t border-slate-50 text-emerald-600 text-sm font-bold flex items-center gap-2">
                    Ver Detalhes <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
                </div>
            `;
            mechanismsGrid.appendChild(card);
        });
        // Re-inicializa ícones novos
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function translateImpact(impact) {
        if(impact === 'increase') return 'Aumenta';
        if(impact === 'decrease') return 'Reduz';
        return 'Variável';
    }

    function openMechanismDetail(mech) {
        detailContent.innerHTML = `
            <div class="flex flex-col md:flex-row gap-8">
                <div class="flex-shrink-0">
                    <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg mb-4">
                        <i data-lucide="${mech.iconName}" class="w-8 h-8"></i>
                    </div>
                </div>
                <div>
                    <h3 class="text-3xl font-bold mb-2">${mech.title}</h3>
                    <p class="text-xl text-slate-300 mb-6">${mech.description}</p>
                    <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                        <h4 class="text-sm font-semibold text-emerald-400 uppercase mb-2">Como funciona?</h4>
                        <p class="text-slate-200 leading-relaxed">${mech.detailedText}</p>
                    </div>
                </div>
            </div>
        `;
        
        detailContainer.classList.remove('hidden');
        detailContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    if(closeDetailBtn) {
        closeDetailBtn.onclick = () => detailContainer.classList.add('hidden');
    }

    // --- Quiz ---
    let currentQIndex = 0;
    let score = 0;
    let isAnswered = false;
    let selectedOptionIndex = null;

    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackArea = document.getElementById('feedback-area');
    const actionBtn = document.getElementById('quiz-action-btn');
    const progressBar = document.getElementById('progress-bar');

    if (quizContainer) {
        loadQuestion();

        actionBtn.onclick = () => {
            if (!isAnswered) {
                checkAnswer();
            } else {
                nextQuestion();
            }
        };

        const restartBtn = document.getElementById('restart-quiz');
        if(restartBtn) restartBtn.onclick = restartQuiz;
    }

    function loadQuestion() {
        const q = QUIZ_QUESTIONS[currentQIndex];
        questionText.textContent = `${currentQIndex + 1}. ${q.question}`;
        
        const progress = ((currentQIndex) / QUIZ_QUESTIONS.length) * 100;
        progressBar.style.width = `${progress}%`;

        optionsContainer.innerHTML = '';
        feedbackArea.classList.add('hidden');
        feedbackArea.className = "flex-1 text-sm p-3 rounded-lg hidden";
        
        actionBtn.textContent = "Verificar";
        actionBtn.disabled = true;
        actionBtn.classList.remove('bg-emerald-500');
        actionBtn.classList.add('bg-slate-900');
        
        isAnswered = false;
        selectedOptionIndex = null;

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = "w-full text-left p-4 rounded-xl border-2 border-slate-200 hover:bg-slate-50 transition font-medium text-slate-700";
            btn.textContent = opt;
            btn.onclick = () => selectOption(idx, btn);
            optionsContainer.appendChild(btn);
        });
    }

    function selectOption(idx, btnElement) {
        if (isAnswered) return;
        
        Array.from(optionsContainer.children).forEach(b => {
            b.classList.remove('border-emerald-500', 'bg-emerald-50', 'text-emerald-800', 'ring-1', 'ring-emerald-500');
            b.classList.add('border-slate-200');
        });

        selectedOptionIndex = idx;
        btnElement.classList.remove('border-slate-200');
        btnElement.classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-800', 'ring-1', 'ring-emerald-500');
        
        actionBtn.disabled = false;
    }

    function checkAnswer() {
        isAnswered = true;
        const q = QUIZ_QUESTIONS[currentQIndex];
        const isCorrect = selectedOptionIndex === q.correctAnswer;
        
        if (isCorrect) score++;

        Array.from(optionsContainer.children).forEach((btn, idx) => {
            btn.disabled = true;
            btn.classList.add('opacity-50');
            
            if (idx === q.correctAnswer) {
                btn.classList.remove('opacity-50', 'border-slate-200');
                btn.classList.add('bg-emerald-100', 'border-emerald-500', 'text-emerald-800');
                btn.innerHTML += ` <i data-lucide="check-circle" class="inline w-4 h-4 ml-2"></i>`;
            } else if (idx === selectedOptionIndex && !isCorrect) {
                btn.classList.remove('opacity-50', 'border-slate-200');
                btn.classList.add('bg-rose-100', 'border-rose-500', 'text-rose-800');
                btn.innerHTML += ` <i data-lucide="x-circle" class="inline w-4 h-4 ml-2"></i>`;
            }
        });

        feedbackArea.innerHTML = `<strong>${isCorrect ? 'Correto!' : 'Incorreto.'}</strong> ${q.explanation}`;
        feedbackArea.className = `flex-1 text-sm p-4 rounded-lg block ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}`;
        
        actionBtn.textContent = currentQIndex < QUIZ_QUESTIONS.length - 1 ? "Próxima" : "Ver Resultado";
        actionBtn.classList.remove('bg-slate-900');
        actionBtn.classList.add('bg-emerald-500');
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function nextQuestion() {
        if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
            currentQIndex++;
            loadQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        quizContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        resultContainer.classList.add('flex');
        document.getElementById('final-score').textContent = `${score}/${QUIZ_QUESTIONS.length}`;
    }

    function restartQuiz() {
        currentQIndex = 0;
        score = 0;
        resultContainer.classList.add('hidden');
        resultContainer.classList.remove('flex');
        quizContainer.classList.remove('hidden');
        loadQuestion();
    }

    // --- Referências ---
    const referencesGrid = document.getElementById('references-grid');

    if (referencesGrid) {
        REFERENCES_DATA.forEach(ref => {
            const isBook = ref.type === 'book';
            const iconName = isBook ? 'book' : 'globe';
            const iconColorClass = isBook ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600';
            
            const card = document.createElement('div');
            card.className = "bg-white p-5 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow";
            
            card.innerHTML = `
                <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconColorClass}">
                    <i data-lucide="${iconName}" class="w-5 h-5"></i>
                </div>
                
                <div class="flex-1">
                    <h4 class="font-bold text-slate-900 text-lg">${ref.title}</h4>
                    <p class="text-sm text-slate-600">${ref.author}</p>
                </div>

                ${ref.link ? `
                <a href="${ref.link}" target="_blank" rel="noopener noreferrer" 
                   class="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1 hover:underline">
                   Acessar Site <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                </a>
                ` : ''}
            `;
            
            referencesGrid.appendChild(card);
        });
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
});