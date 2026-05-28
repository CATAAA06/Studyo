const LOBBIES = [
    // --- Scientifica ---
    { id: 'analisi1', name: 'Analisi Matematica 1', icon: '📐', category: 'scientifica', online: 12 },
    { id: 'analisi2', name: 'Analisi Matematica 2', icon: '📐', category: 'scientifica', online: 6 },
    { id: 'fisica1', name: 'Fisica 1', icon: '⚛️', category: 'scientifica', online: 9 },
    { id: 'fisica2', name: 'Fisica 2', icon: '⚛️', category: 'scientifica', online: 5 },
    { id: 'chimica', name: 'Chimica Generale', icon: '🧪', category: 'scientifica', online: 13 },
    { id: 'chimicaOrg', name: 'Chimica Organica', icon: '🧬', category: 'scientifica', online: 7 },
    { id: 'informatica', name: 'Fondamenti di Informatica', icon: '💻', category: 'scientifica', online: 18 },
    { id: 'programmazione', name: 'Programmazione', icon: '🖥️', category: 'scientifica', online: 14 },
    { id: 'algebra', name: 'Algebra Lineare e Geometria', icon: '📏', category: 'scientifica', online: 10 },
    { id: 'statistica', name: 'Statistica', icon: '📈', category: 'scientifica', online: 11 },
    { id: 'biologia', name: 'Biologia Generale', icon: '🦠', category: 'scientifica', online: 8 },
    { id: 'calcoloNum', name: 'Calcolo Numerico', icon: '🔢', category: 'scientifica', online: 4 },
    { id: 'meccanica', name: 'Meccanica Razionale', icon: '⚙️', category: 'scientifica', online: 5 },
    { id: 'elettrotecnica', name: 'Elettrotecnica', icon: '⚡', category: 'scientifica', online: 6 },

    // --- Economia ---
    { id: 'microeconomia', name: 'Microeconomia', icon: '📊', category: 'economia', online: 8 },
    { id: 'macroeconomia', name: 'Macroeconomia', icon: '🌍', category: 'economia', online: 9 },
    { id: 'ragioneria', name: 'Ragioneria / Economia Aziendale', icon: '📒', category: 'economia', online: 11 },
    { id: 'marketing', name: 'Marketing', icon: '📣', category: 'economia', online: 10 },
    { id: 'pianificazione', name: "Pianificazione d'Impresa", icon: '🏢', category: 'economia', online: 6 },
    { id: 'matFin', name: 'Matematica Finanziaria', icon: '💰', category: 'economia', online: 5 },
    { id: 'econometria', name: 'Econometria', icon: '📉', category: 'economia', online: 4 },
    { id: 'dirCommerciale', name: 'Diritto Commerciale', icon: '🏦', category: 'economia', online: 7 },

    // --- Giuridica ---
    { id: 'giurisprudenza', name: 'Diritto Privato', icon: '⚖️', category: 'giuridica', online: 15 },
    { id: 'dirCostituzionale', name: 'Diritto Costituzionale', icon: '📜', category: 'giuridica', online: 12 },
    { id: 'dirPenale', name: 'Diritto Penale', icon: '🔒', category: 'giuridica', online: 10 },
    { id: 'dirLavoro', name: 'Diritto del Lavoro', icon: '👷', category: 'giuridica', online: 6 },
    { id: 'filosofia', name: 'Filosofia del Diritto', icon: '🤔', category: 'giuridica', online: 4 },
    { id: 'dirUE', name: "Diritto dell'Unione Europea", icon: '🇪🇺', category: 'giuridica', online: 5 },
    { id: 'procCivile', name: 'Procedura Civile', icon: '📋', category: 'giuridica', online: 4 },

    // --- Umanistica ---
    { id: 'letteratura', name: 'Letteratura Italiana', icon: '📖', category: 'umanistica', online: 5 },
    { id: 'storia', name: 'Storia Contemporanea', icon: '📜', category: 'umanistica', online: 7 },
    { id: 'filosofiaGen', name: 'Filosofia', icon: '💭', category: 'umanistica', online: 6 },
    { id: 'linguistica', name: 'Linguistica Generale', icon: '🗣️', category: 'umanistica', online: 4 },
    { id: 'pedagogia', name: 'Pedagogia', icon: '🎓', category: 'umanistica', online: 5 },
    { id: 'psicologia', name: 'Psicologia Generale', icon: '🧠', category: 'umanistica', online: 9 },
    { id: 'sociologia', name: 'Sociologia', icon: '👥', category: 'umanistica', online: 6 },
    { id: 'storiaArte', name: "Storia dell'Arte", icon: '🎨', category: 'umanistica', online: 3 },

    // --- Medicina ---
    { id: 'anatomia', name: 'Anatomia Umana', icon: '🫀', category: 'medicina', online: 14 },
    { id: 'fisiologia', name: 'Fisiologia', icon: '🫁', category: 'medicina', online: 10 },
    { id: 'biochimica', name: 'Biochimica', icon: '🔬', category: 'medicina', online: 8 },
    { id: 'patologia', name: 'Patologia Generale', icon: '🩺', category: 'medicina', online: 7 },
    { id: 'farmacologia', name: 'Farmacologia', icon: '💊', category: 'medicina', online: 6 },

    // --- Trasversali ---
    { id: 'inglese', name: 'Inglese Accademico', icon: '🇬🇧', category: 'umanistica', online: 16 },
];

