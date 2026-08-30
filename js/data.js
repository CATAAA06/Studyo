const LOBBIES = [
    // ==========================================
    //  UNIVERSITA — Scientifica
    // ==========================================
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
    { id: 'archCalcolatori', name: 'Architettura dei Calcolatori', icon: '🧮', category: 'scientifica', online: 8 },
    { id: 'sistemiOperativi', name: 'Sistemi Operativi', icon: '🐧', category: 'scientifica', online: 9 },
    { id: 'basiDati', name: 'Basi di Dati', icon: '🗄️', category: 'scientifica', online: 10 },
    { id: 'retiCalcolatori', name: 'Reti di Calcolatori', icon: '🌐', category: 'scientifica', online: 7 },
    { id: 'ingSoftware', name: 'Ingegneria del Software', icon: '🛠️', category: 'scientifica', online: 6 },
    { id: 'ricercaOperativa', name: 'Ricerca Operativa', icon: '📦', category: 'scientifica', online: 4 },
    { id: 'meccanica', name: 'Meccanica Razionale', icon: '⚙️', category: 'scientifica', online: 5 },
    { id: 'elettrotecnica', name: 'Elettrotecnica', icon: '⚡', category: 'scientifica', online: 6 },

    // ==========================================
    //  UNIVERSITA — Economia
    // ==========================================
    { id: 'microeconomia', name: 'Microeconomia', icon: '📊', category: 'economia', online: 8 },
    { id: 'macroeconomia', name: 'Macroeconomia', icon: '🌍', category: 'economia', online: 9 },
    { id: 'ragioneria', name: 'Ragioneria / Economia Aziendale', icon: '📒', category: 'economia', online: 11 },
    { id: 'marketing', name: 'Marketing', icon: '📣', category: 'economia', online: 10 },
    { id: 'pianificazione', name: "Pianificazione d'Impresa", icon: '🏢', category: 'economia', online: 6 },
    { id: 'matFin', name: 'Matematica Finanziaria', icon: '💰', category: 'economia', online: 5 },
    { id: 'econometria', name: 'Econometria', icon: '📉', category: 'economia', online: 4 },
    { id: 'dirCommerciale', name: 'Diritto Commerciale', icon: '🏦', category: 'economia', online: 7 },

    // ==========================================
    //  UNIVERSITA — Giuridica
    // ==========================================
    { id: 'giurisprudenza', name: 'Diritto Privato', icon: '⚖️', category: 'giuridica', online: 15 },
    { id: 'dirCostituzionale', name: 'Diritto Costituzionale', icon: '📜', category: 'giuridica', online: 12 },
    { id: 'dirPenale', name: 'Diritto Penale', icon: '🔒', category: 'giuridica', online: 10 },
    { id: 'dirLavoro', name: 'Diritto del Lavoro', icon: '👷', category: 'giuridica', online: 6 },
    { id: 'filosofia', name: 'Filosofia del Diritto', icon: '🤔', category: 'giuridica', online: 4 },
    { id: 'dirUE', name: "Diritto dell'Unione Europea", icon: '🇪🇺', category: 'giuridica', online: 5 },
    { id: 'procCivile', name: 'Procedura Civile', icon: '📋', category: 'giuridica', online: 4 },

    // ==========================================
    //  UNIVERSITA — Umanistica
    // ==========================================
    { id: 'letteratura', name: 'Letteratura Italiana', icon: '📖', category: 'umanistica', online: 5 },
    { id: 'storia', name: 'Storia Contemporanea', icon: '📜', category: 'umanistica', online: 7 },
    { id: 'filosofiaGen', name: 'Filosofia', icon: '💭', category: 'umanistica', online: 6 },
    { id: 'linguistica', name: 'Linguistica Generale', icon: '🗣️', category: 'umanistica', online: 4 },
    { id: 'pedagogia', name: 'Pedagogia', icon: '🎓', category: 'umanistica', online: 5 },
    { id: 'psicologia', name: 'Psicologia Generale', icon: '🧠', category: 'umanistica', online: 9 },
    { id: 'sociologia', name: 'Sociologia', icon: '👥', category: 'umanistica', online: 6 },
    { id: 'storiaArte', name: "Storia dell'Arte", icon: '🎨', category: 'umanistica', online: 3 },

    // ==========================================
    //  UNIVERSITA — Medicina
    // ==========================================
    { id: 'anatomia', name: 'Anatomia Umana', icon: '🫀', category: 'medicina', online: 14 },
    { id: 'fisiologia', name: 'Fisiologia', icon: '🫁', category: 'medicina', online: 10 },
    { id: 'biochimica', name: 'Biochimica', icon: '🔬', category: 'medicina', online: 8 },
    { id: 'patologia', name: 'Patologia Generale', icon: '🩺', category: 'medicina', online: 7 },
    { id: 'farmacologia', name: 'Farmacologia', icon: '💊', category: 'medicina', online: 6 },

    // ==========================================
    //  UNIVERSITA — Trasversali
    // ==========================================
    { id: 'inglese', name: 'Inglese Accademico', icon: '🇬🇧', category: 'umanistica', online: 16 },

    // ==========================================
    //  SUPERIORI — Materie comuni e specifiche
    // ==========================================
    // Materie comuni a tutti gli indirizzi
    { id: 'sup_italiano', name: 'Italiano', icon: '📝', category: 'superiori', online: 22 },
    { id: 'sup_matematica', name: 'Matematica', icon: '🔢', category: 'superiori', online: 25 },
    { id: 'sup_inglese', name: 'Inglese', icon: '🇬🇧', category: 'superiori', online: 18 },
    { id: 'sup_storia', name: 'Storia', icon: '📜', category: 'superiori', online: 14 },
    { id: 'sup_scienze', name: 'Scienze Naturali', icon: '🌿', category: 'superiori', online: 11 },
    { id: 'sup_fisica', name: 'Fisica', icon: '⚛️', category: 'superiori', online: 13 },
    { id: 'sup_chimica', name: 'Chimica', icon: '🧪', category: 'superiori', online: 10 },
    { id: 'sup_filosofia', name: 'Filosofia', icon: '💭', category: 'superiori', online: 9 },
    { id: 'sup_edFisica', name: 'Scienze Motorie', icon: '🏃', category: 'superiori', online: 5 },
    { id: 'sup_religione', name: 'Religione / Alt.', icon: '🕊️', category: 'superiori', online: 3 },
    { id: 'sup_edCivica', name: 'Educazione Civica', icon: '🏛️', category: 'superiori', online: 6 },

    // Liceo Scientifico
    { id: 'sup_disegnoTecn', name: 'Disegno e St. Arte', icon: '✏️', category: 'superiori', online: 5 },

    // Liceo Classico
    { id: 'sup_latino', name: 'Latino', icon: '🏛️', category: 'superiori', online: 12 },
    { id: 'sup_greco', name: 'Greco Antico', icon: '🏺', category: 'superiori', online: 8 },
    { id: 'sup_lettClassiche', name: 'Letteratura Classica', icon: '📜', category: 'superiori', online: 6 },

    // Liceo Linguistico
    { id: 'sup_francese', name: 'Francese', icon: '🇫🇷', category: 'superiori', online: 7 },
    { id: 'sup_spagnolo', name: 'Spagnolo', icon: '🇪🇸', category: 'superiori', online: 9 },
    { id: 'sup_tedesco', name: 'Tedesco', icon: '🇩🇪', category: 'superiori', online: 5 },

    // Liceo Artistico
    { id: 'sup_storiaArte', name: "Storia dell'Arte", icon: '🎨', category: 'superiori', online: 6 },
    { id: 'sup_discipline', name: 'Discipline Pittoriche', icon: '🖌️', category: 'superiori', online: 4 },
    { id: 'sup_scultura', name: 'Discipline Plastiche', icon: '🗿', category: 'superiori', online: 3 },
    { id: 'sup_graficaArt', name: 'Discipline Grafiche', icon: '🎭', category: 'superiori', online: 3 },

    // Liceo Scienze Umane
    { id: 'sup_scienzeUmane', name: 'Scienze Umane', icon: '🧠', category: 'superiori', online: 7 },
    { id: 'sup_pedagogia', name: 'Pedagogia', icon: '📚', category: 'superiori', online: 5 },
    { id: 'sup_psicologia', name: 'Psicologia', icon: '🧩', category: 'superiori', online: 6 },
    { id: 'sup_sociologia', name: 'Sociologia', icon: '👥', category: 'superiori', online: 4 },
    { id: 'sup_diritto', name: 'Diritto ed Economia', icon: '⚖️', category: 'superiori', online: 8 },

    // Istituti Tecnici
    { id: 'sup_informaticaTecn', name: 'Informatica (ITIS)', icon: '💻', category: 'superiori', online: 15 },
    { id: 'sup_sistemi', name: 'Sistemi e Reti', icon: '🌐', category: 'superiori', online: 10 },
    { id: 'sup_tpsit', name: 'TPSIT', icon: '🖥️', category: 'superiori', online: 8 },
    { id: 'sup_telecomunicazioni', name: 'Telecomunicazioni', icon: '📡', category: 'superiori', online: 5 },
    { id: 'sup_elettronica', name: 'Elettronica', icon: '⚡', category: 'superiori', online: 6 },
    { id: 'sup_meccanica', name: 'Meccanica', icon: '⚙️', category: 'superiori', online: 5 },
    { id: 'sup_econAziendale', name: 'Economia Aziendale', icon: '📒', category: 'superiori', online: 9 },
    { id: 'sup_dirittoEcon', name: 'Diritto (ITC)', icon: '📋', category: 'superiori', online: 7 },
    { id: 'sup_geoPolitica', name: 'Geografia Economica', icon: '🗺️', category: 'superiori', online: 4 },

    // Istituto Alberghiero
    { id: 'sup_cucina', name: 'Lab. Cucina', icon: '👨‍🍳', category: 'superiori', online: 6 },
    { id: 'sup_sala', name: 'Lab. Sala e Vendita', icon: '🍽️', category: 'superiori', online: 4 },
    { id: 'sup_alimentazione', name: 'Scienza degli Alimenti', icon: '🥗', category: 'superiori', online: 5 },
    { id: 'sup_accoglienza', name: 'Accoglienza Turistica', icon: '🏨', category: 'superiori', online: 3 },

    // Materie per 5° anno Maturita
    { id: 'sup_maturita', name: 'Prep. Maturita', icon: '🎓', category: 'superiori', online: 20 },

    // ==========================================
    //  TOLC — Test Online CISIA (per 5° superiore)
    // ==========================================
    { id: 'tolc_i', name: 'TOLC-I (Ingegneria)', icon: '🔧', category: 'tolc', online: 18 },
    { id: 'tolc_e', name: 'TOLC-E (Economia)', icon: '💼', category: 'tolc', online: 14 },
    { id: 'tolc_med', name: 'TOLC-MED (Medicina)', icon: '🩺', category: 'tolc', online: 22 },
    { id: 'tolc_vet', name: 'TOLC-VET (Veterinaria)', icon: '🐾', category: 'tolc', online: 8 },
    { id: 'tolc_su', name: 'TOLC-SU (Sc. Umanistiche)', icon: '📖', category: 'tolc', online: 10 },
    { id: 'tolc_f', name: 'TOLC-F (Farmacia)', icon: '💊', category: 'tolc', online: 7 },
    { id: 'tolc_b', name: 'TOLC-B (Biologia)', icon: '🧬', category: 'tolc', online: 9 },
    { id: 'tolc_av', name: 'TOLC-AV (Architettura)', icon: '🏗️', category: 'tolc', online: 6 },
    { id: 'tolc_logica', name: 'TOLC — Logica', icon: '🧩', category: 'tolc', online: 16 },
    { id: 'tolc_matTolc', name: 'TOLC — Matematica', icon: '📐', category: 'tolc', online: 15 },
    { id: 'tolc_comprensione', name: 'TOLC — Comprensione Verbale', icon: '📝', category: 'tolc', online: 11 },
    { id: 'tolc_scienzeTolc', name: 'TOLC — Scienze (Bio+Chim+Fis)', icon: '🔬', category: 'tolc', online: 13 },

    // ==========================================
    //  PIANI DI STUDIO REALI — materie aggiuntive
    // ==========================================
    // --- Giuridica ---
    { id: 'dirRomano', name: 'Istituzioni di Diritto Romano', icon: '🏛️', category: 'giuridica', online: 9 },
    { id: 'storiaDiritto', name: 'Storia del Diritto Medievale e Moderno', icon: '📜', category: 'giuridica', online: 7 },
    { id: 'dirAmministrativo', name: 'Diritto Amministrativo', icon: '🗂️', category: 'giuridica', online: 8 },
    { id: 'dirInternazionale', name: 'Diritto Internazionale', icon: '🌍', category: 'giuridica', online: 6 },
    { id: 'procPenale', name: 'Procedura Penale', icon: '⚖️', category: 'giuridica', online: 5 },
    { id: 'dirTributario', name: 'Diritto Tributario', icon: '🧾', category: 'giuridica', online: 5 },
    { id: 'econPolitica', name: 'Economia Politica', icon: '📈', category: 'giuridica', online: 7 },
    { id: 'dirEcclesiastico', name: 'Diritto Ecclesiastico', icon: '⛪', category: 'giuridica', online: 3 },

    // --- Economia ---
    { id: 'dirPubblico', name: 'Diritto Pubblico', icon: '🏛️', category: 'economia', online: 7 },
    { id: 'scienzaFinanze', name: 'Scienza delle Finanze', icon: '🏦', category: 'economia', online: 5 },
    { id: 'economiaIndustriale', name: 'Economia Industriale', icon: '🏭', category: 'economia', online: 5 },
    { id: 'egi', name: 'Economia e Gestione delle Imprese', icon: '🏢', category: 'economia', online: 8 },
    { id: 'intermediariFin', name: 'Economia degli Intermediari Finanziari', icon: '💳', category: 'economia', online: 6 },
    { id: 'analisiBilancio', name: 'Analisi di Bilancio', icon: '📑', category: 'economia', online: 6 },
    { id: 'ragioneriaApp', name: 'Ragioneria Applicata', icon: '📗', category: 'economia', online: 6 },

    // --- Medicina ---
    { id: 'istologia', name: 'Istologia ed Embriologia', icon: '🔬', category: 'medicina', online: 9 },
    { id: 'geneticaMed', name: 'Genetica Medica', icon: '🧬', category: 'medicina', online: 6 },
    { id: 'microbiologia', name: 'Microbiologia', icon: '🦠', category: 'medicina', online: 7 },
    { id: 'immunologia', name: 'Immunologia', icon: '🛡️', category: 'medicina', online: 5 },
    { id: 'igiene', name: 'Igiene e Sanità Pubblica', icon: '🧼', category: 'medicina', online: 4 },
    { id: 'anatomiaPat', name: 'Anatomia Patologica', icon: '🩻', category: 'medicina', online: 6 },
    { id: 'medInterna', name: 'Medicina Interna', icon: '🩺', category: 'medicina', online: 8 },
    { id: 'chirurgiaGen', name: 'Chirurgia Generale', icon: '🔪', category: 'medicina', online: 7 },
    { id: 'neurologia', name: 'Neurologia', icon: '🧠', category: 'medicina', online: 5 },
    { id: 'psichiatria', name: 'Psichiatria', icon: '💭', category: 'medicina', online: 4 },
    { id: 'cardiologia', name: 'Cardiologia', icon: '❤️', category: 'medicina', online: 6 },
    { id: 'radiologia', name: 'Diagnostica per Immagini', icon: '📷', category: 'medicina', online: 4 },
    { id: 'malattieInf', name: 'Malattie Infettive', icon: '🧫', category: 'medicina', online: 4 },
    { id: 'pediatria', name: 'Pediatria', icon: '🧸', category: 'medicina', online: 5 },
    { id: 'ginecologia', name: 'Ginecologia e Ostetricia', icon: '🤰', category: 'medicina', online: 5 },
    { id: 'medLegale', name: 'Medicina Legale', icon: '⚖️', category: 'medicina', online: 3 },

    // --- Ingegneria / scientifica ---
    { id: 'segnali', name: 'Teoria dei Segnali', icon: '📶', category: 'scientifica', online: 6 },
    { id: 'automatica', name: 'Fondamenti di Automatica', icon: '🎛️', category: 'scientifica', online: 5 },
    { id: 'elettronica', name: 'Elettronica', icon: '🔌', category: 'scientifica', online: 7 },
    { id: 'telecomunicazioni', name: 'Telecomunicazioni', icon: '📡', category: 'scientifica', online: 5 },
    { id: 'fisicaTecnica', name: 'Fisica Tecnica', icon: '🌡️', category: 'scientifica', online: 6 },
    { id: 'scienzaCostruzioni', name: 'Scienza delle Costruzioni', icon: '🏗️', category: 'scientifica', online: 7 },
    { id: 'idraulica', name: 'Idraulica', icon: '💧', category: 'scientifica', online: 5 },
    { id: 'tecnologiaMat', name: 'Tecnologia dei Materiali', icon: '⚙️', category: 'scientifica', online: 5 },
    { id: 'disegnoTecnico', name: 'Disegno Tecnico', icon: '📐', category: 'scientifica', online: 6 },
    { id: 'geotecnica', name: 'Geotecnica', icon: '🪨', category: 'scientifica', online: 3 },
    { id: 'termodinamica', name: 'Termodinamica', icon: '♨️', category: 'scientifica', online: 5 },

    // --- Umanistica / psicologia ---
    { id: 'psicSviluppo', name: 'Psicologia dello Sviluppo', icon: '🌱', category: 'umanistica', online: 6 },
    { id: 'psicSociale', name: 'Psicologia Sociale', icon: '👥', category: 'umanistica', online: 5 },
    { id: 'psicometria', name: 'Psicometria', icon: '📊', category: 'umanistica', online: 5 },
    { id: 'psicClinica', name: 'Psicologia Clinica', icon: '🛋️', category: 'umanistica', online: 6 },
    { id: 'neuroscienze', name: 'Neuroscienze', icon: '🧠', category: 'umanistica', online: 5 },
    { id: 'glottologia', name: 'Glottologia', icon: '🗣️', category: 'umanistica', online: 3 },
    { id: 'geografia', name: 'Geografia', icon: '🗺️', category: 'umanistica', online: 4 },
    { id: 'antropologia', name: 'Antropologia Culturale', icon: '🗿', category: 'umanistica', online: 4 },
    { id: 'letteraturaLat', name: 'Letteratura Latina', icon: '🏺', category: 'umanistica', online: 5 },
    { id: 'storiaMedievale', name: 'Storia Medievale', icon: '🏰', category: 'umanistica', online: 4 },
    { id: 'storiaModerna', name: 'Storia Moderna', icon: '📜', category: 'umanistica', online: 4 },
];

