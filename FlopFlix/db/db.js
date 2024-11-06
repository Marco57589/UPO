'use strict'

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const axios = require('axios');

require('dotenv').config();

//recupero delle chiavi dal .env
const dbPath = process.env.DB_PATH;
const omdbApiKey = process.env.OMDB_API_KEY;
const youtubeApiKey = process.env.YOUTUBE_API_KEY;

/*flag di avvio per attivare il caricamento mediante api, visto che argv é un array devo usare il map 
per svolgere il tolowercase (cosi accetta noApi scritto con qualunque "case") */
let useApi = process.argv.map(arg => arg.toLowerCase()).includes('api');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Errore durante la connessione al database:', err.message);
    } else {
        console.log('Connessione al database SQLite avvenuta con successo.');
    }
});

//messaggio di welcome dello script
async function welcome(){
    console.log("\n\n\n");
    console.log("██████╗ ██████╗         ██╗███████╗");
    console.log("██╔══██╗██╔══██╗        ██║██╔════╝");
    console.log("██║  ██║██████╔╝        ██║███████╗");
    console.log("██║  ██║██╔══██╗   ██   ██║╚════██║");
    console.log("██████╔╝██████╔╝██╗╚█████╔╝███████║");
    console.log("╚═════╝ ╚═════╝ ╚═╝ ╚════╝ ╚══════╝");
    console.log(`\n -> by marco57589 <-`);                                                            

    if(useApi){
        console.log("---> Attenzione, stai eseguendo lo script mediante API.... questo significa che la popolazione richiederà un pò di tempo.");
        console.log("-Se vuoi eseguire il caricamento 'local' esegui lo script senza il flag api (node db/db.js)");
        console.log("-Visto che le richieste sono limitate é sconsigliabile eseguire questo script più di 1 volta al giorno.");
    }else{
        console.log("---> Attenzione, stai eseguendo lo script mediante caricamento locale.");
        console.log("-Se vuoi eseguire il caricamento mediante le api esegui lo script con il flag api (node db/db.js api)");
    }
    console.log("-Nota bene: é possibile eseguire questo script mentre flopflix é in esecuzione-.\n");
}

//-------------------------------------------------------------------------------------------------------------------------
// Funzione di servizio