/* =============================================
   ESAMI PER CORSO DI LAUREA
   ============================================= */

const CORSI_ESAMI = {
    // Economia e Management
    'Economia e Commercio': ['microeconomia', 'macroeconomia', 'ragioneria', 'statistica', 'giurisprudenza', 'dirCommerciale', 'marketing', 'pianificazione', 'analisi1', 'matFin', 'econometria', 'inglese'],
    'Economia Aziendale': ['ragioneria', 'microeconomia', 'macroeconomia', 'statistica', 'giurisprudenza', 'dirCommerciale', 'marketing', 'pianificazione', 'analisi1', 'matFin', 'inglese'],
    'Management': ['microeconomia', 'macroeconomia', 'marketing', 'pianificazione', 'ragioneria', 'statistica', 'giurisprudenza', 'dirCommerciale', 'inglese'],
    'Marketing': ['marketing', 'microeconomia', 'macroeconomia', 'statistica', 'pianificazione', 'informatica', 'psicologia', 'sociologia', 'inglese'],
    'Finanza': ['microeconomia', 'macroeconomia', 'matFin', 'statistica', 'econometria', 'analisi1', 'ragioneria', 'giurisprudenza', 'dirCommerciale', 'inglese'],

    // Ingegneria
    'Ingegneria Informatica': ['analisi1', 'analisi2', 'fisica1', 'fisica2', 'informatica', 'programmazione', 'algebra', 'statistica', 'chimica', 'calcoloNum', 'elettrotecnica', 'inglese'],
    'Ingegneria Meccanica': ['analisi1', 'analisi2', 'fisica1', 'fisica2', 'chimica', 'algebra', 'meccanica', 'statistica', 'informatica', 'calcoloNum', 'inglese'],
    'Ingegneria Civile': ['analisi1', 'analisi2', 'fisica1', 'fisica2', 'chimica', 'algebra', 'meccanica', 'statistica', 'calcoloNum', 'inglese'],
    'Ingegneria Elettronica': ['analisi1', 'analisi2', 'fisica1', 'fisica2', 'informatica', 'programmazione', 'algebra', 'elettrotecnica', 'chimica', 'statistica', 'inglese'],
    'Ingegneria Gestionale': ['analisi1', 'analisi2', 'fisica1', 'informatica', 'statistica', 'microeconomia', 'macroeconomia', 'pianificazione', 'ragioneria', 'algebra', 'inglese'],

    // Scienze
    'Matematica': ['analisi1', 'analisi2', 'algebra', 'fisica1', 'fisica2', 'informatica', 'programmazione', 'statistica', 'calcoloNum', 'inglese'],
    'Fisica': ['analisi1', 'analisi2', 'fisica1', 'fisica2', 'algebra', 'chimica', 'informatica', 'programmazione', 'statistica', 'calcoloNum', 'inglese'],
    'Chimica': ['chimica', 'chimicaOrg', 'analisi1', 'fisica1', 'algebra', 'statistica', 'biologia', 'inglese'],
    'Informatica': ['informatica', 'programmazione', 'analisi1', 'analisi2', 'algebra', 'fisica1', 'statistica', 'calcoloNum', 'inglese'],
    'Biologia': ['biologia', 'chimica', 'chimicaOrg', 'fisica1', 'statistica', 'analisi1', 'inglese'],
    'Scienze Naturali': ['chimica', 'biologia', 'fisica1', 'statistica', 'analisi1', 'inglese'],

    // Giuridica
    'Giurisprudenza': ['giurisprudenza', 'dirCostituzionale', 'dirPenale', 'dirCommerciale', 'dirLavoro', 'dirUE', 'procCivile', 'filosofia', 'storia', 'microeconomia', 'inglese'],
    'Scienze Giuridiche': ['giurisprudenza', 'dirCostituzionale', 'dirPenale', 'dirCommerciale', 'dirLavoro', 'filosofia', 'storia', 'inglese'],

    // Umanistica
    'Lettere': ['letteratura', 'storia', 'filosofiaGen', 'linguistica', 'storiaArte', 'inglese'],
    'Filosofia': ['filosofiaGen', 'storia', 'letteratura', 'pedagogia', 'psicologia', 'sociologia', 'inglese'],
    'Storia': ['storia', 'letteratura', 'filosofiaGen', 'giurisprudenza', 'dirCostituzionale', 'sociologia', 'inglese'],
    'Lingue': ['letteratura', 'linguistica', 'storia', 'filosofiaGen', 'inglese'],
    'Scienze della Comunicazione': ['marketing', 'sociologia', 'psicologia', 'statistica', 'storia', 'letteratura', 'informatica', 'inglese'],
    'Psicologia': ['psicologia', 'statistica', 'biologia', 'filosofiaGen', 'pedagogia', 'sociologia', 'inglese'],

    // Medicina e Salute
    'Medicina e Chirurgia': ['anatomia', 'fisiologia', 'biochimica', 'patologia', 'farmacologia', 'chimica', 'chimicaOrg', 'fisica1', 'biologia', 'statistica', 'inglese'],
    'Infermieristica': ['anatomia', 'fisiologia', 'patologia', 'farmacologia', 'chimica', 'biologia', 'statistica', 'psicologia', 'inglese'],
    'Farmacia': ['chimica', 'chimicaOrg', 'biochimica', 'farmacologia', 'anatomia', 'fisiologia', 'analisi1', 'fisica1', 'biologia', 'inglese'],
    'Scienze Motorie': ['anatomia', 'fisiologia', 'biologia', 'fisica1', 'statistica', 'psicologia', 'pedagogia', 'inglese'],

    // Architettura e Design
    'Architettura': ['analisi1', 'fisica1', 'storia', 'storiaArte', 'informatica', 'inglese'],
    'Design': ['informatica', 'storiaArte', 'storia', 'marketing', 'psicologia', 'inglese'],

    // Altro
    'Scienze Politiche': ['giurisprudenza', 'dirCostituzionale', 'dirUE', 'storia', 'microeconomia', 'macroeconomia', 'statistica', 'sociologia', 'filosofiaGen', 'inglese'],
    'Scienze della Formazione': ['pedagogia', 'psicologia', 'filosofiaGen', 'storia', 'sociologia', 'statistica', 'letteratura', 'inglese'],
    'Agraria': ['chimica', 'chimicaOrg', 'biologia', 'statistica', 'fisica1', 'microeconomia', 'inglese'],
    'Veterinaria': ['anatomia', 'fisiologia', 'chimica', 'chimicaOrg', 'biologia', 'patologia', 'fisica1', 'statistica', 'inglese'],
};