/* =============================================
   ESAMI PER CORSO DI LAUREA
   ============================================= */

// Fallback per i corsi non ancora mappati anno per anno in CORSI_PIANI
const CORSI_ESAMI_LEGACY = {
    // Economia e Management
    'Economia e Commercio': ['microeconomia', 'macroeconomia', 'ragioneria', 'statistica', 'giurisprudenza', 'dirCommerciale', 'marketing', 'pianificazione', 'analisi1', 'matFin', 'econometria', 'inglese'],
    'Economia Aziendale': ['ragioneria', 'microeconomia', 'macroeconomia', 'statistica', 'giurisprudenza', 'dirCommerciale', 'marketing', 'pianificazione', 'analisi1', 'matFin', 'inglese'],
    'Management': ['microeconomia', 'macroeconomia', 'marketing', 'pianificazione', 'ragioneria', 'statistica', 'giurisprudenza', 'dirCommerciale', 'inglese'],
    'Marketing': ['marketing', 'microeconomia', 'macroeconomia', 'statistica', 'pianificazione', 'informatica', 'psicologia', 'sociologia', 'inglese'],
    'Finanza': ['microeconomia', 'macroeconomia', 'matFin', 'statistica', 'econometria', 'analisi1', 'ragioneria', 'giurisprudenza', 'dirCommerciale', 'inglese'],

    // Ingegneria
    'Ingegneria Informatica': ['analisi1', 'analisi2', 'fisica1', 'fisica2', 'informatica', 'programmazione', 'algebra', 'statistica', 'archCalcolatori', 'sistemiOperativi', 'basiDati', 'retiCalcolatori', 'ingSoftware', 'elettrotecnica', 'inglese'],
    'Ingegneria Meccanica': ['analisi1', 'analisi2', 'fisica1', 'fisica2', 'chimica', 'algebra', 'meccanica', 'statistica', 'informatica', 'calcoloNum', 'inglese'],
    'Ingegneria Civile': ['analisi1', 'analisi2', 'fisica1', 'fisica2', 'chimica', 'algebra', 'meccanica', 'statistica', 'calcoloNum', 'inglese'],
    'Ingegneria Elettronica': ['analisi1', 'analisi2', 'fisica1', 'fisica2', 'informatica', 'programmazione', 'algebra', 'elettrotecnica', 'archCalcolatori', 'retiCalcolatori', 'statistica', 'inglese'],
    'Ingegneria Gestionale': ['analisi1', 'analisi2', 'fisica1', 'informatica', 'statistica', 'ricercaOperativa', 'microeconomia', 'macroeconomia', 'pianificazione', 'ragioneria', 'algebra', 'inglese'],

    // Scienze
    'Matematica': ['analisi1', 'analisi2', 'algebra', 'fisica1', 'fisica2', 'informatica', 'programmazione', 'statistica', 'calcoloNum', 'inglese'],
    'Fisica': ['analisi1', 'analisi2', 'fisica1', 'fisica2', 'algebra', 'chimica', 'informatica', 'programmazione', 'statistica', 'calcoloNum', 'inglese'],
    'Chimica': ['chimica', 'chimicaOrg', 'analisi1', 'fisica1', 'algebra', 'statistica', 'biologia', 'inglese'],
    'Informatica': ['informatica', 'programmazione', 'analisi1', 'algebra', 'archCalcolatori', 'sistemiOperativi', 'basiDati', 'retiCalcolatori', 'ingSoftware', 'ricercaOperativa', 'statistica', 'calcoloNum', 'inglese'],
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
   PIANI DI STUDIO ANNO PER ANNO
   Ricalcati sui piani reali dei corsi italiani
   (classi ministeriali L-8, L-18, LMG-01, LM-41...).
   I singoli atenei variano nei dettagli, ma la
   struttura per anno è quella standard.
   ============================================= */

const CORSI_PIANI = {
    // ---------- INGEGNERIA ----------
    'Ingegneria Informatica': {
        1: ['analisi1', 'algebra', 'fisica1', 'informatica', 'programmazione', 'chimica'],
        2: ['analisi2', 'fisica2', 'archCalcolatori', 'sistemiOperativi', 'elettrotecnica', 'segnali', 'statistica'],
        3: ['basiDati', 'retiCalcolatori', 'ingSoftware', 'automatica', 'elettronica', 'telecomunicazioni', 'inglese']
    },
    'Ingegneria Meccanica': {
        1: ['analisi1', 'algebra', 'fisica1', 'chimica', 'disegnoTecnico'],
        2: ['analisi2', 'fisica2', 'meccanica', 'termodinamica', 'scienzaCostruzioni', 'tecnologiaMat'],
        3: ['fisicaTecnica', 'elettrotecnica', 'automatica', 'statistica', 'inglese']
    },
    'Ingegneria Civile': {
        1: ['analisi1', 'algebra', 'fisica1', 'chimica', 'disegnoTecnico'],
        2: ['analisi2', 'fisica2', 'meccanica', 'scienzaCostruzioni', 'tecnologiaMat'],
        3: ['idraulica', 'geotecnica', 'fisicaTecnica', 'statistica', 'inglese']
    },
    'Ingegneria Elettronica': {
        1: ['analisi1', 'algebra', 'fisica1', 'chimica', 'informatica'],
        2: ['analisi2', 'fisica2', 'elettrotecnica', 'elettronica', 'segnali'],
        3: ['archCalcolatori', 'telecomunicazioni', 'automatica', 'retiCalcolatori', 'inglese']
    },
    'Ingegneria Gestionale': {
        1: ['analisi1', 'algebra', 'fisica1', 'chimica', 'informatica'],
        2: ['analisi2', 'fisica2', 'statistica', 'microeconomia', 'ricercaOperativa', 'elettrotecnica'],
        3: ['macroeconomia', 'egi', 'ragioneria', 'pianificazione', 'inglese']
    },

    // ---------- ECONOMIA ----------
    'Economia Aziendale': {
        1: ['analisi1', 'giurisprudenza', 'dirPubblico', 'ragioneria', 'microeconomia', 'statistica'],
        2: ['ragioneriaApp', 'matFin', 'economiaIndustriale', 'egi', 'scienzaFinanze', 'intermediariFin', 'macroeconomia'],
        3: ['dirLavoro', 'analisiBilancio', 'dirCommerciale', 'marketing', 'inglese']
    },
    'Economia e Commercio': {
        1: ['microeconomia', 'analisi1', 'ragioneria', 'giurisprudenza', 'statistica'],
        2: ['macroeconomia', 'matFin', 'dirPubblico', 'economiaIndustriale', 'intermediariFin'],
        3: ['econometria', 'scienzaFinanze', 'dirCommerciale', 'marketing', 'inglese']
    },
    'Management': {
        1: ['ragioneria', 'microeconomia', 'analisi1', 'giurisprudenza', 'statistica'],
        2: ['egi', 'macroeconomia', 'marketing', 'matFin', 'dirCommerciale'],
        3: ['pianificazione', 'analisiBilancio', 'dirLavoro', 'inglese']
    },
    'Marketing': {
        1: ['microeconomia', 'ragioneria', 'statistica', 'analisi1', 'psicologia'],
        2: ['marketing', 'macroeconomia', 'egi', 'sociologia', 'informatica'],
        3: ['pianificazione', 'psicSociale', 'dirCommerciale', 'inglese']
    },
    'Finanza': {
        1: ['analisi1', 'microeconomia', 'ragioneria', 'statistica', 'giurisprudenza'],
        2: ['matFin', 'macroeconomia', 'intermediariFin', 'econometria'],
        3: ['scienzaFinanze', 'analisiBilancio', 'dirCommerciale', 'inglese']
    },

    // ---------- GIURIDICA ----------
    'Giurisprudenza': {
        1: ['dirRomano', 'storiaDiritto', 'giurisprudenza', 'filosofia', 'dirCostituzionale', 'econPolitica'],
        2: ['dirUE', 'dirAmministrativo', 'dirPenale', 'dirLavoro', 'inglese'],
        3: ['procCivile', 'dirInternazionale', 'dirCommerciale'],
        4: ['procPenale', 'dirTributario', 'dirPubblico'],
        5: ['sociologia', 'dirEcclesiastico']
    },
    'Scienze Giuridiche': {
        1: ['dirRomano', 'giurisprudenza', 'dirCostituzionale', 'storiaDiritto', 'econPolitica'],
        2: ['dirAmministrativo', 'dirPenale', 'dirLavoro', 'dirUE'],
        3: ['dirCommerciale', 'procCivile', 'filosofia', 'inglese']
    },

    // ---------- MEDICINA E SALUTE ----------
    'Medicina e Chirurgia': {
        1: ['fisica1', 'biologia', 'istologia', 'chimica', 'biochimica'],
        2: ['anatomia', 'fisiologia', 'geneticaMed', 'immunologia', 'inglese'],
        3: ['microbiologia', 'patologia', 'igiene', 'farmacologia'],
        4: ['medInterna', 'chirurgiaGen', 'anatomiaPat', 'psichiatria', 'neurologia'],
        5: ['cardiologia', 'radiologia', 'malattieInf', 'statistica'],
        6: ['pediatria', 'ginecologia', 'medLegale']
    },
    'Infermieristica': {
        1: ['anatomia', 'fisiologia', 'biologia', 'chimica', 'istologia'],
        2: ['patologia', 'farmacologia', 'microbiologia', 'psicologia'],
        3: ['igiene', 'medInterna', 'chirurgiaGen', 'inglese']
    },
    'Farmacia': {
        1: ['chimica', 'biologia', 'analisi1', 'fisica1'],
        2: ['chimicaOrg', 'anatomia', 'istologia', 'biochimica'],
        3: ['fisiologia', 'microbiologia', 'farmacologia'],
        4: ['patologia', 'igiene', 'statistica'],
        5: ['inglese']
    },
    'Veterinaria': {
        1: ['biologia', 'chimica', 'fisica1', 'istologia'],
        2: ['anatomia', 'chimicaOrg', 'biochimica', 'geneticaMed'],
        3: ['fisiologia', 'microbiologia', 'farmacologia'],
        4: ['patologia', 'anatomiaPat', 'igiene'],
        5: ['chirurgiaGen', 'medInterna', 'inglese']
    },
    'Scienze Motorie': {
        1: ['anatomia', 'biologia', 'chimica', 'istologia'],
        2: ['fisiologia', 'biochimica', 'psicologia', 'statistica'],
        3: ['patologia', 'pedagogia', 'igiene', 'inglese']
    },

    // ---------- SCIENZE ----------
    'Informatica': {
        1: ['programmazione', 'informatica', 'analisi1', 'algebra', 'fisica1'],
        2: ['archCalcolatori', 'sistemiOperativi', 'basiDati', 'calcoloNum', 'statistica'],
        3: ['retiCalcolatori', 'ingSoftware', 'ricercaOperativa', 'inglese']
    },
    'Matematica': {
        1: ['analisi1', 'algebra', 'informatica', 'fisica1'],
        2: ['analisi2', 'calcoloNum', 'statistica', 'fisica2', 'programmazione'],
        3: ['ricercaOperativa', 'inglese']
    },
    'Fisica': {
        1: ['analisi1', 'algebra', 'fisica1', 'chimica'],
        2: ['analisi2', 'fisica2', 'calcoloNum', 'informatica'],
        3: ['termodinamica', 'statistica', 'inglese']
    },
    'Chimica': {
        1: ['chimica', 'analisi1', 'fisica1', 'biologia'],
        2: ['chimicaOrg', 'fisica2', 'biochimica', 'statistica'],
        3: ['tecnologiaMat', 'inglese']
    },
    'Biologia': {
        1: ['biologia', 'chimica', 'analisi1', 'fisica1', 'istologia'],
        2: ['chimicaOrg', 'biochimica', 'geneticaMed', 'statistica'],
        3: ['microbiologia', 'fisiologia', 'inglese']
    },
    'Scienze Naturali': {
        1: ['biologia', 'chimica', 'fisica1', 'analisi1'],
        2: ['chimicaOrg', 'geografia', 'statistica', 'istologia'],
        3: ['microbiologia', 'inglese']
    },
    'Agraria': {
        1: ['chimica', 'biologia', 'analisi1', 'fisica1'],
        2: ['chimicaOrg', 'biochimica', 'statistica', 'microeconomia'],
        3: ['microbiologia', 'egi', 'inglese']
    },

    // ---------- UMANISTICA ----------
    'Psicologia': {
        1: ['psicologia', 'psicSviluppo', 'psicSociale', 'biologia', 'filosofiaGen'],
        2: ['psicometria', 'statistica', 'neuroscienze', 'psicClinica', 'sociologia'],
        3: ['pedagogia', 'antropologia', 'inglese']
    },
    'Lettere': {
        1: ['letteratura', 'letteraturaLat', 'storiaMedievale', 'linguistica', 'geografia'],
        2: ['filosofiaGen', 'storiaModerna', 'glottologia', 'storiaArte'],
        3: ['storia', 'antropologia', 'inglese']
    },
    'Storia': {
        1: ['storiaMedievale', 'storia', 'letteratura', 'geografia'],
        2: ['storiaModerna', 'filosofiaGen', 'antropologia', 'letteraturaLat'],
        3: ['sociologia', 'inglese']
    },
    'Filosofia': {
        1: ['filosofiaGen', 'storia', 'letteratura', 'psicologia'],
        2: ['storiaModerna', 'sociologia', 'antropologia', 'pedagogia'],
        3: ['linguistica', 'inglese']
    },
    'Lingue': {
        1: ['linguistica', 'letteratura', 'inglese', 'storia'],
        2: ['glottologia', 'letteraturaLat', 'geografia', 'filosofiaGen'],
        3: ['antropologia', 'storiaModerna']
    },
    'Scienze della Comunicazione': {
        1: ['sociologia', 'linguistica', 'letteratura', 'psicologia', 'storia'],
        2: ['marketing', 'statistica', 'informatica', 'psicSociale'],
        3: ['dirPubblico', 'antropologia', 'inglese']
    },
    'Scienze della Formazione': {
        1: ['pedagogia', 'psicologia', 'filosofiaGen', 'storia'],
        2: ['psicSviluppo', 'sociologia', 'letteratura', 'antropologia'],
        3: ['psicClinica', 'statistica', 'inglese']
    },
    'Scienze Politiche': {
        1: ['dirCostituzionale', 'econPolitica', 'storia', 'sociologia', 'filosofiaGen'],
        2: ['dirUE', 'macroeconomia', 'statistica', 'dirInternazionale'],
        3: ['dirAmministrativo', 'geografia', 'inglese']
    },

    // ---------- ARCHITETTURA E DESIGN ----------
    'Architettura': {
        1: ['disegnoTecnico', 'storiaArte', 'analisi1', 'fisica1'],
        2: ['scienzaCostruzioni', 'storia', 'tecnologiaMat', 'fisicaTecnica'],
        3: ['geotecnica', 'informatica', 'inglese']
    },
    'Design': {
        1: ['storiaArte', 'disegnoTecnico', 'informatica', 'storia'],
        2: ['tecnologiaMat', 'marketing', 'psicologia', 'fisica1'],
        3: ['pianificazione', 'inglese']
    }
};

/* CORSI_ESAMI resta l'elenco piatto usato dal resto dell'app:
   viene derivato dai piani per anno, con fallback sulla vecchia mappa. */
const CORSI_ESAMI = Object.assign({}, CORSI_ESAMI_LEGACY);
Object.keys(CORSI_PIANI).forEach(corso => {
    const anni = CORSI_PIANI[corso];
    CORSI_ESAMI[corso] = Object.keys(anni)
        .sort()
        .reduce((acc, y) => acc.concat(anni[y]), []);
});

/* =============================================
   MATERIE PER TIPO DI SCUOLA SUPERIORE
   ============================================= */

const SCUOLE_MATERIE = {
    // Licei
    'Liceo Scientifico': ['sup_matematica', 'sup_fisica', 'sup_scienze', 'sup_chimica', 'sup_italiano', 'sup_latino', 'sup_inglese', 'sup_storia', 'sup_filosofia', 'sup_disegnoTecn', 'sup_edFisica', 'sup_edCivica', 'sup_maturita'],
    'Liceo Scientifico - Scienze Applicate': ['sup_matematica', 'sup_fisica', 'sup_scienze', 'sup_chimica', 'sup_informaticaTecn', 'sup_italiano', 'sup_inglese', 'sup_storia', 'sup_filosofia', 'sup_disegnoTecn', 'sup_edFisica', 'sup_edCivica', 'sup_maturita'],
    'Liceo Classico': ['sup_latino', 'sup_greco', 'sup_lettClassiche', 'sup_italiano', 'sup_storia', 'sup_filosofia', 'sup_matematica', 'sup_fisica', 'sup_inglese', 'sup_scienze', 'sup_storiaArte', 'sup_edFisica', 'sup_edCivica', 'sup_maturita'],
    'Liceo Linguistico': ['sup_inglese', 'sup_francese', 'sup_spagnolo', 'sup_tedesco', 'sup_italiano', 'sup_storia', 'sup_filosofia', 'sup_matematica', 'sup_fisica', 'sup_scienze', 'sup_storiaArte', 'sup_edFisica', 'sup_edCivica', 'sup_maturita'],
    'Liceo Artistico': ['sup_storiaArte', 'sup_discipline', 'sup_scultura', 'sup_graficaArt', 'sup_italiano', 'sup_storia', 'sup_matematica', 'sup_fisica', 'sup_chimica', 'sup_inglese', 'sup_filosofia', 'sup_edFisica', 'sup_edCivica', 'sup_maturita'],
    'Liceo delle Scienze Umane': ['sup_scienzeUmane', 'sup_pedagogia', 'sup_psicologia', 'sup_sociologia', 'sup_diritto', 'sup_italiano', 'sup_latino', 'sup_storia', 'sup_filosofia', 'sup_matematica', 'sup_inglese', 'sup_scienze', 'sup_edFisica', 'sup_edCivica', 'sup_maturita'],
    'Liceo Musicale e Coreutico': ['sup_italiano', 'sup_storia', 'sup_filosofia', 'sup_matematica', 'sup_fisica', 'sup_inglese', 'sup_storiaArte', 'sup_edFisica', 'sup_edCivica', 'sup_maturita'],

    // Istituti Tecnici
    'ITIS': ['sup_informaticaTecn', 'sup_sistemi', 'sup_tpsit', 'sup_telecomunicazioni', 'sup_elettronica', 'sup_meccanica', 'sup_matematica', 'sup_fisica', 'sup_chimica', 'sup_italiano', 'sup_inglese', 'sup_storia', 'sup_edFisica', 'sup_edCivica', 'sup_maturita'],
    'Tecnico Informatico': ['sup_informaticaTecn', 'sup_sistemi', 'sup_tpsit', 'sup_telecomunicazioni', 'sup_matematica', 'sup_fisica', 'sup_italiano', 'sup_inglese', 'sup_storia', 'sup_edFisica', 'sup_edCivica', 'sup_maturita'],
    'ITC': ['sup_econAziendale', 'sup_dirittoEcon', 'sup_geoPolitica', 'sup_matematica', 'sup_italiano', 'sup_inglese', 'sup_francese', 'sup_storia', 'sup_informaticaTecn', 'sup_edFisica', 'sup_edCivica', 'sup_maturita'],
    'Tecnico Turistico': ['sup_geoPolitica', 'sup_dirittoEcon', 'sup_econAziendale', 'sup_inglese', 'sup_francese', 'sup_spagnolo', 'sup_tedesco', 'sup_italiano', 'sup_storia', 'sup_storiaArte', 'sup_matematica', 'sup_accoglienza', 'sup_edFisica', 'sup_edCivica', 'sup_maturita'],

    // Istituti Professionali
    'IPSIA': ['sup_meccanica', 'sup_elettronica', 'sup_matematica', 'sup_fisica', 'sup_chimica', 'sup_italiano', 'sup_inglese', 'sup_storia', 'sup_diritto', 'sup_edFisica', 'sup_edCivica', 'sup_maturita'],
    'Alberghiero': ['sup_cucina', 'sup_sala', 'sup_alimentazione', 'sup_accoglienza', 'sup_italiano', 'sup_inglese', 'sup_francese', 'sup_storia', 'sup_matematica', 'sup_scienze', 'sup_diritto', 'sup_edFisica', 'sup_edCivica', 'sup_maturita'],
    'Professionale Servizi': ['sup_diritto', 'sup_psicologia', 'sup_italiano', 'sup_inglese', 'sup_storia', 'sup_matematica', 'sup_scienze', 'sup_edFisica', 'sup_edCivica', 'sup_maturita'],
};

/* =============================================
   TOLC — SEZIONI PER TIPO DI TEST
   ============================================= */

const TOLC_SEZIONI = {
    'TOLC-I': ['tolc_i', 'tolc_logica', 'tolc_matTolc', 'tolc_scienzeTolc', 'tolc_comprensione'],
    'TOLC-E': ['tolc_e', 'tolc_logica', 'tolc_matTolc', 'tolc_comprensione'],
    'TOLC-MED': ['tolc_med', 'tolc_logica', 'tolc_matTolc', 'tolc_scienzeTolc', 'tolc_comprensione'],
    'TOLC-VET': ['tolc_vet', 'tolc_logica', 'tolc_matTolc', 'tolc_scienzeTolc', 'tolc_comprensione'],
    'TOLC-SU': ['tolc_su', 'tolc_logica', 'tolc_matTolc', 'tolc_comprensione'],
    'TOLC-F': ['tolc_f', 'tolc_logica', 'tolc_matTolc', 'tolc_scienzeTolc', 'tolc_comprensione'],
    'TOLC-B': ['tolc_b', 'tolc_logica', 'tolc_matTolc', 'tolc_scienzeTolc', 'tolc_comprensione'],
    'TOLC-AV': ['tolc_av', 'tolc_logica', 'tolc_matTolc', 'tolc_comprensione'],
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
    ],

    // ==========================================
    // TOLC QUIZZES
    // ==========================================
    tolc_logica: [
        {
            question: "Se tutti i gatti sono animali e alcuni animali sono domestici, allora:",
            options: ["Tutti i gatti sono domestici", "Alcuni gatti potrebbero essere domestici", "Nessun gatto e domestico", "Tutti gli animali sono gatti"],
            correct: 1
        },
        {
            question: "Quale numero completa la serie: 2, 6, 18, 54, ...?",
            options: ["108", "162", "72", "216"],
            correct: 1
        },
        {
            question: "Se A implica B, e B e falso, allora:",
            options: ["A e vero", "A e falso", "Non si puo concludere nulla", "B e vero"],
            correct: 1
        },
        {
            question: "In un gruppo di 30 studenti, 18 studiano inglese e 15 francese. Almeno quanti studiano entrambe?",
            options: ["3", "5", "0", "15"],
            correct: 0
        },
        {
            question: "Quale termine non appartiene alla serie: mela, pera, carota, banana, arancia?",
            options: ["Mela", "Pera", "Carota", "Banana"],
            correct: 2
        }
    ],
    tolc_matTolc: [
        {
            question: "Il logaritmo in base 2 di 32 e:",
            options: ["4", "5", "6", "3"],
            correct: 1
        },
        {
            question: "L'equazione x^2 - 5x + 6 = 0 ha soluzioni:",
            options: ["x = 2 e x = 3", "x = 1 e x = 6", "x = -2 e x = -3", "Nessuna soluzione reale"],
            correct: 0
        },
        {
            question: "Il seno di 30 gradi vale:",
            options: ["1/2", "sqrt(3)/2", "sqrt(2)/2", "1"],
            correct: 0
        },
        {
            question: "La derivata di x^3 e:",
            options: ["x^2", "3x^2", "3x", "x^4/4"],
            correct: 1
        },
        {
            question: "Una retta con pendenza 0 e:",
            options: ["Verticale", "Orizzontale", "Obliqua a 45 gradi", "Non esiste"],
            correct: 1
        }
    ],
    tolc_comprensione: [
        {
            question: "In un testo argomentativo, la tesi e:",
            options: ["Un esempio pratico", "La posizione sostenuta dall'autore", "La conclusione del testo", "Una citazione"],
            correct: 1
        },
        {
            question: "Un sinonimo di 'obsoleto' e:",
            options: ["Moderno", "Superato", "Necessario", "Evidente"],
            correct: 1
        },
        {
            question: "Quale connettivo indica una conseguenza?",
            options: ["Tuttavia", "Pertanto", "Sebbene", "Oppure"],
            correct: 1
        },
        {
            question: "L'antitesi e una figura retorica che:",
            options: ["Ripete un suono", "Accosta concetti opposti", "Esagera un concetto", "Attribuisce qualita umane a oggetti"],
            correct: 1
        },
        {
            question: "In un sillogismo, se la premessa maggiore e falsa:",
            options: ["La conclusione e comunque vera", "La conclusione non e necessariamente vera", "Le premesse diventano irrilevanti", "Il sillogismo e sempre valido"],
            correct: 1
        }
    ],
    tolc_scienzeTolc: [
        {
            question: "Il DNA e composto da:",
            options: ["Amminoacidi", "Nucleotidi", "Lipidi", "Carboidrati"],
            correct: 1
        },
        {
            question: "La fotosintesi avviene nei:",
            options: ["Mitocondri", "Cloroplasti", "Ribosomi", "Lisosomi"],
            correct: 1
        },
        {
            question: "L'unita SI della forza e il:",
            options: ["Joule", "Newton", "Watt", "Pascal"],
            correct: 1
        },
        {
            question: "Il numero di Avogadro e circa:",
            options: ["6.02 x 10^23", "3.14 x 10^8", "1.6 x 10^-19", "9.8 x 10^1"],
            correct: 0
        },
        {
            question: "La mitosi produce:",
            options: ["4 cellule diverse", "2 cellule identiche", "1 cellula piu grande", "4 cellule identiche"],
            correct: 1
        }
    ],

    // ==========================================
    // SUPERIORI QUIZZES
    // ==========================================
    sup_matematica: [
        {
            question: "Il discriminante dell'equazione ax^2 + bx + c = 0 e:",
            options: ["a^2 - 4bc", "b^2 - 4ac", "c^2 - 4ab", "b^2 + 4ac"],
            correct: 1
        },
        {
            question: "Il valore di pi greco e circa:",
            options: ["2.14", "3.14", "4.14", "3.41"],
            correct: 1
        },
        {
            question: "Una funzione e pari se:",
            options: ["f(-x) = f(x)", "f(-x) = -f(x)", "f(0) = 0", "f(x) > 0 per ogni x"],
            correct: 0
        },
        {
            question: "log(100) in base 10 e uguale a:",
            options: ["1", "2", "10", "100"],
            correct: 1
        },
        {
            question: "La somma degli angoli interni di un triangolo e:",
            options: ["90 gradi", "180 gradi", "270 gradi", "360 gradi"],
            correct: 1
        }
    ],
    sup_italiano: [
        {
            question: "Chi ha scritto 'I Promessi Sposi'?",
            options: ["Giacomo Leopardi", "Alessandro Manzoni", "Giovanni Verga", "Luigi Pirandello"],
            correct: 1
        },
        {
            question: "Il Futurismo e un movimento letterario del:",
            options: ["Ottocento", "Primo Novecento", "Secondo Novecento", "Settecento"],
            correct: 1
        },
        {
            question: "L'analisi del periodo studia:",
            options: ["Le singole parole", "I rapporti tra le proposizioni", "I suoni delle parole", "La punteggiatura"],
            correct: 1
        },
        {
            question: "Un ossimoro e:",
            options: ["Una ripetizione di suoni", "L'accostamento di termini contraddittori", "Un'esagerazione", "Un paragone"],
            correct: 1
        },
        {
            question: "La Divina Commedia e scritta in:",
            options: ["Prosa", "Terzine di endecasillabi", "Sonetti", "Ottave"],
            correct: 1
        }
    ],
    sup_fisica: [
        {
            question: "La velocita e il rapporto tra:",
            options: ["Massa e tempo", "Spazio e tempo", "Forza e massa", "Energia e tempo"],
            correct: 1
        },
        {
            question: "L'accelerazione di gravita sulla Terra e circa:",
            options: ["8.9 m/s^2", "9.8 m/s^2", "10.8 m/s^2", "6.7 m/s^2"],
            correct: 1
        },
        {
            question: "La legge di Ohm afferma che V =",
            options: ["I / R", "I * R", "R / I", "I + R"],
            correct: 1
        },
        {
            question: "L'unita di misura della potenza e il:",
            options: ["Joule", "Newton", "Watt", "Ampere"],
            correct: 2
        },
        {
            question: "Un corpo in caduta libera (senza attrito) ha accelerazione:",
            options: ["Crescente", "Costante", "Decrescente", "Nulla"],
            correct: 1
        }
    ],
    sup_latino: [
        {
            question: "Rosa, rosae appartiene alla:",
            options: ["Prima declinazione", "Seconda declinazione", "Terza declinazione", "Quarta declinazione"],
            correct: 0
        },
        {
            question: "L'Eneide e stata scritta da:",
            options: ["Ovidio", "Virgilio", "Orazio", "Cicerone"],
            correct: 1
        },
        {
            question: "Il congiuntivo latino esprime:",
            options: ["Solo certezza", "Possibilita, desiderio, dubbio", "Solo comandi", "Solo il passato"],
            correct: 1
        },
        {
            question: "Il complemento di specificazione in latino e il caso:",
            options: ["Nominativo", "Genitivo", "Dativo", "Ablativo"],
            correct: 1
        },
        {
            question: "Quante declinazioni ha il latino?",
            options: ["3", "4", "5", "6"],
            correct: 2
        }
    ],
    sup_inglese: [
        {
            question: "Il Present Perfect si usa per:",
            options: ["Azioni future", "Azioni passate con legame al presente", "Azioni in corso", "Abitudini passate"],
            correct: 1
        },
        {
            question: "Quale frase e corretta?",
            options: ["I have went", "I have gone", "I have go", "I have goed"],
            correct: 1
        },
        {
            question: "Il Second Conditional usa:",
            options: ["If + present, will + infinitive", "If + past simple, would + infinitive", "If + past perfect, would have + past participle", "If + present, present"],
            correct: 1
        },
        {
            question: "'Although' introduce una proposizione:",
            options: ["Causale", "Concessiva", "Finale", "Temporale"],
            correct: 1
        },
        {
            question: "Il plurale di 'child' e:",
            options: ["Childs", "Children", "Childes", "Childern"],
            correct: 1
        }
    ],
    sup_storia: [
        {
            question: "La Rivoluzione Industriale e iniziata nel:",
            options: ["XVII secolo in Francia", "XVIII secolo in Inghilterra", "XIX secolo in Germania", "XVI secolo in Italia"],
            correct: 1
        },
        {
            question: "L'Italia e entrata nella Prima Guerra Mondiale nel:",
            options: ["1914", "1915", "1916", "1917"],
            correct: 1
        },
        {
            question: "La marcia su Roma e avvenuta nel:",
            options: ["1920", "1922", "1924", "1926"],
            correct: 1
        },
        {
            question: "Il referendum Repubblica/Monarchia in Italia si e tenuto nel:",
            options: ["1945", "1946", "1947", "1948"],
            correct: 1
        },
        {
            question: "La Guerra Fredda e il conflitto tra:",
            options: ["USA e Cina", "USA e URSS", "UK e Francia", "Germania e Russia"],
            correct: 1
        }
    ],
    sup_filosofia: [
        {
            question: "Socrate e noto per il metodo:",
            options: ["Deduttivo", "Maieutico", "Induttivo", "Sperimentale"],
            correct: 1
        },
        {
            question: "Cogito ergo sum e di:",
            options: ["Kant", "Cartesio", "Hegel", "Nietzsche"],
            correct: 1
        },
        {
            question: "L'Illuminismo si sviluppa nel:",
            options: ["Cinquecento", "Seicento", "Settecento", "Ottocento"],
            correct: 2
        },
        {
            question: "Per Platone, le Idee sono:",
            options: ["Opinioni soggettive", "Realta perfette e immutabili", "Concetti scientifici", "Illusioni"],
            correct: 1
        },
        {
            question: "L'imperativo categorico e un concetto di:",
            options: ["Hegel", "Kant", "Marx", "Schopenhauer"],
            correct: 1
        }
    ],
    sup_informaticaTecn: [
        {
            question: "HTML e un linguaggio di:",
            options: ["Programmazione", "Markup", "Scripting", "Database"],
            correct: 1
        },
        {
            question: "In un database relazionale, i dati sono organizzati in:",
            options: ["Grafi", "Tabelle", "Alberi", "Liste"],
            correct: 1
        },
        {
            question: "L'indirizzo IP identifica:",
            options: ["Un sito web", "Un dispositivo in rete", "Un utente", "Un file"],
            correct: 1
        },
        {
            question: "Quale protocollo si usa per il web?",
            options: ["FTP", "SMTP", "HTTP", "SSH"],
            correct: 2
        },
        {
            question: "In Python, 'print' e una:",
            options: ["Variabile", "Classe", "Funzione", "Modulo"],
            correct: 2
        }
    ],
    sup_diritto: [
        {
            question: "La Costituzione italiana e entrata in vigore il:",
            options: ["25 aprile 1945", "2 giugno 1946", "1 gennaio 1948", "22 dicembre 1947"],
            correct: 2
        },
        {
            question: "Il Parlamento italiano e composto da:",
            options: ["Solo la Camera", "Camera e Senato", "Camera, Senato e Governo", "Solo il Senato"],
            correct: 1
        },
        {
            question: "Il PIL misura:",
            options: ["Il debito pubblico", "Il valore della produzione di un Paese", "Le esportazioni", "La disoccupazione"],
            correct: 1
        },
        {
            question: "L'articolo 1 della Costituzione afferma che l'Italia e:",
            options: ["Una monarchia", "Una repubblica presidenziale", "Una repubblica democratica fondata sul lavoro", "Uno stato federale"],
            correct: 2
        },
        {
            question: "Lo Stato sociale (welfare state) garantisce:",
            options: ["Solo la difesa militare", "Servizi essenziali ai cittadini", "Solo il libero mercato", "L'anarchia"],
            correct: 1
        }
    ],
    sup_maturita: [
        {
            question: "La prima prova della maturita e di:",
            options: ["Matematica", "Italiano", "La materia di indirizzo", "Inglese"],
            correct: 1
        },
        {
            question: "Il punteggio massimo alla maturita e:",
            options: ["60/60", "100/100", "110/110", "30/30"],
            correct: 1
        },
        {
            question: "Il credito scolastico massimo (triennio) e di:",
            options: ["30 punti", "40 punti", "50 punti", "20 punti"],
            correct: 1
        },
        {
            question: "La tipologia A della prima prova e:",
            options: ["Tema argomentativo", "Analisi del testo", "Tema di attualita", "Comprensione"],
            correct: 1
        },
        {
            question: "Il colloquio orale parte da:",
            options: ["Una domanda del presidente", "Un materiale scelto dalla commissione", "La tesina", "La media dei voti"],
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
