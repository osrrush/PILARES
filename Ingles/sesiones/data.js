// data.js - asegúrate de que todas las opciones tengan label e icon (opcional)
const sessionData = {
    title: "Mi familia y mi casa",
    words: [
        { english: "mother", spanish: "mamá", icon: "👩" },
        { english: "father", spanish: "papá", icon: "👨" },
        { english: "house", spanish: "casa", icon: "🏠" },
        { english: "table", spanish: "mesa", icon: "🪑" },
        { english: "eat", spanish: "comer", icon: "🍽️" },
        { english: "drink", spanish: "beber", icon: "🥤" }
    ],
    exercises: [
        {
            id: 1,
            title: "🎧 Ejercicio 1: Escucha y elige",
            instructions: "Escucha la palabra en inglés y elige el dibujo correcto.",
            type: "listenAndChoose",
            questions: [
                { 
                    audio: "mother", 
                    options: [
                        { label: "Mamá", icon: "👩", correct: true },
                        { label: "Papá", icon: "👨", correct: false }
                    ]
                },
                { 
                    audio: "house", 
                    options: [
                        { label: "Casa", icon: "🏠", correct: true },
                        { label: "Mesa", icon: "🪑", correct: false }
                    ]
                },
                { 
                    audio: "eat", 
                    options: [
                        { label: "Comer", icon: "🍽️", correct: true },
                        { label: "Beber", icon: "🥤", correct: false }
                    ]
                },
                { 
                    audio: "father", 
                    options: [
                        { label: "Mamá", icon: "👩", correct: false },
                        { label: "Papá", icon: "👨", correct: true }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "📝 Ejercicio 2: ¿Qué palabra escuchaste?",
            instructions: "Escucha la palabra y elige la opción correcta en inglés.",
            type: "chooseWord",
            questions: [
                { audio: "table", options: ["house", "table", "mother"], correct: "table" },
                { audio: "drink", options: ["drink", "eat", "father"], correct: "drink" },
                { audio: "mother", options: ["father", "house", "mother"], correct: "mother" },
                { audio: "house", options: ["house", "table", "eat"], correct: "house" }
            ]
        },
        {
            id: 3,
            title: "🧠 Ejercicio 3: Escucha y repite",
            instructions: "Escucha la frase en inglés. ¿Qué significa en español?",
            type: "translatePhrase",
            questions: [
                { audio: "Mother is in the house.", options: ["El papá está en la casa.", "La mamá está en la casa."], correct: 1 },
                { audio: "Father eats.", options: ["El papá come.", "La mamá come."], correct: 0 },
                { audio: "Drink water.", options: ["Come pan.", "Bebe agua."], correct: 1 },
                { audio: "The table is in the house.", options: ["La mesa está en la casa.", "La casa está en la mesa."], correct: 0 }
            ]
        },
        {
            id: 4,
            title: "🖼️ Ejercicio 4: Mini-Historia Visual",
            instructions: "Mira el dibujo y elige la frase correcta.",
            type: "storyChoose",
            questions: [
                { 
                    image: "👩", 
                    description: "Mamá está en la casa",
                    options: ["The mother is in the house.", "The father is in the house."], 
                    correct: 0 
                },
                { 
                    image: "👨", 
                    description: "El papá come",
                    options: ["The father drinks.", "The father eats."], 
                    correct: 1 
                },
                { 
                    image: "🪑", 
                    description: "La mesa está en la casa",
                    options: ["The table is in the house.", "The house is on the table."], 
                    correct: 0 
                },
                { 
                    image: "👧", 
                    description: "La niña bebe",
                    options: ["The girl eats.", "The girl drinks."], 
                    correct: 1 
                }
            ]
        },
        {
            id: 5,
			title: "🔗 Ejercicio 5: Relaciona las palabras",
			instructions: "Haz clic en una palabra en inglés y luego en su significado en español.",
			type: "matchClick",
			pairs: [
				{ id: 1, english: "mother", spanish: "mamá" },
				{ id: 2, english: "father", spanish: "papá" },
				{ id: 3, english: "house", spanish: "casa" },
				{ id: 4, english: "eat", spanish: "comer" },
				{ id: 5, english: "drink", spanish: "beber" },
				{ id: 6, english: "table", spanish: "mesa" }
			]
        },
        {
            id: 6,
            title: "⭐ Ejercicio 6: ¡Demuestra lo que sabes!",
            instructions: "Responde las últimas preguntas sin ayuda.",
            type: "finalTest",
            questions: [
                { 
                    question: '¿Cómo se dice "mamá" en inglés?', 
                    options: ["father", "mother", "house"], 
                    correct: "mother" 
                },
                { 
                    question: '¿Cómo se dice "beber" en inglés?', 
                    options: ["eat", "drink", "table"], 
                    correct: "drink" 
                },
                { 
                    question: '¿Cómo se dice "mesa" en inglés?', 
                    options: ["table", "house", "mother"], 
                    correct: "table" 
                },
                { 
                    question: '"The father is in the house." ¿Qué significa?', 
                    options: ["El papá está en la casa.", "La mamá está en la casa."], 
                    correct: 0 
                },
                { 
                    question: '"Eat bread." ¿Qué significa?', 
                    options: ["Bebe agua.", "Come pan."], 
                    correct: 1 
                }
            ]
        }
    ]
};