/* =============================================
   DOMANDE FEEDBACK RANDOM
   ============================================= */

const FEEDBACK_QUESTIONS = [
    "Cosa hai pensato quando hai aperto Studyo per la prima volta?",
    "Lo useresti davvero per studiare? Perche si o perche no?",
    "Qual e la feature che ti e piaciuta di piu?",
    "Cosa vorresti che ci fosse e che ancora non c'e?",
    "Cosa usi adesso per studiare? Studyo e meglio o peggio?",
    "Pagheresti 2-3 euro al mese per una versione premium?",
    "Lo consiglieresti a un amico? Perche?",
    "C'e qualcosa che non funziona bene o che ti ha confuso?",
    "Quale materia vorresti vedere aggiunta per prima?",
    "Preferisci studiare da solo o in gruppo? Studyo cambia qualcosa?",
];

const QUIZZES = {
    analisi1: [
        {
            question: "Qual è il limite di sin(x)/x per x→0?",
            options: ["0", "1", "∞", "Non esiste"],
            correct: 1
        },
        {
            question: "La derivata di e^x è:",
            options: ["xe^(x-1)", "e^x", "e^(x+1)", "ln(x)·e^x"],
            correct: 1
        },
        {
            question: "Una funzione continua su un intervallo chiuso [a,b]:",
            options: ["È sempre derivabile", "Ammette massimo e minimo assoluti", "È sempre crescente", "Ha sempre un punto di flesso"],
            correct: 1
        },
        {
            question: "L'integrale di 1/x dx è:",
            options: ["x²/2 + C", "ln|x| + C", "-1/x² + C", "e^x + C"],
            correct: 1
        },
        {
            question: "Se f'(x₀) = 0 e f''(x₀) > 0, allora x₀ è:",
            options: ["Punto di massimo", "Punto di minimo", "Punto di flesso", "Punto di sella"],
            correct: 1
        }
    ],
    microeconomia: [
        {
            question: "La legge della domanda afferma che:",
            options: ["Al crescere del prezzo, la quantità domandata aumenta", "Al crescere del prezzo, la quantità domandata diminuisce", "Il prezzo non influenza la domanda", "La domanda è sempre costante"],
            correct: 1
        },
        {
            question: "Il costo marginale è:",
            options: ["Il costo totale diviso la quantità", "Il costo aggiuntivo per produrre un'unità in più", "Il costo fisso dell'impresa", "Il costo medio variabile"],
            correct: 1
        },
        {
            question: "In concorrenza perfetta, il prezzo è uguale a:",
            options: ["Costo marginale", "Costo fisso", "Ricavo totale", "Profitto medio"],
            correct: 0
        },
        {
            question: "L'elasticità della domanda al prezzo misura:",
            options: ["Quanto cambia l'offerta al variare del prezzo", "Quanto è sensibile la quantità domandata a variazioni di prezzo", "Il prezzo massimo che i consumatori pagano", "Il surplus del consumatore"],
            correct: 1
        },
        {
            question: "Un bene di Giffen è un bene per cui:",
            options: ["La domanda aumenta al crescere del prezzo", "La domanda è perfettamente elastica", "L'offerta è rigida", "Il prezzo è fissato dallo Stato"],
            correct: 0
        }
    ],
    giurisprudenza: [
        {
            question: "La capacità giuridica si acquisisce:",
            options: ["A 14 anni", "A 18 anni", "Alla nascita", "Con il matrimonio"],
            correct: 2
        },
        {
            question: "Il contratto è nullo quando:",
            options: ["Una parte è minorenne", "Manca un elemento essenziale", "C'è un errore di calcolo", "Una parte cambia idea"],
            correct: 1
        },
        {
            question: "La Costituzione italiana è entrata in vigore il:",
            options: ["2 giugno 1946", "1 gennaio 1948", "25 aprile 1945", "22 dicembre 1947"],
            correct: 1
        },
        {
            question: "L'obbligazione è un rapporto giuridico tra:",
            options: ["Due Stati", "Creditore e debitore", "Giudice e imputato", "Venditore e compratore"],
            correct: 1
        },
        {
            question: "Il possesso si distingue dalla proprietà perché:",
            options: ["È un diritto reale", "È una situazione di fatto", "Richiede un contratto", "Dura solo 10 anni"],
            correct: 1
        }
    ],
    pianificazione: [
        {
            question: "Il business plan serve principalmente a:",
            options: ["Calcolare le tasse", "Pianificare strategia e sostenibilità dell'impresa", "Registrare l'azienda", "Assumere dipendenti"],
            correct: 1
        },
        {
            question: "L'analisi SWOT valuta:",
            options: ["Solo i punti di forza", "Forze, debolezze, opportunità e minacce", "Il fatturato annuale", "La concorrenza diretta"],
            correct: 1
        },
        {
            question: "Il break-even point è il punto in cui:",
            options: ["L'azienda chiude", "I ricavi eguagliano i costi", "Si raggiunge il massimo profitto", "Si inizia a esportare"],
            correct: 1
        },
        {
            question: "Il cash flow è:",
            options: ["Il patrimonio netto", "Il flusso di cassa in entrata e uscita", "Il debito bancario", "Il capitale sociale"],
            correct: 1
        },
        {
            question: "La mission aziendale descrive:",
            options: ["Il bilancio annuale", "Lo scopo e i valori fondamentali dell'impresa", "Il numero di dipendenti", "La sede legale"],
            correct: 1
        }
    ],
    fisica1: [
        {
            question: "La seconda legge di Newton afferma che:",
            options: ["F = mv", "F = ma", "F = mg²", "F = m/a"],
            correct: 1
        },
        {
            question: "L'unità di misura della forza nel SI è:",
            options: ["Joule", "Watt", "Newton", "Pascal"],
            correct: 2
        },
        {
            question: "L'energia cinetica è data da:",
            options: ["mgh", "½mv²", "Fd", "mv"],
            correct: 1
        },
        {
            question: "In un moto circolare uniforme, l'accelerazione centripeta è diretta:",
            options: ["Tangente alla traiettoria", "Verso il centro", "Verso l'esterno", "In direzione del moto"],
            correct: 1
        },
        {
            question: "La conservazione dell'energia meccanica vale quando:",
            options: ["Ci sono forze d'attrito", "Agiscono solo forze conservative", "La velocità è costante", "Il corpo è fermo"],
            correct: 1
        }
    ],
    storia: [
        {
            question: "La Prima Guerra Mondiale è iniziata nel:",
            options: ["1912", "1914", "1916", "1918"],
            correct: 1
        },
        {
            question: "Il muro di Berlino è caduto nel:",
            options: ["1985", "1987", "1989", "1991"],
            correct: 2
        },
        {
            question: "La Rivoluzione Francese è iniziata nel:",
            options: ["1776", "1789", "1799", "1804"],
            correct: 1
        },
        {
            question: "L'Unità d'Italia è stata proclamata nel:",
            options: ["1848", "1861", "1870", "1882"],
            correct: 1
        },
        {
            question: "La Seconda Guerra Mondiale è terminata in Europa nel:",
            options: ["1943", "1944", "1945", "1946"],
            correct: 2
        }
    ],
    informatica: [
        {
            question: "La complessità di una ricerca binaria è:",
            options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
            correct: 2
        },
        {
            question: "In programmazione, un array è:",
            options: ["Un tipo di loop", "Una struttura dati indicizzata", "Una funzione ricorsiva", "Un operatore logico"],
            correct: 1
        },
        {
            question: "Il sistema binario usa base:",
            options: ["8", "10", "2", "16"],
            correct: 2
        },
        {
            question: "La RAM è una memoria:",
            options: ["Permanente", "Volatile", "Solo lettura", "Sequenziale"],
            correct: 1
        },
        {
            question: "Un algoritmo è:",
            options: ["Un linguaggio di programmazione", "Una sequenza finita di istruzioni", "Un tipo di processore", "Un sistema operativo"],
            correct: 1
        }
    ],
    letteratura: [
        {
            question: "I Promessi Sposi sono stati scritti da:",
            options: ["Leopardi", "Manzoni", "Dante", "Verga"],
            correct: 1
        },
        {
            question: "La Divina Commedia è divisa in:",
            options: ["2 cantiche", "3 cantiche", "4 cantiche", "5 cantiche"],
            correct: 1
        },
        {
            question: "Il Decameron è opera di:",
            options: ["Petrarca", "Boccaccio", "Ariosto", "Tasso"],
            correct: 1
        },
        {
            question: "Il Verismo è un movimento letterario del:",
            options: ["Settecento", "Primo Ottocento", "Secondo Ottocento", "Novecento"],
            correct: 2
        },
        {
            question: "L'Infinito è una poesia di:",
            options: ["Foscolo", "Leopardi", "Ungaretti", "Montale"],
            correct: 1
        }
    ],
    statistica: [
        {
            question: "La media aritmetica di 2, 4, 6 è:",
            options: ["3", "4", "5", "6"],
            correct: 1
        },
        {
            question: "La mediana è:",
            options: ["Il valore più frequente", "Il valore centrale", "La somma dei valori", "Il valore massimo"],
            correct: 1
        },
        {
            question: "La deviazione standard misura:",
            options: ["La tendenza centrale", "La dispersione dei dati", "La simmetria", "La correlazione"],
            correct: 1
        },
        {
            question: "Un campione è:",
            options: ["L'intera popolazione", "Un sottoinsieme della popolazione", "Una variabile casuale", "Un parametro"],
            correct: 1
        },
        {
            question: "La probabilità di un evento certo è:",
            options: ["0", "0.5", "1", "Infinita"],
            correct: 2
        }
    ],
    marketing: [
        {
            question: "Le 4P del marketing mix sono:",
            options: ["Prodotto, Prezzo, Punto vendita, Promozione", "Profitto, Perdita, Produzione, Personale", "Piano, Processo, Progetto, Persona", "Prezzo, Profitto, Pubblicità, Prodotto"],
            correct: 0
        },
        {
            question: "La segmentazione del mercato serve a:",
            options: ["Eliminare la concorrenza", "Dividere il mercato in gruppi omogenei", "Ridurre i costi", "Aumentare il prezzo"],
            correct: 1
        },
        {
            question: "Il brand positioning è:",
            options: ["Il prezzo del prodotto", "La posizione nel punto vendita", "Come il brand è percepito nella mente del consumatore", "Il logo aziendale"],
            correct: 2
        },
        {
            question: "Il tasso di conversione misura:",
            options: ["La velocità del sito web", "La percentuale di visitatori che compiono un'azione", "Il numero di dipendenti", "Il fatturato annuale"],
            correct: 1
        },
        {
            question: "Il customer lifetime value è:",
            options: ["L'età media dei clienti", "Il valore totale che un cliente genera nel tempo", "Il costo di acquisizione", "Lo sconto massimo applicabile"],
            correct: 1
        }
    ],
    filosofia: [
        {
            question: "Il giusnaturalismo sostiene che il diritto:",
            options: ["È creato solo dallo Stato", "Ha fondamento nella natura umana", "Non ha regole fisse", "Dipende dalla religione"],
            correct: 1
        },
        {
            question: "Il contratto sociale è un concetto elaborato da:",
            options: ["Aristotele", "Rousseau", "Marx", "Freud"],
            correct: 1
        },
        {
            question: "Per Kant, l'imperativo categorico è:",
            options: ["Una legge dello Stato", "Un principio morale universale", "Un contratto economico", "Una teoria scientifica"],
            correct: 1
        },
        {
            question: "Il positivismo giuridico afferma che:",
            options: ["Il diritto è solo quello posto dallo Stato", "Il diritto è naturale", "Non esiste il diritto", "Il diritto è religioso"],
            correct: 0
        },
        {
            question: "La teoria della giustizia di Rawls si basa su:",
            options: ["La forza del più forte", "Il velo di ignoranza", "Il libero mercato", "La tradizione"],
            correct: 1
        }
    ],
    chimica: [
        {
            question: "Il numero atomico indica:",
            options: ["Il numero di neutroni", "Il numero di protoni", "La massa atomica", "Il numero di elettroni di valenza"],
            correct: 1
        },
        {
            question: "L'acqua ha formula:",
            options: ["H₃O", "H₂O", "HO₂", "H₂O₂"],
            correct: 1
        },
        {
            question: "Un legame covalente si forma quando:",
            options: ["Si trasferiscono elettroni", "Si condividono elettroni", "Si perdono protoni", "Si guadagnano neutroni"],
            correct: 1
        },
        {
            question: "Il pH 7 indica una soluzione:",
            options: ["Acida", "Basica", "Neutra", "Satura"],
            correct: 2
        },
        {
            question: "La tavola periodica è organizzata per:",
            options: ["Ordine alfabetico", "Numero atomico crescente", "Data di scoperta", "Colore degli elementi"],
            correct: 1
        }
    ]
};

