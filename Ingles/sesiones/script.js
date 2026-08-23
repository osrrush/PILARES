// ============================================
// SCRIPT.JS - VERSIÓN DEFINITIVA (sin undefined)
// ============================================

let currentExerciseIndex = 0;
let totalExercises = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let answeredQuestions = {};

// ===== FUNCIÓN PARA REVOLVER ARRAY (Fisher-Yates) =====
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ===== NORMALIZAR OPCIONES: asegurar que cada opción tenga { label, icon?, correct } =====
function normalizeOptions(options, correctValue) {
    return options.map((opt, index) => {
        // Si es string, convertir a objeto
        if (typeof opt === 'string') {
            return { label: opt, icon: '', correct: (opt === correctValue || index === correctValue) };
        }
        // Si es objeto pero no tiene label, intentar usar el valor directamente
        if (typeof opt === 'object' && opt !== null) {
            return {
                label: opt.label || opt.text || String(opt),
                icon: opt.icon || '',
                correct: opt.correct || false
            };
        }
        // Fallback
        return { label: String(opt), icon: '', correct: false };
    });
}

// ===== REVOLVER PREGUNTAS Y OPCIONES (versión robusta) =====
function shuffleExercise(exercise) {
    // Crear copia superficial del ejercicio
    const shuffled = { ...exercise };
    
    if (!shuffled.questions) return shuffled;
    
    // 1. Revolver preguntas
    shuffled.questions = shuffleArray(shuffled.questions);
    
    // 2. Procesar cada pregunta
    shuffled.questions = shuffled.questions.map(q => {
        const newQ = { ...q };
        
        if (!newQ.options) return newQ;
        
        // Normalizar opciones (convertir strings a objetos)
        let normalizedOptions = newQ.options.map(opt => {
            if (typeof opt === 'string') {
                return { label: opt, icon: '', correct: false };
            }
            if (typeof opt === 'object' && opt !== null) {
                return {
                    label: opt.label || opt.text || String(opt),
                    icon: opt.icon || '',
                    correct: opt.correct || false
                };
            }
            return { label: String(opt), icon: '', correct: false };
        });
        
        // Determinar cuál es la correcta (según el campo 'correct' original)
        // Buscar la opción que tenga correct: true
        let correctIndex = normalizedOptions.findIndex(opt => opt.correct === true);
        // Si no se encuentra, usar el campo 'correct' numérico o string de la pregunta
        if (correctIndex === -1 && typeof newQ.correct !== 'undefined') {
            if (typeof newQ.correct === 'number') {
                correctIndex = newQ.correct;
            } else if (typeof newQ.correct === 'string') {
                // Buscar por label
                correctIndex = normalizedOptions.findIndex(opt => opt.label === newQ.correct);
            }
        }
        // Si aún no se encuentra, tomar el primero (por defecto)
        if (correctIndex === -1 && normalizedOptions.length > 0) correctIndex = 0;
        
        // Marcar la correcta
        normalizedOptions = normalizedOptions.map((opt, idx) => ({
            ...opt,
            correct: idx === correctIndex
        }));
        
        // Revolver opciones
        const shuffledOptions = shuffleArray(normalizedOptions);
        
        // Actualizar correct en las opciones revueltas (ya están marcadas)
        newQ.options = shuffledOptions;
        // Guardar el índice de la correcta (opcional, no se usa)
        newQ.correct = shuffledOptions.findIndex(opt => opt.correct === true);
        
        return newQ;
    });
    
    return shuffled;
}

// ============================================
// INICIALIZACIÓN Y RENDERIZADO DE PALABRAS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    renderWords();
    totalExercises = sessionData.exercises.length;
    updateProgress();
});

function renderWords() {
    const grid = document.getElementById('wordGrid');
    grid.innerHTML = '';
    
    sessionData.words.forEach(word => {
        const card = document.createElement('div');
        card.className = 'word-card';
        card.innerHTML = `
            <span class="icon">${word.icon || ''}</span>
            <span class="english">${word.english}</span>
            <span class="spanish">${word.spanish}</span>
            <button class="sound-btn" onclick="speakWord('${word.english}')">🔊 Escuchar</button>
        `;
        grid.appendChild(card);
    });
}

