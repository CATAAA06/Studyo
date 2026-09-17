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
    // ---- AREA UMANISTICA ----
    antropologia: [
        { question: "Il relativismo culturale invita a:", options: ["Giudicare ogni cultura secondo i propri parametri", "Comprendere una pratica all'interno del contesto culturale in cui si colloca", "Considerare tutte le culture identiche", "Rifiutare il confronto tra culture"], correct: 1, explain: "È un metodo di analisi e si contrappone all'etnocentrismo; non coincide con l'idea che ogni pratica sia moralmente accettabile." },
        { question: "L'osservazione partecipante consiste nel:", options: ["Somministrare questionari a distanza", "Vivere a lungo nel contesto studiato prendendo parte alla vita quotidiana", "Analizzare solo documenti d'archivio", "Intervistare esperti"], correct: 1, explain: "Resa centrale da Malinowski, produce l'etnografia: la descrizione densa di una cultura dal punto di vista di chi la vive." },
        { question: "Nel saggio di Marcel Mauss, il dono è:", options: ["Un atto puramente disinteressato", "Un fatto sociale totale che implica dare, ricevere e ricambiare", "Una forma di commercio moderno", "Un rito religioso"], correct: 1, explain: "L'obbligo di ricambiare crea legami duraturi: il dono tiene insieme economia, diritto, religione e parentela." },
        { question: "I riti di passaggio, secondo Van Gennep, si articolano in:", options: ["Separazione, margine (liminalità), aggregazione", "Nascita, vita, morte", "Preghiera, sacrificio, festa", "Mito, rito, tabù"], correct: 0, explain: "La fase liminale, studiata poi da Victor Turner, è quella sospesa tra il vecchio e il nuovo status." },
        { question: "L'etnocentrismo è:", options: ["La tendenza a valutare le altre culture con i criteri della propria", "Lo studio comparato delle lingue", "Il metodo dell'osservazione partecipante", "Il rifiuto della propria cultura"], correct: 0, explain: "È il presupposto implicito che l'antropologia cerca di rendere visibile e mettere in discussione." },
    ],
    letteraturaLat: [
        { question: "L'Eneide di Virgilio è:", options: ["Un poema epico in esametri sulla fondazione mitica di Roma", "Una raccolta di orazioni", "Una commedia", "Un trattato filosofico"], correct: 0, explain: "In dodici libri; i primi sei richiamano l'Odissea per il viaggio, gli ultimi sei l'Iliade per le guerre nel Lazio." },
        { question: "Il metro tipico dell'epica latina è:", options: ["L'endecasillabo", "L'esametro dattilico", "Il distico elegiaco", "Il trimetro giambico"], correct: 1, explain: "Il distico elegiaco, cioè esametro più pentametro, è invece il metro dell'elegia amorosa di Tibullo, Properzio e Ovidio." },
        { question: "Il De rerum natura di Lucrezio espone la filosofia:", options: ["Stoica", "Epicurea", "Platonica", "Scettica"], correct: 1, explain: "Vuole liberare gli uomini dalla paura degli dèi e della morte spiegando il mondo attraverso gli atomi." },
        { question: "Cicerone è ricordato soprattutto come:", options: ["Oratore e autore di opere retoriche e filosofiche", "Poeta epico", "Storico delle guerre puniche", "Commediografo"], correct: 0, explain: "Le Catilinarie e le Verrine restano modelli di eloquenza; la sua prosa ha fissato il latino classico come lingua di riferimento." },
        { question: "Le Satire di Orazio si caratterizzano per:", options: ["L'invettiva violenta", "Un tono garbato e ironico che coglie i difetti umani", "La celebrazione dell'impero", "L'argomento mitologico"], correct: 1, explain: "Diversamente dall'indignatio di Giovenale, Orazio sorride dei vizi e propone la misura, l'aurea mediocritas." },
    ],
    storiaMedievale: [
        { question: "La deposizione di Romolo Augustolo nel 476 segna convenzionalmente:", options: ["La fine dell'Impero romano d'Occidente", "L'inizio delle crociate", "La nascita del Sacro Romano Impero", "La caduta di Costantinopoli"], correct: 0, explain: "È una data simbolica: i processi di trasformazione erano in corso da tempo e l'Impero d'Oriente continuò fino al 1453." },
        { question: "Il feudalesimo si basava sul rapporto tra:", options: ["Signore e vassallo, con concessione di un beneficio in cambio di fedeltà e servizio armato", "Stato e cittadini", "Comune e corporazioni", "Papa e imperatore soltanto"], correct: 0, explain: "Con il capitolare di Quierzy (877) i feudi maggiori divennero di fatto ereditari, indebolendo il potere centrale." },
        { question: "La lotta per le investiture oppose:", options: ["Papato e Impero sul potere di nominare i vescovi", "Comuni e signorie", "Bizantini e Arabi", "Francia e Inghilterra"], correct: 0, explain: "Dopo Canossa si arrivò al concordato di Worms del 1122: investitura spirituale al papa, temporale all'imperatore." },
        { question: "I Comuni italiani nascono tra XI e XII secolo come:", options: ["Associazioni cittadine che rivendicano autonomia dai poteri feudali", "Province imperiali", "Ordini monastici", "Leghe militari papali"], correct: 0, explain: "Dal consolare si passò al podestarile e poi al popolare, finché le lotte interne aprirono la strada alle signorie." },
        { question: "La peste nera del 1347-1351 ebbe come conseguenza:", options: ["Un forte calo demografico con profonde ricadute economiche e sociali", "Un aumento della popolazione", "La fine delle città", "L'inizio dell'età antica"], correct: 0, explain: "La scarsità di manodopera fece salire i salari e incrinò i vincoli servili, contribuendo alla crisi del sistema feudale." },
    ],
    storiaModerna: [
        { question: "La pace di Westfalia del 1648:", options: ["Chiuse la guerra dei Trent'anni e affermò il principio di sovranità territoriale degli Stati", "Avviò le crociate", "Unificò la Germania", "Concluse le guerre napoleoniche"], correct: 0, explain: "È considerata l'atto di nascita del moderno sistema di Stati sovrani e del diritto internazionale europeo." },
        { question: "La rivoluzione scientifica del Seicento è legata soprattutto a:", options: ["Galileo e Newton", "Tommaso d'Aquino", "Carlo Magno", "Erasmo da Rotterdam"], correct: 0, explain: "Metodo sperimentale e matematizzazione della natura sostituiscono il principio di autorità come criterio di verità." },
        { question: "L'assolutismo di Luigi XIV si caratterizza per:", options: ["La concentrazione del potere nel sovrano, con corte accentrata e burocrazia fedele", "La divisione dei poteri", "Il governo parlamentare", "L'autonomia dei feudatari"], correct: 0, explain: "Versailles serviva anche a controllare la nobiltà, trasformata in nobiltà di corte dipendente dal favore regio." },
        { question: "La Dichiarazione dei diritti dell'uomo e del cittadino è del:", options: ["1776", "1789", "1799", "1815"], correct: 1, explain: "Approvata in agosto dall'Assemblea nazionale francese; il 1776 è la Dichiarazione d'indipendenza americana, il 1815 il congresso di Vienna." },
        { question: "La prima rivoluzione industriale iniziò:", options: ["In Inghilterra nella seconda metà del Settecento", "In Francia nel Cinquecento", "In Germania nell'Ottocento", "In Italia nel Seicento"], correct: 0, explain: "Macchina a vapore, industria tessile e siderurgia trasformarono produzione, città e struttura sociale." },
    ],
    glottologia: [
        { question: "Secondo Saussure il segno linguistico è formato da:", options: ["Significante e significato", "Suono e scrittura", "Parola e frase", "Lingua e dialetto"], correct: 0, explain: "Il legame tra i due è arbitrario: non c'è nulla nella sequenza di suoni /'ka:za/ che richiami necessariamente l'idea di casa." },
        { question: "La distinzione tra langue e parole indica:", options: ["Il sistema condiviso della lingua e il suo uso individuale concreto", "La lingua scritta e quella parlata", "Il lessico e la grammatica", "La lingua madre e quella straniera"], correct: 0, explain: "La langue è sociale e sistematica, la parole è l'atto singolo del parlante: la linguistica strutturale studia soprattutto la prima." },
        { question: "Il metodo comparativo serve a:", options: ["Ricostruire una lingua madre comune confrontando lingue imparentate", "Insegnare le lingue straniere", "Tradurre testi antichi", "Misurare la frequenza delle parole"], correct: 0, explain: "Dal confronto sistematico tra sanscrito, greco, latino e altre lingue è stato ricostruito l'indoeuropeo." },
        { question: "Un fonema è:", options: ["La più piccola unità sonora capace di distinguere significati", "Una lettera dell'alfabeto", "Una sillaba", "Un morfema"], correct: 0, explain: "Coppie minime come pane/cane mostrano che /p/ e /k/ sono fonemi distinti in italiano." },
        { question: "La sincronia e la diacronia nello studio della lingua riguardano rispettivamente:", options: ["Lo stato della lingua in un dato momento e la sua evoluzione nel tempo", "La lingua parlata e quella scritta", "Il lessico e la sintassi", "La fonetica e la fonologia"], correct: 0, explain: "Saussure ha rivendicato l'autonomia dell'analisi sincronica, fino ad allora subordinata alla prospettiva storica." },
    ],
    geografia: [
        { question: "La differenza tra latitudine e longitudine è che la latitudine misura:", options: ["La distanza angolare dall'equatore", "La distanza dal meridiano di Greenwich", "L'altitudine", "La distanza dal polo magnetico"], correct: 0, explain: "La latitudine va da 0° all'equatore a 90° ai poli; la longitudine da 0° a Greenwich fino a 180° verso est o verso ovest." },
        { question: "Il clima mediterraneo si caratterizza per:", options: ["Estati calde e secche, inverni miti e piovosi", "Piogge abbondanti tutto l'anno", "Inverni molto rigidi e secchi", "Temperature costanti tutto l'anno"], correct: 0, explain: "È tipico delle fasce temperate affacciate su mari caldi e sostiene una vegetazione adattata all'aridità estiva, come la macchia." },
        { question: "La densità di popolazione si calcola come:", options: ["Abitanti diviso superficie", "Superficie diviso abitanti", "Nati meno morti", "Abitanti per famiglia"], correct: 0, explain: "Si esprime in abitanti per km²; media alta e distribuzione molto disomogenea possono convivere, come in Italia." },
        { question: "Il fenomeno dell'urbanizzazione indica:", options: ["La crescita della quota di popolazione che vive nelle città", "L'abbandono delle città", "La costruzione di strade", "L'aumento della natalità"], correct: 0, explain: "Dal 2007 circa più della metà della popolazione mondiale vive in aree urbane, con forte crescita nelle megalopoli del Sud del mondo." },
        { question: "La transizione demografica descrive il passaggio da:", options: ["Alta natalità e alta mortalità a bassa natalità e bassa mortalità", "Economia agricola a industriale", "Campagna a città", "Emigrazione a immigrazione"], correct: 0, explain: "Nella fase intermedia la mortalità cala prima della natalità: è il momento di maggiore crescita della popolazione." },
    ],
    // ---- AREA GIURIDICA E PSICOLOGICA ----
    dirRomano: [
        { question: "Le Istituzioni di Gaio sono:", options: ["Un manuale elementare di diritto del II secolo d.C.", "Una raccolta di sentenze imperiali", "Un trattato di diritto penale", "Un codice medievale"], correct: 0, explain: "Il testo, in quattro libri, organizza la materia in persone, cose e azioni: uno schema che ha influenzato i codici moderni." },
        { question: "Nel diritto romano la distinzione tra ius civile e ius gentium riguarda:", options: ["Diritto dei soli cittadini romani e diritto comune a tutti i popoli", "Diritto scritto e non scritto", "Diritto pubblico e privato", "Diritto sacro e profano"], correct: 0, explain: "Lo ius gentium, applicato anche agli stranieri, era più flessibile e informale: ha favorito lo sviluppo dei contratti consensuali." },
        { question: "La mancipatio era:", options: ["Un modo solenne di trasferire la proprietà delle res mancipi", "Un'azione penale", "Una forma di matrimonio", "Un testamento orale"], correct: 0, explain: "Richiedeva cinque testimoni e il libripens con la bilancia: un formalismo tipico del diritto arcaico." },
        { question: "Il Corpus Iuris Civilis fu promosso da:", options: ["Augusto", "Giustiniano", "Cesare", "Costantino"], correct: 1, explain: "Realizzato nel VI secolo, comprende Codice, Digesto, Istituzioni e Novelle: è la base della tradizione giuridica continentale." },
        { question: "L'usucapione nel diritto romano permetteva di acquistare la proprietà:", options: ["Per contratto", "Per possesso protratto nel tempo alle condizioni di legge", "Per successione", "Per confisca"], correct: 1, explain: "Servivano possesso continuato, buona fede e giusto titolo: l'istituto sopravvive quasi immutato nel codice civile italiano." },
    ],
    storiaDiritto: [
        { question: "La glossa, nella scuola bolognese dei secoli XII-XIII, era:", options: ["Una nota esplicativa ai testi giustinianei", "Una sentenza reale", "Un codice locale", "Un giuramento feudale"], correct: 0, explain: "Dai glossatori, con Irnerio e poi Accursio, nasce lo studio scientifico del diritto romano nelle università." },
        { question: "Lo ius commune medievale era formato dall'incontro tra:", options: ["Diritto romano e diritto canonico", "Diritto penale e civile", "Statuti cittadini e consuetudini germaniche soltanto", "Diritto longobardo e feudale"], correct: 0, explain: "Il diritto comune conviveva con gli iura propria, cioè statuti cittadini e consuetudini locali, in un sistema a più livelli." },
        { question: "Il Code Napoléon del 1804 è importante perché:", options: ["Fu il primo codice civile moderno, unitario e sistematico", "Abolì la proprietà privata", "Riguardava solo il diritto penale", "Era valido solo in Corsica"], correct: 0, explain: "Afferma uguaglianza formale davanti alla legge, proprietà individuale e libertà contrattuale: modello per gran parte dei codici europei." },
        { question: "Lo Statuto Albertino del 1848 era:", options: ["Una costituzione rigida", "Una costituzione flessibile, concessa dal sovrano", "Un trattato internazionale", "Un codice di procedura"], correct: 1, explain: "Essendo flessibile, poté essere svuotato con leggi ordinarie durante il fascismo: per reazione la Costituzione del 1948 è rigida." },
        { question: "La codificazione unitaria italiana del 1865 si ispirò principalmente:", options: ["Al modello francese", "Al modello inglese", "Al diritto canonico", "Al codice prussiano"], correct: 0, explain: "Il codice civile del Regno d'Italia ricalcava largamente il codice napoleonico, mediato dal codice albertino del 1837." },
    ],
    econPolitica: [
        { question: "La curva di domanda di un bene normale è inclinata negativamente perché:", options: ["Al crescere del prezzo la quantità domandata diminuisce", "Al crescere del prezzo aumenta l'offerta", "Il reddito è costante", "I costi sono decrescenti"], correct: 0, explain: "Agiscono l'effetto sostituzione, che spinge verso beni alternativi, e l'effetto reddito, che riduce il potere d'acquisto." },
        { question: "In concorrenza perfetta, nel lungo periodo le imprese:", options: ["Realizzano extraprofitti", "Ottengono un profitto economico nullo", "Fissano il prezzo liberamente", "Escono tutte dal mercato"], correct: 1, explain: "L'ingresso di nuove imprese erode gli extraprofitti finché il prezzo eguaglia il costo medio minimo." },
        { question: "Il PIL misura:", options: ["Il valore dei beni e servizi finali prodotti in un paese in un periodo", "La ricchezza totale accumulata", "Il reddito medio delle famiglie", "Il valore di tutte le transazioni"], correct: 0, explain: "Si contano solo i beni finali per evitare doppi conteggi; il PIL non misura benessere, disuguaglianza né lavoro non retribuito." },
        { question: "Una politica monetaria espansiva consiste tipicamente nel:", options: ["Alzare i tassi di interesse", "Ridurre i tassi e aumentare la liquidità", "Aumentare le imposte", "Ridurre la spesa pubblica"], correct: 1, explain: "Tassi più bassi stimolano consumi e investimenti; aumentare o ridurre imposte e spesa è invece politica fiscale." },
        { question: "L'inflazione da domanda si verifica quando:", options: ["La domanda aggregata cresce oltre la capacità produttiva", "Aumentano i costi delle materie prime", "Cala la moneta in circolazione", "Aumenta la disoccupazione"], correct: 0, explain: "L'inflazione da costi ha invece origine dal lato dell'offerta, come nei rincari energetici." },
    ],
    procCivile: [
        { question: "Il principio dispositivo nel processo civile significa che:", options: ["Il giudice decide quali cause trattare", "Sono le parti a determinare l'oggetto del giudizio e a fornire le prove", "Il processo è sempre pubblico", "Le prove sono raccolte d'ufficio"], correct: 1, explain: "Il giudice non può pronunciarsi oltre quanto chiesto (ultrapetizione) né su fatti non allegati dalle parti." },
        { question: "L'atto con cui si introduce un ordinario processo di cognizione davanti al tribunale è:", options: ["Il ricorso", "La citazione", "Il precetto", "Il decreto ingiuntivo"], correct: 1, explain: "La citazione contiene la vocatio in ius e l'editio actionis, cioè la chiamata in giudizio e l'indicazione di domanda e ragioni." },
        { question: "Il giudicato formale si ha quando una sentenza:", options: ["È stata depositata", "Non è più impugnabile con i mezzi ordinari", "È stata eseguita", "È stata notificata"], correct: 1, explain: "Il giudicato sostanziale è invece l'effetto vincolante dell'accertamento tra le parti, i loro eredi e aventi causa." },
        { question: "I tre gradi ordinari di giudizio civile sono:", options: ["Tribunale, corte d'appello, Corte di cassazione", "Giudice di pace, tribunale, corte d'assise", "Tribunale, TAR, Consiglio di Stato", "Pretura, tribunale, corte costituzionale"], correct: 0, explain: "La Cassazione è giudice di legittimità: verifica la corretta applicazione della legge, non rivaluta i fatti." },
        { question: "Il decreto ingiuntivo è un provvedimento:", options: ["Emesso dopo il contraddittorio", "Emesso inaudita altera parte su prova scritta del credito", "Di natura penale", "Non impugnabile"], correct: 1, explain: "Il debitore può proporre opposizione entro 40 giorni, e a quel punto si apre un giudizio ordinario a cognizione piena." },
    ],
    dirInternazionale: [
        { question: "Le fonti principali del diritto internazionale secondo l'art. 38 dello Statuto della Corte internazionale di giustizia sono:", options: ["Trattati, consuetudine e principi generali di diritto", "Solo i trattati", "Le leggi nazionali", "Le decisioni dell'ONU"], correct: 0, explain: "Dottrina e giurisprudenza sono indicate come mezzi sussidiari per determinare le norme, non come fonti autonome." },
        { question: "La consuetudine internazionale si forma con:", options: ["Una prassi generale accompagnata dalla convinzione della sua obbligatorietà", "Un voto a maggioranza dell'Assemblea generale", "La firma di dieci Stati", "Una sentenza della Corte"], correct: 0, explain: "Servono elemento oggettivo (diuturnitas) e soggettivo (opinio iuris): senza il secondo si tratta di mera cortesia internazionale." },
        { question: "Il principio pacta sunt servanda stabilisce che:", options: ["I trattati vanno eseguiti in buona fede", "I trattati sono sempre revocabili", "Gli Stati non rispondono delle violazioni", "I trattati valgono anche per i terzi"], correct: 0, explain: "È codificato nella Convenzione di Vienna del 1969, che regola conclusione, interpretazione ed estinzione dei trattati." },
        { question: "Il Consiglio di Sicurezza dell'ONU si distingue dall'Assemblea generale perché:", options: ["Può adottare decisioni vincolanti, con il potere di veto dei cinque membri permanenti", "È composto da tutti gli Stati membri", "Si occupa solo di questioni economiche", "Non può usare la forza"], correct: 0, explain: "Le risoluzioni del Capitolo VII sono vincolanti; quelle dell'Assemblea generale hanno di regola valore di raccomandazione." },
        { question: "Nel diritto internazionale l'uso della forza è lecito:", options: ["Sempre, per tutelare interessi nazionali", "In legittima difesa o su autorizzazione del Consiglio di Sicurezza", "Solo per rappresaglia economica", "Mai, in nessun caso"], correct: 1, explain: "L'art. 2 par. 4 della Carta ONU vieta la minaccia e l'uso della forza, con le due eccezioni previste dalla Carta stessa." },
    ],
    psicSociale: [
        { question: "L'errore fondamentale di attribuzione consiste nel:", options: ["Sovrastimare le cause interne del comportamento altrui e sottostimare quelle situazionali", "Ricordare meglio gli eventi recenti", "Attribuire a sé i successi", "Ignorare i dati statistici"], correct: 0, explain: "Per noi stessi tendiamo a fare il contrario, spiegando i nostri comportamenti con le circostanze: è l'asimmetria attore-osservatore." },
        { question: "L'esperimento di Asch sul conformismo ha mostrato che:", options: ["Le persone resistono sempre al gruppo", "Molte persone danno una risposta palesemente errata per allinearsi alla maggioranza", "Il gruppo migliora sempre le prestazioni", "L'autorità non influenza il giudizio"], correct: 1, explain: "Bastava una maggioranza unanime di complici; la presenza di un solo alleato dissenziente riduceva molto il conformismo." },
        { question: "La dissonanza cognitiva di Festinger si verifica quando:", options: ["Due cognizioni sono in contrasto e generano disagio", "Si dimentica un'informazione", "Si apprende per imitazione", "Si prova empatia"], correct: 0, explain: "Per ridurre il disagio si cambia atteggiamento, comportamento o si aggiungono giustificazioni: spesso si sceglie la via più facile." },
        { question: "L'effetto spettatore (bystander effect) indica che:", options: ["Più persone sono presenti, minore è la probabilità che qualcuno intervenga", "Il pubblico migliora la prestazione", "Le persone aiutano sempre gli sconosciuti", "La folla rende più aggressivi"], correct: 0, explain: "Pesano la diffusione di responsabilità e l'ignoranza pluralistica: se nessuno reagisce, si conclude che non serva intervenire." },
        { question: "Secondo l'ipotesi del contatto di Allport, il pregiudizio si riduce quando i gruppi:", options: ["Si incontrano in condizioni di pari status e con obiettivi comuni", "Vengono separati", "Competono tra loro", "Sono informati per iscritto"], correct: 0, explain: "Servono anche cooperazione e sostegno delle istituzioni: il semplice contatto, in condizioni di conflitto, può perfino peggiorare le cose." },
    ],
    psicSviluppo: [
        { question: "Secondo Piaget, lo stadio sensomotorio copre indicativamente:", options: ["0-2 anni", "2-7 anni", "7-11 anni", "Dopo gli 11 anni"], correct: 0, explain: "Seguono preoperatorio (2-7), operatorio concreto (7-11) e operatorio formale, con il pensiero astratto e ipotetico-deduttivo." },
        { question: "La conquista della permanenza dell'oggetto significa che il bambino:", options: ["Capisce che un oggetto continua a esistere anche se non lo vede", "Riconosce i colori", "Impara a parlare", "Sa contare"], correct: 0, explain: "Compare intorno agli 8-12 mesi e segna un passaggio chiave dello stadio sensomotorio." },
        { question: "Per Vygotskij la zona di sviluppo prossimale è:", options: ["Ciò che il bambino sa già fare da solo", "La distanza tra ciò che sa fare da solo e ciò che riesce a fare con l'aiuto di un adulto o di un pari più esperto", "Il livello massimo raggiungibile da adulto", "L'area del cervello del linguaggio"], correct: 1, explain: "È il fondamento teorico dello scaffolding: l'aiuto va calibrato lì e progressivamente ritirato." },
        { question: "Nella Strange Situation di Ainsworth si valuta:", options: ["Il quoziente intellettivo", "Lo stile di attaccamento del bambino", "Il linguaggio", "La memoria di lavoro"], correct: 1, explain: "Dalle reazioni a separazione e ricongiungimento emergono attaccamento sicuro, evitante, ambivalente e disorganizzato." },
        { question: "Secondo Erikson, il compito evolutivo dell'adolescenza è:", options: ["Fiducia contro sfiducia", "Identità contro confusione di ruolo", "Generatività contro stagnazione", "Integrità contro disperazione"], correct: 1, explain: "Ogni età presenta una crisi tipica: la risoluzione positiva aggiunge una forza dell'Io, qui la fedeltà a valori e scelte." },
    ],
    psicometria: [
        { question: "L'attendibilità di un test indica:", options: ["La coerenza e stabilità delle misure", "Se il test misura davvero il costrutto", "La sua lunghezza", "Il costo di somministrazione"], correct: 0, explain: "La validità riguarda invece il contenuto della misura: un test può essere attendibile (misura sempre allo stesso modo) ma non valido." },
        { question: "L'alfa di Cronbach misura:", options: ["La coerenza interna di una scala", "La correlazione con un criterio esterno", "La normalità della distribuzione", "La differenza tra due medie"], correct: 0, explain: "Valori indicativamente sopra 0,70 sono considerati accettabili; valori altissimi possono però segnalare item ridondanti." },
        { question: "La standardizzazione di un test serve a:", options: ["Rendere confrontabili i punteggi rispetto a un campione normativo", "Ridurre il numero di item", "Aumentare la difficoltà", "Eliminare la varianza"], correct: 0, explain: "I punteggi grezzi diventano punti z, T o QI: solo così si può dire se un risultato è alto o basso rispetto alla popolazione." },
        { question: "In una distribuzione normale, circa il 95% dei casi cade entro:", options: ["Una deviazione standard dalla media", "Due deviazioni standard dalla media", "Tre deviazioni standard dalla media", "La sola media"], correct: 1, explain: "Regola empirica 68-95-99,7: entro una, due e tre deviazioni standard dalla media." },
        { question: "La validità di costrutto di un test si valuta soprattutto:", options: ["Con analisi fattoriale e correlazioni con misure teoricamente affini o distanti", "Contando gli item", "Con il solo giudizio degli esperti", "Con il tempo di somministrazione"], correct: 0, explain: "Servono prove convergenti (correla con ciò che dovrebbe) e discriminanti (non correla con ciò che non dovrebbe)." },
    ],
    neuroscienze: [
        { question: "Il potenziale d'azione di un neurone è generato principalmente da:", options: ["Ingresso di ioni sodio seguito da uscita di potassio", "Uscita di calcio", "Ingresso di cloro", "Rilascio di glucosio"], correct: 0, explain: "Superata la soglia scatta la depolarizzazione tutto-o-nulla; la ripolarizzazione avviene con l'uscita di K⁺ e la pompa sodio-potassio ripristina i gradienti." },
        { question: "La sinapsi chimica trasmette il segnale attraverso:", options: ["Il passaggio diretto di corrente", "Il rilascio di neurotrasmettitori nello spazio sinaptico", "Onde elettromagnetiche", "La mielina"], correct: 1, explain: "Le sinapsi elettriche, con giunzioni comunicanti, esistono ma sono meno diffuse: le chimiche sono più lente ma molto più modulabili." },
        { question: "La guaina mielinica serve a:", options: ["Aumentare la velocità di conduzione dell'impulso", "Produrre neurotrasmettitori", "Nutrire il neurone", "Eliminare le scorie"], correct: 0, explain: "La conduzione saltatoria tra i nodi di Ranvier accelera l'impulso; la sua perdita, come nella sclerosi multipla, lo rallenta o lo blocca." },
        { question: "L'ippocampo è implicato soprattutto:", options: ["Nel controllo motorio fine", "Nella formazione di nuove memorie dichiarative", "Nella visione", "Nella respirazione"], correct: 1, explain: "Il caso del paziente H.M. mostrò che, senza ippocampo, si conservano i ricordi vecchi ma non se ne formano di nuovi." },
        { question: "La plasticità sinaptica indica:", options: ["La capacità delle connessioni di modificarsi con l'esperienza", "La rigidità dei circuiti", "La velocità di conduzione", "Il numero di neuroni"], correct: 0, explain: "Il potenziamento a lungo termine (LTP) ne è l'esempio più studiato ed è considerato un meccanismo cellulare dell'apprendimento." },
    ],
    psicClinica: [
        { question: "Il DSM-5 è:", options: ["Un manuale diagnostico e statistico dei disturbi mentali", "Un test di intelligenza", "Una scala di personalità", "Un protocollo di terapia"], correct: 0, explain: "Fornisce criteri condivisi per la diagnosi, utili a ricerca e comunicazione clinica, ma non prescrive il trattamento." },
        { question: "La terapia cognitivo-comportamentale lavora principalmente su:", options: ["Conflitti inconsci infantili", "Pensieri disfunzionali e comportamenti che mantengono il problema", "Solo sul corpo", "Sull'albero genealogico"], correct: 1, explain: "Si usano ristrutturazione cognitiva, esposizione graduale e compiti tra le sedute: l'obiettivo è misurabile e circoscritto." },
        { question: "L'alleanza terapeutica è:", options: ["Il legame collaborativo tra paziente e terapeuta su obiettivi e compiti condivisi", "Il contratto economico", "La diagnosi condivisa", "Il gruppo di supporto"], correct: 0, explain: "È tra i migliori predittori dell'esito, indipendentemente dall'orientamento teorico del terapeuta." },
        { question: "Nel disturbo d'ansia generalizzata l'elemento centrale è:", options: ["Una preoccupazione eccessiva e persistente su più ambiti di vita", "Un attacco di panico isolato", "Un'ossessione specifica", "Un'allucinazione"], correct: 0, explain: "Per la diagnosi la preoccupazione deve essere difficile da controllare e presente per la maggior parte dei giorni per almeno sei mesi." },
        { question: "Il segreto professionale dello psicologo può essere derogato:", options: ["Mai", "Nei casi previsti dalla legge, per esempio di fronte a un pericolo grave e attuale per la vita", "Su richiesta di un familiare", "Per finalità di ricerca"], correct: 1, explain: "Il codice deontologico impone riservatezza, ma prevede eccezioni in presenza di un valido consenso o di un obbligo di legge." },
    ],
    // ---- AREA MEDICO-BIOLOGICA E SCIENTIFICA ----
    istologia: [
        { question: "I quattro tessuti fondamentali del corpo umano sono:", options: ["Epiteliale, connettivo, muscolare, nervoso", "Osseo, cartilagineo, adiposo, sanguigno", "Liscio, striato, cardiaco, elastico", "Cutaneo, ghiandolare, vascolare, linfatico"], correct: 0, explain: "Tutti gli altri tessuti sono varianti di questi quattro: per esempio osso, cartilagine, sangue e tessuto adiposo sono connettivi." },
        { question: "Quale tessuto riveste le superfici e forma le ghiandole?", options: ["Connettivo", "Epiteliale", "Muscolare", "Nervoso"], correct: 1, explain: "Le cellule epiteliali sono strettamente unite, poggiano su una membrana basale e non sono vascolarizzate: si nutrono per diffusione dal connettivo sottostante." },
        { question: "Il tessuto muscolare striato cardiaco si distingue da quello scheletrico perché:", options: ["Non ha striature", "È involontario e le cellule sono unite da dischi intercalari", "È formato da un solo tipo di filamento", "Non consuma ATP"], correct: 1, explain: "I dischi intercalari, con le giunzioni comunicanti, permettono la propagazione rapida dell'impulso e la contrazione sincrona del miocardio." },
        { question: "I tre foglietti embrionali che si formano con la gastrulazione sono:", options: ["Ectoderma, mesoderma, endoderma", "Epiblasto, ipoblasto, trofoblasto", "Corion, amnios, allantoide", "Neuroderma, miotomo, sclerotomo"], correct: 0, explain: "Dall'ectoderma derivano epidermide e sistema nervoso, dal mesoderma muscoli, ossa e apparato circolatorio, dall'endoderma i rivestimenti di apparato digerente e respiratorio." },
        { question: "La matrice extracellulare è una componente caratteristica soprattutto del tessuto:", options: ["Epiteliale", "Connettivo", "Nervoso", "Muscolare"], correct: 1, explain: "Fibre (collagene, elastiche, reticolari) e sostanza fondamentale amorfa danno al connettivo la sua funzione di sostegno e connessione." },
    ],
    geneticaMed: [
        { question: "In una malattia autosomica recessiva, da due genitori portatori sani la probabilità di figlio affetto è:", options: ["0%", "25%", "50%", "100%"], correct: 1, explain: "Incrocio Aa × Aa: un quarto AA sani, metà Aa portatori sani, un quarto aa affetti." },
        { question: "Una malattia legata al cromosoma X recessiva, come l'emofilia A, colpisce più spesso:", options: ["I maschi", "Le femmine", "Entrambi allo stesso modo", "Solo gli omozigoti femmine"], correct: 0, explain: "Il maschio ha una sola X: basta un allele mutato per manifestare la malattia, mentre la femmina è di solito portatrice sana." },
        { question: "La trisomia 21 (sindrome di Down) è causata più spesso da:", options: ["Una delezione", "Una non disgiunzione meiotica", "Una mutazione puntiforme", "Un'inversione"], correct: 1, explain: "I cromosomi omologhi non si separano correttamente durante la meiosi e il gamete porta una copia in più del cromosoma 21." },
        { question: "Il genotipo è:", options: ["L'insieme dei caratteri osservabili", "Il corredo genetico di un individuo", "La sola mutazione presente", "Il numero di cromosomi"], correct: 1, explain: "Il fenotipo è invece la manifestazione osservabile, risultato dell'interazione tra genotipo e ambiente." },
        { question: "La penetranza incompleta di un allele significa che:", options: ["L'allele non viene trasmesso", "Non tutti i portatori del genotipo manifestano il fenotipo", "Il gene è sempre letale", "La mutazione è somatica"], correct: 1, explain: "Va distinta dall'espressività variabile, che riguarda invece quanto intensamente la malattia si manifesta in chi la esprime." },
    ],
    immunologia: [
        { question: "La differenza principale tra immunità innata e adattativa è che quest'ultima:", options: ["È più rapida", "È specifica per l'antigene e genera memoria", "Non coinvolge cellule", "Agisce solo sui virus"], correct: 1, explain: "L'innata risponde in minuti-ore in modo aspecifico; l'adattativa impiega giorni ma riconosce l'antigene e lo ricorda." },
        { question: "Gli anticorpi sono prodotti da:", options: ["Linfociti T citotossici", "Plasmacellule derivate dai linfociti B", "Macrofagi", "Neutrofili"], correct: 1, explain: "Il linfocito B attivato prolifera e si differenzia in plasmacellule, che secernono immunoglobuline, e in cellule della memoria." },
        { question: "Le molecole MHC di classe I presentano antigeni:", options: ["Ai linfociti T CD8+ citotossici", "Ai linfociti B", "Ai neutrofili", "Solo alle cellule NK"], correct: 0, explain: "Le MHC di classe I, presenti su quasi tutte le cellule nucleate, mostrano peptidi endogeni; le MHC di classe II presentano antigeni esogeni ai linfociti T CD4+." },
        { question: "La memoria immunologica è il principio su cui si basa:", options: ["L'anestesia", "La vaccinazione", "La trasfusione", "La dialisi"], correct: 1, explain: "Il vaccino espone il sistema immunitario a un antigene innocuo: alla vera infezione la risposta è più rapida e intensa." },
        { question: "Una reazione di ipersensibilità di tipo I (allergia immediata) è mediata da:", options: ["IgG", "IgE e mastociti", "Linfociti T", "Complemento"], correct: 1, explain: "Le IgE legate ai mastociti, incontrando l'allergene, provocano la degranulazione con rilascio di istamina in pochi minuti." },
    ],
    microbiologia: [
        { question: "La colorazione di Gram distingue i batteri in base:", options: ["Alla forma", "Alla struttura della parete cellulare", "Alla temperatura di crescita", "Alla mobilità"], correct: 1, explain: "I Gram-positivi hanno uno spesso strato di peptidoglicano che trattiene il cristalvioletto; i Gram-negativi lo hanno sottile, con una membrana esterna, e si colorano di rosa." },
        { question: "La differenza fondamentale tra cellula procariotica ed eucariotica è:", options: ["La presenza di DNA", "L'assenza di nucleo delimitato da membrana nei procarioti", "La presenza di ribosomi", "La capacità di dividersi"], correct: 1, explain: "I procarioti non hanno nucleo né organelli membranosi; il loro DNA è un cromosoma circolare nel citoplasma, spesso con plasmidi." },
        { question: "Perché gli antibiotici non sono efficaci contro i virus?", options: ["I virus sono troppo grandi", "I virus non hanno le strutture cellulari su cui agiscono gli antibiotici", "Gli antibiotici agiscono solo nel sangue", "I virus sono sempre resistenti"], correct: 1, explain: "Parete, ribosomi batterici e sintesi dei folati sono bersagli assenti nei virus, che si replicano usando la cellula ospite: servono antivirali." },
        { question: "La resistenza agli antibiotici si diffonde tra i batteri soprattutto tramite:", options: ["Sola mutazione spontanea", "Trasferimento genico orizzontale, per esempio di plasmidi", "Contatto con l'aria", "Sporulazione"], correct: 1, explain: "Coniugazione, trasformazione e trasduzione permettono di scambiare geni di resistenza anche tra specie diverse." },
        { question: "La sterilizzazione si distingue dalla disinfezione perché:", options: ["Elimina ogni forma vivente, spore comprese", "Riduce solo i batteri patogeni", "Si usa solo sulla cute", "Non usa il calore"], correct: 0, explain: "L'autoclave a 121 °C per circa 15-20 minuti è il metodo di riferimento, perché il vapore sotto pressione uccide anche le spore." },
    ],
    igiene: [
        { question: "La prevenzione primaria ha l'obiettivo di:", options: ["Diagnosticare precocemente la malattia", "Impedire che la malattia insorga", "Ridurre le complicanze di una malattia già presente", "Riabilitare il paziente"], correct: 1, explain: "Vaccinazioni e stili di vita sono prevenzione primaria; gli screening sono secondaria; la riabilitazione è terziaria." },
        { question: "L'incidenza di una malattia misura:", options: ["I casi totali presenti in un dato momento", "I nuovi casi in un periodo di tempo", "I decessi sul totale dei malati", "La durata media della malattia"], correct: 1, explain: "La prevalenza è la fotografia dei casi esistenti, l'incidenza il flusso di nuovi casi: le malattie croniche hanno prevalenza alta e incidenza bassa." },
        { question: "L'immunità di gregge consiste nel fatto che:", options: ["Chi è vaccinato non si ammala mai", "Una quota sufficiente di immuni riduce la circolazione dell'agente e protegge anche i non immuni", "I virus scompaiono", "I non vaccinati sviluppano immunità naturale"], correct: 1, explain: "La soglia dipende dalla contagiosità: per il morbillo serve una copertura molto alta, attorno al 95%." },
        { question: "Uno studio caso-controllo confronta:", options: ["Esposti e non esposti seguiti nel tempo", "Soggetti malati e sani rispetto a esposizioni passate", "Due trattamenti assegnati a caso", "Popolazioni intere in un istante"], correct: 1, explain: "Parte dalla malattia e guarda indietro all'esposizione: è rapido ed economico, utile per malattie rare, ma esposto al bias di memoria." },
        { question: "La sensibilità di un test diagnostico indica la capacità di:", options: ["Identificare correttamente i malati", "Identificare correttamente i sani", "Ridurre i costi", "Confermare la diagnosi"], correct: 0, explain: "La specificità riguarda invece i sani: un test molto sensibile ha pochi falsi negativi ed è adatto agli screening." },
    ],
    medInterna: [
        { question: "Secondo le linee guida più diffuse, si parla di ipertensione arteriosa nell'adulto da valori di:", options: ["120/80 mmHg", "140/90 mmHg", "160/100 mmHg", "180/110 mmHg"], correct: 1, explain: "La misurazione ambulatoriale va confermata in più occasioni; valori tra 130-139/85-89 sono considerati normali-alti." },
        { question: "Il diabete mellito di tipo 1 si differenzia dal tipo 2 perché:", options: ["È causato da insulino-resistenza", "È dovuto a distruzione autoimmune delle beta cellule con carenza di insulina", "Compare solo dopo i 60 anni", "Non richiede mai insulina"], correct: 1, explain: "Nel tipo 2 l'insulina c'è ma i tessuti rispondono poco; il tipo 1 esordisce spesso in età giovanile e richiede insulina fin da subito." },
        { question: "Il valore di emoglobina glicata (HbA1c) riflette il controllo glicemico:", options: ["Delle ultime ore", "Degli ultimi 2-3 mesi", "Dell'ultimo anno", "Del solo digiuno"], correct: 1, explain: "Dipende dalla vita media dei globuli rossi: per questo è un indicatore più stabile della glicemia puntuale." },
        { question: "La triade classica dello scompenso cardiaco congestizio comprende:", options: ["Dispnea, edemi declivi, astenia", "Febbre, tosse, rash", "Poliuria, polidipsia, calo ponderale", "Ittero, prurito, feci chiare"], correct: 0, explain: "La congestione a monte del cuore sinistro dà dispnea, quella del destro edemi periferici e turgore giugulare." },
        { question: "La BPCO si caratterizza per:", options: ["Ostruzione bronchiale persistente e poco reversibile", "Ostruzione completamente reversibile", "Restrizione polmonare pura", "Assenza di sintomi respiratori"], correct: 0, explain: "La spirometria mostra un rapporto VEMS/CVF ridotto che non si normalizza dopo broncodilatatore, a differenza dell'asma." },
    ],
    chirurgiaGen: [
        { question: "Il segno di Blumberg positivo nella fossa iliaca destra orienta verso:", options: ["Appendicite acuta", "Colecistite", "Pancreatite", "Ulcera gastrica"], correct: 0, explain: "È il dolore alla brusca decompressione della parete: segnala irritazione peritoneale nella sede corrispondente." },
        { question: "L'asepsi in sala operatoria consiste nel:", options: ["Ridurre i germi sulla cute del solo paziente", "Prevenire la contaminazione del campo operatorio mantenendo sterili strumenti e operatori", "Usare antibiotici dopo l'intervento", "Disinfettare solo le mani"], correct: 1, explain: "L'antisepsi elimina i microrganismi presenti, l'asepsi evita che ne arrivino di nuovi: insieme riducono le infezioni del sito chirurgico." },
        { question: "La chirurgia laparoscopica rispetto a quella aperta comporta di norma:", options: ["Degenza più lunga", "Minore dolore postoperatorio e recupero più rapido", "Maggiore perdita ematica", "Cicatrici più estese"], correct: 1, explain: "Gli accessi piccoli riducono il trauma della parete; richiede però strumentazione dedicata e curva di apprendimento." },
        { question: "L'ernia inguinale consiste nella:", options: ["Fuoriuscita di un viscere attraverso un punto debole della parete addominale", "Infiammazione del peritoneo", "Ostruzione del piccolo intestino da aderenze", "Dilatazione di un'arteria"], correct: 0, explain: "Se il contenuto non è riducibile e la vascolarizzazione è compromessa si parla di ernia strozzata, un'urgenza chirurgica." },
        { question: "Nel paziente politraumatizzato la valutazione primaria segue lo schema:", options: ["ABCDE", "PQRST", "SBAR", "FAST"], correct: 0, explain: "Airway, Breathing, Circulation, Disability, Exposure: si affronta prima ciò che uccide prima." },
    ],
    calcoloNum: [
        { question: "L'errore di troncamento in un metodo numerico deriva:", options: ["Dalla rappresentazione finita dei numeri nel calcolatore", "Dall'aver approssimato un procedimento infinito con un numero finito di passi", "Da un errore di programmazione", "Dai dati sperimentali"], correct: 1, explain: "L'errore dovuto alla rappresentazione finita dei numeri è invece l'errore di arrotondamento: i due si sommano nel risultato." },
        { question: "Il metodo di bisezione per trovare uno zero richiede che nell'intervallo [a,b] la funzione:", options: ["Sia costante", "Sia continua e assuma segni opposti agli estremi", "Sia derivabile due volte", "Sia lineare"], correct: 1, explain: "È il teorema degli zeri: la convergenza è garantita ma lenta, perché a ogni passo l'intervallo si dimezza." },
        { question: "Rispetto alla bisezione, il metodo di Newton:", options: ["Converge più lentamente", "Converge tipicamente più in fretta ma richiede la derivata e un buon punto iniziale", "Non richiede alcuna ipotesi", "Funziona solo su polinomi"], correct: 1, explain: "La convergenza è quadratica vicino alla radice, ma con derivata quasi nulla o punto iniziale lontano il metodo può divergere." },
        { question: "Un problema si dice mal condizionato quando:", options: ["Piccole variazioni nei dati causano grandi variazioni nel risultato", "Non ha soluzione", "Richiede troppa memoria", "Ha infinite soluzioni"], correct: 0, explain: "È una proprietà del problema, non dell'algoritmo: nessun metodo, per quanto stabile, può rimediare del tutto a un cattivo condizionamento." },
        { question: "Il metodo dei trapezi serve a:", options: ["Risolvere sistemi lineari", "Approssimare un integrale definito", "Interpolare dati", "Calcolare autovalori"], correct: 1, explain: "Approssima l'area sotto la curva con trapezi; la formula di Simpson, usando archi di parabola, è in genere più accurata a parità di suddivisioni." },
    ],
    // ---- INGEGNERIA (lotto 2: meccanica, civile, gestionale) ----
    disegnoTecnico: [
        { question: "Nel metodo europeo di rappresentazione (primo diedro), la vista da sinistra si disegna:", options: ["A sinistra della vista frontale", "A destra della vista frontale", "Sopra la vista frontale", "Sotto la vista frontale"], correct: 1, explain: "Nel primo diedro l'oggetto sta tra osservatore e piano di proiezione, quindi ogni vista finisce dalla parte opposta rispetto alla direzione di osservazione." },
        { question: "Una scala 1:2 in un disegno tecnico significa che l'oggetto è rappresentato:", options: ["Il doppio del vero", "La metà del vero", "In grandezza naturale", "Senza quote"], correct: 1, explain: "Il primo numero è il disegno, il secondo la realtà: 1:2 è una riduzione, 2:1 un ingrandimento, 1:1 la grandezza naturale." },
        { question: "A cosa serve una sezione in un disegno tecnico?", options: ["A colorare il pezzo", "A mostrare la forma interna evitando troppe linee nascoste", "A indicare il materiale", "A ridurre la scala"], correct: 1, explain: "Si immagina di tagliare il pezzo: le parti effettivamente tagliate si campiscono con il tratteggio a 45°." },
        { question: "La linea a tratto e punto fine nei disegni indica:", options: ["Uno spigolo visibile", "Un asse o una mezzeria", "Un contorno nascosto", "Una quota"], correct: 1, explain: "Gli spigoli visibili sono a linea continua grossa, quelli nascosti tratteggiati, gli assi a tratto e punto." },
        { question: "Una tolleranza dimensionale indica:", options: ["Il campo entro cui la misura reale è accettabile", "Il peso del pezzo", "La rugosità superficiale", "Il tipo di lavorazione"], correct: 0, explain: "Nessun pezzo è esatto: la tolleranza fissa scostamento massimo e minimo ammessi, e permette l'intercambiabilità dei componenti." },
    ],
    meccanica: [
        { question: "Un corpo rigido nello spazio ha quanti gradi di libertà?", options: ["3", "4", "6", "12"], correct: 2, explain: "Tre traslazioni lungo gli assi e tre rotazioni attorno agli stessi: nel piano si riducono a tre (due traslazioni e una rotazione)." },
        { question: "Il momento di una forza rispetto a un punto è:", options: ["Il prodotto della forza per la massa", "Il prodotto vettoriale tra braccio e forza", "La forza divisa per la distanza", "Sempre nullo per forze parallele"], correct: 1, explain: "Il modulo vale forza per braccio, cioè per la distanza perpendicolare tra la retta d'azione e il punto scelto." },
        { question: "Condizione di equilibrio statico di un corpo rigido:", options: ["Risultante delle forze nulla", "Momento risultante nullo", "Risultante delle forze e momento risultante entrambi nulli", "Velocità costante"], correct: 2, explain: "Servono entrambe: la sola risultante nulla lascia comunque possibile una rotazione, per esempio sotto una coppia." },
        { question: "Il momento di inerzia di un corpo dipende:", options: ["Solo dalla massa", "Dalla massa e da come è distribuita rispetto all'asse", "Solo dalla velocità angolare", "Dalla forza applicata"], correct: 1, explain: "Più la massa è lontana dall'asse, maggiore è il momento di inerzia: per questo un tubo ruota più a fatica di un cilindro pieno di pari massa." },
        { question: "Il teorema di Huygens-Steiner permette di calcolare:", options: ["Il baricentro", "Il momento di inerzia rispetto a un asse parallelo a quello baricentrico", "L'energia cinetica", "La quantità di moto"], correct: 1, explain: "Si somma al momento baricentrico il termine m·d², dove d è la distanza tra i due assi paralleli." },
    ],
    termodinamica: [
        { question: "Il primo principio della termodinamica afferma che:", options: ["L'entropia cresce sempre", "La variazione di energia interna è pari al calore scambiato meno il lavoro compiuto", "Il calore passa dal freddo al caldo", "Il rendimento è sempre unitario"], correct: 1, explain: "È il bilancio di conservazione dell'energia applicato a un sistema termodinamico: ΔU = Q − L." },
        { question: "Il secondo principio implica che il rendimento di una macchina termica:", options: ["Può raggiungere il 100%", "È sempre inferiore a quello del ciclo di Carnot tra le stesse temperature", "Non dipende dalle temperature", "Dipende solo dal fluido usato"], correct: 1, explain: "Il limite di Carnot vale 1 − T_fredda/T_calda con temperature assolute: nessuna macchina reale può superarlo." },
        { question: "In una trasformazione adiabatica:", options: ["La temperatura resta costante", "Non c'è scambio di calore con l'esterno", "La pressione resta costante", "Il volume resta costante"], correct: 1, explain: "Tutta l'energia scambiata è lavoro: per questo comprimendo adiabaticamente un gas la sua temperatura sale." },
        { question: "L'entropia di un sistema isolato, in una trasformazione reale:", options: ["Diminuisce", "Resta costante", "Aumenta", "Si annulla"], correct: 2, explain: "Resta costante solo nel caso ideale reversibile; ogni irreversibilità (attrito, scambio a temperature diverse) la fa crescere." },
        { question: "L'equazione di stato dei gas perfetti è:", options: ["pV = nRT", "pV = mgh", "p = ρgh", "Q = mcΔT"], correct: 0, explain: "Lega pressione, volume e temperatura assoluta; vale bene per gas rarefatti lontani dalla condensazione." },
    ],
    scienzaCostruzioni: [
        { question: "La tensione normale in una sezione soggetta a sforzo assiale N vale:", options: ["N × A", "N / A", "A / N", "N²/A"], correct: 1, explain: "La forza si distribuisce sull'area della sezione: σ = N/A. Per questo a parità di carico una sezione più grande è meno sollecitata." },
        { question: "La legge di Hooke, in campo elastico lineare, afferma che:", options: ["La tensione è proporzionale alla deformazione", "La deformazione è costante", "La tensione è nulla", "Il materiale si rompe subito"], correct: 0, explain: "σ = E·ε, dove E è il modulo di Young: descrive il tratto iniziale rettilineo della curva tensione-deformazione." },
        { question: "In una trave inflessa, le tensioni dovute al momento flettente sono massime:", options: ["Sull'asse neutro", "Sulle fibre più lontane dall'asse neutro", "Al centro della sezione", "Solo agli appoggi"], correct: 1, explain: "La distribuzione è lineare e si annulla sull'asse neutro: per questo le sezioni a doppio T concentrano il materiale nelle ali." },
        { question: "Il carico critico euleriano riguarda:", options: ["La rottura per taglio", "L'instabilità per compressione di un'asta snella", "La fatica", "La dilatazione termica"], correct: 1, explain: "Un'asta snella compressa può sbandare lateralmente prima di raggiungere la tensione di rottura; il carico critico dipende da E, dall'inerzia e dalla lunghezza libera di inflessione." },
        { question: "In una trave appoggiata con carico uniformemente distribuito q e luce l, il momento massimo in mezzeria vale:", options: ["ql²/2", "ql²/8", "ql²/12", "ql/4"], correct: 1, explain: "È un risultato di riferimento: nella mensola con lo stesso carico il momento massimo è invece ql²/2 all'incastro." },
    ],
    tecnologiaMat: [
        { question: "Nella prova di trazione, il modulo di Young rappresenta:", options: ["La pendenza del tratto elastico", "Il carico di rottura", "L'allungamento a rottura", "La durezza"], correct: 0, explain: "Misura la rigidezza del materiale: più è alto, meno il materiale si deforma a parità di tensione." },
        { question: "Un materiale duttile, rispetto a uno fragile:", options: ["Si rompe senza deformarsi", "Mostra una marcata deformazione plastica prima della rottura", "Ha sempre modulo elastico maggiore", "Non è saldabile"], correct: 1, explain: "La duttilità dà un preavviso alla rottura ed è per questo preferita in molte applicazioni strutturali." },
        { question: "L'aumento del tenore di carbonio negli acciai in genere:", options: ["Aumenta durezza e resistenza e riduce la duttilità", "Riduce la durezza", "Non cambia nulla", "Aumenta la duttilità"], correct: 0, explain: "Sopra circa il 2% di carbonio non si parla più di acciaio ma di ghisa, ancora più dura e fragile." },
        { question: "La tempra di un acciaio consiste in:", options: ["Un riscaldamento lento seguito da raffreddamento lento", "Un riscaldamento in campo austenitico seguito da raffreddamento rapido", "Una deformazione a freddo", "Un rivestimento superficiale"], correct: 1, explain: "Il raffreddamento rapido forma martensite, dura e fragile: di solito si fa seguire un rinvenimento per recuperare tenacità." },
        { question: "La rottura per fatica di un componente avviene:", options: ["Sotto un carico statico elevatissimo", "Dopo molti cicli di carico anche sotto la tensione di snervamento", "Solo ad alta temperatura", "Solo in presenza di corrosione"], correct: 1, explain: "La cricca nasce da un difetto o da un intaglio e si propaga ciclo dopo ciclo: per questo si curano raccordi e finitura superficiale." },
    ],
    fisicaTecnica: [
        { question: "I tre meccanismi di trasmissione del calore sono:", options: ["Conduzione, convezione, irraggiamento", "Conduzione, diffusione, evaporazione", "Convezione, compressione, irraggiamento", "Irraggiamento, fusione, condensazione"], correct: 0, explain: "La conduzione avviene nella materia in contatto, la convezione per movimento di un fluido, l'irraggiamento tramite onde elettromagnetiche anche nel vuoto." },
        { question: "Nella legge di Fourier, il flusso termico per conduzione è proporzionale:", options: ["Al quadrato dello spessore", "Al gradiente di temperatura e alla conducibilità del materiale", "Alla sola temperatura media", "Alla velocità dell'aria"], correct: 1, explain: "Più il salto termico è ripido e più il materiale è conduttivo, maggiore è il calore che passa: isolare significa ridurre λ e aumentare lo spessore." },
        { question: "La trasmittanza termica U di una parete indica:", options: ["Il calore che attraversa 1 m² per grado di differenza di temperatura", "La massa della parete", "Lo spessore utile", "L'umidità interna"], correct: 0, explain: "Si misura in W/m²K: più è bassa, migliore è l'isolamento. È l'inverso della resistenza termica totale." },
        { question: "L'umidità relativa dell'aria esprime:", options: ["La massa d'acqua contenuta in un metro cubo", "Il rapporto tra vapore presente e vapore a saturazione alla stessa temperatura", "La temperatura di rugiada", "La pressione atmosferica"], correct: 1, explain: "Per questo raffreddando l'aria, a parità di vapore contenuto, l'umidità relativa sale fino alla condensa (punto di rugiada)." },
        { question: "Il coefficiente di prestazione (COP) di una pompa di calore è:", options: ["Sempre minore di 1", "Il rapporto tra calore utile fornito ed energia elettrica assorbita", "Uguale al rendimento di Carnot", "Indipendente dalle temperature"], correct: 1, explain: "Può superare abbondantemente 1 perché la macchina non crea calore, lo sposta da una sorgente fredda a una calda." },
    ],
    idraulica: [
        { question: "La legge di Stevin dice che la pressione in un fluido in quiete:", options: ["È costante ovunque", "Cresce linearmente con la profondità", "Dipende dalla forma del recipiente", "Cresce con il quadrato della profondità"], correct: 1, explain: "p = ρ·g·h: per questo la pressione sul fondo dipende dall'altezza della colonna e non dalla larghezza del recipiente." },
        { question: "Il principio di Archimede afferma che la spinta su un corpo immerso è pari:", options: ["Al peso del corpo", "Al peso del fluido spostato", "Alla pressione atmosferica", "Al volume del corpo"], correct: 1, explain: "Il corpo galleggia se la spinta eguaglia il suo peso, cioè se la sua densità media è minore di quella del fluido." },
        { question: "L'equazione di continuità per un fluido incomprimibile impone che:", options: ["La portata si conservi lungo il condotto", "La velocità sia costante", "La pressione sia costante", "La densità cambi con la sezione"], correct: 0, explain: "A·v costante: se la sezione si restringe la velocità aumenta, ed è il motivo per cui l'acqua esce più veloce dal tubo strozzato." },
        { question: "Nel teorema di Bernoulli, dove la velocità del fluido aumenta:", options: ["La pressione aumenta", "La pressione diminuisce", "La quota aumenta", "La densità aumenta"], correct: 1, explain: "La somma di termine cinetico, piezometrico e geodetico resta costante: cresce uno, cala un altro." },
        { question: "Il numero di Reynolds serve a distinguere:", options: ["Fluidi caldi e freddi", "Moto laminare e moto turbolento", "Liquidi e gas", "Condotti circolari e rettangolari"], correct: 1, explain: "Rapporta le forze d'inerzia a quelle viscose: nelle condotte in pressione, sotto circa 2000 il moto è laminare, sopra 4000 turbolento." },
    ],
    geotecnica: [
        { question: "Il principio delle tensioni efficaci di Terzaghi afferma che:", options: ["La tensione totale è uguale alla pressione dell'acqua", "La tensione efficace è la tensione totale meno la pressione interstiziale", "Le tensioni efficaci sono sempre nulle", "L'acqua non influisce sul terreno"], correct: 1, explain: "È il concetto chiave della geotecnica: resistenza e deformazione del terreno dipendono dalla tensione efficace, non da quella totale." },
        { question: "Nel criterio di Mohr-Coulomb la resistenza al taglio di un terreno dipende da:", options: ["Coesione e angolo di attrito interno", "Solo dalla densità", "Solo dalla permeabilità", "Solo dal contenuto d'acqua"], correct: 0, explain: "τ = c + σ'·tan φ: nelle sabbie pulite la coesione è praticamente nulla, nelle argille è l'attrito a pesare meno." },
        { question: "La legge di Darcy descrive:", options: ["Il flusso dell'acqua nel terreno in funzione del gradiente idraulico", "La rottura per taglio", "Il cedimento immediato", "La compattazione"], correct: 0, explain: "v = k·i, dove k è la permeabilità: le ghiaie la hanno alta, le argille bassissima, e questo governa i tempi di consolidazione." },
        { question: "La consolidazione di un'argilla satura è:", options: ["Un cedimento istantaneo", "Un cedimento differito dovuto all'espulsione lenta dell'acqua interstiziale", "Una rottura fragile", "Un fenomeno solo delle sabbie"], correct: 1, explain: "L'acqua deve uscire prima che il carico si trasferisca allo scheletro solido: nelle argille può richiedere anni." },
        { question: "Una prova SPT in sito serve a stimare:", options: ["La permeabilità", "Lo stato di addensamento o la consistenza del terreno", "La temperatura", "La composizione chimica"], correct: 1, explain: "Si contano i colpi necessari a infiggere il campionatore: il valore N si correla a densità relativa e parametri di resistenza." },
    ],
    ricercaOperativa: [
        { question: "In un problema di programmazione lineare la regione ammissibile è:", options: ["Sempre un cerchio", "Un poliedro convesso definito dai vincoli", "Un insieme qualunque", "Sempre illimitata"], correct: 1, explain: "Vincoli lineari generano semispazi: la loro intersezione è convessa, e l'ottimo si trova in un vertice." },
        { question: "L'algoritmo del simplesso opera:", options: ["Muovendosi da vertice a vertice migliorando la funzione obiettivo", "Provando tutti i punti interni", "Solo su problemi non lineari", "Solo con due variabili"], correct: 0, explain: "Poiché l'ottimo di un problema lineare sta in un vertice, basta esplorare i vertici seguendo la direzione che migliora l'obiettivo." },
        { question: "In un problema di programmazione lineare intera le variabili:", options: ["Possono assumere qualsiasi valore reale", "Devono assumere valori interi", "Sono sempre binarie", "Non hanno vincoli"], correct: 1, explain: "Il vincolo di interezza rende il problema molto più difficile: si usano tecniche come branch and bound e piani di taglio." },
        { question: "Nel metodo del cammino critico (CPM), il cammino critico è:", options: ["Il percorso più costoso", "La sequenza di attività che determina la durata minima del progetto", "L'attività più rischiosa", "Il percorso con più risorse"], correct: 1, explain: "Le attività critiche hanno scorrimento nullo: un loro ritardo si traduce direttamente in ritardo dell'intero progetto." },
        { question: "Il modello del lotto economico di acquisto (EOQ) bilancia:", options: ["Costi di ordinazione e costi di mantenimento a scorta", "Prezzo di vendita e margine", "Domanda e offerta", "Costi fissi e variabili di produzione"], correct: 0, explain: "Ordinare spesso costa in emissione ordini, ordinare tanto costa in magazzino: l'EOQ è la quantità che minimizza la somma dei due." },
    ],
    inglese: [
        { question: "Which sentence is correct in an academic abstract?", options: ["The results was significant", "The results were significant", "The results is significant", "The result were significant"], correct: 1, explain: "\"Results\" è plurale e richiede \"were\". In inglese accademico l'accordo soggetto-verbo è uno degli errori più frequenti." },
        { question: "In a research paper, the Methods section usually describes:", options: ["What the study found", "How the study was carried out", "Why the topic matters", "What other authors think"], correct: 1, explain: "La struttura IMRaD: Introduction (perché), Methods (come), Results (che cosa si è trovato), Discussion (che cosa significa)." },
        { question: "Choose the best academic alternative to \"a lot of studies\":", options: ["Lots of studies", "Plenty of studies", "Numerous studies", "Tons of studies"], correct: 2, explain: "\"Numerous\" o \"several\" appartengono al registro formale; le altre forme sono colloquiali e vanno evitate nella scrittura scientifica." },
        { question: "Which verb form fits: \"The experiment ____ in 2023 by a team in Modena\"?", options: ["conducted", "was conducted", "has conducting", "is conduct"], correct: 1, explain: "Il passivo al passato semplice è tipico dei Methods, perché sposta l'attenzione sull'esperimento invece che su chi lo ha svolto." },
        { question: "\"However\" is normally used to:", options: ["Add a similar idea", "Introduce a contrast", "Give an example", "Show a consequence"], correct: 1, explain: "Per aggiungere si usa \"moreover\", per esemplificare \"for instance\", per la conseguenza \"therefore\"." },
    ],
    // ---- INGEGNERIA (lotto 1: informatica ed elettronica) ----
    elettrotecnica: [
        { question: "In un circuito resistivo, la legge di Ohm lega tensione, corrente e resistenza come:", options: ["V = I / R", "V = R / I", "V = R × I", "V = I × R²"], correct: 2, explain: "La tensione ai capi di un resistore è il prodotto della resistenza per la corrente che lo attraversa." },
        { question: "La legge di Kirchhoff delle correnti afferma che in un nodo:", options: ["La somma delle correnti entranti è uguale alla somma di quelle uscenti", "La corrente è sempre nulla", "La somma delle tensioni è zero", "La potenza si conserva solo in continua"], correct: 0, explain: "Il nodo non accumula carica: quello che entra deve uscire. È la conseguenza diretta della conservazione della carica." },
        { question: "Due resistori da 6 Ω collegati in parallelo equivalgono a:", options: ["12 Ω", "6 Ω", "3 Ω", "1,5 Ω"], correct: 2, explain: "In parallelo si sommano le conduttanze: 1/R = 1/6 + 1/6 = 1/3, quindi R = 3 Ω. Due resistori uguali in parallelo danno sempre metà del valore." },
        { question: "In regime sinusoidale la potenza attiva assorbita da un carico vale:", options: ["V × I", "V × I × cos φ", "V × I × sen φ", "V² × I"], correct: 1, explain: "Solo la componente di corrente in fase con la tensione produce lavoro: cos φ è il fattore di potenza. La parte in quadratura dà la potenza reattiva." },
        { question: "Il teorema di Thévenin permette di sostituire una rete lineare vista da due morsetti con:", options: ["Un generatore di corrente ideale", "Un generatore di tensione in serie a una resistenza", "Una sola resistenza", "Un condensatore equivalente"], correct: 1, explain: "Il generatore vale la tensione a vuoto ai morsetti e la resistenza è quella vista dagli stessi morsetti con i generatori spenti." },
    ],
    segnali: [
        { question: "A cosa serve la trasformata di Fourier di un segnale?", options: ["A rappresentarlo nel dominio della frequenza", "A ridurne la potenza", "A eliminarne il rumore", "A campionarlo"], correct: 0, explain: "La trasformata scompone il segnale nelle sinusoidi che lo compongono: dal dominio del tempo si passa a quello della frequenza." },
        { question: "Secondo il teorema del campionamento, per ricostruire un segnale di banda B occorre campionare ad almeno:", options: ["B", "2B", "B/2", "4B"], correct: 1, explain: "La frequenza di Nyquist è il doppio della banda: sotto quella soglia le repliche dello spettro si sovrappongono." },
        { question: "Come si chiama il fenomeno per cui, campionando troppo lentamente, le alte frequenze si presentano come frequenze basse?", options: ["Quantizzazione", "Aliasing", "Dispersione", "Modulazione"], correct: 1, explain: "Le repliche spettrali si sovrappongono e il segnale originale non è più ricostruibile: si previene con un filtro anti-aliasing prima del campionatore." },
        { question: "La convoluzione di due segnali nel dominio del tempo corrisponde, in frequenza, a:", options: ["Una somma", "Un prodotto", "Una derivata", "Un ritardo"], correct: 1, explain: "È la proprietà che rende comodo lavorare in frequenza: filtrare un segnale diventa moltiplicarlo per la risposta in frequenza del filtro." },
        { question: "Un segnale si dice di energia quando:", options: ["La sua energia totale è finita e la potenza media è nulla", "La sua potenza media è infinita", "È periodico", "Ha valore medio nullo"], correct: 0, explain: "I segnali di durata limitata sono tipicamente segnali di energia; quelli periodici, che durano per sempre, sono segnali di potenza." },
    ],
    ingSoftware: [
        { question: "La differenza principale tra modello a cascata e metodi agili è che:", options: ["I metodi agili non prevedono test", "La cascata procede per fasi sequenziali, gli agili per iterazioni brevi", "La cascata non prevede requisiti", "Gli agili non rilasciano software funzionante"], correct: 1, explain: "Nella cascata ogni fase si chiude prima della successiva; negli approcci agili si rilascia software funzionante a piccoli incrementi, rivedendo i requisiti man mano." },
        { question: "Un test unitario verifica:", options: ["Il sistema completo in produzione", "Il comportamento di una singola unità di codice isolata", "Le prestazioni sotto carico", "L'usabilità dell'interfaccia"], correct: 1, explain: "Isolare l'unità, spesso sostituendo le dipendenze con dei mock, permette di capire subito dove sta l'errore." },
        { question: "Nel pattern MVC il Controller ha il compito di:", options: ["Memorizzare i dati", "Disegnare l'interfaccia", "Gestire gli input e coordinare modello e vista", "Gestire il database"], correct: 2, explain: "Il Model tiene dati e regole, la View mostra, il Controller riceve le azioni dell'utente e decide che cosa aggiornare." },
        { question: "Un buon progetto software punta ad avere:", options: ["Alto accoppiamento e bassa coesione", "Basso accoppiamento e alta coesione", "Alto accoppiamento e alta coesione", "Bassa coesione e nessun modulo"], correct: 1, explain: "Moduli con responsabilità ben definite (coesione) e poche dipendenze reciproche (accoppiamento) sono più facili da modificare e da testare." },
        { question: "Che cos'è il debito tecnico?", options: ["Il costo delle licenze software", "Il lavoro extra futuro causato da scelte rapide fatte oggi", "Il tempo speso in riunioni", "Il numero di bug aperti"], correct: 1, explain: "Come un debito finanziario matura interessi: più si rimanda il refactoring, più ogni modifica successiva costa tempo." },
    ],
    automatica: [
        { question: "Con retroazione negativa unitaria e funzione di trasferimento diretta G(s), la funzione ad anello chiuso vale:", options: ["G(s)", "G(s) / (1 + G(s))", "1 + G(s)", "1 / G(s)"], correct: 1, explain: "È la formula della retroazione: l'anello riduce il guadagno complessivo ma rende il sistema meno sensibile a disturbi e a variazioni di G." },
        { question: "Un sistema lineare tempo-invariante è asintoticamente stabile se tutti i poli hanno:", options: ["Parte reale positiva", "Parte reale negativa", "Modulo maggiore di 1", "Parte immaginaria nulla"], correct: 1, explain: "Poli nel semipiano sinistro corrispondono a modi che si smorzano nel tempo; un polo a parte reale positiva fa divergere la risposta." },
        { question: "Il criterio di Routh-Hurwitz serve a:", options: ["Calcolare la risposta al gradino", "Stabilire la stabilità senza calcolare i poli", "Progettare un filtro passa-basso", "Misurare il rumore"], correct: 1, explain: "Dalla tabella dei coefficienti si contano i cambi di segno nella prima colonna: sono i poli a parte reale positiva." },
        { question: "L'azione integrale di un regolatore PID serve soprattutto a:", options: ["Annullare l'errore a regime", "Aumentare il rumore", "Ridurre l'ordine del sistema", "Rendere il sistema non lineare"], correct: 0, explain: "L'integrale continua ad accumulare finché l'errore non è zero; in cambio rallenta la risposta e riduce il margine di fase." },
        { question: "Il tempo di assestamento di una risposta al gradino indica:", options: ["Il ritardo iniziale", "Il tempo per entrare stabilmente in una fascia attorno al valore finale", "Il picco massimo", "La frequenza di taglio"], correct: 1, explain: "Di solito si considera la fascia del 5% o del 2% attorno al valore di regime: misura quanto il sistema è pronto." },
    ],
    elettronica: [
        { question: "Un diodo a giunzione pn conduce in modo apprezzabile quando:", options: ["È polarizzato inversamente", "È polarizzato direttamente oltre la tensione di soglia", "La corrente è nulla", "La temperatura è zero"], correct: 1, explain: "In diretta, superati circa 0,7 V nel silicio, la barriera di potenziale si abbassa e la corrente cresce in modo esponenziale." },
        { question: "Per usare un BJT come amplificatore lineare occorre polarizzarlo in zona:", options: ["Interdizione", "Saturazione", "Attiva diretta", "Breakdown"], correct: 2, explain: "In zona attiva la corrente di collettore è proporzionale a quella di base secondo il guadagno β; in saturazione e interdizione il transistor lavora come interruttore." },
        { question: "In un amplificatore operazionale ideale con retroazione negativa vale il principio del:", options: ["Cortocircuito virtuale tra i due ingressi", "Guadagno unitario", "Massimo trasferimento di potenza", "Bilanciamento termico"], correct: 0, explain: "Guadagno infinito e corrente di ingresso nulla implicano che la retroazione porta i due ingressi alla stessa tensione, senza che vi scorra corrente." },
        { question: "Il guadagno di un amplificatore operazionale in configurazione invertente vale:", options: ["Rf / Rin", "−Rf / Rin", "1 + Rf / Rin", "Rin / Rf"], correct: 1, explain: "Il segno meno indica l'inversione di fase; nella configurazione non invertente il guadagno è invece 1 + Rf/Rin." },
        { question: "In un MOSFET la tensione di soglia è la tensione gate-source:", options: ["Oltre la quale si forma il canale conduttivo", "Che distrugge il dispositivo", "Di alimentazione", "Che annulla la corrente di gate"], correct: 0, explain: "Sotto soglia il canale non si forma e il dispositivo è interdetto: è il parametro che separa lo stato spento da quello acceso." },
    ],
    telecomunicazioni: [
        { question: "Perché si modula un segnale prima di trasmetterlo via radio?", options: ["Per ridurne l'informazione", "Per traslarlo in banda, usare antenne più piccole e far convivere più canali", "Per aumentarne il rumore", "Per campionarlo"], correct: 1, explain: "Portare il segnale ad alta frequenza riduce la dimensione delle antenne e permette di affiancare più trasmissioni su bande diverse." },
        { question: "Nella formula di Shannon C = B log₂(1 + S/N), il termine S/N rappresenta:", options: ["Il rapporto segnale-rumore", "La banda del segnale", "Il numero di simboli", "La potenza di trasmissione"], correct: 0, explain: "La capacità cresce in modo lineare con la banda e solo logaritmico con il rapporto segnale-rumore: allargare la banda rende più che alzare la potenza." },
        { question: "Nella multiplazione a divisione di tempo (TDM) gli utenti condividono il canale:", options: ["Occupando bande di frequenza diverse", "Usando intervalli di tempo diversi", "Usando codici diversi", "Usando antenne diverse"], correct: 1, explain: "Nella FDM si dividono le frequenze, nella TDM gli intervalli di tempo, nel CDMA i codici ortogonali." },
        { question: "Nel modello ISO/OSI il livello che si occupa dell'instradamento dei pacchetti è:", options: ["Fisico", "Collegamento dati", "Rete", "Applicazione"], correct: 2, explain: "Il livello di rete, dove opera IP, sceglie il percorso tra sorgente e destinazione; il collegamento dati gestisce invece la singola tratta punto-punto." },
        { question: "Un rapporto segnale-rumore di 20 dB corrisponde a un rapporto di potenza pari a:", options: ["2", "20", "100", "1000"], correct: 2, explain: "Per le potenze si usa 10 log₁₀: 20 dB significa un fattore 100 tra potenza del segnale e potenza del rumore." },
    ],
    analisi1: [
        {
            question: "Qual è il limite di sin(x)/x per x→0?",
            options: ["0", "1", "∞", "Non esiste"],
            correct: 1,
            explain: "È il limite notevole per eccellenza: per x che tende a 0, sin(x) e x si equivalgono, e su questo si fondano molti altri limiti."
        },
        {
            question: "La derivata di e^x è:",
            options: ["xe^(x-1)", "e^x", "e^(x+1)", "ln(x)·e^x"],
            correct: 1,
            explain: "L'esponenziale in base e è l'unica funzione che coincide con la propria derivata: per questo compare ovunque in fisica ed economia."
        },
        {
            question: "Una funzione continua su un intervallo chiuso [a,b]:",
            options: ["È sempre derivabile", "Ammette massimo e minimo assoluti", "È sempre crescente", "Ha sempre un punto di flesso"],
            correct: 1,
            explain: "È il teorema di Weierstrass: continuità e intervallo chiuso e limitato garantiscono massimo e minimo assoluti, ma non la derivabilità."
        },
        {
            question: "L'integrale di 1/x dx è:",
            options: ["x²/2 + C", "ln|x| + C", "-1/x² + C", "e^x + C"],
            correct: 1,
            explain: "Si usa il valore assoluto perché la funzione 1/x è definita anche per x negativi, dove ln(x) non esisterebbe."
        },
        {
            question: "Se f'(x₀) = 0 e f''(x₀) > 0, allora x₀ è:",
            options: ["Punto di massimo", "Punto di minimo", "Punto di flesso", "Punto di sella"],
            correct: 1,
            explain: "Derivata prima nulla e derivata seconda positiva: la concavità è verso l'alto, quindi il punto è un minimo locale."
        }
    ],
    microeconomia: [
        {
            question: "La legge della domanda afferma che:",
            options: ["Al crescere del prezzo, la quantità domandata aumenta", "Al crescere del prezzo, la quantità domandata diminuisce", "Il prezzo non influenza la domanda", "La domanda è sempre costante"],
            correct: 1,
            explain: "Agiscono l'effetto sostituzione verso beni alternativi e l'effetto reddito, che riduce il potere d'acquisto."
        },
        {
            question: "Il costo marginale è:",
            options: ["Il costo totale diviso la quantità", "Il costo aggiuntivo per produrre un'unità in più", "Il costo fisso dell'impresa", "Il costo medio variabile"],
            correct: 1,
            explain: "È la derivata del costo totale rispetto alla quantità: guida la decisione di produrre un'unità aggiuntiva."
        },
        {
            question: "In concorrenza perfetta, il prezzo è uguale a:",
            options: ["Costo marginale", "Costo fisso", "Ricavo totale", "Profitto medio"],
            correct: 0,
            explain: "Nessuna impresa può fissare il prezzo: produce finché il ricavo marginale, pari al prezzo, eguaglia il costo marginale."
        },
        {
            question: "L'elasticità della domanda al prezzo misura:",
            options: ["Quanto cambia l'offerta al variare del prezzo", "Quanto è sensibile la quantità domandata a variazioni di prezzo", "Il prezzo massimo che i consumatori pagano", "Il surplus del consumatore"],
            correct: 1,
            explain: "È il rapporto tra variazioni percentuali di quantità e prezzo: i beni di prima necessità sono poco elastici, i beni di lusso molto."
        },
        {
            question: "Un bene di Giffen è un bene per cui:",
            options: ["La domanda aumenta al crescere del prezzo", "La domanda è perfettamente elastica", "L'offerta è rigida", "Il prezzo è fissato dallo Stato"],
            correct: 0,
            explain: "È un bene inferiore in cui l'effetto reddito prevale su quello di sostituzione: un'eccezione rara alla legge della domanda."
        }
    ],
    giurisprudenza: [
        {
            question: "La capacità giuridica si acquisisce:",
            options: ["A 14 anni", "A 18 anni", "Alla nascita", "Con il matrimonio"],
            correct: 2,
            explain: "La capacità giuridica è l'attitudine a essere titolari di diritti; la capacità di agire si acquista di regola a 18 anni."
        },
        {
            question: "Il contratto è nullo quando:",
            options: ["Una parte è minorenne", "Manca un elemento essenziale", "C'è un errore di calcolo", "Una parte cambia idea"],
            correct: 1,
            explain: "Accordo, causa, oggetto e forma quando prescritta: se manca uno di questi il contratto non produce effetti fin dall'origine."
        },
        {
            question: "La Costituzione italiana è entrata in vigore il:",
            options: ["2 giugno 1946", "1 gennaio 1948", "25 aprile 1945", "22 dicembre 1947"],
            correct: 1,
            explain: "Approvata dall'Assemblea costituente nel dicembre 1947, è entrata in vigore il 1° gennaio 1948."
        },
        {
            question: "L'obbligazione è un rapporto giuridico tra:",
            options: ["Due Stati", "Creditore e debitore", "Giudice e imputato", "Venditore e compratore"],
            correct: 1,
            explain: "Il creditore ha diritto a una prestazione; il debitore è tenuto a eseguirla e risponde con tutto il suo patrimonio."
        },
        {
            question: "Il possesso si distingue dalla proprietà perché:",
            options: ["È un diritto reale", "È una situazione di fatto", "Richiede un contratto", "Dura solo 10 anni"],
            correct: 1,
            explain: "Il possesso è il potere di fatto sulla cosa, che può esistere anche senza titolo: protratto nel tempo può però portare all'usucapione."
        }
    ],
    pianificazione: [
        {
            question: "Il business plan serve principalmente a:",
            options: ["Calcolare le tasse", "Pianificare strategia e sostenibilità dell'impresa", "Registrare l'azienda", "Assumere dipendenti"],
            correct: 1,
            explain: "Mette per iscritto idea, mercato, modello operativo e proiezioni economico-finanziarie: serve a decidere, non solo a cercare finanziamenti."
        },
        {
            question: "L'analisi SWOT valuta:",
            options: ["Solo i punti di forza", "Forze, debolezze, opportunità e minacce", "Il fatturato annuale", "La concorrenza diretta"],
            correct: 1,
            explain: "Forze e debolezze guardano all'interno dell'organizzazione, opportunità e minacce al contesto esterno."
        },
        {
            question: "Il break-even point è il punto in cui:",
            options: ["L'azienda chiude", "I ricavi eguagliano i costi", "Si raggiunge il massimo profitto", "Si inizia a esportare"],
            correct: 1,
            explain: "Si calcola dividendo i costi fissi per il margine di contribuzione unitario: sotto quella quantità si è in perdita."
        },
        {
            question: "Il cash flow è:",
            options: ["Il patrimonio netto", "Il flusso di cassa in entrata e uscita", "Il debito bancario", "Il capitale sociale"],
            correct: 1,
            explain: "È diverso dall'utile: un'impresa può essere in utile e restare senza liquidità per incassi in ritardo."
        },
        {
            question: "La mission aziendale descrive:",
            options: ["Il bilancio annuale", "Lo scopo e i valori fondamentali dell'impresa", "Il numero di dipendenti", "La sede legale"],
            correct: 1,
            explain: "La mission dice perché l'impresa esiste oggi; la vision descrive dove vuole arrivare."
        }
    ],
    fisica1: [
        {
            question: "La seconda legge di Newton afferma che:",
            options: ["F = mv", "F = ma", "F = mg²", "F = m/a"],
            correct: 1,
            explain: "La forza risultante è pari a massa per accelerazione: a parità di forza, un corpo più pesante accelera di meno."
        },
        {
            question: "L'unità di misura della forza nel SI è:",
            options: ["Joule", "Watt", "Newton", "Pascal"],
            correct: 2,
            explain: "Un newton è la forza che imprime a 1 kg un'accelerazione di 1 m/s²: deriva direttamente da F = ma."
        },
        {
            question: "L'energia cinetica è data da:",
            options: ["mgh", "½mv²", "Fd", "mv"],
            correct: 1,
            explain: "Dipende dal quadrato della velocità: raddoppiando la velocità l'energia cinetica diventa quattro volte tanto."
        },
        {
            question: "In un moto circolare uniforme, l'accelerazione centripeta è diretta:",
            options: ["Tangente alla traiettoria", "Verso il centro", "Verso l'esterno", "In direzione del moto"],
            correct: 1,
            explain: "La velocità cambia direzione anche se il modulo resta costante: l'accelerazione centripeta vale v²/r ed è diretta verso il centro."
        },
        {
            question: "La conservazione dell'energia meccanica vale quando:",
            options: ["Ci sono forze d'attrito", "Agiscono solo forze conservative", "La velocità è costante", "Il corpo è fermo"],
            correct: 1,
            explain: "Con attrito o altre forze dissipative parte dell'energia si trasforma in calore e la meccanica totale non si conserva."
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
            correct: 2,
            explain: "A ogni confronto lo spazio di ricerca si dimezza, ma richiede che i dati siano già ordinati."
        },
        {
            question: "In programmazione, un array è:",
            options: ["Un tipo di loop", "Una struttura dati indicizzata", "Una funzione ricorsiva", "Un operatore logico"],
            correct: 1,
            explain: "Gli elementi sono contigui in memoria: l'accesso per indice è immediato, ma la dimensione è rigida."
        },
        {
            question: "Il sistema binario usa base:",
            options: ["8", "10", "2", "16"],
            correct: 2,
            explain: "Con due sole cifre, 0 e 1, si rappresenta ogni dato: corrisponde ai due stati elettrici del circuito."
        },
        {
            question: "La RAM è una memoria:",
            options: ["Permanente", "Volatile", "Solo lettura", "Sequenziale"],
            correct: 1,
            explain: "Perde il contenuto quando manca l'alimentazione, a differenza di disco e memorie flash."
        },
        {
            question: "Un algoritmo è:",
            options: ["Un linguaggio di programmazione", "Una sequenza finita di istruzioni", "Un tipo di processore", "Un sistema operativo"],
            correct: 1,
            explain: "Deve essere finita e non ambigua: dati certi ingressi produce un risultato in un numero finito di passi."
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
            correct: 1,
            explain: "La somma è 12 e i valori sono tre: 12 diviso 3 fa 4."
        },
        {
            question: "La mediana è:",
            options: ["Il valore più frequente", "Il valore centrale", "La somma dei valori", "Il valore massimo"],
            correct: 1,
            explain: "Divide i dati ordinati in due metà uguali: a differenza della media, non risente dei valori estremi."
        },
        {
            question: "La deviazione standard misura:",
            options: ["La tendenza centrale", "La dispersione dei dati", "La simmetria", "La correlazione"],
            correct: 1,
            explain: "È la radice della varianza ed è espressa nella stessa unità di misura dei dati, quindi più facile da interpretare."
        },
        {
            question: "Un campione è:",
            options: ["L'intera popolazione", "Un sottoinsieme della popolazione", "Una variabile casuale", "Un parametro"],
            correct: 1,
            explain: "Si studia il campione per trarre conclusioni sulla popolazione: la rappresentatività conta più della dimensione."
        },
        {
            question: "La probabilità di un evento certo è:",
            options: ["0", "0.5", "1", "Infinita"],
            correct: 2,
            explain: "La probabilità va da 0 (evento impossibile) a 1 (evento certo), spesso espressa anche in percentuale."
        }
    ],
    marketing: [
        {
            question: "Le 4P del marketing mix sono:",
            options: ["Prodotto, Prezzo, Punto vendita, Promozione", "Profitto, Perdita, Produzione, Personale", "Piano, Processo, Progetto, Persona", "Prezzo, Profitto, Pubblicità, Prodotto"],
            correct: 0,
            explain: "Product, Price, Place, Promotion: le quattro leve classiche su cui si costruisce l'offerta."
        },
        {
            question: "La segmentazione del mercato serve a:",
            options: ["Eliminare la concorrenza", "Dividere il mercato in gruppi omogenei", "Ridurre i costi", "Aumentare il prezzo"],
            correct: 1,
            explain: "Si individuano gruppi con bisogni simili, per poi scegliere quali servire e con quale posizionamento."
        },
        {
            question: "Il brand positioning è:",
            options: ["Il prezzo del prodotto", "La posizione nel punto vendita", "Come il brand è percepito nella mente del consumatore", "Il logo aziendale"],
            correct: 2,
            explain: "Non conta ciò che l'azienda dichiara, ma lo spazio che il marchio occupa nella mente del cliente rispetto ai concorrenti."
        },
        {
            question: "Il tasso di conversione misura:",
            options: ["La velocità del sito web", "La percentuale di visitatori che compiono un'azione", "Il numero di dipendenti", "Il fatturato annuale"],
            correct: 1,
            explain: "Si calcola dividendo le azioni completate per i visitatori totali: è l'indicatore chiave dell'efficacia di una pagina o campagna."
        },
        {
            question: "Il customer lifetime value è:",
            options: ["L'età media dei clienti", "Il valore totale che un cliente genera nel tempo", "Il costo di acquisizione", "Lo sconto massimo applicabile"],
            correct: 1,
            explain: "Guardare al valore di tutta la relazione, e non del singolo acquisto, cambia quanto conviene investire per acquisire un cliente."
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
            correct: 1,
            explain: "Il numero atomico identifica l'elemento; il numero di massa somma invece protoni e neutroni."
        },
        {
            question: "L'acqua ha formula:",
            options: ["H₃O", "H₂O", "HO₂", "H₂O₂"],
            correct: 1,
            explain: "Due atomi di idrogeno e uno di ossigeno, con struttura angolata e legami polari: da qui derivano molte proprietà dell'acqua."
        },
        {
            question: "Un legame covalente si forma quando:",
            options: ["Si trasferiscono elettroni", "Si condividono elettroni", "Si perdono protoni", "Si guadagnano neutroni"],
            correct: 1,
            explain: "Gli elettroni della coppia appartengono a entrambi gli atomi; nel legame ionico vengono invece ceduti e acquistati."
        },
        {
            question: "Il pH 7 indica una soluzione:",
            options: ["Acida", "Basica", "Neutra", "Satura"],
            correct: 2,
            explain: "A 25 °C la concentrazione di ioni H₃O⁺ e OH⁻ è la stessa: sotto 7 la soluzione è acida, sopra 7 basica."
        },
        {
            question: "La tavola periodica è organizzata per:",
            options: ["Ordine alfabetico", "Numero atomico crescente", "Data di scoperta", "Colore degli elementi"],
            correct: 1,
            explain: "Gli elementi sono ordinati per numero atomico crescente: chi sta nello stesso gruppo condivide gli elettroni di valenza e quindi il comportamento chimico."
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
        { question: "La derivata parziale ∂f/∂x si calcola:", options: ["Derivando rispetto a x e trattando y come costante", "Derivando rispetto a tutte le variabili", "Facendo la media delle derivate", "Integrando rispetto a y"], correct: 0, explain: "Si deriva rispetto a una variabile alla volta, congelando le altre: è la stessa regola del caso a una variabile." },
        { question: "Il gradiente di una funzione punta nella direzione di:", options: ["Minima crescita", "Massima crescita", "Nessuna variazione", "Massima curvatura"], correct: 1, explain: "Il gradiente indica la direzione di massima crescita ed è perpendicolare alle curve di livello della funzione." },
        { question: "Un punto critico con hessiano negativo è:", options: ["Un massimo", "Un minimo", "Una sella", "Un flesso"], correct: 2, explain: "Con hessiano definito negativo il punto è un massimo; è una sella quando l'hessiano è indefinito, cioè con autovalori di segno opposto." },
        { question: "L'equazione y' = f(x)g(y) si dice:", options: ["Lineare", "A variabili separabili", "Omogenea", "Esatta"], correct: 1, explain: "Si separano le variabili portando tutto ciò che dipende da y da una parte e da x dall'altra, poi si integra." },
        { question: "Il teorema di Schwarz riguarda:", options: ["L'uguaglianza delle derivate miste", "La convergenza delle serie", "L'esistenza degli integrali", "La continuità delle funzioni"], correct: 0, explain: "Se le derivate seconde miste sono continue, l'ordine di derivazione non conta: ∂²f/∂x∂y = ∂²f/∂y∂x." },
    ],
    algebra: [
        { question: "Una matrice quadrata è invertibile se e solo se:", options: ["È simmetrica", "Il determinante è diverso da zero", "Ha tutti elementi positivi", "È diagonale"], correct: 1, explain: "Determinante non nullo significa colonne linearmente indipendenti: la matrice rappresenta una trasformazione invertibile." },
        { question: "Gli autovalori si trovano risolvendo:", options: ["det(A − λI) = 0", "A·v = 0", "tr(A) = 0", "A + I = 0"], correct: 0, explain: "Si azzera il determinante della matrice A meno λ per l'identità: le radici del polinomio caratteristico sono gli autovalori." },
        { question: "Il teorema di Rouché-Capelli dice che il sistema ha soluzioni se:", options: ["Il determinante è nullo", "rango(A) = rango(A|b)", "Ci sono più equazioni che incognite", "La matrice è quadrata"], correct: 1, explain: "Se i due ranghi coincidono il sistema è compatibile; la soluzione è unica se quel rango è uguale al numero di incognite." },
        { question: "Il rango di una matrice è:", options: ["Il numero di righe", "Il numero massimo di righe linearmente indipendenti", "La somma degli elementi", "Il determinante"], correct: 1, explain: "Coincide con il numero massimo di colonne indipendenti: è la dimensione dello spazio generato dalla matrice." },
        { question: "Una base di uno spazio vettoriale è:", options: ["Un insieme qualsiasi di vettori", "Vettori indipendenti che generano lo spazio", "Il vettore nullo", "L'insieme di tutti i vettori"], correct: 1, explain: "Servono entrambe le proprietà: indipendenza (nessun vettore superfluo) e generazione (coprono tutto lo spazio)." },
    ],
    fisica2: [
        { question: "La forza tra due cariche varia con la distanza come:", options: ["1/r", "1/r²", "r", "r²"], correct: 1, explain: "È la legge di Coulomb: come la gravitazione, la forza decresce con il quadrato della distanza." },
        { question: "Il teorema di Gauss lega il flusso del campo elettrico a:", options: ["La carica racchiusa", "La massa", "La velocità", "Il campo magnetico"], correct: 0, explain: "Il flusso attraverso una superficie chiusa dipende solo dalla carica interna, non da come è distribuita." },
        { question: "La legge di Lenz stabilisce che la corrente indotta:", options: ["Amplifica la variazione di flusso", "Si oppone alla variazione di flusso", "È sempre nulla", "È costante"], correct: 1, explain: "È una conseguenza della conservazione dell'energia: il verso della corrente indotta contrasta sempre la causa che la genera." },
        { question: "L'unità di misura della capacità è:", options: ["Henry", "Farad", "Tesla", "Weber"], correct: 1, explain: "Un farad è un coulomb per volt: nella pratica si usano microfarad e picofarad, perché il farad è un'unità enorme." },
        { question: "Un campo magnetico esercita forza su una carica:", options: ["Sempre", "Solo se la carica è in moto", "Solo se ferma", "Mai"], correct: 1, explain: "La forza di Lorentz è proporzionale alla velocità: una carica ferma in un campo magnetico non subisce alcuna forza." },
    ],
    programmazione: [
        { question: "L'accesso a un elemento di un array per indice ha complessità:", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correct: 0, explain: "L'indirizzo si calcola direttamente dalla posizione iniziale: il tempo di accesso non dipende dalla dimensione dell'array." },
        { question: "Una funzione ricorsiva senza caso base provoca:", options: ["Un ciclo infinito controllato", "Stack overflow", "Un errore di sintassi", "Nessun problema"], correct: 1, explain: "Ogni chiamata occupa spazio sullo stack: senza condizione di uscita la memoria si esaurisce." },
        { question: "Nel passaggio per riferimento, le modifiche:", options: ["Non sono visibili al chiamante", "Sono visibili al chiamante", "Creano una copia", "Generano errore"], correct: 1, explain: "Si passa il riferimento all'oggetto, non una copia: per questo le modifiche restano anche dopo il ritorno della funzione." },
        { question: "L'incapsulamento consiste nel:", options: ["Nascondere lo stato interno esponendo metodi", "Ereditare da una classe", "Creare più oggetti", "Ottimizzare il codice"], correct: 0, explain: "I dettagli interni restano privati e si espone solo un'interfaccia: così si può cambiare l'implementazione senza rompere il codice che la usa." },
        { question: "Una lista concatenata rispetto a un array offre:", options: ["Accesso più rapido per indice", "Inserimento più efficiente", "Meno memoria sempre", "Ordinamento automatico"], correct: 1, explain: "Basta aggiornare i puntatori invece di spostare gli elementi, ma si perde l'accesso diretto per indice." },
    ],
    archCalcolatori: [
        { question: "La pipeline serve a:", options: ["Ridurre il consumo", "Sovrapporre le fasi delle istruzioni", "Aumentare la RAM", "Comprimere i dati"], correct: 1, explain: "Mentre un'istruzione viene eseguita, la successiva è già in decodifica: aumenta il throughput, non la velocità della singola istruzione." },
        { question: "La cache sfrutta il principio di:", options: ["Località temporale e spaziale", "Ridondanza", "Parallelismo massivo", "Virtualizzazione"], correct: 0, explain: "Un dato appena usato sarà probabilmente riusato (temporale) e i dati vicini saranno usati a breve (spaziale)." },
        { question: "Nell'architettura Harvard:", options: ["Dati e istruzioni condividono la memoria", "Dati e istruzioni hanno memorie separate", "Non esiste la cache", "La CPU è unica"], correct: 1, explain: "Memorie e bus separati permettono di leggere istruzione e dato nello stesso ciclo; nell'architettura di von Neumann sono condivisi." },
        { question: "Il complemento a due serve per rappresentare:", options: ["I numeri negativi", "I numeri decimali", "I caratteri", "Le istruzioni"], correct: 0, explain: "Permette di sommare numeri positivi e negativi con lo stesso circuito e ha un'unica rappresentazione dello zero." },
        { question: "La memoria più veloce della gerarchia è:", options: ["Il disco", "La RAM", "I registri della CPU", "La cache L3"], correct: 2, explain: "La gerarchia va dai registri alla cache, alla RAM, al disco: più si scende, più la memoria è capiente ma lenta." },
    ],
    sistemiOperativi: [
        { question: "I thread dello stesso processo condividono:", options: ["Lo spazio di memoria", "Solo i registri", "Nulla", "Il disco"], correct: 0, explain: "Codice, dati e file aperti sono condivisi; ogni thread ha però il proprio stack e i propri registri." },
        { question: "Il deadlock è una situazione in cui:", options: ["Un processo termina", "Più processi attendono a vicenda risorse", "La CPU è al 100%", "La memoria è piena"], correct: 1, explain: "Si verifica quando coesistono mutua esclusione, attesa e possesso, assenza di prelazione e attesa circolare." },
        { question: "La memoria virtuale si basa su:", options: ["La paginazione", "La compressione", "La cache", "Il clock"], correct: 0, explain: "La memoria è divisa in pagine caricate su richiesta: i programmi possono usare più spazio della RAM disponibile." },
        { question: "Il context switch consiste nel:", options: ["Cambiare utente", "Salvare lo stato di un processo e ripristinarne un altro", "Riavviare il sistema", "Liberare la RAM"], correct: 1, explain: "Ha un costo in tempo, perché vanno salvati registri e stato: troppi cambi di contesto riducono le prestazioni." },
        { question: "Un semaforo serve a:", options: ["Misurare le prestazioni", "Sincronizzare l'accesso a risorse condivise", "Comprimere file", "Gestire la rete"], correct: 1, explain: "Con wait e signal regola quanti processi accedono contemporaneamente a una risorsa, evitando le race condition." },
    ],
    basiDati: [
        { question: "Una chiave primaria:", options: ["Può essere NULL", "Identifica univocamente ogni tupla", "Può ripetersi", "È sempre testuale"], correct: 1, explain: "Non ammette valori nulli né duplicati; una chiave può essere composta da più attributi." },
        { question: "La chiave esterna garantisce:", options: ["La velocità delle query", "L'integrità referenziale", "La compressione", "L'ordinamento"], correct: 1, explain: "Impedisce di riferirsi a una riga che non esiste e di cancellare righe ancora referenziate." },
        { question: "Il LEFT JOIN restituisce:", options: ["Solo le righe con corrispondenza", "Tutte le righe della tabella di sinistra", "Solo quelle di destra", "Nessuna riga"], correct: 1, explain: "Restituisce anche le righe senza corrispondenza a destra, riempite con NULL; l'INNER JOIN le escluderebbe." },
        { question: "ACID sta per:", options: ["Atomicità, Consistenza, Isolamento, Durabilità", "Accesso, Controllo, Indice, Dati", "Analisi, Codifica, Input, Design", "Nessuna delle precedenti"], correct: 0, explain: "Sono le quattro proprietà che garantiscono l'affidabilità di una transazione anche in caso di guasto." },
        { question: "La normalizzazione serve a:", options: ["Aumentare la ridondanza", "Eliminare ridondanze e anomalie", "Velocizzare sempre le query", "Cifrare i dati"], correct: 1, explain: "Scomponendo le tabelle si evitano anomalie di inserimento, aggiornamento e cancellazione." },
    ],
    retiCalcolatori: [
        { question: "Rispetto a UDP, il protocollo TCP è:", options: ["Più veloce ma inaffidabile", "Affidabile e orientato alla connessione", "Senza controllo di errore", "Usato solo per streaming"], correct: 1, explain: "TCP garantisce consegna e ordine con conferme e ritrasmissioni; UDP è più veloce ma non dà garanzie, ed è preferito per streaming e giochi." },
        { question: "Quanti livelli ha il modello ISO/OSI?", options: ["4", "5", "7", "9"], correct: 2, explain: "Fisico, collegamento dati, rete, trasporto, sessione, presentazione, applicazione: il TCP/IP ne usa una versione semplificata a quattro." },
        { question: "Il DNS serve a:", options: ["Cifrare i dati", "Tradurre nomi di dominio in indirizzi IP", "Instradare i pacchetti", "Assegnare indirizzi MAC"], correct: 1, explain: "Funziona come una rubrica distribuita e gerarchica: senza risoluzione DNS bisognerebbe ricordare gli indirizzi numerici." },
        { question: "Il three-way handshake avviene con:", options: ["SYN, SYN-ACK, ACK", "GET, POST, PUT", "ARP, RARP, ICMP", "OPEN, SEND, CLOSE"], correct: 0, explain: "I tre messaggi sincronizzano i numeri di sequenza e aprono la connessione TCP prima dello scambio di dati." },
        { question: "L'indirizzo MAC opera al livello:", options: ["Applicazione", "Trasporto", "Collegamento dati", "Rete"], correct: 2, explain: "È l'indirizzo fisico della scheda di rete e vale nella rete locale; l'indirizzo IP opera invece al livello di rete." },
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
        { question: "Il PIL misura:", options: ["Il debito pubblico", "Il valore dei beni e servizi finali prodotti", "La ricchezza accumulata", "Il reddito medio"], correct: 1, explain: "Si contano solo i beni finali, per evitare di sommare più volte i beni intermedi." },
        { question: "Il PIL reale differisce dal nominale perché:", options: ["Include l'estero", "È depurato dall'inflazione", "Considera solo i servizi", "Esclude le imposte"], correct: 1, explain: "Il PIL reale usa prezzi costanti di un anno base: distingue la crescita vera dall'aumento dei prezzi." },
        { question: "La curva di Phillips descrive la relazione tra:", options: ["Inflazione e disoccupazione", "PIL e tassi", "Risparmio e investimento", "Import ed export"], correct: 0, explain: "Nel breve periodo la relazione appare inversa; nel lungo periodo il legame si indebolisce, come mostrò la stagflazione degli anni Settanta." },
        { question: "Una politica monetaria espansiva prevede:", options: ["Aumento dei tassi", "Riduzione dei tassi e più moneta", "Aumento delle tasse", "Riduzione della spesa"], correct: 1, explain: "Tassi più bassi e maggiore liquidità stimolano credito, consumi e investimenti, con il rischio di alimentare l'inflazione." },
        { question: "L'inflazione comporta:", options: ["Aumento del potere d'acquisto", "Riduzione del potere d'acquisto", "Nessun effetto sui prezzi", "Deflazione"], correct: 1, explain: "Con la stessa somma si comprano meno beni: penalizza chi ha redditi fissi e risparmi liquidi, favorisce i debitori." },
    ],
    ragioneria: [
        { question: "La partita doppia registra ogni operazione:", options: ["Una sola volta", "Due volte, in dare e in avere", "Tre volte", "Solo a fine anno"], correct: 1, explain: "Ogni operazione è vista sotto due aspetti, finanziario ed economico: la somma dei dare deve sempre eguagliare quella degli avere." },
        { question: "Lo stato patrimoniale rappresenta:", options: ["Il risultato d'esercizio", "La situazione di attività e passività a una data", "I flussi di cassa", "Le previsioni future"], correct: 1, explain: "È una fotografia a una certa data: attivo da una parte, passivo e patrimonio netto dall'altra." },
        { question: "L'ammortamento serve a:", options: ["Ripartire il costo di un bene pluriennale", "Aumentare l'utile", "Pagare i debiti", "Distribuire dividendi"], correct: 0, explain: "Il costo si distribuisce lungo la vita utile del bene, per rispettare il principio di competenza economica." },
        { question: "I risconti attivi rappresentano costi:", options: ["Già maturati non pagati", "Già pagati ma di competenza futura", "Mai sostenuti", "Straordinari"], correct: 1, explain: "Sono costi già pagati ma di competenza dell'esercizio successivo: si rinviano al futuro e nel bilancio figurano nell'attivo." },
        { question: "Il conto economico evidenzia:", options: ["Il patrimonio netto", "Costi, ricavi e risultato d'esercizio", "Solo la liquidità", "I soci"], correct: 1, explain: "Mostra come si è formato il risultato dell'esercizio, contrapponendo costi e ricavi di competenza." },
    ],
    dirCommerciale: [
        { question: "L'imprenditore secondo l'art. 2082 c.c. esercita l'attività:", options: ["Occasionalmente", "Professionalmente e in modo organizzato", "Solo con dipendenti", "Senza scopo di lucro"], correct: 1, explain: "Serve un'attività economica organizzata, professionale, finalizzata alla produzione o allo scambio di beni e servizi." },
        { question: "Nelle società di capitali i soci rispondono:", options: ["Illimitatamente", "Nei limiti del conferimento", "Solo con il patrimonio personale", "Solidalmente e illimitatamente"], correct: 1, explain: "L'autonomia patrimoniale è perfetta: il patrimonio personale dei soci resta protetto, a differenza delle società di persone." },
        { question: "L'azienda è definita come:", options: ["Il complesso dei beni organizzati per l'impresa", "L'insieme dei dipendenti", "Il capitale sociale", "La sede legale"], correct: 0, explain: "Non è la sede né i locali: è il complesso dei beni organizzati dall'imprenditore per l'esercizio dell'impresa (art. 2555 c.c.)." },
        { question: "La cambiale è:", options: ["Un contratto di lavoro", "Un titolo di credito", "Un atto costitutivo", "Una garanzia reale"], correct: 1, explain: "È un titolo di credito astratto ed esecutivo: chi non viene pagato può agire senza un ordinario giudizio di cognizione." },
        { question: "L'assemblea dei soci nella S.p.A.:", options: ["Gestisce l'attività quotidiana", "Delibera sulle decisioni fondamentali", "Controlla i conti", "Rappresenta i creditori"], correct: 1, explain: "Approva il bilancio, nomina gli organi sociali e delibera le modifiche statutarie; la gestione spetta agli amministratori." },
    ],
    matFin: [
        { question: "Nel regime composto il montante si calcola:", options: ["C(1+i·n)", "C(1+i)^n", "C·i·n", "C/(1+i)"], correct: 1, explain: "Gli interessi maturati si aggiungono al capitale e a loro volta producono interessi: è la capitalizzazione composta." },
        { question: "L'attualizzazione serve a:", options: ["Portare un valore futuro al presente", "Calcolare gli interessi", "Aumentare il capitale", "Determinare il tasso"], correct: 0, explain: "È l'operazione inversa della capitalizzazione: si divide per (1+i)^n per ottenere il valore attuale." },
        { question: "Un investimento conviene se il VAN è:", options: ["Negativo", "Maggiore di zero", "Uguale a zero", "Indifferente"], correct: 1, explain: "Il valore attuale netto positivo significa che i flussi scontati superano l'investimento iniziale." },
        { question: "Una rendita è:", options: ["Un capitale unico", "Una successione di capitali a scadenze periodiche", "Un debito", "Un tasso di interesse"], correct: 1, explain: "Se le rate sono costanti e le scadenze equidistanti si parla di rendita periodica, come in un mutuo." },
        { question: "Nell'interesse semplice gli interessi:", options: ["Producono altri interessi", "Non si capitalizzano", "Sono sempre maggiori", "Variano ogni anno"], correct: 1, explain: "Gli interessi si calcolano sempre sul capitale iniziale: per questo su orizzonti lunghi rende meno del regime composto." },
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
        { question: "Il lavoro subordinato si caratterizza per:", options: ["Autonomia organizzativa", "Dipendenza e direzione altrui", "Assenza di retribuzione", "Durata determinata"], correct: 1, explain: "Il lavoratore mette a disposizione le proprie energie sotto la direzione altrui: è l'eterodirezione a distinguerlo dall'autonomo." },
        { question: "Il licenziamento per giusta causa:", options: ["Richiede preavviso", "Non richiede preavviso", "È sempre nullo", "Richiede consenso del lavoratore"], correct: 1, explain: "La giusta causa è un fatto così grave da non permettere la prosecuzione neppure provvisoria del rapporto." },
        { question: "Lo Statuto dei lavoratori è la legge:", options: ["300/1970", "104/1992", "92/2012", "196/1997"], correct: 0, explain: "Tutela libertà e dignità dei lavoratori e l'attività sindacale nei luoghi di lavoro." },
        { question: "Il TFR è:", options: ["Un premio di produzione", "Retribuzione differita liquidata a fine rapporto", "Un'indennità di malattia", "Un contributo previdenziale"], correct: 1, explain: "Si accantona anno per anno una quota della retribuzione, rivalutata, e si liquida alla cessazione del rapporto." },
        { question: "Il CCNL stabilisce:", options: ["Solo l'orario", "I minimi retributivi e normativi di categoria", "Le imposte", "Il numero di dipendenti"], correct: 1, explain: "Il contratto collettivo nazionale fissa i minimi: il contratto individuale può migliorarli, non peggiorarli." },
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
    ],
    // ---- ECONOMIA (lotto 1) ----
    econometria: [
        {
            question: "Il metodo dei minimi quadrati ordinari (OLS) stima i coefficienti minimizzando:",
            options: ["La somma dei residui", "La somma dei quadrati dei residui", "Il residuo più grande", "La varianza della variabile esplicativa"],
            correct: 1,
            explain: "Si minimizza Σ(yᵢ − ŷᵢ)²: elevando al quadrato, scarti positivi e negativi non si annullano tra loro."
        },
        {
            question: "Che cosa misura l'R² in una regressione?",
            options: ["La quota di variabilità di Y spiegata dal modello", "La significatività dei singoli coefficienti", "L'autocorrelazione dei residui", "L'errore standard della stima"],
            correct: 0,
            explain: "Va da 0 a 1. Un R² alto non dice però che il modello sia corretto: aumenta sempre aggiungendo regressori."
        },
        {
            question: "Si ha eteroschedasticità quando:",
            options: ["I residui hanno varianza non costante", "I regressori sono fortemente correlati tra loro", "I residui sono correlati nel tempo", "Il campione è troppo piccolo"],
            correct: 0,
            explain: "Gli stimatori OLS restano corretti ma non sono più efficienti, e gli errori standard classici diventano inaffidabili."
        },
        {
            question: "Il test t su un singolo coefficiente serve a verificare:",
            options: ["Se il coefficiente è statisticamente diverso da zero", "Se il modello nel suo insieme è significativo", "La presenza di autocorrelazione", "La normalità dei regressori"],
            correct: 0,
            explain: "Per la significatività congiunta di più coefficienti si usa invece il test F."
        },
        {
            question: "Quale conseguenza ha la multicollinearità elevata?",
            options: ["Gli stimatori restano corretti ma molto imprecisi", "Gli stimatori diventano distorti", "Elimina l'eteroschedasticità", "Riduce sempre l'R²"],
            correct: 0,
            explain: "Le stime hanno varianza alta: i coefficienti risultano poco significativi anche quando il modello spiega bene i dati."
        }
    ],
    dirPubblico: [
        {
            question: "A chi spetta la funzione legislativa statale secondo la Costituzione?",
            options: ["Al Governo", "Alle due Camere del Parlamento", "Alla Corte costituzionale", "Al Presidente della Repubblica"],
            correct: 1,
            explain: "Art. 70: la funzione legislativa è esercitata collettivamente dalle due Camere."
        },
        {
            question: "Il decreto legge:",
            options: ["È adottato dal Governo in casi straordinari di necessità e urgenza e va convertito entro 60 giorni", "È approvato dal Parlamento come una legge ordinaria", "Non ha forza di legge", "Resta in vigore per un anno senza conversione"],
            correct: 0,
            explain: "Art. 77: senza conversione in legge entro 60 giorni perde efficacia fin dall'inizio."
        },
        {
            question: "Da quanti giudici è composta la Corte costituzionale?",
            options: ["9", "12", "15", "21"],
            correct: 2,
            explain: "Art. 135: un terzo nominati dal Presidente della Repubblica, un terzo dal Parlamento in seduta comune, un terzo dalle supreme magistrature."
        },
        {
            question: "Che cosa significa 'riserva di legge'?",
            options: ["Una materia può essere disciplinata solo con legge o atto avente forza di legge", "La legge può essere modificata solo dal Governo", "Le leggi vanno pubblicate in Gazzetta Ufficiale", "Il Parlamento deve riservare tempo alla discussione"],
            correct: 0,
            explain: "Serve a sottrarre certe materie, come le limitazioni della libertà personale, alla sola fonte regolamentare."
        },
        {
            question: "Il referendum abrogativo previsto dall'art. 75 della Costituzione:",
            options: ["Non è ammesso per le leggi tributarie e di bilancio", "Può abrogare qualsiasi legge senza limiti", "Serve ad approvare nuove leggi", "È indetto dal Governo"],
            correct: 0,
            explain: "Sono escluse anche le leggi di amnistia e indulto e quelle di autorizzazione a ratificare trattati internazionali."
        }
    ],
    scienzaFinanze: [
        {
            question: "Un'imposta è progressiva quando:",
            options: ["L'aliquota media cresce al crescere della base imponibile", "L'aliquota è uguale per tutti", "Il gettito cresce con il PIL", "L'aliquota media diminuisce al crescere del reddito"],
            correct: 0,
            explain: "Se l'aliquota media resta costante l'imposta è proporzionale; se diminuisce è regressiva."
        },
        {
            question: "Un bene pubblico puro è caratterizzato da:",
            options: ["Non rivalità e non escludibilità nel consumo", "Prezzo fissato dallo Stato", "Produzione in monopolio", "Domanda sempre rigida"],
            correct: 0,
            explain: "Esempio classico: la difesa nazionale. Il consumo di uno non riduce quello degli altri e nessuno può esserne escluso."
        },
        {
            question: "Che cos'è un'esternalità negativa?",
            options: ["Un costo che ricade su soggetti terzi senza compensazione", "Una perdita di bilancio dello Stato", "Un'imposta pagata all'estero", "Un sussidio alle imprese"],
            correct: 0,
            explain: "L'inquinamento è l'esempio tipico: il prezzo di mercato non incorpora il danno subito da chi non partecipa allo scambio."
        },
        {
            question: "Qual è la differenza tra deficit e debito pubblico?",
            options: ["Il deficit è un flusso annuale, il debito è lo stock accumulato", "Sono sinonimi", "Il debito riguarda solo i Comuni", "Il deficit riguarda solo la spesa per interessi"],
            correct: 0,
            explain: "Il debito cresce ogni anno in cui c'è deficit, cioè quando le uscite superano le entrate."
        },
        {
            question: "L'IRPEF italiana è un'imposta:",
            options: ["Progressiva per scaglioni di reddito", "Proporzionale", "Indiretta sui consumi", "Regressiva"],
            correct: 0,
            explain: "A scaglioni: l'aliquota più alta si applica solo alla parte di reddito che supera la soglia dello scaglione."
        }
    ],
    economiaIndustriale: [
        {
            question: "L'indice di Herfindahl-Hirschman (HHI) si calcola come:",
            options: ["Somma dei quadrati delle quote di mercato delle imprese", "Media delle quote di mercato", "Quota della prima impresa", "Numero di imprese nel settore"],
            correct: 0,
            explain: "Più è alto, più il mercato è concentrato: dà peso maggiore alle imprese con quote grandi."
        },
        {
            question: "Nel modello di Cournot le imprese competono scegliendo:",
            options: ["Le quantità prodotte", "I prezzi di vendita", "La qualità del prodotto", "La spesa pubblicitaria"],
            correct: 0,
            explain: "In Bertrand si compete invece sui prezzi."
        },
        {
            question: "Nel modello di Bertrand con beni omogenei e imprese con gli stessi costi, il prezzo di equilibrio è pari:",
            options: ["Al costo marginale", "Al prezzo di monopolio", "A zero", "Alla media dei costi fissi"],
            correct: 0,
            explain: "È il cosiddetto paradosso di Bertrand: bastano due imprese per ottenere il risultato di concorrenza perfetta."
        },
        {
            question: "Quale di questi è una barriera all'entrata?",
            options: ["Forti economie di scala", "Domanda elastica", "Presenza di beni sostituti", "Basso costo del capitale"],
            correct: 0,
            explain: "Con economie di scala un nuovo entrante deve partire grande per essere competitivo sui costi."
        },
        {
            question: "La discriminazione di prezzo di terzo grado consiste nel:",
            options: ["Applicare prezzi diversi a gruppi di consumatori identificabili", "Far pagare a ciascuno la sua disponibilità a pagare", "Vendere a blocchi di quantità", "Vendere sottocosto per escludere i rivali"],
            correct: 0,
            explain: "Esempi: sconti per studenti o tariffe diverse per fascia oraria. Il primo grado è la discriminazione perfetta."
        }
    ],
    egi: [
        {
            question: "Nella catena del valore di Porter le attività si dividono in:",
            options: ["Primarie e di supporto", "Fisse e variabili", "Interne ed esterne", "Operative e straordinarie"],
            correct: 0,
            explain: "Le primarie riguardano il flusso del prodotto, come logistica e marketing; le altre lo sostengono, come le risorse umane."
        },
        {
            question: "Quale elemento NON fa parte delle cinque forze competitive di Porter?",
            options: ["Il tasso di inflazione", "Il potere contrattuale dei fornitori", "La minaccia di prodotti sostitutivi", "La rivalità tra i concorrenti"],
            correct: 0,
            explain: "Le cinque forze sono interne al settore: concorrenti, entranti potenziali, sostituti, fornitori e clienti."
        },
        {
            question: "Secondo Porter le strategie competitive di base sono:",
            options: ["Leadership di costo e differenziazione, entrambe eventualmente focalizzate", "Crescita e diversificazione", "Integrazione verticale e orizzontale", "Innovazione e imitazione"],
            correct: 0,
            explain: "Restare a metà strada tra le due, senza un vantaggio chiaro, è la posizione che Porter considera più debole."
        },
        {
            question: "Il punto di pareggio (break-even point) è la quantità in cui:",
            options: ["I ricavi totali eguagliano i costi totali", "Il profitto è massimo", "I costi fissi sono nulli", "Il costo medio è minimo"],
            correct: 0,
            explain: "Si calcola dividendo i costi fissi per il margine di contribuzione unitario."
        },
        {
            question: "L'analisi SWOT mette in relazione:",
            options: ["Punti di forza e debolezza interni con opportunità e minacce esterne", "Ricavi e costi", "Attivo e passivo", "Prezzo e quantità"],
            correct: 0,
            explain: "Le prime due dimensioni dipendono dall'impresa, le altre due dall'ambiente in cui opera."
        }
    ],
    intermediariFin: [
        {
            question: "Qual è la funzione principale di un intermediario finanziario?",
            options: ["Trasferire risorse dai soggetti in surplus a quelli in deficit", "Stampare moneta", "Fissare i tassi di interesse ufficiali", "Garantire i prezzi di borsa"],
            correct: 0,
            explain: "Nel farlo trasforma scadenze, importi e rischi tra chi presta e chi prende a prestito."
        },
        {
            question: "Il rischio di liquidità per una banca è il rischio di:",
            options: ["Non riuscire a far fronte ai deflussi di cassa senza perdite rilevanti", "Perdere per l'insolvenza di un debitore", "Subire perdite per variazioni dei tassi", "Errori nei sistemi informatici"],
            correct: 0,
            explain: "L'insolvenza del debitore è rischio di credito, le variazioni dei tassi rischio di mercato."
        },
        {
            question: "Se i tassi di mercato salgono, il prezzo di un'obbligazione a tasso fisso già emessa:",
            options: ["Scende", "Sale", "Resta invariato", "Va a zero"],
            correct: 0,
            explain: "La cedola fissa diventa meno attraente dei nuovi titoli: il prezzo scende finché il rendimento non si allinea."
        },
        {
            question: "Che cos'è lo spread bancario (forbice dei tassi)?",
            options: ["La differenza tra tassi attivi sui prestiti e tassi passivi sulla raccolta", "La differenza tra BTP e Bund", "Il margine di solvibilità", "La quota di crediti deteriorati"],
            correct: 0,
            explain: "È la principale fonte del margine di interesse della banca."
        },
        {
            question: "Il coefficiente CET1 previsto dagli accordi di Basilea mette a rapporto:",
            options: ["Il capitale primario di qualità e le attività ponderate per il rischio", "Depositi e prestiti", "Utile e patrimonio netto", "Crediti deteriorati e crediti totali"],
            correct: 0,
            explain: "Più attività rischiose la banca detiene, più capitale di qualità deve avere a copertura."
        }
    ],
    analisiBilancio: [
        {
            question: "Il ROE si calcola come:",
            options: ["Utile netto / patrimonio netto", "Reddito operativo / capitale investito", "Utile netto / ricavi", "Ricavi / capitale investito"],
            correct: 0,
            explain: "Misura il rendimento del capitale dei soci. Reddito operativo su capitale investito è invece il ROI."
        },
        {
            question: "Il ROI mette a rapporto:",
            options: ["Reddito operativo e capitale investito", "Utile netto e patrimonio netto", "Margine operativo lordo e ricavi", "Attivo corrente e passivo corrente"],
            correct: 0,
            explain: "Esprime la redditività della gestione caratteristica, al netto di come l'impresa si è finanziata."
        },
        {
            question: "L'indice di liquidità corrente (current ratio) è dato da:",
            options: ["Attivo corrente / passivo corrente", "Liquidità immediate / debiti totali", "Patrimonio netto / attivo immobilizzato", "Utile / ricavi"],
            correct: 0,
            explain: "Se è sotto 1 l'impresa ha più debiti a breve che risorse a breve per farvi fronte."
        },
        {
            question: "Il margine di struttura si ottiene da:",
            options: ["Patrimonio netto meno attivo immobilizzato", "Ricavi meno costi variabili", "Attivo corrente meno passivo corrente", "Utile netto meno dividendi"],
            correct: 0,
            explain: "Se è positivo gli investimenti durevoli sono finanziati con mezzi propri: struttura più solida."
        },
        {
            question: "L'analisi per indici di bilancio serve a:",
            options: ["Confrontare redditività, solidità e liquidità nel tempo e con altre imprese", "Sostituire la nota integrativa", "Calcolare le imposte dovute", "Determinare il prezzo di vendita dei prodotti"],
            correct: 0,
            explain: "Un indice da solo dice poco: conta il confronto con gli anni precedenti e con il settore."
        }
    ],
    ragioneriaApp: [
        {
            question: "Il principio di competenza economica stabilisce che costi e ricavi:",
            options: ["Si imputano all'esercizio in cui maturano, a prescindere dagli incassi e dai pagamenti", "Si registrano solo quando il denaro entra o esce", "Si imputano sempre all'ultimo esercizio", "Si ripartiscono in parti uguali tra gli esercizi"],
            correct: 0,
            explain: "È il motivo per cui esistono ratei e risconti: allineano i valori alla competenza, non alla cassa."
        },
        {
            question: "Un risconto passivo rappresenta:",
            options: ["Un ricavo già incassato ma di competenza dell'esercizio successivo", "Un costo maturato e non ancora pagato", "Un ricavo maturato e non ancora incassato", "Una perdita presunta"],
            correct: 0,
            explain: "Esempio: un canone annuo incassato a ottobre, di cui i mesi da gennaio in poi competono all'anno dopo."
        },
        {
            question: "L'ammortamento serve a:",
            options: ["Ripartire il costo di un'immobilizzazione lungo la sua vita utile", "Rivalutare i beni in bilancio", "Accantonare liquidità per acquisti futuri", "Ridurre le imposte in un solo esercizio"],
            correct: 0,
            explain: "Il costo partecipa al risultato di tutti gli esercizi in cui il bene viene usato."
        },
        {
            question: "Secondo l'art. 2423 del Codice civile il bilancio d'esercizio è composto da:",
            options: ["Stato patrimoniale, conto economico, rendiconto finanziario e nota integrativa", "Solo stato patrimoniale e conto economico", "Bilancio di verifica e libro giornale", "Conto economico e dichiarazione dei redditi"],
            correct: 0,
            explain: "Le imprese che redigono il bilancio in forma abbreviata possono essere esonerate dal rendiconto finanziario."
        },
        {
            question: "Le scritture di assestamento si effettuano:",
            options: ["A fine esercizio, per rispettare la competenza economica", "All'apertura dei conti", "A ogni operazione di acquisto", "Solo in caso di perdita"],
            correct: 0,
            explain: "Comprendono completamenti, integrazioni, rettifiche e ammortamenti."
        }
    ],
};

