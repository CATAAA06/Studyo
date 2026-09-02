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
   DESCRIZIONI DELLE MATERIE
   Una riga che dice cosa si studia davvero.
   ============================================= */

const MATERIE_DESC = {
    // --- Scientifica / Ingegneria ---
    analisi1: 'Limiti, derivate e integrali di funzioni di una variabile.',
    analisi2: 'Funzioni di più variabili, integrali multipli ed equazioni differenziali.',
    fisica1: 'Meccanica, termodinamica e le leggi del moto.',
    fisica2: 'Elettromagnetismo, circuiti e onde.',
    chimica: 'Atomi, legami, reazioni e stechiometria.',
    chimicaOrg: 'Composti del carbonio: struttura, reattività e meccanismi.',
    informatica: 'Algoritmi, strutture dati e fondamenti della programmazione.',
    programmazione: 'Scrivere codice: variabili, cicli, funzioni e oggetti.',
    algebra: 'Matrici, spazi vettoriali, autovalori e geometria analitica.',
    statistica: 'Descrivere i dati, probabilità e inferenza statistica.',
    biologia: 'La cellula, il DNA e i meccanismi della vita.',
    calcoloNum: 'Risolvere problemi matematici con metodi approssimati al computer.',
    archCalcolatori: 'Come funziona un computer dentro: CPU, memoria, assembly.',
    sistemiOperativi: 'Processi, thread, memoria e file system.',
    basiDati: 'Modello relazionale, SQL e progettazione di database.',
    retiCalcolatori: 'Protocolli, TCP/IP e come viaggiano i dati in rete.',
    ingSoftware: 'Progettare, testare e mantenere software di qualità.',
    ricercaOperativa: 'Ottimizzazione: trovare la soluzione migliore tra molte.',
    meccanica: 'Cinematica e dinamica dei corpi rigidi.',
    elettrotecnica: 'Circuiti elettrici in continua e alternata.',
    segnali: 'Analisi di Fourier, filtri e trasmissione dei segnali.',
    automatica: 'Sistemi di controllo, stabilità e retroazione.',
    elettronica: 'Diodi, transistor e circuiti analogici e digitali.',
    telecomunicazioni: 'Modulazione, canali e trasmissione delle informazioni.',
    fisicaTecnica: 'Termodinamica applicata, scambio termico e acustica.',
    scienzaCostruzioni: 'Sforzi, deformazioni e resistenza delle strutture.',
    idraulica: 'Statica e dinamica dei fluidi, condotte e canali.',
    tecnologiaMat: 'Proprietà e lavorazione di metalli, polimeri e compositi.',
    disegnoTecnico: 'Rappresentazione tecnica, proiezioni e CAD.',
    geotecnica: 'Comportamento di terreni e fondazioni.',
    termodinamica: 'Calore, lavoro, entropia e cicli termodinamici.',

    // --- Economia ---
    microeconomia: 'Scelte di consumatori e imprese, domanda, offerta e mercati.',
    macroeconomia: 'PIL, inflazione, disoccupazione e politiche economiche.',
    ragioneria: 'Scritture contabili e costruzione del bilancio d\'esercizio.',
    ragioneriaApp: 'Bilancio consolidato, valutazioni e casi complessi.',
    marketing: 'Segmentazione, posizionamento e le leve del marketing mix.',
    pianificazione: 'Business plan, strategia e controllo di gestione.',
    matFin: 'Interessi, rendite, ammortamenti e valutazione di investimenti.',
    econometria: 'Modelli statistici applicati ai dati economici.',
    dirCommerciale: 'Imprese, società, contratti e titoli di credito.',
    dirPubblico: 'Organizzazione dello Stato e rapporti con i cittadini.',
    scienzaFinanze: 'Spesa pubblica, tassazione e bilancio dello Stato.',
    economiaIndustriale: 'Struttura dei mercati, concorrenza e strategie d\'impresa.',
    egi: 'Come si governa un\'impresa: funzioni, processi e decisioni.',
    intermediariFin: 'Banche, mercati finanziari e strumenti di credito.',
    analisiBilancio: 'Leggere un bilancio con indici e flussi di cassa.',

    // --- Giuridica ---
    giurisprudenza: 'Persone, beni, obbligazioni e contratti nel Codice Civile.',
    dirCostituzionale: 'Costituzione, organi dello Stato e diritti fondamentali.',
    dirPenale: 'Reato, pena e principi di responsabilità penale.',
    dirLavoro: 'Contratto di lavoro, diritti dei lavoratori e sindacati.',
    filosofia: 'Il fondamento del diritto: giusnaturalismo e positivismo.',
    dirUE: 'Istituzioni europee, fonti e libertà del mercato unico.',
    procCivile: 'Il processo civile: atti, prove, sentenza e impugnazioni.',
    dirRomano: 'Le radici romane degli istituti giuridici moderni.',
    storiaDiritto: 'Come si è formato il diritto dal Medioevo a oggi.',
    dirAmministrativo: 'Pubblica amministrazione, atti e giustizia amministrativa.',
    dirInternazionale: 'Rapporti tra Stati, trattati e organizzazioni internazionali.',
    procPenale: 'Indagini, dibattimento e garanzie dell\'imputato.',
    dirTributario: 'Tributi, dichiarazioni e rapporto con il Fisco.',
    econPolitica: 'Fondamenti di micro e macroeconomia per giuristi.',
    dirEcclesiastico: 'Rapporti tra Stato e confessioni religiose.',

    // --- Umanistica ---
    letteratura: 'Autori e opere dalla lingua delle origini al Novecento.',
    storia: 'Dall\'Ottocento a oggi: guerre, regimi e trasformazioni.',
    filosofiaGen: 'Il pensiero occidentale dai greci ai contemporanei.',
    linguistica: 'Come funziona il linguaggio: suoni, forme e significati.',
    pedagogia: 'Teorie dell\'educazione e metodi di insegnamento.',
    psicologia: 'Percezione, memoria, apprendimento e motivazione.',
    sociologia: 'Società, istituzioni e dinamiche dei gruppi.',
    storiaArte: 'Opere, stili e movimenti dall\'antichità al contemporaneo.',
    inglese: 'Grammatica avanzata, lessico accademico e comprensione.',
    psicSviluppo: 'Come cambiano mente e comportamento dall\'infanzia all\'età adulta.',
    psicSociale: 'Influenza sociale, pregiudizi e comportamento nei gruppi.',
    psicometria: 'Costruire e validare test psicologici, statistica applicata.',
    psicClinica: 'Psicopatologia, diagnosi e modelli di intervento.',
    neuroscienze: 'Basi biologiche del comportamento e del sistema nervoso.',
    glottologia: 'Origine, parentela ed evoluzione delle lingue.',
    geografia: 'Territorio, popolazione e organizzazione degli spazi.',
    antropologia: 'Culture, riti e società attraverso lo sguardo etnografico.',
    letteraturaLat: 'Autori latini: Virgilio, Cicerone, Orazio, Seneca.',
    storiaMedievale: 'Dall\'impero romano d\'Occidente all\'età comunale.',
    storiaModerna: 'Dalle scoperte geografiche alla Rivoluzione francese.',

    // --- Medicina ---
    anatomia: 'Struttura del corpo umano, apparato per apparato.',
    fisiologia: 'Come funzionano organi e sistemi nel corpo sano.',
    biochimica: 'Metabolismo, enzimi e molecole della vita.',
    patologia: 'Meccanismi della malattia: infiammazione, neoplasie, degenerazione.',
    farmacologia: 'Come agiscono i farmaci: dosi, effetti e interazioni.',
    istologia: 'Tessuti al microscopio e sviluppo embrionale.',
    geneticaMed: 'Ereditarietà, mutazioni e malattie genetiche.',
    microbiologia: 'Batteri, virus, funghi e loro ruolo nelle infezioni.',
    immunologia: 'Difese dell\'organismo, vaccini e autoimmunità.',
    igiene: 'Prevenzione, epidemiologia e salute pubblica.',
    anatomiaPat: 'Diagnosi attraverso l\'esame di tessuti e lesioni.',
    medInterna: 'Diagnosi e terapia delle principali malattie sistemiche.',
    chirurgiaGen: 'Indicazioni chirurgiche, tecniche e gestione del paziente.',
    neurologia: 'Malattie di cervello, midollo e nervi periferici.',
    psichiatria: 'Disturbi mentali: diagnosi, terapia e presa in carico.',
    cardiologia: 'Cuore e circolazione: dall\'ECG allo scompenso.',
    radiologia: 'Radiografia, TC, risonanza ed ecografia.',
    malattieInf: 'Infezioni, antibiotici e gestione epidemiologica.',
    pediatria: 'Salute e patologie del bambino, crescita e sviluppo.',
    ginecologia: 'Apparato femminile, gravidanza e parto.',
    medLegale: 'Responsabilità sanitaria, perizie e medicina forense.',

    // --- Superiori (principali) ---
    sup_italiano: 'Analisi del testo, letteratura e scrittura argomentativa.',
    sup_matematica: 'Funzioni, equazioni, geometria analitica e analisi.',
    sup_inglese: 'Grammatica, lessico e comprensione scritta e orale.',
    sup_storia: 'Dalle rivoluzioni al mondo contemporaneo.',
    sup_scienze: 'Biologia, chimica e scienze della Terra.',
    sup_fisica: 'Meccanica, termodinamica, elettromagnetismo.',
    sup_chimica: 'Atomi, reazioni, soluzioni e chimica organica di base.',
    sup_filosofia: 'Dai presocratici ai filosofi contemporanei.',
    sup_latino: 'Morfologia, sintassi e traduzione dei classici.',
    sup_greco: 'Alfabeto, sintassi e autori greci antichi.',
    sup_maturita: 'Prima prova, seconda prova e colloquio orale.',
    sup_informaticaTecn: 'Programmazione, database e sviluppo web.',
    sup_diritto: 'Costituzione, Stato ed elementi di economia.',
    sup_econAziendale: 'Contabilità, bilancio e gestione d\'impresa.',

    // --- TOLC ---
    tolc_i: 'Test d\'ingresso per Ingegneria: matematica, logica, scienze.',
    tolc_e: 'Test d\'ingresso per Economia: logica, matematica, comprensione.',
    tolc_med: 'Test d\'ingresso per Medicina: biologia, chimica, logica.',
    tolc_su: 'Test per Scienze Umanistiche: comprensione e cultura generale.',
    tolc_f: 'Test per Farmacia: biologia, chimica, matematica.',
    tolc_b: 'Test per Biologia e Biotecnologie.',
    tolc_av: 'Test per Architettura: logica, storia, disegno.',
    tolc_vet: 'Test per Veterinaria: biologia, chimica, logica.',
    tolc_logica: 'Sillogismi, sequenze, deduzioni e problem solving.',
    tolc_matTolc: 'Algebra, geometria, funzioni e trigonometria.',
    tolc_comprensione: 'Capire, analizzare e interpretare un testo.',
    tolc_scienzeTolc: 'Biologia, chimica e fisica per i test d\'ingresso.'
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
    ],

    /* ---------- SCIENTIFICA / INGEGNERIA ---------- */
    analisi2: [
        { question: "La derivata parziale ∂f/∂x si calcola:", options: ["Derivando rispetto a x e trattando y come costante", "Derivando rispetto a tutte le variabili", "Facendo la media delle derivate", "Integrando rispetto a y"], correct: 0 },
        { question: "Il gradiente di una funzione punta nella direzione di:", options: ["Minima crescita", "Massima crescita", "Nessuna variazione", "Massima curvatura"], correct: 1 },
        { question: "Un punto critico con hessiano negativo è:", options: ["Un massimo", "Un minimo", "Una sella", "Un flesso"], correct: 2 },
        { question: "L'equazione y' = f(x)g(y) si dice:", options: ["Lineare", "A variabili separabili", "Omogenea", "Esatta"], correct: 1 },
        { question: "Il teorema di Schwarz riguarda:", options: ["L'uguaglianza delle derivate miste", "La convergenza delle serie", "L'esistenza degli integrali", "La continuità delle funzioni"], correct: 0 }
    ],
    algebra: [
        { question: "Una matrice quadrata è invertibile se e solo se:", options: ["È simmetrica", "Il determinante è diverso da zero", "Ha tutti elementi positivi", "È diagonale"], correct: 1 },
        { question: "Gli autovalori si trovano risolvendo:", options: ["det(A − λI) = 0", "A·v = 0", "tr(A) = 0", "A + I = 0"], correct: 0 },
        { question: "Il teorema di Rouché-Capelli dice che il sistema ha soluzioni se:", options: ["Il determinante è nullo", "rango(A) = rango(A|b)", "Ci sono più equazioni che incognite", "La matrice è quadrata"], correct: 1 },
        { question: "Il rango di una matrice è:", options: ["Il numero di righe", "Il numero massimo di righe linearmente indipendenti", "La somma degli elementi", "Il determinante"], correct: 1 },
        { question: "Una base di uno spazio vettoriale è:", options: ["Un insieme qualsiasi di vettori", "Vettori indipendenti che generano lo spazio", "Il vettore nullo", "L'insieme di tutti i vettori"], correct: 1 }
    ],
    fisica2: [
        { question: "La forza tra due cariche varia con la distanza come:", options: ["1/r", "1/r²", "r", "r²"], correct: 1 },
        { question: "Il teorema di Gauss lega il flusso del campo elettrico a:", options: ["La carica racchiusa", "La massa", "La velocità", "Il campo magnetico"], correct: 0 },
        { question: "La legge di Lenz stabilisce che la corrente indotta:", options: ["Amplifica la variazione di flusso", "Si oppone alla variazione di flusso", "È sempre nulla", "È costante"], correct: 1 },
        { question: "L'unità di misura della capacità è:", options: ["Henry", "Farad", "Tesla", "Weber"], correct: 1 },
        { question: "Un campo magnetico esercita forza su una carica:", options: ["Sempre", "Solo se la carica è in moto", "Solo se ferma", "Mai"], correct: 1 }
    ],
    programmazione: [
        { question: "L'accesso a un elemento di un array per indice ha complessità:", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correct: 0 },
        { question: "Una funzione ricorsiva senza caso base provoca:", options: ["Un ciclo infinito controllato", "Stack overflow", "Un errore di sintassi", "Nessun problema"], correct: 1 },
        { question: "Nel passaggio per riferimento, le modifiche:", options: ["Non sono visibili al chiamante", "Sono visibili al chiamante", "Creano una copia", "Generano errore"], correct: 1 },
        { question: "L'incapsulamento consiste nel:", options: ["Nascondere lo stato interno esponendo metodi", "Ereditare da una classe", "Creare più oggetti", "Ottimizzare il codice"], correct: 0 },
        { question: "Una lista concatenata rispetto a un array offre:", options: ["Accesso più rapido per indice", "Inserimento più efficiente", "Meno memoria sempre", "Ordinamento automatico"], correct: 1 }
    ],
    archCalcolatori: [
        { question: "La pipeline serve a:", options: ["Ridurre il consumo", "Sovrapporre le fasi delle istruzioni", "Aumentare la RAM", "Comprimere i dati"], correct: 1 },
        { question: "La cache sfrutta il principio di:", options: ["Località temporale e spaziale", "Ridondanza", "Parallelismo massivo", "Virtualizzazione"], correct: 0 },
        { question: "Nell'architettura Harvard:", options: ["Dati e istruzioni condividono la memoria", "Dati e istruzioni hanno memorie separate", "Non esiste la cache", "La CPU è unica"], correct: 1 },
        { question: "Il complemento a due serve per rappresentare:", options: ["I numeri negativi", "I numeri decimali", "I caratteri", "Le istruzioni"], correct: 0 },
        { question: "La memoria più veloce della gerarchia è:", options: ["Il disco", "La RAM", "I registri della CPU", "La cache L3"], correct: 2 }
    ],
    sistemiOperativi: [
        { question: "I thread dello stesso processo condividono:", options: ["Lo spazio di memoria", "Solo i registri", "Nulla", "Il disco"], correct: 0 },
        { question: "Il deadlock è una situazione in cui:", options: ["Un processo termina", "Più processi attendono a vicenda risorse", "La CPU è al 100%", "La memoria è piena"], correct: 1 },
        { question: "La memoria virtuale si basa su:", options: ["La paginazione", "La compressione", "La cache", "Il clock"], correct: 0 },
        { question: "Il context switch consiste nel:", options: ["Cambiare utente", "Salvare lo stato di un processo e ripristinarne un altro", "Riavviare il sistema", "Liberare la RAM"], correct: 1 },
        { question: "Un semaforo serve a:", options: ["Misurare le prestazioni", "Sincronizzare l'accesso a risorse condivise", "Comprimere file", "Gestire la rete"], correct: 1 }
    ],
    basiDati: [
        { question: "Una chiave primaria:", options: ["Può essere NULL", "Identifica univocamente ogni tupla", "Può ripetersi", "È sempre testuale"], correct: 1 },
        { question: "La chiave esterna garantisce:", options: ["La velocità delle query", "L'integrità referenziale", "La compressione", "L'ordinamento"], correct: 1 },
        { question: "Il LEFT JOIN restituisce:", options: ["Solo le righe con corrispondenza", "Tutte le righe della tabella di sinistra", "Solo quelle di destra", "Nessuna riga"], correct: 1 },
        { question: "ACID sta per:", options: ["Atomicità, Consistenza, Isolamento, Durabilità", "Accesso, Controllo, Indice, Dati", "Analisi, Codifica, Input, Design", "Nessuna delle precedenti"], correct: 0 },
        { question: "La normalizzazione serve a:", options: ["Aumentare la ridondanza", "Eliminare ridondanze e anomalie", "Velocizzare sempre le query", "Cifrare i dati"], correct: 1 }
    ],
    retiCalcolatori: [
        { question: "Rispetto a UDP, il protocollo TCP è:", options: ["Più veloce ma inaffidabile", "Affidabile e orientato alla connessione", "Senza controllo di errore", "Usato solo per streaming"], correct: 1 },
        { question: "Quanti livelli ha il modello ISO/OSI?", options: ["4", "5", "7", "9"], correct: 2 },
        { question: "Il DNS serve a:", options: ["Cifrare i dati", "Tradurre nomi di dominio in indirizzi IP", "Instradare i pacchetti", "Assegnare indirizzi MAC"], correct: 1 },
        { question: "Il three-way handshake avviene con:", options: ["SYN, SYN-ACK, ACK", "GET, POST, PUT", "ARP, RARP, ICMP", "OPEN, SEND, CLOSE"], correct: 0 },
        { question: "L'indirizzo MAC opera al livello:", options: ["Applicazione", "Trasporto", "Collegamento dati", "Rete"], correct: 2 }
    ],
    chimicaOrg: [
        { question: "Il gruppo funzionale −COOH identifica:", options: ["Un alcol", "Un acido carbossilico", "Un'ammina", "Un chetone"], correct: 1 },
        { question: "La reazione SN2 procede con:", options: ["Formazione di carbocatione", "Un solo stadio e inversione di configurazione", "Racemizzazione completa", "Due stadi distinti"], correct: 1 },
        { question: "Gli enantiomeri sono:", options: ["Molecole identiche", "Immagini speculari non sovrapponibili", "Isomeri di posizione", "Stessa molecola ruotata"], correct: 1 },
        { question: "La regola di Markovnikov riguarda:", options: ["L'addizione agli alcheni", "L'ossidazione degli alcoli", "La riduzione dei chetoni", "L'idrolisi degli esteri"], correct: 0 },
        { question: "Il benzene è stabilizzato da:", options: ["Legami tripli", "Risonanza", "Tensione di anello", "Legami idrogeno"], correct: 1 }
    ],
    biologia: [
        { question: "La cellula procariote si distingue perché:", options: ["Ha il nucleo", "Non ha nucleo né organelli membranosi", "È più grande", "Ha i mitocondri"], correct: 1 },
        { question: "La meiosi produce:", options: ["2 cellule diploidi", "4 cellule aploidi", "2 cellule aploidi", "4 cellule diploidi"], correct: 1 },
        { question: "Il dogma centrale della biologia molecolare è:", options: ["DNA → RNA → proteina", "Proteina → RNA → DNA", "RNA → DNA → proteina", "DNA → proteina → RNA"], correct: 0 },
        { question: "I mitocondri producono:", options: ["Proteine", "ATP", "DNA", "Lipidi"], correct: 1 },
        { question: "La fotosintesi avviene nei:", options: ["Ribosomi", "Cloroplasti", "Lisosomi", "Mitocondri"], correct: 1 }
    ],

    /* ---------- ECONOMIA ---------- */
    macroeconomia: [
        { question: "Il PIL misura:", options: ["Il debito pubblico", "Il valore dei beni e servizi finali prodotti", "La ricchezza accumulata", "Il reddito medio"], correct: 1 },
        { question: "Il PIL reale differisce dal nominale perché:", options: ["Include l'estero", "È depurato dall'inflazione", "Considera solo i servizi", "Esclude le imposte"], correct: 1 },
        { question: "La curva di Phillips descrive la relazione tra:", options: ["Inflazione e disoccupazione", "PIL e tassi", "Risparmio e investimento", "Import ed export"], correct: 0 },
        { question: "Una politica monetaria espansiva prevede:", options: ["Aumento dei tassi", "Riduzione dei tassi e più moneta", "Aumento delle tasse", "Riduzione della spesa"], correct: 1 },
        { question: "L'inflazione comporta:", options: ["Aumento del potere d'acquisto", "Riduzione del potere d'acquisto", "Nessun effetto sui prezzi", "Deflazione"], correct: 1 }
    ],
    ragioneria: [
        { question: "La partita doppia registra ogni operazione:", options: ["Una sola volta", "Due volte, in dare e in avere", "Tre volte", "Solo a fine anno"], correct: 1 },
        { question: "Lo stato patrimoniale rappresenta:", options: ["Il risultato d'esercizio", "La situazione di attività e passività a una data", "I flussi di cassa", "Le previsioni future"], correct: 1 },
        { question: "L'ammortamento serve a:", options: ["Ripartire il costo di un bene pluriennale", "Aumentare l'utile", "Pagare i debiti", "Distribuire dividendi"], correct: 0 },
        { question: "I risconti attivi rappresentano costi:", options: ["Già maturati non pagati", "Già pagati ma di competenza futura", "Mai sostenuti", "Straordinari"], correct: 1 },
        { question: "Il conto economico evidenzia:", options: ["Il patrimonio netto", "Costi, ricavi e risultato d'esercizio", "Solo la liquidità", "I soci"], correct: 1 }
    ],
    dirCommerciale: [
        { question: "L'imprenditore secondo l'art. 2082 c.c. esercita l'attività:", options: ["Occasionalmente", "Professionalmente e in modo organizzato", "Solo con dipendenti", "Senza scopo di lucro"], correct: 1 },
        { question: "Nelle società di capitali i soci rispondono:", options: ["Illimitatamente", "Nei limiti del conferimento", "Solo con il patrimonio personale", "Solidalmente e illimitatamente"], correct: 1 },
        { question: "L'azienda è definita come:", options: ["Il complesso dei beni organizzati per l'impresa", "L'insieme dei dipendenti", "Il capitale sociale", "La sede legale"], correct: 0 },
        { question: "La cambiale è:", options: ["Un contratto di lavoro", "Un titolo di credito", "Un atto costitutivo", "Una garanzia reale"], correct: 1 },
        { question: "L'assemblea dei soci nella S.p.A.:", options: ["Gestisce l'attività quotidiana", "Delibera sulle decisioni fondamentali", "Controlla i conti", "Rappresenta i creditori"], correct: 1 }
    ],
    matFin: [
        { question: "Nel regime composto il montante si calcola:", options: ["C(1+i·n)", "C(1+i)^n", "C·i·n", "C/(1+i)"], correct: 1 },
        { question: "L'attualizzazione serve a:", options: ["Portare un valore futuro al presente", "Calcolare gli interessi", "Aumentare il capitale", "Determinare il tasso"], correct: 0 },
        { question: "Un investimento conviene se il VAN è:", options: ["Negativo", "Maggiore di zero", "Uguale a zero", "Indifferente"], correct: 1 },
        { question: "Una rendita è:", options: ["Un capitale unico", "Una successione di capitali a scadenze periodiche", "Un debito", "Un tasso di interesse"], correct: 1 },
        { question: "Nell'interesse semplice gli interessi:", options: ["Producono altri interessi", "Non si capitalizzano", "Sono sempre maggiori", "Variano ogni anno"], correct: 1 }
    ],

    /* ---------- GIURIDICA ---------- */
    dirCostituzionale: [
        { question: "La riserva di legge implica che una materia:", options: ["Può essere regolata da regolamenti", "Può essere disciplinata solo dalla legge", "Non è disciplinabile", "Spetta alle Regioni"], correct: 1 },
        { question: "Il bicameralismo italiano è definito perfetto perché:", options: ["Le Camere hanno funzioni diverse", "Camera e Senato hanno pari poteri", "C'è una sola Camera", "Il Senato è consultivo"], correct: 1 },
        { question: "Il decreto legge deve essere convertito entro:", options: ["30 giorni", "60 giorni", "90 giorni", "6 mesi"], correct: 1 },
        { question: "La Corte costituzionale giudica:", options: ["I reati comuni", "La legittimità costituzionale delle leggi", "Le cause civili", "I ricorsi amministrativi"], correct: 1 },
        { question: "Il decreto legislativo è adottato:", options: ["Su delega del Parlamento", "Per necessità e urgenza", "Dal Presidente della Repubblica", "Dalla Corte dei Conti"], correct: 0 }
    ],
    dirPenale: [
        { question: "Il dolo si distingue dalla colpa perché l'evento è:", options: ["Non voluto", "Previsto e voluto", "Impossibile", "Casuale"], correct: 1 },
        { question: "Il principio di legalità impone che:", options: ["La legge sia successiva al fatto", "Nessuno sia punito senza legge anteriore al fatto", "Il giudice crei la norma", "La pena sia sempre detentiva"], correct: 1 },
        { question: "Il tentativo richiede atti:", options: ["Idonei e diretti in modo non equivoco", "Meramente preparatori", "Solo pensati", "Sempre consumati"], correct: 0 },
        { question: "Le contravvenzioni sono punite con:", options: ["Reclusione e multa", "Arresto e ammenda", "Solo interdizione", "Nessuna pena"], correct: 1 },
        { question: "L'elemento oggettivo del reato comprende:", options: ["Solo il dolo", "Condotta, evento e nesso causale", "La sola volontà", "La pena"], correct: 1 }
    ],
    dirAmministrativo: [
        { question: "L'interesse legittimo è tutelato davanti al:", options: ["Giudice ordinario", "Giudice amministrativo", "Giudice penale", "Arbitro"], correct: 1 },
        { question: "I vizi di legittimità dell'atto amministrativo sono:", options: ["Incompetenza, eccesso di potere, violazione di legge", "Dolo, colpa, errore", "Nullità e annullabilità", "Forma e sostanza"], correct: 0 },
        { question: "Il silenzio-assenso significa che:", options: ["L'istanza è respinta", "Il decorso del termine equivale ad accoglimento", "Il procedimento si annulla", "Serve un nuovo atto"], correct: 1 },
        { question: "Il provvedimento amministrativo è caratterizzato da:", options: ["Autoritatività", "Bilateralità", "Gratuità", "Informalità"], correct: 0 },
        { question: "La discrezionalità amministrativa consiste nel:", options: ["Agire arbitrariamente", "Ponderare interesse pubblico e interessi secondari", "Applicare meccanicamente la legge", "Delegare ai privati"], correct: 1 }
    ],
    dirLavoro: [
        { question: "Il lavoro subordinato si caratterizza per:", options: ["Autonomia organizzativa", "Dipendenza e direzione altrui", "Assenza di retribuzione", "Durata determinata"], correct: 1 },
        { question: "Il licenziamento per giusta causa:", options: ["Richiede preavviso", "Non richiede preavviso", "È sempre nullo", "Richiede consenso del lavoratore"], correct: 1 },
        { question: "Lo Statuto dei lavoratori è la legge:", options: ["300/1970", "104/1992", "92/2012", "196/1997"], correct: 0 },
        { question: "Il TFR è:", options: ["Un premio di produzione", "Retribuzione differita liquidata a fine rapporto", "Un'indennità di malattia", "Un contributo previdenziale"], correct: 1 },
        { question: "Il CCNL stabilisce:", options: ["Solo l'orario", "I minimi retributivi e normativi di categoria", "Le imposte", "Il numero di dipendenti"], correct: 1 }
    ],
    dirUE: [
        { question: "Il regolamento europeo è:", options: ["Direttamente applicabile", "Da recepire con legge nazionale", "Solo una raccomandazione", "Vincolante per un solo Stato"], correct: 0 },
        { question: "La direttiva vincola gli Stati:", options: ["Nella forma", "Nel risultato da raggiungere", "In nessun modo", "Solo se ratificata"], correct: 1 },
        { question: "Le quattro libertà del mercato interno riguardano:", options: ["Merci, persone, servizi, capitali", "Stampa, culto, parola, voto", "Import, export, dazi, quote", "Lavoro, casa, studio, salute"], correct: 0 },
        { question: "In caso di conflitto tra norma UE e nazionale:", options: ["Prevale quella nazionale", "Prevale quella UE", "Decide il governo", "Si annullano entrambe"], correct: 1 },
        { question: "Il principio di sussidiarietà prevede che l'UE intervenga:", options: ["Sempre", "Solo se l'obiettivo non è raggiungibile meglio a livello nazionale", "Mai", "Solo su richiesta"], correct: 1 }
    ],

    /* ---------- MEDICINA ---------- */
    anatomia: [
        { question: "Il piano che divide il corpo in destra e sinistra è:", options: ["Frontale", "Sagittale", "Trasversale", "Obliquo"], correct: 1 },
        { question: "Quante vertebre cervicali ha l'uomo?", options: ["5", "7", "12", "9"], correct: 1 },
        { question: "La valvola tra atrio sinistro e ventricolo sinistro è:", options: ["Tricuspide", "Mitrale", "Aortica", "Polmonare"], correct: 1 },
        { question: "Le arterie trasportano il sangue:", options: ["Verso il cuore", "Dal cuore alla periferia", "Solo ossigenato", "Nei capillari linfatici"], correct: 1 },
        { question: "Il sistema nervoso centrale è formato da:", options: ["Encefalo e midollo spinale", "Nervi periferici", "Gangli e plessi", "Solo cervello"], correct: 0 }
    ],
    fisiologia: [
        { question: "Il potenziale d'azione è generato dall'ingresso di:", options: ["Potassio", "Sodio", "Cloro", "Calcio"], correct: 1 },
        { question: "La gittata cardiaca è data da:", options: ["Gittata sistolica × frequenza", "Pressione × resistenza", "Volume/tempo di riempimento", "Frequenza × pressione"], correct: 0 },
        { question: "L'omeostasi è mantenuta soprattutto da meccanismi di:", options: ["Feedback positivo", "Feedback negativo", "Amplificazione", "Inibizione totale"], correct: 1 },
        { question: "La filtrazione glomerulare avviene grazie alla pressione:", options: ["Oncotica", "Idrostatica", "Osmotica", "Atmosferica"], correct: 1 },
        { question: "L'effetto Bohr sposta la curva dell'emoglobina a destra in caso di:", options: ["Alcalosi", "Acidosi e aumento di CO₂", "Ipotermia", "Iperossia"], correct: 1 }
    ],
    biochimica: [
        { question: "Gli enzimi agiscono:", options: ["Aumentando l'energia di attivazione", "Abbassando l'energia di attivazione", "Consumandosi nella reazione", "Modificando l'equilibrio"], correct: 1 },
        { question: "La Km nella cinetica di Michaelis-Menten indica:", options: ["La velocità massima", "La concentrazione di substrato a metà Vmax", "Il numero di enzimi", "Il pH ottimale"], correct: 1 },
        { question: "La glicolisi avviene:", options: ["Nel citosol", "Nella matrice mitocondriale", "Nel nucleo", "Nel reticolo"], correct: 0 },
        { question: "Il ciclo di Krebs si svolge:", options: ["Nel citosol", "Nella matrice mitocondriale", "Nei ribosomi", "Nel Golgi"], correct: 1 },
        { question: "La struttura secondaria delle proteine comprende:", options: ["La sequenza amminoacidica", "α-elica e β-foglietto", "Più subunità", "Il ripiegamento globale"], correct: 1 }
    ],
    patologia: [
        { question: "I segni classici dell'infiammazione sono:", options: ["Rubor, tumor, calor, dolor", "Febbre, tosse, astenia", "Pallore, freddo, rigidità", "Nausea, vomito, diarrea"], correct: 0 },
        { question: "L'apoptosi si distingue dalla necrosi perché:", options: ["Provoca infiammazione", "È morte programmata senza infiammazione", "È sempre patologica", "Coinvolge interi tessuti"], correct: 1 },
        { question: "Un tumore maligno si caratterizza per:", options: ["Crescita espansiva e capsula", "Infiltrazione e metastasi", "Assenza di mitosi", "Regressione spontanea"], correct: 1 },
        { question: "L'ipertrofia consiste in:", options: ["Aumento del numero di cellule", "Aumento del volume delle cellule", "Riduzione del tessuto", "Trasformazione in altro tessuto"], correct: 1 },
        { question: "L'ischemia prolungata provoca:", options: ["Iperplasia", "Infarto", "Atrofia reversibile", "Metaplasia"], correct: 1 }
    ],
    farmacologia: [
        { question: "La farmacocinetica studia:", options: ["Cosa fa il farmaco all'organismo", "Cosa fa l'organismo al farmaco", "Le reazioni avverse", "Il costo del farmaco"], correct: 1 },
        { question: "ADME significa:", options: ["Assorbimento, Distribuzione, Metabolismo, Escrezione", "Analisi, Dose, Modalità, Effetto", "Azione, Durata, Meccanismo, Efficacia", "Nessuna delle precedenti"], correct: 0 },
        { question: "Un antagonista recettoriale:", options: ["Lega e attiva il recettore", "Lega senza attivare, bloccando l'agonista", "Non lega il recettore", "Distrugge il recettore"], correct: 1 },
        { question: "L'emivita è il tempo in cui la concentrazione:", options: ["Raddoppia", "Si dimezza", "Si annulla", "Raggiunge il picco"], correct: 1 },
        { question: "L'effetto di primo passaggio avviene principalmente:", options: ["Nel rene", "Nel fegato", "Nel polmone", "Nello stomaco"], correct: 1 }
    ],

    /* ---------- UMANISTICA ---------- */
    psicologia: [
        { question: "La memoria a breve termine ha capacità di circa:", options: ["3±1 elementi", "7±2 elementi", "20 elementi", "Illimitata"], correct: 1 },
        { question: "Il condizionamento classico è stato studiato da:", options: ["Skinner", "Pavlov", "Freud", "Piaget"], correct: 1 },
        { question: "Nel condizionamento operante il rinforzo:", options: ["Riduce il comportamento", "Aumenta la probabilità del comportamento", "Non ha effetto", "Provoca estinzione"], correct: 1 },
        { question: "La dissonanza cognitiva è stata teorizzata da:", options: ["Festinger", "Maslow", "Watson", "Jung"], correct: 0 },
        { question: "Al vertice della piramide di Maslow c'è:", options: ["La sicurezza", "L'autorealizzazione", "L'appartenenza", "Il bisogno fisiologico"], correct: 1 }
    ],
    pedagogia: [
        { question: "La zona di sviluppo prossimale è un concetto di:", options: ["Piaget", "Vygotskij", "Montessori", "Dewey"], correct: 1 },
        { question: "Lo stadio operatorio formale secondo Piaget inizia intorno ai:", options: ["2 anni", "7 anni", "11-12 anni", "18 anni"], correct: 2 },
        { question: "Il metodo Montessori si basa su:", options: ["Lezione frontale", "Autonomia e ambiente preparato", "Ripetizione mnemonica", "Competizione"], correct: 1 },
        { question: "L'apprendimento significativo secondo Ausubel avviene quando:", options: ["Si memorizza a ripetizione", "Le nuove conoscenze si collegano a quelle esistenti", "Si studia da soli", "Si usa solo il libro"], correct: 1 },
        { question: "L'istruzione si distingue dall'educazione perché riguarda:", options: ["La formazione globale", "La trasmissione di conoscenze", "L'affettività", "La socializzazione"], correct: 1 }
    ],
    sociologia: [
        { question: "L'anomia è un concetto di:", options: ["Weber", "Durkheim", "Marx", "Parsons"], correct: 1 },
        { question: "Lo status indica:", options: ["Il comportamento atteso", "La posizione sociale occupata", "Il reddito", "Il titolo di studio"], correct: 1 },
        { question: "La socializzazione primaria avviene:", options: ["A scuola", "In famiglia", "Sul lavoro", "Nei media"], correct: 1 },
        { question: "L'agire razionale rispetto allo scopo è una categoria di:", options: ["Weber", "Durkheim", "Comte", "Simmel"], correct: 0 },
        { question: "La mobilità sociale verticale indica:", options: ["Uno spostamento tra posizioni di diverso livello", "Un cambio di città", "Un cambio di lavoro allo stesso livello", "L'immobilità"], correct: 0 }
    ],
    filosofiaGen: [
        { question: "Il mito della caverna appartiene a:", options: ["Aristotele", "Platone", "Socrate", "Plotino"], correct: 1 },
        { question: "L'imperativo categorico è formulato da:", options: ["Hegel", "Kant", "Hume", "Spinoza"], correct: 1 },
        { question: "La dialettica tesi-antitesi-sintesi è di:", options: ["Hegel", "Marx", "Fichte", "Schelling"], correct: 0 },
        { question: "Il cogito ergo sum è di:", options: ["Cartesio", "Locke", "Leibniz", "Bacone"], correct: 0 },
        { question: "L'eterno ritorno è un concetto di:", options: ["Schopenhauer", "Nietzsche", "Kierkegaard", "Heidegger"], correct: 1 }
    ],
    storiaArte: [
        { question: "L'arco a sesto acuto è tipico dell'arte:", options: ["Romanica", "Gotica", "Rinascimentale", "Barocca"], correct: 1 },
        { question: "La prospettiva lineare fu teorizzata da:", options: ["Giotto", "Brunelleschi", "Caravaggio", "Bernini"], correct: 1 },
        { question: "Il Barocco si caratterizza per:", options: ["Equilibrio e staticità", "Movimento e contrasti di luce", "Assenza di decorazione", "Rigore geometrico"], correct: 1 },
        { question: "L'Impressionismo nasce in:", options: ["Italia", "Francia", "Germania", "Spagna"], correct: 1 },
        { question: "La volta della Cappella Sistina fu dipinta da:", options: ["Raffaello", "Michelangelo", "Leonardo", "Botticelli"], correct: 1 }
    ],
    linguistica: [
        { question: "Il segno linguistico secondo Saussure unisce:", options: ["Parola e oggetto", "Significante e significato", "Frase e contesto", "Suono e scrittura"], correct: 1 },
        { question: "La langue è:", options: ["L'atto individuale del parlante", "Il sistema astratto condiviso", "Un dialetto", "La scrittura"], correct: 1 },
        { question: "Il fonema è:", options: ["La più piccola unità di significato", "La più piccola unità sonora distintiva", "Una sillaba", "Una parola"], correct: 1 },
        { question: "Il morfema è:", options: ["Un suono", "La più piccola unità dotata di significato", "Una frase", "Un accento"], correct: 1 },
        { question: "Lo studio della lingua in un dato momento si dice:", options: ["Diacronico", "Sincronico", "Diatopico", "Diafasico"], correct: 1 }
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
    ],

    /* ---------- SCIENTIFICA / INGEGNERIA ---------- */
    analisi2: [
        { front: "Cos'è una derivata parziale?", back: "La derivata rispetto a una variabile, tenendo le altre costanti: ∂f/∂x." },
        { front: "Cos'è il gradiente?", back: "Il vettore delle derivate parziali ∇f = (∂f/∂x, ∂f/∂y). Punta nella direzione di massima crescita." },
        { front: "Teorema di Schwarz", back: "Se le derivate seconde miste sono continue, allora ∂²f/∂x∂y = ∂²f/∂y∂x." },
        { front: "A cosa serve il determinante hessiano?", back: "A classificare i punti critici: H>0 e f_xx>0 minimo, H>0 e f_xx<0 massimo, H<0 sella." },
        { front: "Equazione differenziale a variabili separabili", back: "y' = f(x)g(y). Si risolve separando: dy/g(y) = f(x)dx e integrando entrambi i membri." },
    ],
    algebra: [
        { front: "Quando una matrice è invertibile?", back: "Quando il suo determinante è diverso da zero (matrice non singolare)." },
        { front: "Cos'è il rango di una matrice?", back: "Il numero massimo di righe (o colonne) linearmente indipendenti." },
        { front: "Definizione di autovalore", back: "λ è autovalore di A se esiste v≠0 tale che Av = λv. Si trova da det(A − λI) = 0." },
        { front: "Teorema di Rouché-Capelli", back: "Un sistema lineare ha soluzioni se e solo se rango(A) = rango(A|b)." },
        { front: "Cos'è una base di uno spazio vettoriale?", back: "Un insieme di vettori linearmente indipendenti che generano tutto lo spazio." },
    ],
    fisica2: [
        { front: "Legge di Coulomb", back: "F = k·q₁q₂/r², la forza tra due cariche è proporzionale al prodotto e inversa al quadrato della distanza." },
        { front: "Teorema di Gauss", back: "Il flusso del campo elettrico attraverso una superficie chiusa è pari alla carica interna diviso ε₀." },
        { front: "Legge di Faraday-Neumann", back: "Una variazione di flusso magnetico induce una f.e.m.: ε = −dΦ/dt." },
        { front: "Cosa dice la legge di Lenz?", back: "La corrente indotta si oppone sempre alla variazione di flusso che l'ha generata (segno meno)." },
        { front: "Cos'è la capacità di un condensatore?", back: "C = Q/V, la carica accumulata per unità di differenza di potenziale. Si misura in farad." },
    ],
    programmazione: [
        { front: "Differenza tra array e lista concatenata", back: "Array: accesso O(1) per indice, inserimento costoso. Lista: inserimento O(1), accesso O(n)." },
        { front: "Cos'è la ricorsione?", back: "Una funzione che richiama sé stessa. Serve un caso base per terminare, altrimenti stack overflow." },
        { front: "Cos'è un puntatore / riferimento?", back: "Una variabile che contiene l'indirizzo di memoria di un altro dato, non il dato stesso." },
        { front: "Differenza tra passaggio per valore e per riferimento", back: "Per valore si copia il dato; per riferimento si passa l'indirizzo, quindi le modifiche sono visibili al chiamante." },
        { front: "Cos'è l'incapsulamento?", back: "Nascondere lo stato interno di un oggetto esponendo solo metodi pubblici controllati." },
    ],
    archCalcolatori: [
        { front: "Cos'è la pipeline?", back: "Tecnica che sovrappone le fasi di più istruzioni (fetch, decode, execute) per aumentare il throughput." },
        { front: "Cos'è la cache?", back: "Memoria piccola e velocissima tra CPU e RAM, che sfrutta la località temporale e spaziale." },
        { front: "Differenza tra architettura von Neumann e Harvard", back: "Von Neumann: dati e istruzioni nella stessa memoria. Harvard: memorie separate." },
        { front: "Cos'è un registro?", back: "Memoria interna alla CPU, velocissima e di dimensioni minime, usata per gli operandi correnti." },
        { front: "Complemento a due", back: "Rappresentazione dei numeri negativi: si invertono i bit e si somma 1. Permette di sottrarre sommando." },
    ],
    sistemiOperativi: [
        { front: "Differenza tra processo e thread", back: "Il processo ha spazio di memoria proprio; i thread dello stesso processo lo condividono." },
        { front: "Cos'è il deadlock?", back: "Stallo in cui più processi attendono a vicenda risorse che nessuno rilascia." },
        { front: "Cos'è la memoria virtuale?", back: "Astrazione che dà a ogni processo uno spazio di indirizzi proprio, mappato su RAM e disco tramite paginazione." },
        { front: "Cos'è un semaforo?", back: "Variabile di sincronizzazione con operazioni wait e signal, usata per regolare l'accesso a risorse condivise." },
        { front: "Cos'è il context switch?", back: "Il salvataggio dello stato di un processo e il ripristino di un altro: permette il multitasking ma ha un costo." },
    ],
    basiDati: [
        { front: "Cos'è una chiave primaria?", back: "Un attributo (o insieme) che identifica univocamente ogni tupla. Non può essere NULL." },
        { front: "Cos'è una chiave esterna?", back: "Attributo che referenzia la chiave primaria di un'altra tabella: garantisce l'integrità referenziale." },
        { front: "Cos'è la normalizzazione?", back: "Processo di scomposizione delle tabelle per eliminare ridondanze e anomalie di aggiornamento." },
        { front: "Differenza tra INNER e LEFT JOIN", back: "INNER restituisce solo le righe con corrispondenza; LEFT tiene tutte quelle di sinistra, con NULL dove manca." },
        { front: "Cosa sono le proprietà ACID?", back: "Atomicità, Consistenza, Isolamento, Durabilità: le garanzie di una transazione." },
    ],
    retiCalcolatori: [
        { front: "Differenza tra TCP e UDP", back: "TCP è affidabile e orientato alla connessione; UDP è veloce, senza garanzie di consegna né ordine." },
        { front: "Cos'è il modello ISO/OSI?", back: "Sette livelli: fisico, collegamento, rete, trasporto, sessione, presentazione, applicazione." },
        { front: "A cosa serve il DNS?", back: "Traduce i nomi di dominio in indirizzi IP." },
        { front: "Cos'è il three-way handshake?", back: "Apertura di una connessione TCP in tre passi: SYN, SYN-ACK, ACK." },
        { front: "Differenza tra indirizzo IP e MAC", back: "L'IP è logico e instradabile a livello rete; il MAC è fisico, assegnato alla scheda, valido nella rete locale." },
    ],
    chimicaOrg: [
        { front: "Cos'è un gruppo funzionale?", back: "L'insieme di atomi che determina la reattività di una molecola (es. −OH alcol, −COOH acido)." },
        { front: "Differenza tra SN1 e SN2", back: "SN1: due stadi, carbocatione, racemizzazione. SN2: un solo stadio, attacco dorsale, inversione di configurazione." },
        { front: "Cos'è l'isomeria ottica?", back: "Due molecole speculari e non sovrapponibili (enantiomeri), dovute a un carbonio stereogenico." },
        { front: "Cos'è la risonanza?", back: "Delocalizzazione degli elettroni su più strutture limite: stabilizza la molecola (es. benzene)." },
        { front: "Regola di Markovnikov", back: "Nell'addizione a un alchene, l'idrogeno si lega al carbonio già più idrogenato." },
    ],
    biologia: [
        { front: "Differenza tra cellula procariote ed eucariote", back: "La procariote non ha nucleo né organelli membranosi; l'eucariote sì." },
        { front: "Cos'è la mitosi?", back: "Divisione cellulare che produce due cellule figlie identiche alla madre (2n → 2n)." },
        { front: "Cos'è la meiosi?", back: "Divisione che produce quattro gameti aploidi geneticamente diversi (2n → n)." },
        { front: "Dogma centrale della biologia molecolare", back: "DNA → RNA → proteina: trascrizione e poi traduzione." },
        { front: "A cosa servono i mitocondri?", back: "Sede della respirazione cellulare: producono ATP tramite fosforilazione ossidativa." },
    ],

    /* ---------- ECONOMIA ---------- */
    macroeconomia: [
        { front: "Cos'è il PIL?", back: "Il valore di tutti i beni e servizi finali prodotti in un Paese in un anno." },
        { front: "Differenza tra PIL nominale e reale", back: "Il nominale è ai prezzi correnti; il reale è a prezzi costanti, quindi depurato dall'inflazione." },
        { front: "Cos'è l'inflazione?", back: "L'aumento generalizzato e persistente del livello dei prezzi, che riduce il potere d'acquisto." },
        { front: "Cosa descrive la curva di Phillips?", back: "La relazione inversa di breve periodo tra inflazione e disoccupazione." },
        { front: "Cos'è la politica monetaria espansiva?", back: "Riduzione dei tassi e aumento della moneta per stimolare consumi e investimenti." },
    ],
    ragioneria: [
        { front: "Cos'è il principio della partita doppia?", back: "Ogni operazione si registra due volte, in dare e in avere, per importi uguali." },
        { front: "Quali sono i documenti del bilancio?", back: "Stato patrimoniale, conto economico, rendiconto finanziario e nota integrativa." },
        { front: "Differenza tra costo e uscita", back: "Il costo è di competenza economica dell'esercizio; l'uscita è il movimento finanziario, che può avvenire in un altro momento." },
        { front: "Cos'è l'ammortamento?", back: "La ripartizione del costo di un bene pluriennale sugli esercizi in cui produce utilità." },
        { front: "Cosa sono i ratei e i risconti?", back: "Ratei: costi/ricavi già maturati ma non ancora liquidati. Risconti: già liquidati ma di competenza futura." },
    ],
    dirCommerciale: [
        { front: "Cos'è l'imprenditore secondo l'art. 2082 c.c.?", back: "Chi esercita professionalmente un'attività economica organizzata al fine della produzione o scambio di beni o servizi." },
        { front: "Differenza tra società di persone e di capitali", back: "Nelle società di persone i soci rispondono illimitatamente; nelle società di capitali la responsabilità è limitata al conferimento." },
        { front: "Cos'è l'azienda?", back: "Il complesso dei beni organizzati dall'imprenditore per l'esercizio dell'impresa (art. 2555 c.c.)." },
        { front: "Cosa sono i titoli di credito?", back: "Documenti che incorporano un diritto di credito e ne permettono la circolazione (cambiale, assegno)." },
        { front: "Quali sono gli organi della S.p.A.?", back: "Assemblea dei soci, organo amministrativo (CdA o amministratore unico) e collegio sindacale." },
    ],
    matFin: [
        { front: "Differenza tra interesse semplice e composto", back: "Semplice: gli interessi non producono interessi. Composto: si capitalizzano, M = C(1+i)^n." },
        { front: "Cos'è il montante?", back: "Il capitale finale dopo la capitalizzazione: capitale iniziale più interessi maturati." },
        { front: "Cos'è l'attualizzazione?", back: "L'operazione inversa alla capitalizzazione: riporta un valore futuro al presente." },
        { front: "Cos'è il VAN?", back: "Valore Attuale Netto: somma dei flussi di cassa attualizzati meno l'investimento iniziale. Se > 0 conviene." },
        { front: "Cos'è una rendita?", back: "Una successione di capitali esigibili a scadenze periodiche." },
    ],

    /* ---------- GIURIDICA ---------- */
    dirCostituzionale: [
        { front: "Cos'è la riserva di legge?", back: "Il vincolo per cui una materia può essere disciplinata solo dalla legge, non da fonti secondarie." },
        { front: "Quali sono gli organi costituzionali?", back: "Parlamento, Governo, Presidente della Repubblica, Corte costituzionale e Magistratura." },
        { front: "Cos'è il bicameralismo perfetto?", back: "Camera e Senato hanno le stesse funzioni e pari poteri: la legge va approvata in identico testo da entrambe." },
        { front: "Cosa fa la Corte costituzionale?", back: "Giudica la legittimità costituzionale delle leggi, i conflitti tra poteri e le accuse al Presidente." },
        { front: "Differenza tra decreto legge e decreto legislativo", back: "Il d.l. è adottato dal Governo per necessità e urgenza e va convertito in 60 giorni; il d.lgs. attua una delega del Parlamento." },
    ],
    dirPenale: [
        { front: "Quali sono gli elementi del reato?", back: "Elemento oggettivo (condotta, evento, nesso causale) ed elemento soggettivo (dolo o colpa)." },
        { front: "Differenza tra dolo e colpa", back: "Dolo: evento previsto e voluto. Colpa: evento non voluto, dovuto a negligenza, imprudenza, imperizia o violazione di norme." },
        { front: "Principio di legalità (art. 25 Cost.)", back: "Nessuno può essere punito se non in forza di una legge entrata in vigore prima del fatto commesso." },
        { front: "Cos'è il tentativo?", back: "Atti idonei diretti in modo non equivoco a commettere un delitto, che non si compie o non si verifica." },
        { front: "Differenza tra delitti e contravvenzioni", back: "Distinzione per tipo di pena: delitti (reclusione e multa), contravvenzioni (arresto e ammenda)." },
    ],
    dirRomano: [
        { front: "Cos'è la mancipatio?", back: "Antico atto formale e solenne di trasferimento della proprietà su res mancipi, davanti a testimoni." },
        { front: "Differenza tra ius civile e ius gentium", back: "Ius civile: riservato ai cittadini romani. Ius gentium: applicabile anche agli stranieri, più flessibile." },
        { front: "Cos'è l'usucapione romana?", back: "Acquisto della proprietà per possesso continuato nel tempo, in buona fede e con giusto titolo." },
        { front: "Chi era il pretore?", back: "Magistrato che amministrava la giustizia ed emanava l'editto, fonte dello ius honorarium." },
        { front: "Cos'è la patria potestas?", back: "Il potere del pater familias su figli e beni del nucleo familiare." },
    ],
    dirAmministrativo: [
        { front: "Cos'è il provvedimento amministrativo?", back: "L'atto con cui la P.A. esercita il potere autoritativo, modificando unilateralmente la sfera del destinatario." },
        { front: "Differenza tra diritto soggettivo e interesse legittimo", back: "Il diritto soggettivo è tutelato dal giudice ordinario; l'interesse legittimo, davanti al potere della P.A., dal giudice amministrativo." },
        { front: "Quali sono i vizi di legittimità?", back: "Incompetenza, eccesso di potere e violazione di legge." },
        { front: "Cos'è il silenzio-assenso?", back: "Il decorso del termine senza risposta della P.A. equivale ad accoglimento dell'istanza." },
        { front: "Cos'è la discrezionalità amministrativa?", back: "La ponderazione tra interesse pubblico primario e interessi secondari nella scelta della soluzione migliore." },
    ],
    dirLavoro: [
        { front: "Cos'è il lavoro subordinato (art. 2094 c.c.)?", back: "Prestazione di lavoro alle dipendenze e sotto la direzione dell'imprenditore, in cambio di retribuzione." },
        { front: "Differenza tra licenziamento per giusta causa e giustificato motivo", back: "Giusta causa: fatto gravissimo, licenziamento immediato. Giustificato motivo: inadempimento notevole (soggettivo) o ragioni aziendali (oggettivo), con preavviso." },
        { front: "Cos'è lo Statuto dei lavoratori?", back: "La legge 300/1970, che tutela libertà, dignità e attività sindacale nei luoghi di lavoro." },
        { front: "Cos'è il CCNL?", back: "Contratto collettivo nazionale di lavoro: fissa i minimi retributivi e normativi di categoria." },
        { front: "Cos'è il TFR?", back: "Trattamento di fine rapporto: retribuzione differita accantonata ogni anno e liquidata alla cessazione." },
    ],
    dirUE: [
        { front: "Quali sono le istituzioni principali dell'UE?", back: "Parlamento europeo, Consiglio dell'UE, Consiglio europeo, Commissione, Corte di giustizia e BCE." },
        { front: "Differenza tra regolamento e direttiva", back: "Il regolamento è direttamente applicabile in tutti gli Stati; la direttiva vincola nel risultato e va recepita." },
        { front: "Cos'è il principio di sussidiarietà?", back: "L'UE interviene solo se l'obiettivo non può essere raggiunto meglio a livello nazionale." },
        { front: "Cosa sono le quattro libertà?", back: "Libera circolazione di merci, persone, servizi e capitali nel mercato interno." },
        { front: "Cos'è il primato del diritto UE?", back: "In caso di conflitto, la norma europea prevale su quella nazionale contrastante." },
    ],

    /* ---------- MEDICINA ---------- */
    anatomia: [
        { front: "Quali sono i piani anatomici?", back: "Sagittale (destra/sinistra), frontale o coronale (avanti/dietro), trasversale (sopra/sotto)." },
        { front: "Quante vertebre ha la colonna?", back: "33-34: 7 cervicali, 12 toraciche, 5 lombari, 5 sacrali fuse, 4-5 coccigee." },
        { front: "Quali sono le cavità del cuore?", back: "Due atri e due ventricoli. Valvole: tricuspide e mitrale (atrioventricolari), polmonare e aortica (semilunari)." },
        { front: "Differenza tra arterie e vene", back: "Le arterie portano il sangue dal cuore alla periferia, hanno parete spessa; le vene lo riportano al cuore e hanno valvole." },
        { front: "Da cosa è formato il sistema nervoso centrale?", back: "Encefalo (cervello, cervelletto, tronco) e midollo spinale." },
    ],
    fisiologia: [
        { front: "Cos'è il potenziale d'azione?", back: "Rapida inversione del potenziale di membrana per apertura dei canali del sodio, seguita da ripolarizzazione col potassio." },
        { front: "Cos'è la gittata cardiaca?", back: "Volume di sangue espulso al minuto: gittata sistolica × frequenza cardiaca (≈5 L/min a riposo)." },
        { front: "Cos'è l'omeostasi?", back: "Il mantenimento di condizioni interne costanti tramite meccanismi di feedback, di solito negativo." },
        { front: "Come avviene la filtrazione glomerulare?", back: "Nel glomerulo, per pressione idrostatica; circa 125 ml/min di filtrato, poi riassorbito nei tubuli." },
        { front: "Cos'è la curva di dissociazione dell'emoglobina?", back: "Relazione sigmoide tra pO₂ e saturazione. Si sposta a destra con acidosi, calore e CO₂ (effetto Bohr)." },
    ],
    biochimica: [
        { front: "Cos'è un enzima?", back: "Catalizzatore biologico proteico che abbassa l'energia di attivazione senza consumarsi." },
        { front: "Cosa descrive la cinetica di Michaelis-Menten?", back: "v = Vmax[S]/(Km+[S]). Km è la concentrazione di substrato a metà Vmax: misura l'affinità." },
        { front: "Quali sono le tappe della respirazione cellulare?", back: "Glicolisi (citosol), ciclo di Krebs (matrice mitocondriale), fosforilazione ossidativa (membrana interna)." },
        { front: "Quanto ATP produce una molecola di glucosio?", back: "Circa 30-32 ATP con la respirazione aerobica completa." },
        { front: "Struttura delle proteine", back: "Primaria (sequenza), secondaria (α-elica, β-foglietto), terziaria (ripiegamento 3D), quaternaria (più subunità)." },
    ],
    patologia: [
        { front: "Quali sono i segni dell'infiammazione?", back: "Rubor, tumor, calor, dolor e functio laesa." },
        { front: "Differenza tra necrosi e apoptosi", back: "Necrosi: morte accidentale con infiammazione. Apoptosi: morte programmata, senza risposta infiammatoria." },
        { front: "Differenza tra tumore benigno e maligno", back: "Il benigno è ben delimitato e non metastatizza; il maligno è infiltrante e dà metastasi." },
        { front: "Cos'è l'ipertrofia?", back: "Aumento del volume delle cellule (non del numero) come adattamento a maggior carico funzionale." },
        { front: "Cos'è l'ischemia?", back: "Riduzione dell'apporto di sangue a un tessuto: se prolungata provoca infarto." },
    ],
    farmacologia: [
        { front: "Differenza tra farmacocinetica e farmacodinamica", back: "Cinetica: cosa fa l'organismo al farmaco (ADME). Dinamica: cosa fa il farmaco all'organismo." },
        { front: "Cosa significa ADME?", back: "Assorbimento, Distribuzione, Metabolismo, Escrezione." },
        { front: "Differenza tra agonista e antagonista", back: "L'agonista lega il recettore e lo attiva; l'antagonista lega ma non attiva, bloccando l'agonista." },
        { front: "Cos'è l'emivita di un farmaco?", back: "Il tempo necessario perché la concentrazione plasmatica si dimezzi." },
        { front: "Cos'è l'effetto di primo passaggio?", back: "Il metabolismo epatico che riduce la quota di farmaco orale che raggiunge la circolazione sistemica." },
    ],

    /* ---------- UMANISTICA ---------- */
    psicologia: [
        { front: "Differenza tra memoria a breve e lungo termine", back: "La breve dura secondi e ha capacità limitata (7±2); la lungo termine è potenzialmente illimitata e duratura." },
        { front: "Cos'è il condizionamento classico?", back: "Associazione tra stimolo neutro e stimolo incondizionato, studiata da Pavlov." },
        { front: "Cos'è il condizionamento operante?", back: "L'apprendimento basato sulle conseguenze: rinforzi aumentano il comportamento, punizioni lo riducono (Skinner)." },
        { front: "Cos'è la dissonanza cognitiva?", back: "Il disagio da conflitto tra credenze e comportamento, che spinge a modificarne uno (Festinger)." },
        { front: "Piramide di Maslow", back: "Gerarchia dei bisogni: fisiologici, sicurezza, appartenenza, stima, autorealizzazione." },
    ],
    pedagogia: [
        { front: "Cos'è la zona di sviluppo prossimale?", back: "Lo spazio tra ciò che il bambino sa fare da solo e ciò che riesce a fare con una guida (Vygotskij)." },
        { front: "Quali sono gli stadi di Piaget?", back: "Senso-motorio, preoperatorio, operatorio concreto, operatorio formale." },
        { front: "Cos'è il metodo Montessori?", back: "Educazione basata su autonomia, ambiente preparato e materiali strutturati auto-correttivi." },
        { front: "Differenza tra educazione e istruzione", back: "L'educazione riguarda la formazione globale della persona; l'istruzione la trasmissione di conoscenze." },
        { front: "Cos'è l'apprendimento significativo?", back: "Quando le nuove conoscenze si collegano a quelle già possedute, invece di essere memorizzate (Ausubel)." },
    ],
    sociologia: [
        { front: "Cos'è la socializzazione?", back: "Il processo con cui si interiorizzano norme e valori: primaria in famiglia, secondaria nelle altre agenzie." },
        { front: "Cos'è l'anomia secondo Durkheim?", back: "Lo stato di assenza o indebolimento delle norme sociali condivise." },
        { front: "Cos'è lo status e cos'è il ruolo?", back: "Lo status è la posizione occupata; il ruolo è l'insieme dei comportamenti attesi da chi la occupa." },
        { front: "Cos'è la mobilità sociale?", back: "Lo spostamento tra posizioni sociali: verticale (su/giù) o orizzontale, intra o intergenerazionale." },
        { front: "Cosa intende Weber per agire sociale?", back: "Un'azione dotata di senso e orientata al comportamento altrui, distinta in razionale, valoriale, affettiva, tradizionale." },
    ],
    filosofiaGen: [
        { front: "Cos'è il mito della caverna?", back: "Allegoria di Platone: i prigionieri scambiano le ombre per realtà; la filosofia è l'uscita verso il mondo delle Idee." },
        { front: "Cos'è l'imperativo categorico?", back: "Agisci solo secondo la massima che vorresti diventasse legge universale (Kant)." },
        { front: "Cos'è la dialettica hegeliana?", back: "Il movimento tesi-antitesi-sintesi con cui si sviluppa lo Spirito." },
        { front: "Cos'è il cogito cartesiano?", back: "Penso, dunque sono: il dubbio radicale trova nella coscienza del pensare la prima certezza." },
        { front: "Cos'è l'eterno ritorno in Nietzsche?", back: "L'idea che ogni istante torni identico infinite volte: prova suprema di accettazione della vita." },
    ],
    storia: [
        { front: "Cause della Prima guerra mondiale", back: "Nazionalismi, corsa agli armamenti, sistema di alleanze contrapposte e crisi balcaniche; scintilla: Sarajevo 1914." },
        { front: "Cos'è stata la Rivoluzione russa?", back: "Nel 1917: febbraio abbatte lo zar, ottobre porta i bolscevichi di Lenin al potere." },
        { front: "Cosa fu il New Deal?", back: "Il programma di Roosevelt (1933) di intervento pubblico e opere per uscire dalla Grande depressione." },
        { front: "Cos'è stata la guerra fredda?", back: "Il confronto USA-URSS dal 1947 al 1991, senza scontro diretto ma con corsa agli armamenti e guerre per procura." },
        { front: "Cos'è il Piano Marshall?", back: "Aiuti economici USA all'Europa (1948) per la ricostruzione e per contenere l'influenza sovietica." },
    ],
    storiaArte: [
        { front: "Caratteristiche dell'arte gotica", back: "Arco a sesto acuto, volta a crociera ogivale, archi rampanti, verticalismo e vetrate." },
        { front: "Cos'è la prospettiva lineare?", back: "Sistema rinascimentale di rappresentazione dello spazio con un punto di fuga, teorizzato da Brunelleschi." },
        { front: "Differenza tra Rinascimento e Barocco", back: "Rinascimento: equilibrio, armonia, staticità. Barocco: movimento, teatralità, contrasti di luce." },
        { front: "Cos'è l'Impressionismo?", back: "Movimento di fine Ottocento: pittura en plein air, colori puri, resa dell'impressione luminosa istantanea." },
        { front: "Chi ha dipinto la Cappella Sistina?", back: "Michelangelo: la volta tra 1508 e 1512, il Giudizio Universale tra 1536 e 1541." },
    ],
    linguistica: [
        { front: "Cos'è il segno linguistico?", back: "L'unione arbitraria di significante (immagine acustica) e significato (concetto), secondo Saussure." },
        { front: "Differenza tra langue e parole", back: "La langue è il sistema astratto condiviso; la parole è l'atto concreto del singolo parlante." },
        { front: "Cos'è il fonema?", back: "La più piccola unità sonora capace di distinguere significati (pane/cane)." },
        { front: "Cos'è il morfema?", back: "La più piccola unità dotata di significato (in-util-mente ne contiene tre)." },
        { front: "Differenza tra sincronia e diacronia", back: "Sincronia: la lingua in un dato momento. Diacronia: la sua evoluzione nel tempo." },
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