//funzione per applicare l'algoritmo aes256 a una mail
function encryptEmail(email) {
    const secretKey = process.env.SECRET_KEY;
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), Buffer.from(secretKey.slice(0, 16))); // Usa la chiave segreta
    let encrypted = cipher.update(email, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

//funzione per togliere i caratteri che potrebbero causare problemi con il database
function sanitizeString(input) { 
    if (typeof input !== 'string') {
        return '';
    }
    return input.replace(/"/g, '').replace(/'/g, "'");
}

//funzione per creare un delay
function delay(ms) { //https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
    return new Promise(resolve => setTimeout(resolve, ms));
}

//-------------------------------------------------------------------------------------------------------------------------
// Eliminazione tabelle

const dropFilm = `
    DROP TABLE IF EXISTS film;
`;

const dropUser = `
    DROP TABLE IF EXISTS user;
`;

const dropGuest = `
    DROP TABLE IF EXISTS guest;
`;

const dropLiked = `
    DROP TABLE IF EXISTS liked_video;
`;

const dropCategory = `
    DROP TABLE IF EXISTS categorie;
`;


//-------------------------------------------------------------------------------------------------------------------------
// Creazione  tabelle

const createCategory = `
    CREATE TABLE IF NOT EXISTS categorie (
        nome_categoria TEXT PRIMARY KEY CHECK (length(nome_categoria) >= 2 AND length(nome_categoria) <= 32)
    ); 
`;

const createFilm = `
    CREATE TABLE IF NOT EXISTS film(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titolo TEXT NOT NULL CHECK (length(titolo) >= 2 AND length(titolo) <= 64),
        anno_uscita INTEGER NOT NULL CHECK (anno_uscita >= 1890 AND anno_uscita <= 2024),
        durata INTEGER NOT NULL CHECK (durata >= 5 AND durata <= 600),
        regista TEXT NOT NULL CHECK (length(regista) >= 2 AND length(regista) <= 64),
        categoria TEXT NOT NULL,
        descrizione TEXT CHECK (length(descrizione) >= 2 AND length(descrizione) <= 2000),
        limeta INTEGER NOT NULL DEFAULT 0 CHECK (limeta = 0 OR limeta = 1),
        trailer TEXT,
        FOREIGN KEY (categoria) REFERENCES categorie(nome_categoria) ON DELETE CASCADE ON UPDATE CASCADE
    );
`;

const createUser = `
    CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        nome TEXT CHECK (length(nome) >= 2 AND length(nome) <= 32),
        cognome TEXT CHECK (length(cognome) >= 2 AND length(cognome) <= 32),
        ddn DATE,
        telefono INTEGER CHECK (length(telefono) >= 6 AND length(telefono) <= 16),
        ruolo TEXT DEFAULT 'user'
    ); 
`;//ddn: yyyy-mm-dd, 
//non inserisco i check in email e password perché una volta hashati o cifrati questi avranno una dimensione diversa

const createGuest = `
    CREATE TABLE IF NOT EXISTS guest (
        ip TEXT PRIMARY KEY,
        last_watched TEXT
    ); 
`;

const createLiked = `
    CREATE TABLE IF NOT EXISTS liked_video (
        id_utente INETGER,
        id_film INTEGER,
        FOREIGN KEY (id_utente) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (id_film) REFERENCES film(id) ON DELETE CASCADE ON UPDATE CASCADE
    );
`;

//-------------------------------------------------------------------------------------------------------------------------
// Popolazione tabelle

const populateCategories = `
    INSERT INTO categorie (nome_categoria) VALUES
        ("Titoli del momento"),
        ("Classici TV"),
        ("Serie TV"),
        ("Cartoni"),
        ("Anime"),
        ("Dramma"),
        ("Thriller"),
        ("Horror"),
        ("LGBT"),
        ("Marvel"),
        ("Sitcom"),
        ("Documentari"),
        ("Film di Fantascienza"),
        ("Film di Avventura"),
        ("Film per Famiglie");
`;

const populateFilmsWithoutApi = `
    INSERT INTO film (titolo, anno_uscita, durata, regista, categoria, descrizione, limeta, trailer) VALUES
        ("The Batman", 2022, 180, "Matt Reeves", "Titoli del momento", "Un nuovo adattamento cinematografico del mitico personaggio DC, Batman. Il film segue il vigilante di Gotham City mentre indaga su una serie di crimini, svelando oscure cospirazioni lungo il cammino.", 0, "https://www.youtube.com/watch?v=JKjSqs5czLA"),
        ("Mission: Impossible 7", 2023, 140, "Christopher McQuarrie", "Titoli del momento", "Ethan Hunt e il suo team si trovano di fronte a una delle missioni più pericolose e impegnative fino ad oggi. Tra intrighi internazionali e spettacolari acrobazie, dovranno salvare il mondo una volta di più.", 1, "https://www.youtube.com/watch?v=avz06PDqDbM"),
        ("Top Gun: Maverick", 2022, 131, "Joseph Kosinski", "Titoli del momento", "Il sequel del classico degli anni '80, Top Gun. Maverick deve affrontare i fantasmi del passato mentre addestra una nuova generazione di piloti.", 0, "https://www.youtube.com/watch?v=uSSQvzvuHYM"),
        ("No Time to Die", 2021, 163, "Cary Joji Fukunaga", "Titoli del momento", "L'ultimo film di James Bond interpretato da Daniel Craig. Bond deve affrontare un nuovo nemico con una tecnologia pericolosa.", 0, "https://www.youtube.com/watch?v=miA1pW6ooAQ"),
        ("The Flash", 2023, 140, "Andy Muschietti", "Titoli del momento", "Un film basato sul popolare supereroe DC Comics, Flash. Segui le avventure di Barry Allen mentre utilizza la sua velocità sovrumana per combattere il crimine e proteggere la giustizia.", 0, "https://www.youtube.com/watch?v=hebWYacbdvc"),
        ("Avatar: The Way of Water", 2024, 180, "James Cameron", "Titoli del momento", "Il sequel altamente atteso del film di successo Avatar. Esplora nuove terre e creature nel mondo di Pandora mentre i personaggi si impegnano in una nuova avventura epica.", 0, "https://www.youtube.com/watch?v=d9MyW72ELq0"),
        ("Jurassic World: Dominion", 2022, 146, "Colin Trevorrow", "Titoli del momento", "Il capitolo finale della trilogia di Jurassic World. I dinosauri ora vivono tra gli umani e la battaglia per la supremazia comincia.", 0, "https://www.youtube.com/watch?v=fb5ELWi-ekk"),

        ("Thor: Love and Thunder", 2022, 145, "Taika Waititi", "Marvel", "Il quarto film della serie di Thor. Il Dio del Tuono deve affrontare nuove minacce e allearsi con vecchi e nuovi amici, incluso la misteriosa Mighty Thor, mentre difende l'universo da pericoli cosmici.", 0, "https://www.youtube.com/watch?v=5mKjfZHDn_M"),
        ("Doctor Strange in the Multiverse of Madness", 2022, 135, "Sam Raimi", "Marvel", "Il sequel del popolare film Marvel, Doctor Strange. Il mago Stephen Strange affronta minacce sovrannaturali provenienti da dimensioni parallele, mettendo alla prova le sue abilità e il suo coraggio.", 0, "https://www.youtube.com/watch?v=aWzlQ2N6qqg"),
        ("Black Panther: Wakanda Forever", 2022, 150, "Ryan Coogler", "Marvel", "Il seguito del successo di Black Panther. Dopo gli eventi del primo film, il regno di Wakanda affronta nuove sfide e minacce mentre cerca di preservare la sua cultura e la sua tecnologia avanzata.", 0, "https://www.youtube.com/watch?v=_Z3QKkl1WyM"),
        ("Iron Man", 2008, 126, "Jon Favreau", "Marvel", "Il film che ha dato il via al Marvel Cinematic Universe, Iron Man segue Tony Stark, un miliardario e inventore, mentre costruisce un'armatura tecnologica per diventare il supereroe Iron Man. Con una performance iconica di Robert Downey Jr., Iron Man ha stabilito le basi per un universo cinematografico epico.", 0, "https://www.youtube.com/watch?v=8ugaeA-nMTc"),
        ("The Avengers", 2012, 143, "Joss Whedon", "Marvel", "Un team-up epico che vede Iron Man, Captain America, Thor, Hulk, Black Widow e Hawkeye unirsi per affrontare il malvagio Loki e il suo esercito alieno. Con azione spettacolare e un'interazione divertente tra i personaggi, The Avengers ha ridefinito il concetto di film di supereroi.", 0, "https://www.youtube.com/watch?v=eOrNdBpGMv8"),
        ("Guardians of the Galaxy", 2014, 121, "James Gunn", "Marvel", "Un gruppo eterogeneo di criminali e fuorilegge si unisce per proteggere l'universo da una minaccia cosmica. Con una colonna sonora memorabile e un umorismo eccentrico, Guardians of the Galaxy ha portato una ventata di freschezza nel Marvel Cinematic Universe.", 0, "https://www.youtube.com/watch?v=d96cjJhvlMA"),
        ("Captain America: The Winter Soldier", 2014, 136, "Anthony Russo, Joe Russo", "Marvel", "Captain America si scontra con un misterioso assassino noto come il Soldato d'Inverno mentre scopre una cospirazione all'interno dello S.H.I.E.L.D. Con sequenze d'azione avvincenti e un'intensa trama di spionaggio, The Winter Soldier è considerato uno dei migliori film del MCU.", 0, "https://www.youtube.com/watch?v=7SlILk2WMTI"),
        ("Avengers: Infinity War", 2018, 149, "Anthony Russo, Joe Russo", "Marvel", "Gli Avengers si uniscono ai loro alleati per affrontare il tiranno spaziale Thanos, che cerca di raccogliere le sei gemme dell'infinito per distruggere metà dell'universo. Con una vasta gamma di personaggi e una storia epica, Infinity War è stato un evento cinematografico senza precedenti.", 1, "https://www.youtube.com/watch?v=6ZfuNTqbHE8"),
        ("Avengers: Endgame", 2019, 181, "Anthony Russo, Joe Russo", "Marvel", "Gli Avengers rimasti si riuniscono per un'ultima missione per invertire le azioni di Thanos e ripristinare l'universo. Con una conclusione epica e un tributo ai personaggi amati, Endgame ha chiuso in modo spettacolare la saga degli Avengers.", 1, "https://www.youtube.com/watch?v=TcMBFSGVi1c"),
        ("Spider-Man: Far From Home", 2019, 129, "Jon Watts", "Marvel", "Dopo gli eventi di Endgame, Peter Parker affronta nuove sfide mentre si impegna in una vacanza scolastica in Europa. Con un mix di azione, commedia e dramma adolescenziale, Far From Home continua a esplorare il viaggio di crescita di Spider-Man.", 0, "https://www.youtube.com/watch?v=Nt9L1jCKGnE"),

        ("Friends", 1994, 25, "David Crane, Marta Kauffman", "Sitcom", "Una sitcom che segue un gruppo di amici a New York mentre navigano attraverso la vita, l'amore e il lavoro. Con umorismo brillante e relazioni affettuose, Friends è diventato un'icona della cultura pop.", 0, "https://www.youtube.com/watch?v=s2TyVQGoCYo"),
        ("How I Met Your Mother", 2005, 22, "Pamela Fryman", "Sitcom", "Una sitcom che segue le avventure romantiche e comiche di Ted Mosby e dei suoi amici mentre navigano nella vita a New York City. Con un formato narrativo unico e personaggi memorabili, How I Met Your Mother è diventata una serie amata dal pubblico.", 0, "https://www.youtube.com/watch?v=cjJLEYMzpjc"),
        ("The Good Doctor", 2017, 42, "David Shore", "Sitcom", "Un giovane chirurgo con autismo e la sindrome del savant viene reclutato nel reparto di chirurgia di un prestigioso ospedale. La serie segue le sue sfide personali e professionali mentre dimostra le sue incredibili abilità mediche.", 0, "https://www.youtube.com/watch?v=XD6Vp0mhkNs"),
        ("The Office", 2005, 30, "Greg Daniels", "Sitcom", "Una commedia mockumentary che segue la vita quotidiana degli impiegati di un ufficio. Con situazioni comiche e personaggi eccentrici, The Office ha conquistato il cuore del pubblico per la sua comicità surreale.", 0, "https://www.youtube.com/watch?v=LHOtME2DL4g"),
        ("Brooklyn Nine-Nine", 2013, 22, "Michael Schur, Dan Goor", "Sitcom", "Una sitcom che segue le disavventure di un gruppo di detective del 99º distretto di polizia di Brooklyn. Con umorismo rapido e situazioni esilaranti, Brooklyn Nine-Nine è diventata una serie amata dai fan.", 0, "https://www.youtube.com/watch?v=faJAT35j5Ss"),
        ("The Big Bang Theory", 2007, 22, "Chuck Lorre, Bill Prady", "Sitcom", "Una sitcom che segue le vite di un gruppo di scienziati nerd e delle loro relazioni sociali, in particolare con una vicina di casa aspirante attrice. Con situazioni comiche e riferimenti alla cultura pop, The Big Bang Theory è diventata una delle serie TV più popolari degli ultimi anni.", 0, "https://www.youtube.com/watch?v=rCj-Fb1OmXg"),

        ("The X-Files", 1993, 45, "Chris Carter", "Classici TV", "Una serie che segue due agenti dell'FBI mentre indagano su casi di fenomeni inspiegabili. Con misteri avvincenti e teorie del complotto, The X-Files ha catturato l'immaginazione degli spettatori in tutto il mondo.", 0, "https://www.youtube.com/watch?v=Ll311lBypMo"),
        ("Lost", 2004, 50, "J.J. Abrams, Damon Lindelof", "Classici TV", "Una serie che segue un gruppo di sopravvissuti a un incidente aereo su un'isola misteriosa. Con suspense, misteri e colpi di scena, Lost ha tenuto gli spettatori incollati allo schermo durante tutte le sue stagioni.", 1, "https://www.youtube.com/watch?v=Yquvquw-li4"),
        ("Buffy the Vampire Slayer", 1997, 45, "Joss Whedon", "Classici TV", "Una serie che segue le avventure di Buffy Summers, una giovane cacciatrice di vampiri, demoni e forze oscure. Con un mix di azione, dramma e umorismo, Buffy è diventata un cult degli anni '90.", 1, "https://www.youtube.com/watch?v=-1v_q6TWAL4"),
        ("The Sopranos", 1999, 55, "David Chase", "Classici TV", "Un dramma criminale che segue la vita del boss della mafia Tony Soprano mentre cerca di bilanciare la sua famiglia e la sua attività criminale. Con una trama complessa e personaggi ben sviluppati, The Sopranos è considerata una delle migliori serie TV di tutti i tempi.", 1, "https://www.youtube.com/watch?v=KMx4iFcozK0"),
        ("The Andy Griffith Show", 1960, 25, "Sheldon Leonard", "Classici TV", "Una sitcom che segue le vite degli abitanti di Mayberry, una piccola città immaginaria in Carolina del Nord. Con un tono caldo e umorismo gentile, The Andy Griffith Show è diventato un'icona della televisione americana.", 0, "https://www.youtube.com/watch?v=TvSXdO7SDCE"),
        ("The Twilight Zone", 1959, 25, "Rod Serling", "Classici TV", "Una serie antologica di fantascienza e horror che presenta storie autonome e straordinarie su temi come il destino, l'identità e la morale. Con scritture intelligenti e colpi di scena sorprendenti, The Twilight Zone ha avuto un impatto duraturo sulla televisione.", 0, "https://www.youtube.com/watch?v=NzlG28B-R8Y"),
        ("The Mary Tyler Moore Show", 1970, 24, "James L. Brooks, Allan Burns", "Classici TV", "Una sitcom che segue le avventure di una donna single di successo mentre naviga nella sua carriera e nelle relazioni personali a Minneapolis. Con umorismo intelligente e temi progressisti, The Mary Tyler Moore Show ha infranto barriere di genere e creato un'eredità duratura.", 0, "https://www.youtube.com/watch?v=3hlHoixi0vY"),

        ("Stranger Things", 2016, 50, "The Duffer Brothers", "Serie TV", "Una serie ambientata negli anni '80 che segue un gruppo di ragazzi mentre affrontano fenomeni soprannaturali nella loro piccola città. Con omaggi alla cultura degli anni '80 e una trama avvincente, Stranger Things ha conquistato un vasto pubblico di fan.", 0, "https://www.youtube.com/watch?v=b9EkMc79ZSU"),
        ("Game of Thrones", 2011, 60, "David Benioff, D.B. Weiss", "Serie TV", "Una serie epica che segue le lotte per il potere tra nobili famiglie in un mondo fantasy. Con intrighi politici, battaglie epiche e personaggi indimenticabili, Il Trono di Spade ha catturato l'immaginazione di milioni di spettatori in tutto il mondo.", 0, "https://www.youtube.com/watch?v=KPLWWIOCOOQ"),
        ("House of Cards", 2013, 60, "Beau Willimon", "Serie TV", "Un dramma politico che segue le ambizioni di un politico spietato e la sua ascesa al potere a Washington D.C. Con intrighi politici e colpi di scena, House of Cards ha guadagnato elogi dalla critica per la sua trama avvincente e le interpretazioni straordinarie.", 1, "https://www.youtube.com/watch?v=8QnMmpfKWvo"),
        ("Breaking Bad", 2008, 50, "Vince Gilligan", "Serie TV", "Un dramma che segue la trasformazione di un insegnante di chimica in un signore della droga. Con una trama avvincente e interpretazioni straordinarie, Breaking Bad è diventato un'icona della televisione moderna.", 1, "https://www.youtube.com/watch?v=HhesaQXLuRY"),
        ("La Casa di Carta", 2017, 50, "Álex Pina", "Serie TV", "Un misterioso uomo conosciuto come Il Professore recluta una banda di otto criminali per una massiccia rapina alla Zecca di Stato Spagnola. La serie segue il complesso piano della banda e le dinamiche tra i membri durante il colpo.", 0, "https://www.youtube.com/watch?v=ebPRR4CVNLU"),
        ("The Mandalorian", 2019, 40, "Jon Favreau", "Serie TV", "Una serie ambientata nell'universo di Star Wars che segue le avventure di un cacciatore di taglie solitario. Con effetti speciali spettacolari e un'atmosfera western, The Mandalorian ha conquistato sia i fan di Star Wars che i nuovi spettatori.", 0, "https://www.youtube.com/watch?v=aRJnJwIyvX0"),
        ("The Crown", 2016, 60, "Peter Morgan", "Serie TV", "Un dramma storico che narra la vita della regina Elisabetta II e la storia della monarchia britannica. Con una sceneggiatura accurata e interpretazioni straordinarie, The Crown offre uno sguardo avvincente dietro le quinte del potere e della politica.", 0, "https://www.youtube.com/watch?v=JWtnJjn6ng0"),
        ("Westworld", 2016, 60, "Jonathan Nolan, Lisa Joy", "Serie TV", "Una serie che esplora un parco a tema futuristico dove i visitatori possono vivere le loro fantasie attraverso robot estremamente realistici. Con una trama intricata e temi filosofici profondi, Westworld offre una riflessione sull'umanità e la tecnologia.", 0, "https://www.youtube.com/watch?v=IuS5huqOND4"),
        ("Better Call Saul", 2015, 45, "Vince Gilligan, Peter Gould", "Serie TV", "Un prequel di Breaking Bad che segue la trasformazione dell'avvocato Jimmy McGill nel losco Saul Goodman. Con una narrazione avvincente e una caratterizzazione complessa, Better Call Saul si distingue come una delle serie più acclamate della TV moderna.", 1, "https://www.youtube.com/watch?v=HN4oydykJFc"),

        ("Avatar", 2009, 162, "James Cameron", "Film di Fantascienza", "Un'epica avventura fantascientifica ambientata su Pandora, un pianeta abitato da una specie indigena chiamata Na'vi. Con effetti speciali rivoluzionari e una trama avvincente, Avatar ha stabilito nuovi standard per il genere.", 0, "https://www.youtube.com/watch?v=5PSNL1qE6VY"),
        ("Interstellar", 2014, 169, "Christopher Nolan", "Film di Fantascienza", "Un dramma fantascientifico che segue un gruppo di astronauti in una missione per trovare un nuovo pianeta abitabile per l'umanità. Con una trama complessa e effetti visivi spettacolari, Interstellar esplora temi di amore, sacrificio e sopravvivenza.", 1, "https://www.youtube.com/watch?v=zSWdZVtXT7E"),
        ("Blade Runner 2049", 2017, 164, "Denis Villeneuve", "Film di Fantascienza", "Il seguito del classico Blade Runner, ambientato in un futuro distopico. Il film esplora temi di identità e umanità attraverso la storia di un cacciatore di replicanti che scopre un segreto sconvolgente.", 0, "https://www.youtube.com/watch?v=gCcx85zbxz4"),
        ("The Matrix", 1999, 136, "The Wachowskis", "Film di Fantascienza", "Un thriller d'azione cyberpunk che segue Neo, un hacker che scopre la verità dietro la realtà simulata in cui vive. Con innovativi effetti speciali e una trama filosofica, The Matrix ha ridefinito il genere fantascientifico.", 0, "https://www.youtube.com/watch?v=m8e-FF8MsqU"),
        ("Inception", 2010, 148, "Christopher Nolan", "Film di Fantascienza", "Un thriller fantascientifico che segue un ladro esperto nel rubare segreti dai sogni delle persone. Con una trama intricata e spettacolari effetti visivi, Inception esplora i confini tra sogno e realtà.", 0, "https://www.youtube.com/watch?v=8hP9D6kZseM"),
        ("2001: A Space Odyssey", 1968, 149, "Stanley Kubrick", "Film di Fantascienza", "Un'epopea fantascientifica che esplora l'evoluzione dell'umanità attraverso un viaggio nello spazio. Con immagini iconiche e una colonna sonora memorabile, 2001 è considerato uno dei più grandi film mai realizzati.", 0, "https://www.youtube.com/watch?v=oR_e9y-bka0"),
        ("Star Wars: Episode IV - A New Hope", 1977, 121, "George Lucas", "Film di Fantascienza", "Il primo capitolo della leggendaria saga di Star Wars. Segue le avventure di Luke Skywalker mentre si unisce alla Ribellione per combattere l'Impero Galattico e salvare la Principessa Leia.", 0, "https://www.youtube.com/watch?v=vZ734NWnAHA"),
        ("Back to the Future", 1985, 116, "Robert Zemeckis", "Film di Fantascienza", "Una commedia avventurosa che segue un adolescente che viaggia indietro nel tempo con una macchina del tempo costruita dal suo eccentrico amico scienziato. Con umorismo e azione, Back to the Future è diventato un classico di culto.", 0, "https://www.youtube.com/watch?v=qvsgGtivCgs"),

        ("The Lord of the Rings: The Fellowship of the Ring", 2001, 178, "Peter Jackson", "Film di Avventura", "Il primo film della trilogia de Il Signore degli Anelli, segue Frodo Baggins e la Compagnia dell'Anello mentre iniziano il loro viaggio epico per distruggere l'Anello del Potere.", 0, "https://www.youtube.com/watch?v=aStYWD25fAQ"),
        ("Pirates of the Caribbean: The Curse of the Black Pearl", 2003, 143, "Gore Verbinski", "Film di Avventura", "Un'avventura di pirati che segue le peripezie del capitano Jack Sparrow e del fabbro Will Turner mentre cercano di salvare la figlia del governatore e recuperare una nave maledetta.", 1, "https://www.youtube.com/watch?v=naQr0uTrH_s"),
        ("Indiana Jones and the Raiders of the Lost Ark", 1981, 115, "Steven Spielberg", "Film di Avventura", "Il primo film della serie Indiana Jones, segue l'archeologo avventuriero mentre cerca di recuperare l'Arca dell'Alleanza prima che cada nelle mani dei nazisti.", 0, "https://www.youtube.com/watch?v=Rh_BJXG1-44"),
        ("Jurassic Park", 1993, 127, "Steven Spielberg", "Film di Avventura", "Un'avventura sci-fi che segue un gruppo di persone mentre visitano un parco a tema con dinosauri clonati. Quando i dinosauri sfuggono al controllo, l'avventura diventa una lotta per la sopravvivenza.", 0, "https://www.youtube.com/watch?v=lc0UehYemQA"),
        ("Guardians of the Galaxy", 2014, 121, "James Gunn", "Film di Avventura", "Una banda di outsider galattici deve unire le forze per fermare un potente nemico che minaccia l'universo. Con umorismo, azione e un'incredibile colonna sonora, i Guardiani della Galassia hanno conquistato il pubblico.", 0, "https://www.youtube.com/watch?v=d96cjJhvlMA"),
        ("Harry Potter and the Philosophers Stone", 2001, 152, "Chris Columbus", "Film di Avventura", "Il primo film della serie di Harry Potter, segue un giovane mago mentre scopre la sua eredità magica e inizia la sua formazione a Hogwarts, la scuola di magia e stregoneria.", 0, "https://www.youtube.com/watch?v=VyHV0BRtdxo"),
        ("The Hunger Games", 2012, 142, "Gary Ross", "Film di Avventura", "In un futuro distopico, una giovane ragazza, Katniss Everdeen, si offre volontaria per prendere il posto di sua sorella nei letali Hunger Games, una competizione televisiva in cui solo uno può sopravvivere.", 0, "https://www.youtube.com/watch?v=mfmrPu43DF8"),

        ("The Lion King", 1994, 88, "Roger Allers, Rob Minkoff", "Film per Famiglie", "Un classico animato che segue la vita di un giovane leone, Simba, mentre cresce e si prepara a diventare il re delle Terre del Branco. Con musiche indimenticabili e una storia emozionante, Il Re Leone ha incantato generazioni di spettatori.", 0, "https://www.youtube.com/watch?v=lFzVJEksoDY"),
        ("Finding Nemo", 2003, 100, "Andrew Stanton, Lee Unkrich", "Film per Famiglie", "Un'avventura animata che segue un pesce pagliaccio di nome Marlin mentre cerca il suo figlio perduto, Nemo. Con personaggi adorabili e una storia toccante, Alla ricerca di Nemo è diventato un classico della Pixar.", 0, "https://www.youtube.com/watch?v=wZdpNglLbt8"),
        ("Toy Story", 1995, 81, "John Lasseter", "Film per Famiglie", "Il primo lungometraggio animato interamente in CGI, segue le avventure di Woody, Buzz Lightyear e altri giocattoli che prendono vita quando gli umani non sono presenti. Toy Story ha segnato l'inizio di una nuova era per l'animazione.", 0, "https://www.youtube.com/watch?v=0qh-Y9UFj5E"),
        ("Frozen", 2013, 102, "Chris Buck, Jennifer Lee", "Film per Famiglie", "Un musical animato che racconta la storia di due sorelle, Anna e Elsa, in un regno ghiacciato. Con canzoni indimenticabili e un messaggio di amore fraterno, Frozen è diventato un fenomeno culturale.", 0, "https://www.youtube.com/watch?v=TbQm5doF_Uc"),
        ("The Incredibles", 2004, 115, "Brad Bird", "Film per Famiglie", "Una famiglia di supereroi cerca di vivere una vita normale mentre affronta una nuova minaccia. Con azione, umorismo e un tocco di dramma familiare, Gli Incredibili è uno dei film più amati della Pixar.", 0, "https://www.youtube.com/watch?v=ixKqYNMqcnE"),
        ("Shrek", 2001, 90, "Andrew Adamson, Vicky Jenson", "Film per Famiglie", "Un'irriverente commedia animata che segue un orco di nome Shrek mentre cerca di salvare una principessa con l'aiuto di un asino loquace. Shrek ha ribaltato i cliché delle fiabe e ha affascinato il pubblico di tutte le età.", 0, "https://www.youtube.com/watch?v=W37DlG1i61s"),
        ("Coco", 2017, 105, "Lee Unkrich, Adrian Molina", "Film per Famiglie", "Un'avventura animata che celebra la cultura messicana attraverso la storia di un giovane ragazzo, Miguel, che intraprende un viaggio nella Terra dei Morti per scoprire i segreti della sua famiglia. Coco è stato lodato per la sua rappresentazione autentica e il suo impatto emotivo.", 0, "https://www.youtube.com/watch?v=Rvr68u6k5sI"),

        ("The Godfather", 1972, 175, "Francis Ford Coppola", "Dramma", "Un capolavoro del cinema che segue la famiglia mafiosa Corleone e il loro impero criminale. Con interpretazioni indimenticabili e una narrazione avvincente, Il Padrino è considerato uno dei più grandi film di tutti i tempi.", 1, "https://www.youtube.com/watch?v=sY1S34973zA"),
        ("Forrest Gump", 1994, 142, "Robert Zemeckis", "Dramma", "Un dramma commovente che segue la vita di Forrest Gump, un uomo con un quoziente intellettivo basso ma con un cuore grande, mentre attraversa momenti storici chiave dell'America. Con un'interpretazione iconica di Tom Hanks, Forrest Gump ha lasciato un'impronta duratura nella cultura popolare.", 0, "https://www.youtube.com/watch?v=bLvqoHBptjg"),
        ("Schindlers List", 1993, 195, "Steven Spielberg", "Dramma", "Un dramma storico che racconta la vera storia di Oskar Schindler, un industriale tedesco che salvò la vita di più di mille ebrei durante l'Olocausto. Con una regia potente e una narrazione emotivamente intensa, Schindler's List è un film di grande impatto.", 0, "https://www.youtube.com/watch?v=gG22XNhtnoY"),
        ("Pulp Fiction", 1994, 154, "Quentin Tarantino", "Dramma", "Un film di culto che intreccia diverse storie di criminalità a Los Angeles. Con dialoghi brillanti, personaggi indimenticabili e una narrazione non lineare, Pulp Fiction ha ridefinito il cinema indipendente degli anni '90.", 0, "https://www.youtube.com/watch?v=s7EdQ4FqbhY"),
        ("The Shawshank Redemption", 1994, 142, "Frank Darabont", "Dramma", "Un dramma potente che segue l'amicizia tra due prigionieri nel penitenziario di Shawshank. Con una narrazione toccante e interpretazioni straordinarie, Le ali della libertà è spesso considerato uno dei migliori film mai realizzati.", 0, "https://www.youtube.com/watch?v=6hB3S9bIaco"),
        ("Goodfellas", 1990, 145, "Martin Scorsese", "Dramma", "Un crudo ritratto della vita nella mafia, basato sulla storia vera di Henry Hill e la sua ascesa e caduta nel mondo del crimine organizzato. Con una regia magistrale e interpretazioni memorabili, Quei bravi ragazzi è un pilastro del cinema di gangster.", 0, "https://www.youtube.com/watch?v=qo5jJpHtI1Y"),
        ("The Green Mile", 1999, 189, "Frank Darabont", "Dramma", "Un dramma toccante ambientato nel braccio della morte di una prigione del Sud degli Stati Uniti. Con un cast stellare e una trama profondamente emotiva, Il miglio verde esplora temi di giustizia, redenzione e miracoli.", 0, "https://www.youtube.com/watch?v=Ki4haFrqSrw"),
        ("Fight Club", 1999, 139, "David Fincher", "Dramma", "Un thriller psicologico che segue un uomo insoddisfatto dalla sua vita ordinaria mentre forma un club di combattimento sotterraneo con un carismatico sconosciuto. Con colpi di scena sorprendenti e una critica incisiva alla società moderna, Fight Club è diventato un cult.", 1, "https://www.youtube.com/watch?v=qtRKdVHc-cE"),
        ("One Flew Over the Cuckoos Nest", 1975, 133, "Milos Forman", "Dramma", "Un dramma potente che segue un uomo che si finge pazzo per sfuggire alla prigione e si ritrova in un istituto psichiatrico. Con una performance iconica di Jack Nicholson, Qualcuno volò sul nido del cuculo esplora temi di ribellione e libertà.", 1, "https://www.youtube.com/watch?v=OXrcDonY-B8"),
        ("The Pursuit of Happyness", 2006, 117, "Gabriele Muccino", "Dramma", "Un'ispirante storia vera che segue Chris Gardner, un uomo senza tetto che lotta per costruire una vita migliore per sé e suo figlio. Con una straordinaria interpretazione di Will Smith, La ricerca della felicità è un potente racconto di perseveranza e speranza.", 0, "https://www.youtube.com/watch?v=DMOBlEcRuw8"),
        ("The Social Network", 2010, 120, "David Fincher", "Dramma", "Un dramma avvincente che racconta la nascita di Facebook e le controversie legali e personali che ne seguirono. Con una sceneggiatura brillante di Aaron Sorkin e una regia incisiva, The Social Network offre uno sguardo affascinante sul mondo della tecnologia moderna.", 1, "https://www.youtube.com/watch?v=lB95KLmpLR4"),
        ("Parasite", 2019, 132, "Bong Joon-ho", "Dramma", "Un thriller oscuro che esplora le disuguaglianze sociali attraverso la storia di una famiglia povera che si infiltra nella vita di una famiglia ricca. Con una narrazione avvincente e una regia magistrale, Parasite ha ottenuto riconoscimenti internazionali e il Premio Oscar come Miglior Film.", 0, "https://www.youtube.com/watch?v=isOGD_7hNIY"),
        
        ("The Silence of the Lambs", 1991, 118, "Jonathan Demme", "Thriller", "Un thriller psicologico che segue una giovane agente dell'FBI mentre cerca l'aiuto di un brillante ma pericoloso psichiatra per catturare un serial killer. Con interpretazioni iconiche di Jodie Foster e Anthony Hopkins, Il silenzio degli innocenti è diventato un classico del genere.", 1, "https://www.youtube.com/watch?v=W6Mm8Sbe__o"),
        ("Seven", 1995, 127, "David Fincher", "Thriller", "Un thriller oscuro che segue due detective nella caccia a un serial killer che utilizza i sette peccati capitali come modus operandi. Con una trama intensa e un finale scioccante, Seven è considerato uno dei migliori film del genere.", 0, "https://www.youtube.com/watch?v=znmZoVkCjpI"),
        ("Inglourious Basterds", 2009, 153, "Quentin Tarantino", "Thriller", "Un'avventura alternativa ambientata durante la Seconda Guerra Mondiale, che segue un gruppo di soldati ebrei americani conosciuti come i Bastardi mentre cospirano per uccidere i leader nazisti. Con dialoghi brillanti e una narrazione avvincente, Bastardi senza gloria è un film distintivo di Tarantino.", 0, "https://www.youtube.com/watch?v=KnrRy6kSFF0"),
        ("Gone Girl", 2014, 149, "David Fincher", "Thriller", "Un thriller psicologico che esplora la misteriosa scomparsa di una donna e i segreti che emergono durante le indagini. Con una trama intricata e performance avvincenti, Gone Girl ha ricevuto ampi consensi dalla critica.", 0, "https://www.youtube.com/watch?v=2-_-1nJf8Vg"),
        ("Zodiac", 2007, 157, "David Fincher", "Thriller", "Basato su eventi reali, Zodiac segue la caccia al famigerato serial killer Zodiac che terrorizzò la Bay Area negli anni '60 e '70. Con una trama intricata e una tensione crescente, è uno dei migliori film di David Fincher.", 1, "https://www.youtube.com/watch?v=f9cDKbmCD0o"),
        ("Prisoners", 2013, 153, "Denis Villeneuve", "Thriller", "Un thriller drammatico che segue la storia di un padre disperato alla ricerca della sua figlia scomparsa. Con una performance potente di Hugh Jackman e un'atmosfera intensa, Prisoners è un film avvincente e inquietante.", 1, "https://www.youtube.com/watch?v=bpXfcTF6iVk"),
        ("Shutter Island", 2010, 138, "Martin Scorsese", "Thriller", "Un thriller psicologico ambientato in un manicomio criminale su un'isola remota. Un detective indaga sulla scomparsa di una paziente, solo per scoprire segreti inquietanti. Con Leonardo DiCaprio, Shutter Island è un film pieno di suspense e colpi di scena.", 1, "https://www.youtube.com/watch?v=5iaYLCiq5RM"),
        ("Black Swan", 2010, 108, "Darren Aronofsky", "Thriller", "Un thriller psicologico che segue una ballerina mentre lotta con la pressione del ruolo principale in Il Lago dei Cigni. Con una performance magistrale di Natalie Portman, Black Swan esplora i temi della perfezione e della follia.", 1, "https://www.youtube.com/watch?v=5jaI1XOB-bs"),
        ("The Girl with the Dragon Tattoo", 2011, 158, "David Fincher", "Thriller", "Un thriller basato sul romanzo di Stieg Larsson, segue un giornalista e una hacker mentre indagano su una scomparsa avvenuta quarant'anni prima. Con una trama avvincente e una forte performance di Rooney Mara, è un film indimenticabile.", 1, "https://www.youtube.com/watch?v=DqQe3OrsMKI"),
        ("The Sixth Sense", 1999, 107, "M. Night Shyamalan", "Thriller", "Un thriller soprannaturale che segue un bambino che può vedere i morti e il suo terapeuta che cerca di aiutarlo. Con una trama avvincente e un finale sorprendente, The Sixth Sense è un classico del genere.", 1, "https://www.youtube.com/watch?v=VG9AGf66tXM"),
        ("Oldboy", 2003, 120, "Park Chan-wook", "Thriller", "Un thriller sudcoreano che segue la storia di un uomo imprigionato per quindici anni senza spiegazione, e la sua vendetta contro i suoi carcerieri. Con una trama complessa e violenza stilizzata, Oldboy è un film potente e indimenticabile.", 1, "https://www.youtube.com/watch?v=2HkjrJ6IK5E"),
    
        ("The Shining", 1980, 146, "Stanley Kubrick", "Horror", "Un horror psicologico basato sul romanzo di Stephen King, segue una famiglia in un hotel isolato dove il padre, colpito dalla follia, diventa una minaccia per moglie e figlio. Con immagini inquietanti e una performance iconica di Jack Nicholson, Shining è un pilastro del genere.", 0, "https://www.youtube.com/watch?v=5Cb3ik6zP2I"),
        ("Get Out", 2017, 104, "Jordan Peele", "Horror", "Un horror sociale che segue un giovane afroamericano durante una visita alla famiglia della sua fidanzata bianca, dove scopre un inquietante segreto. Con una critica acuta alle dinamiche razziali, Get Out è diventato un fenomeno culturale e ha vinto l'Oscar per la Miglior Sceneggiatura Originale.", 1, "https://www.youtube.com/watch?v=DzfpyUB60YY"),
        ("It", 2017, 135, "Andy Muschietti", "Horror", "Un adattamento del romanzo di Stephen King che segue un gruppo di bambini mentre affrontano le loro paure incarnate in un demoniaco clown di nome Pennywise. Con una combinazione di terrore e amicizia, It è diventato un successo di critica e pubblico.", 0, "https://www.youtube.com/watch?v=xKJmEC5ieOk"),
        ("A Quiet Place", 2018, 90, "John Krasinski", "Horror", "Un thriller horror che segue una famiglia mentre cerca di sopravvivere in un mondo invaso da creature che cacciano a causa del minimo suono. Con una trama avvincente e momenti di tensione intensa, A Quiet Place è stato lodato per la sua originalità.", 0, "https://www.youtube.com/watch?v=WR7cc5t7tv8"),
        ("The Conjuring", 2013, 112, "James Wan", "Horror", "Un horror soprannaturale basato su eventi reali, segue una coppia di investigatori del paranormale mentre aiutano una famiglia terrorizzata da una presenza oscura nella loro casa. Con una regia abile e un'atmosfera inquietante, The Conjuring ha ridefinito il genere moderno dell'horror.", 0, "https://www.youtube.com/watch?v=k10ETZ41q5o"),
        ("Hereditary", 2018, 127, "Ari Aster", "Horror", "Un horror psicologico che esplora il trauma familiare e il destino attraverso la storia di una famiglia perseguitata da eventi misteriosi dopo la morte della matriarca. Con una regia tesa e performance potenti, Hereditary è stato acclamato per la sua profondità emotiva e terrore.", 1, "https://www.youtube.com/watch?v=V6wWKNij_1M"),
        ("The Exorcist", 1973, 122, "William Friedkin", "Horror", "Un horror classico che racconta la storia di una giovane ragazza posseduta da un demone e degli esorcismi che seguono. Con immagini iconiche e una narrazione intensa, L'esorcista è considerato uno dei film più spaventosi di tutti i tempi.", 0, "https://www.youtube.com/watch?v=YDGw1MTEe9k"),

        ("13th", 2016, 100, "Ava DuVernay", "Documentari", "Un documentario che esamina il sistema carcerario degli Stati Uniti e la sua storia di razzismo sistemico. Con analisi avvincenti e interviste rivelatrici, 13th getta luce su questioni cruciali di giustizia e uguaglianza razziale.", 1, "https://www.youtube.com/watch?v=f6GDcBf_IjY"),
        ("Fahrenheit 9/11", 2004, 122, "Michael Moore", "Documentari", "Un documentario politico che esplora le conseguenze degli attacchi dell'11 settembre e le decisioni politiche degli Stati Uniti che ne sono seguite. Con un approccio provocatorio e polemico, Fahrenheit 9/11 ha suscitato dibattiti su questioni di politica e società.", 1, "https://www.youtube.com/watch?v=cebnlqi9RGQ"),
        ("March of the Penguins", 2005, 85, "Luc Jacquet", "Documentari", "Un documentario che segue la vita e le sfide degli eleganti pinguini imperatore nell'Antartide. Con immagini mozzafiato e una narrazione avvincente, La marcia dei pinguini ha incantato il pubblico di tutto il mondo.", 0, "https://www.youtube.com/watch?v=8g6bUe5MDRo"),
        ("Inside Job", 2010, 109, "Charles Ferguson", "Documentari", "Un documentario che esplora le cause della crisi finanziaria globale del 2008. Con analisi approfondite e interviste con esperti, Inside Job mette in luce la corruzione e l'avidità che hanno portato al crollo dell'economia mondiale.", 1, "https://www.youtube.com/watch?v=FzrBurlJUNk"),
        ("Planet Earth", 2006, 550, "Alastair Fothergill", "Documentari", "Una serie documentaristica epica che esplora le meraviglie naturali del nostro pianeta, con riprese mozzafiato e narrazione coinvolgente. Planet Earth ha ridefinito il genere documentario con la sua qualità visiva e le sue storie avvincenti.", 0, "https://www.youtube.com/watch?v=c8aFcHFu8QM"),
        ("The Cove", 2009, 92, "Louie Psihoyos", "Documentari", "Un documentario che denuncia la caccia ai delfini a Taiji, in Giappone, e le sue implicazioni ecologiche e morali. The Cove ha avuto un impatto significativo sull'opinione pubblica e ha vinto l'Oscar come miglior documentario.", 1, "https://www.youtube.com/watch?v=iMy0ely7poo"),
        ("An Inconvenient Truth", 2006, 96, "Davis Guggenheim", "Documentari", "Un documentario che segue Al Gore mentre presenta una conferenza sui cambiamenti climatici e l'urgenza di affrontare la crisi ambientale. An Inconvenient Truth ha contribuito a sensibilizzare il pubblico globale sul riscaldamento globale.", 1, "https://www.youtube.com/watch?v=CH-qO9RRchc"),
        ("Jiro Dreams of Sushi", 2011, 81, "David Gelb", "Documentari", "Un documentario che racconta la vita e il lavoro di Jiro Ono, uno dei più grandi chef di sushi al mondo. Con una narrazione delicata e immagini suggestive, Jiro Dreams of Sushi esplora l'arte della perfezione culinaria.", 0, "https://www.youtube.com/watch?v=I1UDS2kgqY8"),
        ("The Act of Killing", 2012, 122, "Joshua Oppenheimer", "Documentari", "Un documentario controverso che esplora i crimini di guerra commessi in Indonesia negli anni '60 attraverso la testimonianza e la re-enactment degli stessi perpetratori. The Act of Killing è un film potente e disturbante che mette in luce il lato oscuro della storia umana.", 1, "https://www.youtube.com/watch?v=SD5oMxbMcHM"),

        ("Bojack Horseman", 2014, 25, "Raphael Bob-Waksberg", "Cartoni", "Una serie animata per adulti che segue le vicende di un ex attore di sitcom antropomorfo che cerca di dare un senso alla sua vita nel mondo dello spettacolo di Hollywood. Con temi profondi e umorismo dark, Bojack Horseman ha ricevuto elogi per la sua narrazione complessa e la sua rappresentazione realistica delle battaglie personali.", 1, "https://www.youtube.com/watch?v=i1eJMig5Ik4"),
        ("Avatar: The Last Airbender", 2005, 30, "Michael Dante DiMartino, Bryan Konietzko", "Cartoni", "Un cartone animato che segue le avventure di Aang, l'ultimo dominatore dell'aria, mentre cerca di salvare il mondo dalla guerra. Con una narrazione avvincente e un mondo ricco di mitologia, Avatar: The Last Airbender è diventato un classico cult.", 0, "https://www.youtube.com/watch?v=ByAn8DF8Ykk"),
        ("Rick and Morty", 2013, 25, "Dan Harmon, Justin Roiland", "Cartoni", "Un cartone animato adulto che segue le avventure sci-fi di un geniale scienziato pazzo e suo nipote. Con umorismo nero e concetti filosofici, Rick and Morty ha guadagnato un seguito devoto di fan.", 0, "https://www.youtube.com/watch?v=BFTSrbB2wII"),
        ("I FantaGenitori", 2001, 23, "Butch Hartman", "Cartoni", "La serie segue le avventure di Timmy Turner, un ragazzino di 10 anni che riceve due magici padrini fatati, Cosmo e Wanda, che esaudiscono i suoi desideri. Tuttavia, i desideri spesso portano a situazioni impreviste e comiche.", 0, "https://www.youtube.com/watch?v=gkAKUqI-24A"),
        ("Adventure Time", 2010, 25, "Pendleton Ward", "Cartoni", "Un cartone animato ambientato in un mondo post-apocalittico magico e colorato. Con avventure stravaganti e personaggi bizzarri, Adventure Time ha guadagnato un culto seguendo tra gli spettatori di tutte le età.", 0, "https://www.youtube.com/watch?v=DRaLQ3kKz_k"),
        ("Gravity Falls", 2012, 25, "Alex Hirsch", "Cartoni", "Un cartone animato che segue le avventure di due gemelli che trascorrono l'estate con il loro eccentrico zio in una città misteriosa. Con misteri intriganti e umorismo intelligente, Gravity Falls è diventato un favorito tra i fan dei cartoni.", 0, "https://www.youtube.com/watch?v=sScgDM062Fg"),
        ("I Simpson - Il film", 2007, 87, "David Silverman", "Cartoni", "Un film d'animazione basato sulla popolare serie televisiva, I Simpson. La trama segue le avventure della famiglia Simpson mentre affrontano una serie di eventi straordinari a Springfield. Con lo stesso umorismo intelligente della serie TV, il film offre una nuova avventura per i fan dei Simpson.", 0, "https://www.youtube.com/watch?v=HRV6tMR-SSs"),
        ("Teen Titans", 2003, 22, "Glen Murakami", "Cartoni", "Un cartone animato d'azione che segue un gruppo di giovani supereroi mentre combattono il crimine e affrontano le sfide della vita adolescenziale. Con personaggi iconici e storie coinvolgenti, Teen Titans ha conquistato un seguito devoto.", 0, "https://www.youtube.com/watch?v=kwYtpsWSc5s");

`;

//-------------------------------------------------------------------------------------------------------------------------
// Popolazione tabelle

// metodo per popolare gli utenti senza l'utilizzo dell'api RandomUser (viene usato solo in caso di errore - su specifica richiesta o se offline)
const populateUsersWithoutApi = async () => {   
    const users = [
        { email: 'giovanni1@gmail.com', password: 'password', nome: 'giovanni', cognome: 'paskoly', ddn: '2000-09-12', telefono: 3453532115, ruolo: 'user' },
        { email: 'admin@gmail.com', password: 'adminadmin', nome: 'Elone', cognome: 'Maschera', ddn: '2005-01-15', telefono: 3777465234, ruolo: 'admin' },
        { email: 'marco@gmail.com', password: 'cornelius', nome: 'marco', cognome: 'papa', ddn: '2001-06-12', telefono: 3142387846 ,ruolo: 'user' }
    ];

    for (const user of users) {
        const encryptedMail = encryptEmail(user.email);
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const sql = 'INSERT INTO user (email, password, nome, cognome, ddn, telefono, ruolo) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.run(sql, [encryptedMail, hashedPassword, user.nome, user.cognome, user.ddn, user.telefono, user.ruolo], (err) => {
            if (err) {
                console.error('Errore durante l\'inserimento dell\'utente:', err);
            } else {
                console.log(`Utente ${user.email} inserito correttamente nel database.`);
            }
        });
    }
};