const FLASHCARDS = {
    // ---- AREA GIURIDICA, PSICOLOGICA E UMANISTICA ----
    storiaDiritto: [
        { front: "Glossatori e commentatori", back: "A Bologna dal XII secolo si studiano i testi giustinianei con glosse (Irnerio, Accursio) e poi con commenti applicativi (Bartolo, Baldo)." },
        { front: "Ius commune e iura propria", back: "Diritto romano-canonico comune all'Europa, affiancato da statuti cittadini e consuetudini locali." },
        { front: "Code Napoléon (1804)", back: "Primo codice civile moderno: uguaglianza formale, proprietà individuale, libertà contrattuale. Modello per i codici europei." },
        { front: "Statuto Albertino (1848)", back: "Costituzione flessibile e ottriata, cioè concessa dal sovrano: modificabile con legge ordinaria." },
        { front: "Costituzione del 1948", back: "Rigida e votata da un'assemblea costituente: serve un procedimento aggravato per modificarla, con il controllo della Corte costituzionale." },
    ],
    filosofia: [
        { front: "Giusnaturalismo e giuspositivismo", back: "Per il primo esiste un diritto naturale precedente allo Stato; per il secondo è diritto solo ciò che è posto secondo procedure riconosciute." },
        { front: "Kelsen e la norma fondamentale", back: "L'ordinamento è una piramide: ogni norma è valida perché conforme a quella superiore, fino alla Grundnorm presupposta." },
        { front: "Contrattualismo", back: "Hobbes (sicurezza), Locke (tutela dei diritti naturali), Rousseau (volontà generale): l'autorità nasce da un patto tra gli individui." },
        { front: "Legge di Hume", back: "Dall'essere non si deduce il dover essere: confondere fatti e norme è la fallacia naturalistica." },
        { front: "Rawls e il velo di ignoranza", back: "Scegliere le regole senza sapere quale posizione si occuperà porta a principi equi, a vantaggio anche di chi sta peggio." },
    ],
    econPolitica: [
        { front: "Domanda e offerta", back: "La domanda cala al crescere del prezzo, l'offerta cresce: il punto d'incontro fissa prezzo e quantità di equilibrio." },
        { front: "Elasticità della domanda", back: "Variazione percentuale della quantità rispetto a quella del prezzo: i beni di prima necessità sono poco elastici." },
        { front: "Concorrenza perfetta e monopolio", back: "Nella prima molte imprese prendono il prezzo dal mercato; nel monopolio un solo produttore lo fissa riducendo la quantità." },
        { front: "PIL", back: "Valore dei beni e servizi finali prodotti in un paese in un periodo. Non misura benessere né disuguaglianza." },
        { front: "Politica monetaria e fiscale", back: "La prima agisce su tassi e liquidità (banca centrale), la seconda su imposte e spesa pubblica (governo)." },
    ],
    procCivile: [
        { front: "Principio dispositivo", back: "Sono le parti a fissare l'oggetto del giudizio e a fornire le prove: il giudice non va oltre la domanda." },
        { front: "Citazione e ricorso", back: "Due modi di introdurre la causa: con la citazione si chiama direttamente la controparte, con il ricorso ci si rivolge prima al giudice." },
        { front: "Giudicato formale e sostanziale", back: "Formale: la sentenza non è più impugnabile con i mezzi ordinari. Sostanziale: l'accertamento vincola le parti e i loro aventi causa." },
        { front: "Gradi di giudizio", back: "Tribunale, corte d'appello e Corte di cassazione, che giudica solo la corretta applicazione della legge." },
        { front: "Procedimento monitorio", back: "Il decreto ingiuntivo si ottiene su prova scritta senza contraddittorio; il debitore può fare opposizione entro 40 giorni." },
    ],
    dirInternazionale: [
        { front: "Fonti del diritto internazionale", back: "Trattati, consuetudine e principi generali di diritto; dottrina e giurisprudenza sono mezzi sussidiari (art. 38 Statuto CIG)." },
        { front: "Consuetudine internazionale", back: "Prassi generale e costante (diuturnitas) unita alla convinzione della sua obbligatorietà (opinio iuris)." },
        { front: "Pacta sunt servanda", back: "I trattati vanno eseguiti in buona fede: principio cardine codificato nella Convenzione di Vienna del 1969." },
        { front: "Organi principali dell'ONU", back: "Assemblea generale, Consiglio di Sicurezza (decisioni vincolanti, 5 membri permanenti con veto), Segretariato, Corte internazionale di giustizia." },
        { front: "Divieto dell'uso della forza", back: "Vietato dall'art. 2.4 della Carta ONU, salvo legittima difesa e autorizzazione del Consiglio di Sicurezza." },
    ],
    psicSociale: [
        { front: "Errore fondamentale di attribuzione", back: "Spiegare il comportamento altrui con il carattere sottovalutando la situazione; per noi stessi facciamo il contrario." },
        { front: "Conformismo (Asch)", back: "Molte persone allineano il proprio giudizio a una maggioranza unanime anche quando è palesemente errato." },
        { front: "Dissonanza cognitiva (Festinger)", back: "Il contrasto tra due cognizioni genera disagio: si riduce cambiando atteggiamento, comportamento o aggiungendo giustificazioni." },
        { front: "Effetto spettatore", back: "Più testimoni sono presenti, meno probabile è l'intervento: pesano diffusione di responsabilità e ignoranza pluralistica." },
        { front: "Ipotesi del contatto (Allport)", back: "Il pregiudizio cala se i gruppi si incontrano a pari status, con obiettivi comuni, cooperazione e sostegno istituzionale." },
    ],
    psicSviluppo: [
        { front: "Stadi di Piaget", back: "Sensomotorio (0-2), preoperatorio (2-7), operatorio concreto (7-11), operatorio formale (dagli 11 anni)." },
        { front: "Permanenza dell'oggetto", back: "Tra gli 8 e i 12 mesi il bambino capisce che un oggetto continua a esistere anche quando non lo vede." },
        { front: "Zona di sviluppo prossimale", back: "Distanza tra ciò che il bambino fa da solo e ciò che riesce a fare con l'aiuto di un adulto o di un pari più esperto (Vygotskij)." },
        { front: "Stili di attaccamento", back: "Sicuro, evitante, ambivalente e disorganizzato: si osservano nella Strange Situation di Ainsworth." },
        { front: "Stadi psicosociali di Erikson", back: "Otto crisi lungo la vita: in adolescenza identità contro confusione di ruolo." },
    ],
    psicometria: [
        { front: "Attendibilità e validità", back: "L'attendibilità è la costanza della misura, la validità è misurare davvero ciò che si intende misurare." },
        { front: "Alfa di Cronbach", back: "Indice di coerenza interna di una scala: valori indicativamente sopra 0,70 sono considerati accettabili." },
        { front: "Standardizzazione", back: "Trasformare i punteggi grezzi in punteggi confrontabili (z, T, QI) rispetto a un campione normativo." },
        { front: "Distribuzione normale", back: "Regola 68-95-99,7: entro una, due e tre deviazioni standard dalla media." },
        { front: "Validità convergente e discriminante", back: "Il test correla con misure dello stesso costrutto e non correla con misure di costrutti diversi." },
    ],
    neuroscienze: [
        { front: "Potenziale d'azione", back: "Depolarizzazione tutto-o-nulla da ingresso di Na⁺, poi ripolarizzazione per uscita di K⁺." },
        { front: "Sinapsi chimica", back: "Il segnale passa tramite neurotrasmettitori rilasciati nello spazio sinaptico e legati ai recettori postsinaptici." },
        { front: "Mielina", back: "Guaina che permette la conduzione saltatoria tra i nodi di Ranvier e accelera molto l'impulso nervoso." },
        { front: "Ippocampo", back: "Struttura chiave per la formazione di nuove memorie dichiarative, come mostrò il caso del paziente H.M." },
        { front: "Plasticità sinaptica", back: "Le connessioni si rafforzano o indeboliscono con l'esperienza: il potenziamento a lungo termine (LTP) ne è l'esempio più studiato." },
    ],
    psicClinica: [
        { front: "DSM-5", back: "Manuale diagnostico e statistico dei disturbi mentali: fornisce criteri condivisi, non indica il trattamento." },
        { front: "Terapia cognitivo-comportamentale", back: "Lavora su pensieri disfunzionali e comportamenti di mantenimento, con ristrutturazione cognitiva ed esposizione graduale." },
        { front: "Alleanza terapeutica", back: "Legame collaborativo su obiettivi e compiti condivisi: è tra i migliori predittori dell'esito, in ogni orientamento." },
        { front: "Disturbo d'ansia generalizzata", back: "Preoccupazione eccessiva, difficile da controllare, su più ambiti, per la maggior parte dei giorni da almeno sei mesi." },
        { front: "Segreto professionale", back: "Obbligo di riservatezza dello psicologo, derogabile solo con valido consenso o nei casi previsti dalla legge." },
    ],
    antropologia: [
        { front: "Relativismo culturale", back: "Metodo che comprende una pratica dentro il suo contesto, invece di giudicarla con i criteri della propria cultura." },
        { front: "Etnocentrismo", back: "Tendenza a considerare la propria cultura come misura di tutte le altre." },
        { front: "Osservazione partecipante", back: "Permanenza prolungata sul campo prendendo parte alla vita quotidiana: da qui nasce l'etnografia." },
        { front: "Il dono (Mauss)", back: "Fatto sociale totale fondato su tre obblighi: dare, ricevere, ricambiare. Crea e mantiene legami." },
        { front: "Riti di passaggio (Van Gennep)", back: "Tre fasi: separazione, margine o liminalità, aggregazione al nuovo status." },
    ],
    letteratura: [
        { front: "Le tre corone", back: "Dante, Petrarca e Boccaccio: fondano la tradizione letteraria italiana nel Trecento." },
        { front: "Struttura della Divina Commedia", back: "Tre cantiche (Inferno, Purgatorio, Paradiso), 100 canti in terzine incatenate di endecasillabi." },
        { front: "Il Canzoniere di Petrarca", back: "Raccolta di 366 componimenti in volgare incentrati su Laura e sul conflitto interiore del poeta." },
        { front: "Il Decameron", back: "Cento novelle raccontate in dieci giorni da dieci giovani fuggiti dalla peste del 1348, con una cornice narrativa." },
        { front: "Verismo e Naturalismo", back: "Verga porta in Italia la poetica del vero con l'impersonalità e la regressione del narratore nel mondo dei personaggi." },
    ],
    letteraturaLat: [
        { front: "Eneide", back: "Poema epico di Virgilio in dodici libri: viaggio (come l'Odissea) nei primi sei, guerra (come l'Iliade) negli ultimi sei." },
        { front: "Metri principali", back: "Esametro dattilico per l'epica, distico elegiaco (esametro + pentametro) per l'elegia." },
        { front: "De rerum natura", back: "Poema didascalico di Lucrezio: espone l'epicureismo per liberare gli uomini dalla paura degli dèi e della morte." },
        { front: "Cicerone", back: "Massimo oratore latino, autore di orazioni (Catilinarie, Verrine) e di opere retoriche e filosofiche." },
        { front: "Satira latina", back: "Orazio con tono ironico e misurato, Giovenale con l'indignatio: entrambi guardano ai vizi della società." },
    ],
    storiaMedievale: [
        { front: "476 d.C.", back: "Deposizione di Romolo Augustolo: data convenzionale della fine dell'Impero romano d'Occidente." },
        { front: "Feudalesimo", back: "Il signore concede un beneficio al vassallo in cambio di fedeltà e servizio armato; con Quierzy (877) i feudi diventano ereditari." },
        { front: "Lotta per le investiture", back: "Scontro tra papato e impero sulla nomina dei vescovi: si chiude con il concordato di Worms (1122)." },
        { front: "Comuni italiani", back: "Nascono tra XI e XII secolo: fase consolare, podestarile e popolare, poi il passaggio alle signorie." },
        { front: "Peste nera (1347-1351)", back: "Crollo demografico che fa salire i salari e indebolisce i vincoli servili, accelerando la crisi del feudalesimo." },
    ],
    storiaModerna: [
        { front: "Pace di Westfalia (1648)", back: "Chiude la guerra dei Trent'anni e afferma la sovranità territoriale degli Stati: nasce il sistema internazionale moderno." },
        { front: "Rivoluzione scientifica", back: "Galileo e Newton: metodo sperimentale e matematizzazione della natura al posto del principio di autorità." },
        { front: "Assolutismo", back: "Potere concentrato nel sovrano, corte accentrata (Versailles) e burocrazia fedele, con la nobiltà legata al favore regio." },
        { front: "1789", back: "Rivoluzione francese e Dichiarazione dei diritti dell'uomo e del cittadino." },
        { front: "Prima rivoluzione industriale", back: "Inghilterra, seconda metà del Settecento: macchina a vapore, tessile e siderurgia trasformano economia e società." },
    ],
    glottologia: [
        { front: "Segno linguistico (Saussure)", back: "Unione arbitraria di significante (immagine acustica) e significato (concetto)." },
        { front: "Langue e parole", back: "La langue è il sistema condiviso dalla comunità, la parole l'atto linguistico individuale e concreto." },
        { front: "Metodo comparativo", back: "Confronto sistematico tra lingue imparentate per ricostruire la lingua madre: così è stato ricostruito l'indoeuropeo." },
        { front: "Fonema", back: "Unità sonora minima capace di distinguere significati: lo si prova con le coppie minime come pane/cane." },
        { front: "Sincronia e diacronia", back: "Studio della lingua in un dato momento oppure nella sua evoluzione nel tempo." },
    ],
    geografia: [
        { front: "Latitudine e longitudine", back: "La latitudine misura la distanza angolare dall'equatore (0°-90°), la longitudine quella dal meridiano di Greenwich (0°-180°)." },
        { front: "Clima mediterraneo", back: "Estati calde e secche, inverni miti e piovosi: vegetazione adattata all'aridità estiva, come la macchia." },
        { front: "Densità di popolazione", back: "Abitanti per km²: un valore medio può nascondere distribuzioni molto disomogenee." },
        { front: "Urbanizzazione", back: "Crescita della quota di popolazione che vive in città: dal 2007 circa riguarda più della metà della popolazione mondiale." },
        { front: "Transizione demografica", back: "Passaggio da alta natalità e alta mortalità a valori bassi; nella fase intermedia la popolazione cresce rapidamente." },
    ],
    // ---- AREA MEDICO-BIOLOGICA E SCIENTIFICA ----
    istologia: [
        { front: "I quattro tessuti fondamentali", back: "Epiteliale, connettivo, muscolare e nervoso: tutti gli altri ne sono varianti." },
        { front: "Caratteristiche dell'epitelio", back: "Cellule strettamente unite, poggiate su una membrana basale e non vascolarizzate: si nutrono per diffusione dal connettivo." },
        { front: "Tipi di tessuto muscolare", back: "Scheletrico (striato, volontario), cardiaco (striato, involontario, con dischi intercalari), liscio (involontario, nei visceri)." },
        { front: "Matrice extracellulare", back: "Fibre collagene, elastiche e reticolari immerse nella sostanza fondamentale: è ciò che caratterizza i tessuti connettivi." },
        { front: "Foglietti embrionali", back: "Ectoderma (cute e sistema nervoso), mesoderma (muscoli, ossa, circolazione), endoderma (rivestimenti di digerente e respiratorio)." },
    ],
    geneticaMed: [
        { front: "Genotipo e fenotipo", back: "Il genotipo è il corredo genetico, il fenotipo la manifestazione osservabile, frutto anche dell'ambiente." },
        { front: "Eredità autosomica recessiva", back: "Da due portatori sani: 25% affetti, 50% portatori, 25% sani. Colpisce maschi e femmine allo stesso modo." },
        { front: "Eredità legata all'X recessiva", back: "I maschi, avendo una sola X, si ammalano con un solo allele mutato; le femmine sono in genere portatrici sane." },
        { front: "Non disgiunzione", back: "Mancata separazione dei cromosomi in meiosi: è la causa più frequente delle trisomie, come la trisomia 21." },
        { front: "Penetranza ed espressività", back: "La penetranza dice quanti portatori manifestano il fenotipo, l'espressività quanto intensamente lo manifestano." },
    ],
    immunologia: [
        { front: "Immunità innata e adattativa", back: "L'innata è rapida e aspecifica; l'adattativa è più lenta ma specifica per l'antigene e lascia memoria." },
        { front: "Linfociti B e T", back: "I B producono anticorpi tramite le plasmacellule; i T CD4+ coordinano la risposta, i CD8+ uccidono le cellule infette." },
        { front: "MHC di classe I e II", back: "Classe I su quasi tutte le cellule, presenta antigeni endogeni ai CD8+; classe II sulle cellule presentanti, antigeni esogeni ai CD4+." },
        { front: "Memoria immunologica", back: "Cellule memoria permettono una risposta più rapida e intensa al secondo incontro: è il principio dei vaccini." },
        { front: "Ipersensibilità di tipo I", back: "Allergia immediata mediata da IgE e mastociti, con rilascio di istamina in pochi minuti dall'esposizione." },
    ],
    microbiologia: [
        { front: "Colorazione di Gram", back: "Distingue i batteri per la parete: Gram-positivi viola (peptidoglicano spesso), Gram-negativi rosa (parete sottile e membrana esterna)." },
        { front: "Procarioti ed eucarioti", back: "I procarioti non hanno nucleo né organelli membranosi: DNA circolare libero nel citoplasma, spesso con plasmidi." },
        { front: "Perché gli antibiotici non agiscono sui virus", back: "I loro bersagli (parete, ribosomi batterici) nei virus non esistono: servono farmaci antivirali." },
        { front: "Antibiotico-resistenza", back: "Si diffonde per mutazione ma soprattutto per trasferimento genico orizzontale: coniugazione, trasformazione, trasduzione." },
        { front: "Sterilizzazione e disinfezione", back: "La sterilizzazione elimina ogni forma vivente, spore comprese (autoclave a 121 °C); la disinfezione riduce solo la carica microbica." },
    ],
    igiene: [
        { front: "Livelli di prevenzione", back: "Primaria: evitare la malattia. Secondaria: diagnosi precoce (screening). Terziaria: limitare complicanze e disabilità." },
        { front: "Incidenza e prevalenza", back: "L'incidenza conta i nuovi casi in un periodo, la prevalenza tutti i casi presenti in un dato momento." },
        { front: "Immunità di gregge", back: "Quando una quota sufficiente di popolazione è immune, l'agente circola poco e sono protetti anche i non immuni." },
        { front: "Studi epidemiologici", back: "Trasversali (istantanea), caso-controllo (dalla malattia all'esposizione), coorte (dall'esposizione alla malattia), sperimentali randomizzati." },
        { front: "Sensibilità e specificità", back: "La sensibilità individua correttamente i malati, la specificità i sani: negli screening si privilegia la sensibilità." },
    ],
    medInterna: [
        { front: "Soglia di ipertensione", back: "Nell'adulto si parla di ipertensione da 140/90 mmHg in su, confermati in più misurazioni." },
        { front: "Diabete tipo 1 e tipo 2", back: "Tipo 1: distruzione autoimmune delle beta cellule e carenza di insulina. Tipo 2: insulino-resistenza, spesso con sovrappeso." },
        { front: "Emoglobina glicata", back: "Riflette il controllo glicemico degli ultimi 2-3 mesi: più stabile della singola glicemia." },
        { front: "Scompenso cardiaco", back: "Dispnea ed edemi declivi da congestione: sinistro soprattutto polmonare, destro soprattutto periferico." },
        { front: "BPCO e asma", back: "Entrambe ostruttive, ma nell'asma l'ostruzione è reversibile dopo broncodilatatore, nella BPCO no o solo in parte." },
    ],
    chirurgiaGen: [
        { front: "Segno di Blumberg", back: "Dolore alla brusca decompressione della parete: indica irritazione peritoneale, tipico dell'appendicite in fossa iliaca destra." },
        { front: "Asepsi e antisepsi", back: "L'antisepsi elimina i germi presenti, l'asepsi impedisce che ne arrivino di nuovi nel campo operatorio." },
        { front: "Laparoscopia", back: "Accessi minimi con ottica e strumenti dedicati: meno dolore, degenza più breve, cicatrici ridotte." },
        { front: "Ernia e strozzamento", back: "Fuoriuscita di un viscere da un punto debole della parete; se irriducibile e ischemica diventa urgenza chirurgica." },
        { front: "Schema ABCDE", back: "Airway, Breathing, Circulation, Disability, Exposure: ordine di valutazione del politraumatizzato." },
    ],
    calcoloNum: [
        { front: "Errore di troncamento e di arrotondamento", back: "Il primo nasce dall'approssimare un procedimento infinito, il secondo dalla rappresentazione finita dei numeri." },
        { front: "Metodo di bisezione", back: "Serve una funzione continua con segni opposti agli estremi: converge sempre, ma lentamente (l'intervallo si dimezza a ogni passo)." },
        { front: "Metodo di Newton", back: "Usa la tangente: convergenza quadratica vicino alla radice, ma richiede la derivata e un buon punto di partenza." },
        { front: "Condizionamento e stabilità", back: "Il condizionamento è proprietà del problema, la stabilità dell'algoritmo: un problema mal condizionato resta difficile per qualsiasi metodo." },
        { front: "Formule di quadratura", back: "Trapezi (segmenti) e Simpson (archi di parabola) approssimano un integrale definito; Simpson è in genere più accurato." },
    ],
    // ---- INGEGNERIA (lotto 2: meccanica, civile, gestionale) ----
    disegnoTecnico: [
        { front: "Proiezioni ortogonali", back: "Rappresentazione dell'oggetto su piani perpendicolari tra loro: pianta, prospetto e vista laterale." },
        { front: "Metodo europeo e metodo americano", back: "Nel primo diedro (europeo) le viste vanno dalla parte opposta alla direzione di osservazione; nel terzo diedro (americano) dalla stessa parte." },
        { front: "Scale di rappresentazione", back: "1:1 grandezza naturale, 1:2 o 1:5 riduzione, 2:1 ingrandimento. Il primo numero è il disegno, il secondo la realtà." },
        { front: "Tipi di linea", back: "Continua grossa per gli spigoli visibili, tratteggiata per i nascosti, tratto e punto per assi e mezzerie." },
        { front: "Tolleranze e rugosità", back: "La tolleranza fissa il campo di misura accettabile, la rugosità la finitura della superficie: insieme rendono i pezzi intercambiabili." },
    ],
    meccanica: [
        { front: "Gradi di libertà di un corpo rigido", back: "Sei nello spazio (tre traslazioni e tre rotazioni), tre nel piano." },
        { front: "Momento di una forza", back: "Prodotto vettoriale tra braccio e forza: in modulo è forza per distanza perpendicolare dal polo." },
        { front: "Equilibrio statico", back: "Servono risultante delle forze nulla e momento risultante nullo rispetto a un qualunque polo." },
        { front: "Momento di inerzia", back: "Misura la resistenza alla rotazione: dipende dalla massa e da quanto è lontana dall'asse." },
        { front: "Teorema di Huygens-Steiner", back: "I = I_G + m·d²: il momento rispetto a un asse parallelo a quello baricentrico, distante d." },
    ],
    termodinamica: [
        { front: "Primo principio", back: "ΔU = Q − L: l'energia interna varia per il calore ricevuto meno il lavoro compiuto dal sistema." },
        { front: "Secondo principio", back: "Il calore non passa spontaneamente dal corpo freddo al caldo e nessuna macchina termica converte tutto il calore in lavoro." },
        { front: "Rendimento di Carnot", back: "1 − T_fredda/T_calda con temperature assolute: è il limite superiore per ogni macchina tra quelle due sorgenti." },
        { front: "Trasformazioni notevoli", back: "Isoterma (T costante), isobara (p costante), isocora (V costante), adiabatica (nessuno scambio di calore)." },
        { front: "Entropia", back: "Misura del disordine e dell'irreversibilità: in un sistema isolato non può diminuire." },
    ],
    scienzaCostruzioni: [
        { front: "Tensione normale e di taglio", back: "σ = N/A per lo sforzo assiale; τ nasce da forze che agiscono nel piano della sezione." },
        { front: "Legge di Hooke", back: "σ = E·ε nel campo elastico lineare: E è il modulo di Young, misura della rigidezza del materiale." },
        { front: "Flessione e asse neutro", back: "Le tensioni variano linearmente nella sezione e si annullano sull'asse neutro, passante per il baricentro." },
        { front: "Instabilità euleriana", back: "Un'asta snella compressa può sbandare lateralmente prima di rompersi: il carico critico cresce con E·J e cala col quadrato della lunghezza libera." },
        { front: "Momento massimo, casi tipici", back: "Trave appoggiata con carico distribuito q: ql²/8 in mezzeria. Mensola con lo stesso carico: ql²/2 all'incastro." },
    ],
    tecnologiaMat: [
        { front: "Prova di trazione", back: "Dà modulo elastico, tensione di snervamento, carico di rottura e allungamento percentuale a rottura." },
        { front: "Duttilità e fragilità", back: "Il materiale duttile si deforma molto prima di rompersi e dà preavviso; quello fragile cede all'improvviso." },
        { front: "Acciaio e ghisa", back: "Leghe ferro-carbonio: fino a circa il 2% di carbonio si parla di acciaio, oltre di ghisa, più dura e fragile." },
        { front: "Trattamenti termici", back: "Tempra (raffreddamento rapido, indurisce), rinvenimento (recupera tenacità), ricottura (ammorbidisce e distende le tensioni)." },
        { front: "Fatica", back: "Rottura dopo molti cicli di carico anche sotto lo snervamento: nasce da intagli e difetti superficiali." },
    ],
    fisicaTecnica: [
        { front: "Modi di trasmissione del calore", back: "Conduzione nella materia, convezione per movimento del fluido, irraggiamento tramite onde elettromagnetiche." },
        { front: "Legge di Fourier", back: "Il flusso conduttivo è proporzionale alla conducibilità λ e al gradiente di temperatura." },
        { front: "Trasmittanza U", back: "Calore che attraversa 1 m² di parete per ogni grado di differenza (W/m²K): più è bassa, migliore è l'isolamento." },
        { front: "Umidità relativa", back: "Rapporto tra vapore presente e vapore a saturazione: raffreddando l'aria sale fino al punto di rugiada." },
        { front: "COP di una pompa di calore", back: "Calore utile diviso energia elettrica assorbita: supera 1 perché il calore viene spostato, non prodotto." },
    ],
    idraulica: [
        { front: "Legge di Stevin", back: "p = ρ·g·h: la pressione cresce linearmente con la profondità e non dipende dalla forma del recipiente." },
        { front: "Principio di Archimede", back: "La spinta verso l'alto è pari al peso del fluido spostato." },
        { front: "Equazione di continuità", back: "Per un fluido incomprimibile A·v è costante: restringendo la sezione la velocità aumenta." },
        { front: "Teorema di Bernoulli", back: "Somma costante di altezza geodetica, piezometrica e cinetica: dove la velocità cresce, la pressione cala." },
        { front: "Numero di Reynolds", back: "Rapporto tra forze d'inerzia e viscose: nelle condotte, sotto ~2000 moto laminare, sopra ~4000 turbolento." },
    ],
    geotecnica: [
        { front: "Tensioni efficaci (Terzaghi)", back: "σ' = σ − u: il comportamento del terreno dipende dalla tensione efficace, non da quella totale." },
        { front: "Criterio di Mohr-Coulomb", back: "τ = c + σ'·tan φ: la resistenza al taglio nasce da coesione e attrito interno." },
        { front: "Legge di Darcy", back: "v = k·i: la velocità di filtrazione dipende dalla permeabilità e dal gradiente idraulico." },
        { front: "Consolidazione", back: "Cedimento differito delle argille sature, legato alla lenta espulsione dell'acqua interstiziale." },
        { front: "Prove in sito SPT e CPT", back: "SPT conta i colpi di infissione, CPT misura la resistenza alla punta: servono a stimare densità e resistenza." },
    ],
    ricercaOperativa: [
        { front: "Programmazione lineare", back: "Ottimizzare una funzione obiettivo lineare con vincoli lineari: l'ottimo si trova in un vertice della regione ammissibile." },
        { front: "Algoritmo del simplesso", back: "Si sposta da un vertice all'altro del poliedro finché nessuna mossa migliora la funzione obiettivo." },
        { front: "Dualità", back: "A ogni problema primale corrisponde un duale: i valori ottimi coincidono e le variabili duali sono i prezzi ombra dei vincoli." },
        { front: "Cammino critico (CPM)", back: "Sequenza di attività a scorrimento nullo: ne determina la durata minima del progetto." },
        { front: "Lotto economico (EOQ)", back: "Quantità d'ordine che minimizza la somma tra costi di emissione ordine e costi di mantenimento a scorta." },
    ],
    inglese: [
        { front: "Struttura IMRaD", back: "Introduction, Methods, Results and Discussion: l'impianto standard di un articolo scientifico." },
        { front: "Passivo nei Methods", back: "\"The samples were analysed\": sposta l'attenzione sulla procedura invece che su chi l'ha eseguita." },
        { front: "Registro accademico", back: "Meglio \"numerous\", \"several\", \"significant\" che \"a lot of\", \"tons of\", \"really big\"." },
        { front: "Connettivi utili", back: "However (contrasto), moreover (aggiunta), therefore (conseguenza), for instance (esempio)." },
        { front: "Abstract", back: "Riassunto autonomo di 150-250 parole: contesto, obiettivo, metodo, risultati principali e conclusione." },
    ],
    // ---- INGEGNERIA (lotto 1: informatica ed elettronica) ----
    fisica1: [
        { front: "Secondo principio della dinamica", back: "La forza risultante su un corpo è uguale al prodotto della massa per l'accelerazione: F = m·a." },
        { front: "Quantità di moto e impulso", back: "La quantità di moto è m·v; l'impulso di una forza (F·Δt) è pari alla variazione della quantità di moto." },
        { front: "Energia cinetica e potenziale", back: "Cinetica: ½mv². Potenziale gravitazionale vicino alla superficie: mgh. In assenza di attrito la loro somma si conserva." },
        { front: "Moto circolare uniforme", back: "Il modulo della velocità è costante ma la direzione cambia: serve un'accelerazione centripeta v²/r diretta verso il centro." },
        { front: "Lavoro di una forza", back: "Prodotto scalare tra forza e spostamento: è nullo se la forza è perpendicolare al moto, come la tensione nel moto circolare." },
    ],
    chimica: [
        { front: "Mole e numero di Avogadro", back: "Una mole contiene 6,022·10²³ entità e ha massa in grammi pari alla massa atomica o molecolare." },
        { front: "Legame ionico e legame covalente", back: "Nel legame ionico gli elettroni passano da un atomo all'altro; in quello covalente vengono condivisi." },
        { front: "Regola dell'ottetto", back: "Gli atomi tendono a raggiungere otto elettroni nel guscio esterno, la configurazione stabile dei gas nobili." },
        { front: "pH", back: "Logaritmo negativo della concentrazione di ioni H₃O⁺: sotto 7 acido, 7 neutro, sopra 7 basico." },
        { front: "Principio di Le Châtelier", back: "Se si perturba un equilibrio (concentrazione, pressione, temperatura), il sistema reagisce spostandosi nel verso che riduce la perturbazione." },
    ],
    elettrotecnica: [
        { front: "Legge di Ohm", back: "V = R·I: la tensione ai capi di un resistore è proporzionale alla corrente che lo attraversa." },
        { front: "Leggi di Kirchhoff", back: "Ai nodi la somma delle correnti entranti eguaglia quella delle uscenti; lungo una maglia la somma algebrica delle tensioni è zero." },
        { front: "Resistenze in serie e in parallelo", back: "In serie si sommano le resistenze; in parallelo si sommano i reciproci (le conduttanze)." },
        { front: "Potenza attiva, reattiva, apparente", back: "Attiva P = VI cos φ (in watt), reattiva Q = VI sen φ (in var), apparente S = VI (in VA)." },
        { front: "Teorema di Thévenin", back: "Ogni rete lineare vista da due morsetti equivale a un generatore di tensione pari alla tensione a vuoto in serie alla resistenza equivalente." },
    ],
    segnali: [
        { front: "Trasformata di Fourier", back: "Rappresenta un segnale come somma di sinusoidi: dal dominio del tempo si passa a quello della frequenza." },
        { front: "Teorema del campionamento", back: "Per ricostruire un segnale di banda B serve campionare ad almeno 2B (frequenza di Nyquist)." },
        { front: "Aliasing", back: "Sovrapposizione delle repliche spettrali dovuta a un campionamento troppo lento: si previene con un filtro anti-aliasing." },
        { front: "Convoluzione", back: "Nel tempo esprime l'uscita di un sistema LTI; in frequenza diventa un semplice prodotto con la risposta in frequenza." },
        { front: "Segnali di energia e di potenza", back: "I primi hanno energia finita e durata limitata; i secondi, come i periodici, hanno potenza media finita ed energia infinita." },
    ],
    ingSoftware: [
        { front: "Modello a cascata", back: "Requisiti, progettazione, sviluppo, test e manutenzione in sequenza: ogni fase si chiude prima della successiva." },
        { front: "Metodi agili", back: "Iterazioni brevi con rilasci frequenti di software funzionante e requisiti rivisti man mano, insieme al cliente." },
        { front: "Accoppiamento e coesione", back: "Obiettivo: basso accoppiamento tra moduli e alta coesione dentro ogni modulo." },
        { front: "Piramide dei test", back: "Molti test unitari alla base, meno test di integrazione, pochi test end-to-end: i primi sono veloci e precisi, gli ultimi lenti e fragili." },
        { front: "Refactoring", back: "Modificare la struttura interna del codice senza cambiarne il comportamento esterno, per ridurre il debito tecnico." },
    ],
    automatica: [
        { front: "Funzione di trasferimento", back: "Rapporto tra trasformata di Laplace dell'uscita e dell'ingresso, a condizioni iniziali nulle." },
        { front: "Retroazione negativa", back: "Con anello unitario la funzione ad anello chiuso è G/(1+G): riduce il guadagno ma rende il sistema robusto a disturbi e variazioni." },
        { front: "Condizione di stabilità", back: "Un sistema LTI è asintoticamente stabile se tutti i poli hanno parte reale negativa." },
        { front: "Regolatore PID", back: "Proporzionale sull'errore attuale, integrale sull'errore accumulato, derivativo sulla sua tendenza." },
        { front: "Margine di fase e di guadagno", back: "Misurano quanto si può variare fase o guadagno prima che l'anello chiuso diventi instabile." },
    ],
    elettronica: [
        { front: "Diodo a giunzione pn", back: "Conduce in polarizzazione diretta oltre circa 0,7 V (silicio) e blocca la corrente in inversa." },
        { front: "Zone di funzionamento del BJT", back: "Interdizione e saturazione per l'uso come interruttore, zona attiva diretta per l'amplificazione." },
        { front: "Cortocircuito virtuale", back: "In un operazionale ideale con retroazione negativa i due ingressi si trovano alla stessa tensione e non assorbono corrente." },
        { front: "Amplificatore invertente e non invertente", back: "Invertente: guadagno −Rf/Rin. Non invertente: guadagno 1 + Rf/Rin." },
        { front: "Tensione di soglia del MOSFET", back: "Tensione gate-source oltre la quale si forma il canale e il dispositivo conduce." },
    ],
    telecomunicazioni: [
        { front: "Perché si modula", back: "Per traslare il segnale in banda: antenne più piccole, minore rumore in bassa frequenza e più canali sullo stesso mezzo." },
        { front: "Capacità di canale (Shannon)", back: "C = B log₂(1 + S/N): la banda conta più della potenza, perché entra in modo lineare invece che logaritmico." },
        { front: "FDM, TDM, CDMA", back: "Condivisione del canale rispettivamente per frequenze, intervalli di tempo e codici ortogonali." },
        { front: "Livelli del modello ISO/OSI", back: "Fisico, collegamento dati, rete, trasporto, sessione, presentazione, applicazione." },
        { front: "Decibel", back: "Per le potenze si usa 10 log₁₀ del rapporto: 3 dB ≈ doppio, 10 dB = dieci volte, 20 dB = cento volte." },
    ],
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
    ],
    // ---- ECONOMIA (lotto 1) ----
    econometria: [
        { front: "Che cos'è il metodo OLS?", back: "Minimi quadrati ordinari: stima i coefficienti minimizzando la somma dei quadrati dei residui." },
        { front: "Cosa dice il teorema di Gauss-Markov?", back: "Se valgono le ipotesi classiche, OLS è lo stimatore lineare corretto con varianza minima (BLUE)." },
        { front: "R² e R² corretto", back: "L'R² cresce sempre aggiungendo regressori; quello corretto penalizza le variabili inutili." },
        { front: "Eteroschedasticità", back: "Varianza dei residui non costante: le stime restano corrette ma gli errori standard classici non sono affidabili." },
        { front: "Variabile dummy", back: "Variabile che vale 0 o 1 e serve a rappresentare una caratteristica qualitativa, come il genere o l'area geografica." },
    ],
    dirPubblico: [
        { front: "Gerarchia delle fonti del diritto", back: "Costituzione e leggi costituzionali, fonti dell'Unione europea, leggi ordinarie e atti aventi forza di legge, regolamenti, consuetudini." },
        { front: "Differenza tra decreto legge e decreto legislativo", back: "Il decreto legge nasce da necessità e urgenza e va convertito in 60 giorni; il decreto legislativo richiede una legge delega del Parlamento." },
        { front: "Composizione del Parlamento italiano", back: "Camera dei deputati e Senato della Repubblica, con funzioni identiche: è il bicameralismo paritario." },
        { front: "Compiti della Corte costituzionale", back: "Giudica la legittimità costituzionale delle leggi, i conflitti di attribuzione, le accuse al Presidente della Repubblica e l'ammissibilità dei referendum." },
        { front: "Autonomia e decentramento (art. 5 Cost.)", back: "La Repubblica è una e indivisibile, ma riconosce le autonomie locali e decentra l'amministrazione." },
    ],
    scienzaFinanze: [
        { front: "Imposta progressiva, proporzionale, regressiva", back: "Progressiva: l'aliquota media sale col reddito. Proporzionale: resta costante. Regressiva: scende." },
        { front: "Bene pubblico puro", back: "Non rivale e non escludibile: il consumo di uno non toglie nulla agli altri e nessuno può essere escluso." },
        { front: "Esternalità", back: "Effetto di un'attività economica su terzi, positivo o negativo, che il prezzo di mercato non incorpora." },
        { front: "Deficit e debito pubblico", back: "Il deficit è la differenza annuale tra uscite ed entrate; il debito è lo stock accumulato nel tempo." },
        { front: "Curva di Laffer", back: "Rappresenta l'idea che oltre una certa aliquota il gettito fiscale smetta di crescere e cominci a diminuire." },
    ],
    economiaIndustriale: [
        { front: "Indice HHI", back: "Somma dei quadrati delle quote di mercato: misura quanto è concentrato un settore." },
        { front: "Cournot e Bertrand", back: "In Cournot le imprese scelgono le quantità, in Bertrand i prezzi. Con beni omogenei Bertrand porta il prezzo al costo marginale." },
        { front: "Barriere all'entrata", back: "Economie di scala, costi irrecuperabili, brevetti, controllo di risorse o canali distributivi, reputazione del marchio." },
        { front: "Discriminazione di prezzo", back: "Primo grado: prezzo pari alla disponibilità a pagare di ciascuno. Secondo: per quantità o versioni. Terzo: per gruppi di clienti." },
        { front: "Integrazione verticale", back: "L'impresa acquisisce fasi a monte o a valle della filiera, per ridurre costi di transazione o controllare l'accesso al mercato." },
    ],
    egi: [
        { front: "Catena del valore", back: "Modello di Porter che scompone l'impresa in attività primarie e di supporto, per capire dove nasce il valore." },
        { front: "Cinque forze di Porter", back: "Concorrenti attuali, entranti potenziali, prodotti sostitutivi, potere dei fornitori, potere dei clienti." },
        { front: "Strategie competitive di base", back: "Leadership di costo o differenziazione, applicate a tutto il mercato o a una nicchia (focalizzazione)." },
        { front: "Break-even point", back: "Quantità in cui ricavi e costi totali si equivalgono: costi fissi divisi per il margine di contribuzione unitario." },
        { front: "Margine di contribuzione", back: "Prezzo di vendita meno costo variabile unitario: è quanto ogni unità venduta contribuisce a coprire i costi fissi." },
    ],
    intermediariFin: [
        { front: "A cosa serve un intermediario finanziario", back: "Sposta risorse da chi ha un surplus a chi ha un deficit, trasformando scadenze, importi e rischi." },
        { front: "Rischio di credito e rischio di mercato", back: "Il primo è l'insolvenza del debitore, il secondo la perdita per variazioni di tassi, cambi o prezzi." },
        { front: "Prezzo di un'obbligazione e tassi", back: "Si muovono in direzione opposta: se i tassi di mercato salgono, il prezzo dei titoli a tasso fisso scende." },
        { front: "Margine di interesse", back: "Differenza tra interessi attivi sui prestiti e interessi passivi sulla raccolta: la voce principale del conto economico di una banca." },
        { front: "Basilea e requisiti patrimoniali", back: "Accordi internazionali che impongono alle banche capitale proporzionato alle attività ponderate per il rischio (indice CET1)." },
    ],
    analisiBilancio: [
        { front: "ROE", back: "Utile netto diviso patrimonio netto: quanto rende il capitale dei soci." },
        { front: "ROI", back: "Reddito operativo diviso capitale investito: redditività della gestione caratteristica, a prescindere dai finanziamenti." },
        { front: "Current ratio", back: "Attivo corrente diviso passivo corrente: se è sotto 1 i debiti a breve superano le risorse a breve." },
        { front: "Margine di struttura", back: "Patrimonio netto meno attivo immobilizzato: se positivo, gli investimenti durevoli sono coperti da mezzi propri." },
        { front: "Leva finanziaria", back: "Rapporto tra capitale investito e mezzi propri: amplifica il ROE quando il ROI supera il costo del debito, e le perdite nel caso opposto." },
    ],
    ragioneriaApp: [
        { front: "Principio di competenza economica", back: "Costi e ricavi si imputano all'esercizio in cui maturano, non a quello in cui si incassa o si paga." },
        { front: "Ratei e risconti", back: "I ratei riguardano valori maturati non ancora incassati o pagati; i risconti valori già incassati o pagati ma di competenza futura." },
        { front: "Ammortamento", back: "Ripartizione del costo di un'immobilizzazione lungo la vita utile del bene." },
        { front: "Scritture di assestamento", back: "Rettifiche di fine esercizio: completamenti, integrazioni, storni e ammortamenti, per rispettare la competenza." },
        { front: "Contenuto del bilancio d'esercizio", back: "Stato patrimoniale, conto economico, rendiconto finanziario e nota integrativa (art. 2423 c.c.)." },
    ],
    marketing: [
        { front: "Le 4 P del marketing mix", back: "Product, Price, Place, Promotion: prodotto, prezzo, distribuzione e comunicazione." },
        { front: "Segmentazione, targeting, posizionamento", back: "Si divide il mercato in gruppi omogenei, si scelgono quelli da servire e si definisce come farsi percepire rispetto ai concorrenti." },
        { front: "Ciclo di vita del prodotto", back: "Introduzione, crescita, maturità, declino: a ogni fase corrispondono obiettivi e leve di marketing diversi." },
        { front: "Customer lifetime value", back: "Valore che un cliente genera lungo tutta la relazione con l'impresa, non in un singolo acquisto." },
        { front: "Brand positioning", back: "Lo spazio che la marca occupa nella mente del cliente rispetto alle alternative, sintetizzato dalla promessa che mantiene." },
    ],
    pianificazione: [
        { front: "Business plan", back: "Documento che descrive l'idea, il mercato, il modello operativo e le proiezioni economico-finanziarie di un'iniziativa." },
        { front: "Budget", back: "Programma economico e finanziario di breve periodo, di solito annuale, articolato per centri di responsabilità." },
        { front: "Analisi degli scostamenti", back: "Confronto tra valori di budget e valori consuntivi, per capire da dove nasce la differenza e intervenire." },
        { front: "Pianificazione strategica e controllo di gestione", back: "La prima definisce obiettivi di lungo periodo, il secondo verifica nel breve che l'azienda stia andando in quella direzione." },
        { front: "Cash flow previsionale", back: "Stima di entrate e uscite monetarie future: serve a capire se l'impresa avrà liquidità sufficiente, anche se è in utile." },
    ],
    statistica: [
        { front: "Media, mediana e moda", back: "La media risente dei valori estremi, la mediana divide i dati ordinati in due metà, la moda è il valore più frequente." },
        { front: "Varianza e deviazione standard", back: "La varianza è la media dei quadrati degli scarti dalla media; la deviazione standard è la sua radice, nella stessa unità dei dati." },
        { front: "Teorema del limite centrale", back: "Al crescere del campione la distribuzione della media campionaria tende alla normale, qualunque sia la distribuzione di partenza." },
        { front: "Intervallo di confidenza", back: "Intervallo che, con un livello di fiducia fissato (per esempio 95%), contiene il parametro della popolazione." },
        { front: "p-value", back: "Probabilità di osservare un risultato estremo quanto quello ottenuto se l'ipotesi nulla fosse vera: più è piccolo, più l'evidenza è contraria all'ipotesi nulla." },
    ],
    informatica: [
        { front: "Algoritmo", back: "Sequenza finita e non ambigua di passi che, dati certi input, produce un risultato." },
        { front: "Notazione O grande", back: "Descrive come cresce il costo di un algoritmo al crescere dei dati: O(n) lineare, O(n²) quadratico, O(log n) logaritmico." },
        { front: "Array e lista concatenata", back: "L'array dà accesso diretto per indice ma dimensione rigida; la lista concatenata si estende facilmente ma va scorsa elemento per elemento." },
        { front: "Ricorsione", back: "Una funzione che richiama sé stessa su un problema più piccolo, fino a un caso base che ferma la catena." },
        { front: "Sistema binario", back: "Numerazione in base 2 con le sole cifre 0 e 1: è il modo in cui il calcolatore rappresenta ogni dato." },
    ],
};