const FLASHCARDS = {
    analisi1: [
        { front: "Cos'è un limite?", back: "Il valore a cui tende una funzione quando la variabile si avvicina a un punto dato." },
        { front: "Teorema di Weierstrass", back: "Una funzione continua su un intervallo chiuso e limitato ammette massimo e minimo assoluti." },
        { front: "Definizione di derivata", back: "Il limite del rapporto incrementale: f'(x₀) = lim[h→0] (f(x₀+h) - f(x₀))/h" },
        { front: "Cos'è un integrale definito?", back: "L'area con segno della regione compresa tra il grafico della funzione e l'asse x nell'intervallo [a,b]." },
        { front: "Teorema fondamentale del calcolo", back: "Se F è una primitiva di f su [a,b], allora ∫ₐᵇ f(x)dx = F(b) - F(a)" },
    ],
    microeconomia: [
        { front: "Cos'è il surplus del consumatore?", back: "La differenza tra il prezzo che il consumatore è disposto a pagare e il prezzo effettivo." },
        { front: "Legge dei rendimenti decrescenti", back: "Aggiungendo unità di un fattore produttivo, mantenendo gli altri fissi, il prodotto marginale prima o poi diminuisce." },
        { front: "Cos'è un monopolio?", back: "Una struttura di mercato con un unico venditore che controlla l'intera offerta di un bene." },
        { front: "Cos'è l'elasticità?", back: "La misura della sensibilità della quantità domandata (o offerta) a variazioni del prezzo." },
        { front: "Equilibrio di mercato", back: "Il punto in cui la curva di domanda interseca la curva di offerta: quantità domandata = quantità offerta." },
    ],
    giurisprudenza: [
        { front: "Cos'è la capacità d'agire?", back: "L'idoneità a compiere atti giuridici. Si acquisisce con la maggiore età (18 anni)." },
        { front: "Differenza tra nullità e annullabilità", back: "Nullità: il contratto non produce effetti ab origine. Annullabilità: produce effetti fino alla sentenza." },
        { front: "Cos'è il diritto soggettivo?", back: "Il potere riconosciuto dall'ordinamento a un soggetto di agire per soddisfare un proprio interesse." },
        { front: "Art. 1 della Costituzione", back: "L'Italia è una Repubblica democratica, fondata sul lavoro." },
        { front: "Cos'è la prescrizione?", back: "L'estinzione di un diritto per mancato esercizio entro il termine stabilito dalla legge." },
    ]
};