//-------------------------------------------------------------------------------------------------------------------------
// API

// RandomUser API

const populateUsersWithApi = async () => {
    console.log("\nPopolamento UTENTI mediante randomuser api..... ");
    try {
        const response = await axios.get('https://randomuser.me/api/?results=10'); //prendo solo 10 utenti
        const users = response.data.results.map(user => {
            let nome = user.name.first;
            let cognome = user.name.last;
            let email = user.email;

            /* modifico i nomi/cognomi/email che contengono caratteri non validi (alfabeti arabi, cirillici etc etc)*/
            if (/[^a-zA-Z]/.test(nome) || /[^a-zA-Z]/.test(cognome) || /[^a-zA-Z0-9.@]/.test(email)) { 
                nome = nome.replace(/[^a-zA-Z]/g, () => String.fromCharCode(97 + Math.floor(Math.random() * 26)));
                cognome = cognome.replace(/[^a-zA-Z]/g, () => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
                email = email.replace(/[^a-zA-Z0-9.@]/g, () => String.fromCharCode(97 + Math.floor(Math.random() * 26)));
                console.log(`Utente '${nome}-${cognome}-${email}' modificato a causa di caratteri non validi.`);
            }

            //prendo solo la parte prima della T    '1973-01-14T16:37:14.605Z'
            const ddn = new Date(user.dob.date).toISOString().split('T')[0]; 

            //recupero l'anno per generare la password 
            const annoDiNascita = user.dob.date.split('-')[0]; 

            /*la password viene generata con la combinazione di nome e anno di nascita nell'api é possibile prendere 
            la password, ma dato che queste verrebbero criptate subito sarebbe complicato recuperarle per accedere.*/
            const password = `${nome}${annoDiNascita}`; 

            const telefono = (user.phone || '').replace(/\D/g, '');//rimuovo i simboli (- o spazi)
            const ruolo = 'user'; //ruolo di default per tutti gli utenti

            return {email: email, password: password, nome: nome, cognome: cognome, ddn: ddn, telefono: telefono, ruolo: ruolo};
        });

        //inserisco manualmente due sample-utenti creati da me (incluso il ruolo di admin)
        users.push({ email: 'admin@gmail.com', password: 'adminadmin', nome: 'Elone', cognome: 'Maschera', ddn: '2005-01-15', telefono: 3777465234, ruolo: 'admin' });
        users.push({ email: 'giovanni@gmail.com', password: 'password', nome: 'giovanni', cognome: 'paskoly', ddn: '2000-09-12', telefono: 3453532115, ruolo: 'user' });
       
        for (const user of users) {
            const encryptedMail = encryptEmail(user.email);
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const sql = 'INSERT INTO user (email, password, nome, cognome, ddn, telefono, ruolo) VALUES (?, ?, ?, ?, ?, ?, ?)';

            db.run(sql, [encryptedMail, hashedPassword, user.nome, user.cognome, user.ddn, user.telefono, user.ruolo], (err) => {
                if (err) {
                    console.error('Errore durante l\'inserimento dell\'utente:', err);
                } else {
                    console.log(`\tUtente ->${user.email}<- con password generata ->${user.password}<-inserito correttamente nel database.`);
                }
            });
        }
    } catch (error) {
        console.log('Errore durante la richiesta degli utenti all\'api randomuser:');
        if(error.message.includes('getaddrinfo')){
            console.log("Impossibile connettersi a randomuser API, controlla la tua connessione")
        }else{
            console.log(error.message);
        }
    }
};

// Youtube API

//funzione per ricavare il primo video dato una query su youtube (dato il titolo seleziona il primo video presente)
async function getFirstTrailerLink(query) {
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: youtubeApiKey,
                q: query,
                part: 'snippet',
                maxResults: 1,
                type: 'video'
            }
        });

        if (response.data.items && response.data.items.length > 0) {
            const videoId = response.data.items[0].id.videoId;
            console.log(`--[youtubeAPI] Found video "${videoId}"`);
            return `https://www.youtube.com/watch?v=${videoId}`;
        } else {
            console.log(`--[youtubeAPI] Nessun video trovato per "${query}"`);
            return '';
        }
    } catch (error) {
        if(error.message.includes('403')){
            console.log("--[youtubeAPI] Raggiunto limite api");
        }else{
            console.error('--[youtubeAPI] Errore durante la ricerca del trailer su YouTube (possibile raggiungimento limite):', error.message);
        }
        return '';
    }
}