// ============================================
// SINTETIZADOR DE VOZ
// ============================================

function speakWord(word) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.7;
        speechSynthesis.speak(utterance);
    }
}

function speakPhrase(phrase) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(phrase);
        utterance.lang = 'en-US';
        utterance.rate = 0.6;
        speechSynthesis.speak(utterance);
    }
}

// ============================================
// INICIAR EJERCICIOS
// ============================================

document.getElementById('startExerciseBtn').addEventListener('click', function() {
    document.getElementById('wordsSection').style.display = 'none';
    document.getElementById('exercisesSection').style.display = 'block';
    currentExerciseIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    answeredQuestions = {};
    loadExercise(currentExerciseIndex);
});

// ============================================
// CARGAR EJERCICIO
// ============================================

function loadExercise(index) {
    const exercises = sessionData.exercises;
    if (index >= exercises.length) {
        showResults();
        return;
    }

    const exercise = exercises[index];
    const container = document.getElementById('exerciseContainer');
    const counter = document.getElementById('exerciseCounter');
    
    counter.textContent = `Ejercicio ${index + 1} de ${exercises.length}`;
    
    document.getElementById('prevBtn').style.display = index === 0 ? 'none' : 'inline-block';
    document.getElementById('nextBtn').textContent = index === exercises.length - 1 ? '🎉 Ver resultados' : 'Siguiente ➡';
    
    // Revolver preguntas y opciones
    const shuffledExercise = shuffleExercise(exercise);
    
    // Renderizar según tipo
    switch(shuffledExercise.type) {
        case 'listenAndChoose':
            renderListenAndChoose(shuffledExercise);
            break;
        case 'chooseWord':
            renderChooseWord(shuffledExercise);
            break;
        case 'translatePhrase':
            renderTranslatePhrase(shuffledExercise);
            break;
        case 'storyChoose':
            renderStoryChoose(shuffledExercise);
            break;
        case 'matchWords':
            renderMatchWords(shuffledExercise); // No necesita shuffle
            break;
        case 'finalTest':
            renderFinalTest(shuffledExercise);
            break;
		case 'matchClick':
			renderMatchClick(shuffledExercise);
			break;
        default:
            container.innerHTML = '<p>Ejercicio no disponible</p>';
    }
    
    updateProgress();
}

// ============================================
// EJERCICIO 1: ESCUCHA Y ELIGE
// ============================================