const DAILY_CHALLENGES = [
    { title: "Maratoneta", desc: "Studia per 2 ore oggi", reward: "+200 XP", progress: 0 },
    { title: "Quizmaster", desc: "Completa 3 quiz in lobby diverse", reward: "+150 XP", progress: 33 },
    { title: "Costanza", desc: "Mantieni la streak per 3 giorni", reward: "+300 XP", progress: 66 },
    { title: "Social Learner", desc: "Invia 10 messaggi in chat", reward: "+100 XP", progress: 0 },
];

const FAKE_STUDENTS = [
    { name: "Davide", avatar: "😎", status: "Sta studiando", time: "45 min" },
    { name: "Giulia", avatar: "👩‍🎓", status: "In pausa", time: "1h 20min" },
    { name: "Marco", avatar: "🧑‍💻", status: "Sta studiando", time: "30 min" },
    { name: "Sara", avatar: "📚", status: "Sta studiando", time: "2h 10min" },
    { name: "Luca", avatar: "🎯", status: "Quiz in corso", time: "15 min" },
    { name: "Elena", avatar: "✨", status: "Sta studiando", time: "55 min" },
];

const FAKE_CHAT = [
    { name: "Sistema", text: "Benvenuto nella lobby! 🎉", system: true },
    { name: "Davide", text: "Raga chi mi spiega il teorema di Lagrange?" },
    { name: "Sara", text: "Ci provo io, in pratica dice che..." },
    { name: "Marco", text: "Qualcuno fa un quiz insieme?" },
    { name: "Giulia", text: "Io! Appena finisco questo pomodoro" },
];