const DAILY_CHALLENGES = [
    { title: "Maratoneta", desc: "Studia per 2 ore oggi", reward: "+200 XP", progress: 0 },
    { title: "Quizmaster", desc: "Completa 3 quiz in lobby diverse", reward: "+150 XP", progress: 33 },
    { title: "Costanza", desc: "Mantieni la streak per 3 giorni", reward: "+300 XP", progress: 66 },
    { title: "Social Learner", desc: "Invia 10 messaggi in chat", reward: "+100 XP", progress: 0 },
];

/* Nota: qui c'erano profili e messaggi di esempio mostrati agli utenti come
   se fossero persone reali online. Rimossi: far apparire un servizio più
   frequentato di quanto sia è una pratica commerciale ingannevole. */

/* Badge con criteri reali e verificabili.
   `check` riceve lo stato e restituisce true solo se il traguardo è
   davvero raggiunto; `goal` serve a mostrare i progressi. */
const BADGES = [
    { icon: "🌟", name: "Prima Lobby",  desc: "Entra nella tua prima lobby",
      check: s => (s.lobbiesVisited || []).length >= 1,
      progress: s => [Math.min((s.lobbiesVisited || []).length, 1), 1] },

    { icon: "🧭", name: "Esploratore",  desc: "Visita 10 materie diverse",
      check: s => (s.lobbiesVisited || []).length >= 10,
      progress: s => [(s.lobbiesVisited || []).length, 10] },

    { icon: "🔥", name: "Streak 7gg",   desc: "Studia 7 giorni di fila",
      check: s => (s.streak || 0) >= 7,
      progress: s => [s.streak || 0, 7] },

    { icon: "🧠", name: "10 Quiz",      desc: "Completa 10 quiz",
      check: s => (s.quizzesCompleted || 0) >= 10,
      progress: s => [s.quizzesCompleted || 0, 10] },

    { icon: "🍅", name: "20 Pomodori",  desc: "Completa 20 sessioni di studio",
      check: s => (s.pomodorosCompleted || 0) >= 20,
      progress: s => [s.pomodorosCompleted || 0, 20] },

    { icon: "💬", name: "Social",       desc: "Scrivi 10 messaggi in chat",
      check: s => (s.messagesSent || 0) >= 10,
      progress: s => [s.messagesSent || 0, 10] },

    { icon: "⚡", name: "Quiz Perfetto", desc: "Fai un quiz senza errori",
      check: s => (s.perfectQuizzes || 0) >= 1,
      progress: s => [Math.min(s.perfectQuizzes || 0, 1), 1] },

    { icon: "📚", name: "Studioso",     desc: "Accumula 10 ore di studio",
      check: s => (s.studyHours || 0) >= 10,
      progress: s => [Math.floor(s.studyHours || 0), 10] },

    { icon: "👥", name: "Squadra",      desc: "Entra in un gruppo di studio",
      check: s => (s.groupsJoined || 0) >= 1,
      progress: s => [Math.min(s.groupsJoined || 0, 1), 1] },

    { icon: "📋", name: "Mentore",      desc: "Racconta com'è 3 esami che hai dato",
      check: s => (s.reviewsWritten || 0) >= 3,
      progress: s => [Math.min(s.reviewsWritten || 0, 3), 3] },

    { icon: "🏆", name: "Top 10",       desc: "Entra nella top 10 del tuo ateneo",
      check: s => s.bestRank > 0 && s.bestRank <= 10,
      progress: s => [s.bestRank > 0 && s.bestRank <= 10 ? 1 : 0, 1] },
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