/*visto che le categorie provenienti da OMDB sono in inglese e le categorie nel database in italiano ho creato 
un oggetto "dizionaro" con il corrispettivo in inglese*/

const categories = {
    'Titoli del momento': 'Trending',
    'Classici TV': 'TV Classics',
    'Serie TV': 'TV Series',
    'Cartoni': 'Cartoons',
    'Anime': 'Anime',
    'Dramma': 'Drama',
    'Thriller': 'Thriller',
    'Horror': 'Horror',
    'LGBT': 'LGBT',
    'Marvel': 'Marvel',
    'Sitcom': 'Sitcom',
    'Documentari': 'Documentaries',
    'Film di Fantascienza': 'Sci-Fi Movies',
    'Film per Famiglie': 'Family Movies'
};

//OMDb API

async function fetchMovies(category) {
    const film = [];
    for (let i = 1; i <= 20; i++) { //numero pagine
        const response = await axios.get(`http://www.omdbapi.com/?s=${encodeURIComponent(category)}&page=${i}&apikey=${omdbApiKey}`);
        const data = response.data;

        if (data.Response === "True") {
            film.push(...data.Search);
        }
        await delay(500);
    }
    return film.slice(0, 15); //restituisco solo i primi 15 film
}

async function populateFilmsWithApi() {
    console.log("\nPopolamento FILM mediante ombd e youtube api..... ");
    let skipped = 0;
    let durata = 0;
    for (const [categoria, enCategory] of Object.entries(categories)) {
        const films = await fetchMovies(enCategory);

        for (const film of films) {
            const detailsResponse = await axios.get(`http://www.omdbapi.com/?i=${film.imdbID}&apikey=${omdbApiKey}`);
            const details = detailsResponse.data;

            if (details.Response === "True") {
                durata = 0;
                if (details.Runtime) {
                    const match = details.Runtime.match(/(\d+)/);
                    //se non ha una durata la genero automaticamente, questo per non scartare troppi film 
                    //(per evitare di avere l'api bloccata (soprattutto da youtube che ha un limite basso di richieste rispetto a omdb) )
                    durata = match ? parseInt(match[0]) : Math.floor((Math.random() * 596) + 5);

                    //potrei generare anche gli altri campi mancanti, ma ho deciso di farlo solo per la durata perché é impossibile non averla,
                    //se hai un film hai per forza una durata (ma puoi non avere anno, descrizione e regista)
                }
                
                const titolo = sanitizeString(details.Title) || null;
                const anno_uscita = parseInt(details.Year) || null;
                const regista = sanitizeString(details.Director) || null;
                const descrizione = sanitizeString(details.Plot);
                const limeta = 0;
                const trailer = await getFirstTrailerLink(`${titolo} trailer`);

                /*campi in base a cui escludo le richieste, sono stato "generoso" rendendo necessario solo il titolo e l'anno, questo
                sempre per non esaurire i limiti di richiesta dell'api*/
                if (!titolo || !anno_uscita || !regista || !categoria) {
                    console.error(`[OMDbAPI] Film "${titolo}" incompleto, passo al prossimo.`);
                    skipped++;
                    continue;
                }

                const sql = `INSERT INTO film (titolo, anno_uscita, durata, regista, categoria, descrizione, limeta, trailer) VALUES
                ("${titolo}", ${anno_uscita}, ${durata}, "${regista}", "${categoria}", "${descrizione}", ${limeta}, "${trailer}");`;

                db.run(sql, (err) => {
                    if (err) {
                        console.error('[OMDbAPI] Errore durante l\'inserimento del film:', err.message);
                        console.log(sql)
                    } else {
                        console.log(`[OMDbAPI] Film: Titolo: ${titolo}, Anno: ${anno_uscita}, Durata: ${durata}, Regista: ${regista}, Categoria: ${categoria} inserito correttamente nel database.`);
                    }
                });
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    console.log("Caricamento mediante API completato con successo! Film saltati: "+skipped);
}

//-------------------------------------------------------------------------------------------------------------------------
// Esecuzione query in modo sequenziale https://www.sqlitetutorial.net/sqlite-nodejs/statements-control-flow/

async function dbLoad(){
    db.serialize(() => { 
        db.run(dropFilm, (err) => {
            if (err) {
                console.error('Errore durante lo svuotamento della tabella film:', err.message);
            } else {
                console.log('SVUOTAMENTO-> FILM avvenuto con successo!.');
            }
        });

        db.run(dropUser, (err) => {
            if (err) {
                console.error('Errore durante lo svuotamento della tabella user', err.message);
            } else {
                console.log('SVUOTAMENTO-> Utenti avvenuto con successo!.');
            }
        });

        db.run(dropGuest, (err) => {
            if (err) {
                console.error('Errore durante lo svuotamento della tabella guest', err.message);
            } else {
                console.log('SVUOTAMENTO-> guest avvenuto con successo!.');
            }
        });

        db.run(dropLiked, (err) => {
            if (err) {
                console.error('Errore durante lo svuotamento della tabella liked_video', err.message);
            } else {
                console.log('SVUOTAMENTO-> Interazioni avvenuto con successo!.');
            }
        });

        db.run(dropCategory, (err) => {
            if (err) {
                console.error('Errore durante lo svuotamento della tabella category', err.message);
            } else {
                console.log('SVUOTAMENTO-> CATEGORIE avvenuto con successo!.');
            }
        });

        db.run(createUser, (err) => {
            if (err) {
                console.error('Errore durante la creazione della tabella User:', err.message);
            } else {
                console.log('CREAZIONE-> USER avvenuta con successo!.');
            }
        });

        db.run(createGuest, (err) => {
            if (err) {
                console.error('Errore durante la creazione della tabella Guest:', err.message);
            } else {
                console.log('CREAZIONE-> GUEST avvenuta con successo!.');
            }
        });

        db.run(createLiked, (err) => {
            if (err) {
                console.error('Errore durante la creazione della tabella LikedVideo:', err.message);
            } else {
                console.log('CREAZIONE-> LikedVideos avvenuta con successo!.');
            }
        });

        db.run(createCategory, (err) => {
            if (err) {
                console.error('Errore durante la creazione della tabella category:', err.message);
            } else {
                console.log('CREAZIONE-> CATEGORIE avvenuto con successo!.');
            }
        });

        db.run(createFilm, (err) => {
            if (err) {
                console.error('Errore durante la creazione della tabella film:', err.message);
            } else {
                console.log('CREAZIONE-> FILM avvenuta con successo!.');
            }
        });

        db.run(populateCategories, (err) => {
            if (err) {
                console.error('Errore durante il popolamento della tabella categorie:', err.message);
            } else {
                console.log('POPOLAZIONE-> CATEGORIE avvenuta con successo!.');
            }
        });

        if (!useApi) {
            db.run(populateFilmsWithoutApi, (err) => {
                if (err) {
                    console.error('Errore durante il popolamento della tabella film:', err.message);
                } else {
                    console.log('POPOLAZIONE-> FILM avvenuta con successo!.');
                }
            });
            populateUsersWithoutApi();
        }

        //attivazione dei vincoli delle chiavi esterne
        db.run("PRAGMA foreign_keys = ON;", (err) => {
            if (err) {
                console.error('Errore durante l\'attivazione dei vincoli delle chiavi esterne:', err.message);
            } else {
                console.log('\nVincoli delle chiavi esterne attivati.');
            }
        });
    });
}

async function initialize() {
    try {
        await welcome();
        await delay(3000);
        if(useApi){  //se uso l'api prima di tutto controllo di essere online, a
            try { //controllo se siamo online, in caso contrario metto il flag useapi su false
                await axios.get('https://www.google.com');
            } catch (error) {
                console.log('\n[db.js]Connessione non disponibile, esecuzione caricamento senza API\n');
                useApi = false; //se la connessione non é presente non uso l'api
                await delay(3000);
            }
        }
        await dbLoad();
        if (useApi) {
            await delay(500);
            await populateUsersWithApi();
            await delay(500);
            await populateFilmsWithApi();
        }
    } catch (error) {
        console.error("[db.JS] Si è verificato un errore:", error);
    }
}

//chiamata "main" per avviare lo script
initialize();