function renderListenAndChoose(exercise) {
    const container = document.getElementById('exerciseContainer');
    let html = `
        <div class="exercise-header">
            <div class="exercise-title">${exercise.title}</div>
            <div class="exercise-instructions">${exercise.instructions}</div>
        </div>
        <div class="exercise-content">
    `;
    
    exercise.questions.forEach((q, qIndex) => {
        html += `
            <div class="question" id="q-${qIndex}">
                <div class="question-audio">
                    🔊 <span class="speaker-icon" onclick="speakWord('${q.audio}')">Escuchar: "${q.audio}"</span>
                </div>
                <div class="options-grid">
        `;
        
        q.options.forEach((opt, oIndex) => {
            // opt ya es objeto con label, icon, correct
            html += `
                <button class="option-btn" onclick="checkListenAndChoose(${qIndex}, ${oIndex})" 
                        data-correct="${opt.correct}">
                    <span class="option-icon">${opt.icon || ''}</span>
                    ${opt.label}
                </button>
            `;
        });
        
        html += `
                </div>
                <div id="feedback-${qIndex}"></div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function checkListenAndChoose(qIndex, oIndex) {
    const questionDiv = document.getElementById(`q-${qIndex}`);
    const buttons = questionDiv.querySelectorAll('.option-btn');
    const selectedButton = buttons[oIndex];
    const correct = selectedButton.dataset.correct === 'true';
    
    const key = `${currentExerciseIndex}-${qIndex}`;
    if (answeredQuestions[key] !== undefined) return;
    
    answeredQuestions[key] = correct;
    if (correct) correctAnswers++;
    else wrongAnswers++;
    
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        const isCorrect = btn.dataset.correct === 'true';
        if (isCorrect) {
            btn.classList.add('show-correct');
        } else if (idx === oIndex && !correct) {
            btn.classList.add('show-wrong');
        }
    });
    
    const feedback = document.getElementById(`feedback-${qIndex}`);
    const correctLabel = Array.from(buttons).find(b => b.dataset.correct === 'true')?.textContent || 'N/A';
    feedback.innerHTML = `
        <div class="feedback-text ${correct ? 'correct' : 'incorrect'}">
            ${correct ? '✅ ¡Correcto!' : '❌ La respuesta correcta era: ' + correctLabel}
        </div>
    `;
    
    updateProgress();
}

// ============================================
// EJERCICIO 2: ELEGIR PALABRA
// ============================================

function renderChooseWord(exercise) {
    const container = document.getElementById('exerciseContainer');
    let html = `
        <div class="exercise-header">
            <div class="exercise-title">${exercise.title}</div>
            <div class="exercise-instructions">${exercise.instructions}</div>
        </div>
        <div class="exercise-content">
    `;
    
    exercise.questions.forEach((q, qIndex) => {
        html += `
            <div class="question" id="q-${qIndex}">
                <div class="question-audio">
                    🔊 <span class="speaker-icon" onclick="speakWord('${q.audio}')">Escuchar: "${q.audio}"</span>
                </div>
                <div class="options-grid">
        `;
        
        q.options.forEach((opt, oIndex) => {
            // opt ya es objeto con label, correct
            html += `
                <button class="option-btn" onclick="checkChooseWord(${qIndex}, ${oIndex})" 
                        data-correct="${opt.correct}">
                    ${opt.label}
                </button>
            `;
        });
        
        html += `
                </div>
                <div id="feedback-${qIndex}"></div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function checkChooseWord(qIndex, oIndex) {
    const questionDiv = document.getElementById(`q-${qIndex}`);
    const buttons = questionDiv.querySelectorAll('.option-btn');
    const selectedButton = buttons[oIndex];
    const correct = selectedButton.dataset.correct === 'true';
    
    const key = `${currentExerciseIndex}-${qIndex}`;
    if (answeredQuestions[key] !== undefined) return;
    
    answeredQuestions[key] = correct;
    if (correct) correctAnswers++;
    else wrongAnswers++;
    
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        const isCorrect = btn.dataset.correct === 'true';
        if (isCorrect) {
            btn.classList.add('show-correct');
        } else if (idx === oIndex && !correct) {
            btn.classList.add('show-wrong');
        }
    });
    
    const feedback = document.getElementById(`feedback-${qIndex}`);
    const correctLabel = Array.from(buttons).find(b => b.dataset.correct === 'true')?.textContent || 'N/A';
    feedback.innerHTML = `
        <div class="feedback-text ${correct ? 'correct' : 'incorrect'}">
            ${correct ? '✅ ¡Correcto!' : '❌ La respuesta correcta era: "' + correctLabel + '"'}
        </div>
    `;
    
    updateProgress();
}

// ============================================
// EJERCICIO 3: TRADUCIR FRASE
// ============================================

function renderTranslatePhrase(exercise) {
    const container = document.getElementById('exerciseContainer');
    let html = `
        <div class="exercise-header">
            <div class="exercise-title">${exercise.title}</div>
            <div class="exercise-instructions">${exercise.instructions}</div>
        </div>
        <div class="exercise-content">
    `;
    
    exercise.questions.forEach((q, qIndex) => {
        html += `
            <div class="question" id="q-${qIndex}">
                <div class="question-audio">
                    🔊 <span class="speaker-icon" onclick="speakPhrase('${q.audio}')">Escuchar: "${q.audio}"</span>
                </div>
                <div class="options-grid">
        `;
        
        q.options.forEach((opt, oIndex) => {
            // opt ya es objeto con label, correct
            html += `
                <button class="option-btn" onclick="checkTranslatePhrase(${qIndex}, ${oIndex})" 
                        data-correct="${opt.correct}">
                    ${opt.label}
                </button>
            `;
        });
        
        html += `
                </div>
                <div id="feedback-${qIndex}"></div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function checkTranslatePhrase(qIndex, oIndex) {
    const questionDiv = document.getElementById(`q-${qIndex}`);
    const buttons = questionDiv.querySelectorAll('.option-btn');
    const selectedButton = buttons[oIndex];
    const correct = selectedButton.dataset.correct === 'true';
    
    const key = `${currentExerciseIndex}-${qIndex}`;
    if (answeredQuestions[key] !== undefined) return;
    
    answeredQuestions[key] = correct;
    if (correct) correctAnswers++;
    else wrongAnswers++;
    
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        const isCorrect = btn.dataset.correct === 'true';
        if (isCorrect) {
            btn.classList.add('show-correct');
        } else if (idx === oIndex && !correct) {
            btn.classList.add('show-wrong');
        }
    });
    
    const feedback = document.getElementById(`feedback-${qIndex}`);
    const correctLabel = Array.from(buttons).find(b => b.dataset.correct === 'true')?.textContent || 'N/A';
    feedback.innerHTML = `
        <div class="feedback-text ${correct ? 'correct' : 'incorrect'}">
            ${correct ? '✅ ¡Correcto!' : '❌ La respuesta correcta era: "' + correctLabel + '"'}
        </div>
    `;
    
    updateProgress();
}

// ============================================
// EJERCICIO 4: HISTORIA VISUAL
// ============================================

function renderStoryChoose(exercise) {
    const container = document.getElementById('exerciseContainer');
    let html = `
        <div class="exercise-header">
            <div class="exercise-title">${exercise.title}</div>
            <div class="exercise-instructions">${exercise.instructions}</div>
        </div>
        <div class="exercise-content">
    `;
    
    exercise.questions.forEach((q, qIndex) => {
        html += `
            <div class="question" id="q-${qIndex}">
                <div style="font-size: 3rem; text-align: center; padding: 10px;">${q.image || '🖼️'}</div>
                <div style="text-align: center; color: #4a5568; margin-bottom: 12px;">${q.description || ''}</div>
                <div class="options-grid">
        `;
        
        q.options.forEach((opt, oIndex) => {
            html += `
                <button class="option-btn" onclick="checkStoryChoose(${qIndex}, ${oIndex})" 
                        data-correct="${opt.correct}">
                    ${opt.label}
                </button>
            `;
        });
        
        html += `
                </div>
                <div id="feedback-${qIndex}"></div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function checkStoryChoose(qIndex, oIndex) {
    const questionDiv = document.getElementById(`q-${qIndex}`);
    const buttons = questionDiv.querySelectorAll('.option-btn');
    const selectedButton = buttons[oIndex];
    const correct = selectedButton.dataset.correct === 'true';
    
    const key = `${currentExerciseIndex}-${qIndex}`;
    if (answeredQuestions[key] !== undefined) return;
    
    answeredQuestions[key] = correct;
    if (correct) correctAnswers++;
    else wrongAnswers++;
    
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        const isCorrect = btn.dataset.correct === 'true';
        if (isCorrect) {
            btn.classList.add('show-correct');
        } else if (idx === oIndex && !correct) {
            btn.classList.add('show-wrong');
        }
    });
    
    const feedback = document.getElementById(`feedback-${qIndex}`);
    const correctLabel = Array.from(buttons).find(b => b.dataset.correct === 'true')?.textContent || 'N/A';
    feedback.innerHTML = `
        <div class="feedback-text ${correct ? 'correct' : 'incorrect'}">
            ${correct ? '✅ ¡Correcto!' : '❌ La respuesta correcta era: "' + correctLabel + '"'}
        </div>
    `;
    
    updateProgress();
}

// ============================================
// EJERCICIO 5 (NUEVO): RELACIONAR POR CLIC
// ============================================

// Variables de estado para este ejercicio
let matchClickState = {
    selectedLeft: null, // id del elemento izquierdo seleccionado
    selectedRight: null,
    pairsMatched: [], // ids ya emparejados
    leftItems: [],
    rightItems: []
};

function renderMatchClick(exercise) {
    const container = document.getElementById('exerciseContainer');
    
    // Revolver pares y crear listas izquierda y derecha
    const shuffledPairs = shuffleArray([...exercise.pairs]);
    const leftItems = shuffledPairs.map(p => ({ id: p.id, label: p.english }));
    const rightItems = shuffleArray(shuffledPairs.map(p => ({ id: p.id, label: p.spanish })));
    
    // Guardar estado para este ejercicio
    matchClickState = {
        selectedLeft: null,
        selectedRight: null,
        pairsMatched: [],
        leftItems: leftItems,
        rightItems: rightItems
    };
    
    let html = `
        <div class="exercise-header">
            <div class="exercise-title">${exercise.title}</div>
            <div class="exercise-instructions">${exercise.instructions}</div>
        </div>
        <div class="exercise-content">
            <div style="display: flex; gap: 40px; justify-content: center; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 200px;">
                    <h3 style="text-align: center; color: #2b6cb0;">🔤 Inglés</h3>
                    <div id="matchLeftColumn">
    `;
    
    leftItems.forEach(item => {
        html += `
            <div class="match-item left-item" data-id="${item.id}" onclick="selectMatchLeft(${item.id})">
                ${item.label}
            </div>
        `;
    });
    
    html += `
                </div>
                <div style="flex: 1; min-width: 200px;">
                    <h3 style="text-align: center; color: #2b6cb0;">🇪🇸 Español</h3>
                    <div id="matchRightColumn">
    `;
    
    rightItems.forEach(item => {
        html += `
            <div class="match-item right-item" data-id="${item.id}" onclick="selectMatchRight(${item.id})">
                ${item.label}
            </div>
        `;
    });
    
    html += `
                </div>
            </div>
            <div id="matchFeedback" style="margin-top: 20px; text-align: center;"></div>
            <div id="matchProgress" style="text-align: center; margin-top: 10px; color: #4a5568;">
                Emparejados: <span id="matchCount">0</span> / ${exercise.pairs.length}
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // Añadir estilos para los elementos de match
    const style = document.createElement('style');
    style.textContent = `
        .match-item {
            padding: 12px 20px;
            margin: 8px 0;
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            cursor: pointer;
            text-align: center;
            font-size: 1.1rem;
            transition: all 0.2s;
            user-select: none;
        }
        .match-item:hover {
            border-color: #4299e1;
            background: #ebf8ff;
        }
        .match-item.selected {
            border-color: #4299e1;
            background: #bee3f8;
            box-shadow: 0 0 0 3px #4299e1;
        }
        .match-item.matched {
            border-color: #48bb78;
            background: #c6f6d5;
            cursor: default;
            opacity: 0.7;
        }
        .match-item.matched:hover {
            border-color: #48bb78;
            background: #c6f6d5;
        }
        .match-item.wrong {
            border-color: #fc8181;
            background: #fed7d7;
        }
    `;
    document.head.appendChild(style);
}

// ===== SELECCIÓN IZQUIERDA =====
function selectMatchLeft(id) {
    // Si ya está emparejado, ignorar
    if (matchClickState.pairsMatched.includes(id)) return;
    
    // Si ya hay un elemento izquierdo seleccionado, deseleccionarlo
    if (matchClickState.selectedLeft !== null) {
        const prevLeft = document.querySelector(`.left-item[data-id="${matchClickState.selectedLeft}"]`);
        if (prevLeft) prevLeft.classList.remove('selected');
    }
    
    matchClickState.selectedLeft = id;
    const leftEl = document.querySelector(`.left-item[data-id="${id}"]`);
    if (leftEl) leftEl.classList.add('selected');
    
    // Intentar emparejar si ya hay selección derecha
    if (matchClickState.selectedRight !== null) {
        attemptMatch();
    }
}

// ===== SELECCIÓN DERECHA =====
function selectMatchRight(id) {
    if (matchClickState.pairsMatched.includes(id)) return;
    
    if (matchClickState.selectedRight !== null) {
        const prevRight = document.querySelector(`.right-item[data-id="${matchClickState.selectedRight}"]`);
        if (prevRight) prevRight.classList.remove('selected');
    }
    
    matchClickState.selectedRight = id;
    const rightEl = document.querySelector(`.right-item[data-id="${id}"]`);
    if (rightEl) rightEl.classList.add('selected');
    
    if (matchClickState.selectedLeft !== null) {
        attemptMatch();
    }
}

// ===== INTENTAR EMPAREJAR =====
function attemptMatch() {
    const leftId = matchClickState.selectedLeft;
    const rightId = matchClickState.selectedRight;
    
    // Verificar si ya están emparejados (por si acaso)
    if (matchClickState.pairsMatched.includes(leftId) || matchClickState.pairsMatched.includes(rightId)) {
        clearSelection();
        return;
    }
    
    const isMatch = (leftId === rightId);
    
    const leftEl = document.querySelector(`.left-item[data-id="${leftId}"]`);
    const rightEl = document.querySelector(`.right-item[data-id="${rightId}"]`);
    
    if (isMatch) {
        // ✅ Emparejamiento correcto
        matchClickState.pairsMatched.push(leftId);
        leftEl.classList.remove('selected');
        rightEl.classList.remove('selected');
        leftEl.classList.add('matched');
        rightEl.classList.add('matched');
        
        // Guardar respuesta correcta
        const key = `${currentExerciseIndex}-${leftId}`;
        answeredQuestions[key] = true;
        correctAnswers++;
        
        // Feedback positivo
        document.getElementById('matchFeedback').innerHTML = `
            <div class="feedback-text correct">✅ ¡Correcto! "${leftEl.textContent}" = "${rightEl.textContent}"</div>
        `;
        
        // Actualizar contador
        document.getElementById('matchCount').textContent = matchClickState.pairsMatched.length;
        
        // Limpiar selección
        matchClickState.selectedLeft = null;
        matchClickState.selectedRight = null;
        
        // Verificar si ya completó todos
        if (matchClickState.pairsMatched.length === Object.keys(matchClickState.leftItems).length) {
            document.getElementById('matchFeedback').innerHTML = `
                <div class="feedback-text correct" style="font-size: 1.2rem;">🎉 ¡Has emparejado todas las palabras!</div>
            `;
        }
        
    } else {
        // ❌ Emparejamiento incorrecto
        leftEl.classList.add('wrong');
        rightEl.classList.add('wrong');
        
        // Guardar respuesta incorrecta
        const key = `${currentExerciseIndex}-${leftId}`;
        if (answeredQuestions[key] === undefined) {
            answeredQuestions[key] = false;
            wrongAnswers++;
        }
        
        document.getElementById('matchFeedback').innerHTML = `
            <div class="feedback-text incorrect">❌ Intenta de nuevo. Esas palabras no coinciden.</div>
        `;
        
        // Quitar clase wrong después de 1 segundo
        setTimeout(() => {
            leftEl.classList.remove('wrong');
            rightEl.classList.remove('wrong');
            clearSelection();
        }, 1000);
    }
    
    updateProgress();
}

// ===== LIMPIAR SELECCIÓN =====
function clearSelection() {
    if (matchClickState.selectedLeft !== null) {
        const leftEl = document.querySelector(`.left-item[data-id="${matchClickState.selectedLeft}"]`);
        if (leftEl) leftEl.classList.remove('selected');
        matchClickState.selectedLeft = null;
    }
    if (matchClickState.selectedRight !== null) {
        const rightEl = document.querySelector(`.right-item[data-id="${matchClickState.selectedRight}"]`);
        if (rightEl) rightEl.classList.remove('selected');
        matchClickState.selectedRight = null;
    }
}

// ============================================
// EJERCICIO 6: PRUEBA FINAL
// ============================================

function renderFinalTest(exercise) {
    const container = document.getElementById('exerciseContainer');
    let html = `
        <div class="exercise-header">
            <div class="exercise-title">${exercise.title}</div>
            <div class="exercise-instructions">${exercise.instructions}</div>
        </div>
        <div class="exercise-content">
    `;
    
    exercise.questions.forEach((q, qIndex) => {
        html += `
            <div class="question" id="q-${qIndex}">
                <div style="font-weight: 500; margin-bottom: 12px;">${q.question}</div>
                <div class="options-grid">
        `;
        
        q.options.forEach((opt, oIndex) => {
            html += `
                <button class="option-btn" onclick="checkFinalTest(${qIndex}, ${oIndex})" 
                        data-correct="${opt.correct}">
                    ${opt.label}
                </button>
            `;
        });
        
        html += `
                </div>
                <div id="feedback-${qIndex}"></div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function checkFinalTest(qIndex, oIndex) {
    const questionDiv = document.getElementById(`q-${qIndex}`);
    const buttons = questionDiv.querySelectorAll('.option-btn');
    const selectedButton = buttons[oIndex];
    const correct = selectedButton.dataset.correct === 'true';
    
    const key = `${currentExerciseIndex}-${qIndex}`;
    if (answeredQuestions[key] !== undefined) return;
    
    answeredQuestions[key] = correct;
    if (correct) correctAnswers++;
    else wrongAnswers++;
    
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        const isCorrect = btn.dataset.correct === 'true';
        if (isCorrect) {
            btn.classList.add('show-correct');
        } else if (idx === oIndex && !correct) {
            btn.classList.add('show-wrong');
        }
    });
    
    const feedback = document.getElementById(`feedback-${qIndex}`);
    const correctLabel = Array.from(buttons).find(b => b.dataset.correct === 'true')?.textContent || 'N/A';
    feedback.innerHTML = `
        <div class="feedback-text ${correct ? 'correct' : 'incorrect'}">
            ${correct ? '✅ ¡Correcto!' : '❌ La respuesta correcta era: "' + correctLabel + '"'}
        </div>
    `;
    
    updateProgress();
}

// ============================================
// FEEDBACK PARA PREGUNTAS SIN RESPONDER
// ============================================

function showUnansweredFeedback(questionIndex) {
    const feedbackDiv = document.getElementById(`feedback-${questionIndex}`);
    if (feedbackDiv) {
        feedbackDiv.innerHTML = `
            <div class="feedback-text incorrect">
                ⏭️ No respondiste a tiempo. Esta pregunta cuenta como incorrecta.
            </div>
        `;
    }
    
    const matchFeedback = document.getElementById(`feedback-match-${questionIndex}`);
    if (matchFeedback) {
        matchFeedback.innerHTML = `
            <div class="feedback-text incorrect">
                ⏭️ No respondiste a tiempo. Esta pregunta cuenta como incorrecta.
            </div>
        `;
        const input = document.getElementById(`match-${questionIndex}`);
        if (input) input.disabled = true;
    }
}

// ============================================
// NAVEGACIÓN
// ============================================

document.getElementById('nextBtn').addEventListener('click', function() {
    const exercises = sessionData.exercises;
    const currentExercise = exercises[currentExerciseIndex];
    
    let allAnswered = true;
    let unansweredCount = 0;
    
    if (currentExercise.type === 'matchWords' || currentExercise.type === 'matchClick') {
		// Para matchClick, verificamos que todos los pares estén emparejados
		const totalPairs = currentExercise.pairs.length;
		let matchedCount = 0;
		for (let i = 0; i < totalPairs; i++) {
			const pair = currentExercise.pairs[i];
			const key = `${currentExerciseIndex}-${pair.id}`;
			if (answeredQuestions[key] !== undefined) {
				matchedCount++;
			}
		}
		if (matchedCount < totalPairs) {
			allAnswered = false;
			unansweredCount = totalPairs - matchedCount;
		}
	} else if (currentExercise.questions) {
        const totalQuestions = currentExercise.questions.length;
        for (let i = 0; i < totalQuestions; i++) {
            const key = `${currentExerciseIndex}-${i}`;
            if (answeredQuestions[key] === undefined) {
                allAnswered = false;
                unansweredCount++;
            }
        }
    }
    
    if (!allAnswered) {
        const confirmContinue = confirm(
            `⚠️ Te faltan ${unansweredCount} pregunta(s) por responder en este ejercicio.\n\n` +
            `¿Quieres continuar de todas formas?\n` +
            `(Las preguntas sin responder contarán como incorrectas)`
        );
        
        if (!confirmContinue) return;
        
        if (currentExercise.type === 'matchWords') {
            const totalWords = currentExercise.words.length;
            for (let i = 0; i < totalWords; i++) {
                const key = `${currentExerciseIndex}-${i}`;
                if (answeredQuestions[key] === undefined) {
                    answeredQuestions[key] = false;
                    wrongAnswers++;
                    showUnansweredFeedback(i);
                }
            }
        } else if (currentExercise.questions) {
            const totalQuestions = currentExercise.questions.length;
            for (let i = 0; i < totalQuestions; i++) {
                const key = `${currentExerciseIndex}-${i}`;
                if (answeredQuestions[key] === undefined) {
                    answeredQuestions[key] = false;
                    wrongAnswers++;
                    showUnansweredFeedback(i);
                }
            }
        }
        
        updateProgress();
    }
    
    currentExerciseIndex++;
    if (currentExerciseIndex >= exercises.length) {
        showResults();
    } else {
        loadExercise(currentExerciseIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

document.getElementById('prevBtn').addEventListener('click', function() {
    if (currentExerciseIndex > 0) {
        currentExerciseIndex--;
        loadExercise(currentExerciseIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ============================================
// REINICIAR
// ============================================

document.getElementById('restartBtn').addEventListener('click', function() {
    location.reload();
});

// ============================================
// MOSTRAR RESULTADOS
// ============================================

function showResults() {
    document.getElementById('exercisesSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    
    const total = correctAnswers + wrongAnswers;
    const percent = total > 0 ? Math.round((correctAnswers / total) * 100) : 0;
    
    document.getElementById('correctCount').textContent = correctAnswers;
    document.getElementById('wrongCount').textContent = wrongAnswers;
    document.getElementById('scorePercent').textContent = percent + '%';
    
    document.getElementById('progressFill').style.width = '100%';
    document.getElementById('progressText').textContent = '100%';
}

// ============================================
// ACTUALIZAR PROGRESO
// ============================================

function updateProgress() {
    let totalQuestions = 0;
    let answered = 0;
    
    sessionData.exercises.forEach((exercise, idx) => {
        if (idx > currentExerciseIndex) return;
        
        if (exercise.type === 'matchWords') {
            exercise.words.forEach((_, i) => {
                totalQuestions++;
                if (answeredQuestions[`${idx}-${i}`] !== undefined) answered++;
            });
        } else if (exercise.questions) {
            exercise.questions.forEach((_, i) => {
                totalQuestions++;
                if (answeredQuestions[`${idx}-${i}`] !== undefined) answered++;
            });
        }
    });
    
    const currentExercise = sessionData.exercises[currentExerciseIndex];
    if (currentExercise) {
        if (currentExercise.type === 'matchWords') {
            currentExercise.words.forEach((_, i) => {
                const key = `${currentExerciseIndex}-${i}`;
                if (answeredQuestions[key] !== undefined) answered++;
            });
        } else if (currentExercise.questions) {
            currentExercise.questions.forEach((_, i) => {
                const key = `${currentExerciseIndex}-${i}`;
                if (answeredQuestions[key] !== undefined) answered++;
            });
        }
    }
    
    let realTotal = 0;
    sessionData.exercises.forEach((exercise) => {
        if (exercise.type === 'matchWords') {
            realTotal += exercise.words.length;
        } else if (exercise.questions) {
            realTotal += exercise.questions.length;
        }
    });
    
    const percent = realTotal > 0 ? Math.min(100, Math.round((answered / realTotal) * 100)) : 0;
    document.getElementById('progressFill').style.width = percent + '%';
    document.getElementById('progressText').textContent = percent + '%';
}