const BADGES = [
    { icon: "🌟", name: "Prima Lobby", earned: true },
    { icon: "🔥", name: "Streak 7gg", earned: false },
    { icon: "🧠", name: "10 Quiz", earned: false },
    { icon: "🍅", name: "20 Pomodori", earned: false },
    { icon: "💬", name: "Social", earned: true },
    { icon: "⚡", name: "Speed Quiz", earned: false },
    { icon: "📚", name: "Studioso", earned: false },
    { icon: "🏆", name: "Top 10", earned: false },
];

const LEVELS = [
    { level: 1, title: "Matricola", xpNeeded: 500 },
    { level: 2, title: "Studente", xpNeeded: 1200 },
    { level: 3, title: "Veterano", xpNeeded: 2500 },
    { level: 4, title: "Esperto", xpNeeded: 5000 },
    { level: 5, title: "Maestro", xpNeeded: 10000 },
    { level: 6, title: "Leggenda", xpNeeded: 20000 },
];

const AI_RESPONSES = {
    default: [
        "Ottima domanda! Cerco di spiegarti in modo semplice...",
        "Questo è un concetto fondamentale. In pratica...",
        "Bella domanda! Ti faccio un esempio pratico...",
    ],
    analisi1: [
        "In Analisi, questo concetto si collega alla continuità delle funzioni. Pensa a una funzione come un percorso: se puoi disegnarlo senza staccare la penna, è continua!",
        "Per capire meglio le derivate, immagina di guidare: la derivata è la velocità istantanea, cioè quanto veloce stai andando in quel preciso momento.",
        "Gli integrali sono come sommare infinite fettine sottilissime. Immagina di tagliare l'area sotto una curva in tante strisce e poi sommarle tutte.",
    ],
    microeconomia: [
        "In microeconomia, domanda e offerta sono come una bilancia: quando il prezzo sale, meno persone vogliono comprare ma più aziende vogliono vendere.",
        "Pensa al costo marginale come alla fatica dell'ultima ripetizione in palestra: ogni unità in più costa un po' di più in termini di sforzo.",
        "L'elasticità è come la sensibilità: un bene elastico è come un amico sensibile che reagisce molto a piccoli cambiamenti di prezzo!",
    ]
};
