'use strict';

const express = require('express');
const session = require('express-session');

const path = require('path');
const bcrypt = require('bcrypt'); //libreria per usare bcrypt
const crypto = require('crypto'); //libreria per usare aes-256
const _ = require('lodash'); //libreria per confrontare oggetti
const os = require('os');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();

const port = 8080;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { //https://expressjs.com/en/resources/middleware/cookie-session.html
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24*(60*(60*1000)/*min*/)/*ora*/
    }
}));

app.use(passport.initialize());
app.use(passport.session());

const sqlite3 = require('sqlite3').verbose();
const dbPath = process.env.DB_PATH;
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Errore durante la connessione al database:', err.message);
    } else {
        //console.log('[database.sqlite]Connessione al database SQLite avvenuta con successo.');
        db.run("PRAGMA foreign_keys = ON;", (err) => {
            if (err) {
                console.error('Errore durante l\'attivazione dei vincoli delle chiavi esterne:', err.message);
            }
        });
    }
});

//https://thewebdev.info/2022/02/26/how-to-get-local-ip-address-in-node-js/
/*funzione per ottenere l'ipv4 su cui eseguire l'app */
function getLocalIPv4() {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        for (const network of networkInterfaces[interfaceName]) {
            if (network.family === 'IPv4' && !network.internal) {
                return network.address;
            }
        }
    }
    return null;
}

const localIPv4 = getLocalIPv4();

// eseguo l'app sia su localhost e sia sull'ipv4 (cosi da farlo testare ad altri dispositivi contemporaneamente (non funziona con wifi upo, all'esame usare l'hostpot per
// la dimostrazione))
app.listen(port, localIPv4, () => {
    console.log("\n\n\n");
    console.log("███████╗██╗      ██████╗ ██████╗ ███████╗██╗     ██╗██╗  ██╗");
    console.log("██╔════╝██║     ██╔═══██╗██╔══██╗██╔════╝██║     ██║╚██╗██╔╝");
    console.log("█████╗  ██║     ██║   ██║██████╔╝█████╗  ██║     ██║ ╚███╔╝ ");
    console.log("██╔══╝  ██║     ██║   ██║██╔═══╝ ██╔══╝  ██║     ██║ ██╔██╗ ");
    console.log("██║     ███████╗╚██████╔╝██║     ██║     ███████╗██║██╔╝ ██╗");
    console.log("╚═╝     ╚══════╝ ╚═════╝ ╚═╝     ╚═╝     ╚══════╝╚═╝╚═╝  ╚═╝");
    console.log(`\n                -> by marco57589 <-`);
    if(localIPv4)                                                     
        console.log(`\nis running on -> http://${localIPv4}:${port} <-`);  
    else
        console.log('\n[Errore nella creazione del socket su IPV4]\n')      
    console.log(`is running localy in -> http://localhost:${port} <-\n`);                                                            
                                                    
});

app.listen(port, '127.0.0.1', () => {}); //rendo l'app utilizzabile mediante localhost 127.0.0.1


// ------------------------------------------------------------------------------
//   Funzioni di servizio
// ------------------------------------------------------------------------------

//https://hayageek.com/aes-encryption-decryption-in-nodejs/
//inizialmente la mail era salvata con l'hashing sha256 ma questo non permetteva il procedimento inverso 
//(utile se l'utente vuole modificare la mail dalla pagina dell'account... per questo l'ho modificato
//e ho implementato l'aes256 in modo simmetrico (Senza iv random)(sempre della libreria crypto)

/**
 * Funzione per cifrare l'indirizzo email (encrypt aes256)
 */
function encryptEmail(email) {
    const secretKey = process.env.SECRET_KEY;
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), Buffer.from(secretKey.slice(0, 16)));
    let encrypted = cipher.update(email, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

/**
 * Funzione per decifrare l'indirizzo email (decrypt aes256)
 */
function decryptEmail(encryptedEmail) {
    const secretKey = process.env.SECRET_KEY;
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), Buffer.from(secretKey.slice(0, 16)));
    let decrypted = decipher.update(encryptedEmail, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


/**
 * Esegue una query sul database restituendo i risultati come una Promise.
 * Può essere utilizzata per eseguire: 'db.get' (singolo riga) e `db.all` (più righe) o `db.all` (per un feedback),
 *
 * @param {string} query - La query SQL da eseguire.
 * @param {Array} [params=[]] - Parametri della query (array).
 * @param {string} type - `get` esegue `db.get`; `all`, esegue `db.all`; `run`, esegue `db.run`
 * @returns {Promise} - Una Promise che si 'risolve' con i risultati o termina con errore.
 */
function queryDatabase(query, params = [], type) {
    return new Promise((resolve, reject) => {
        const callback = (err, result) => {
            if (err) {
                reject(err); //l'errore verra poi mostrato dalla next di ogni funzione, che chiamerà la pagina error per mostrare il messaggio
            } else {
                resolve(result);
            }
        };

        if (type == 'get') {
            db.get(query, params, callback);
        } else if (type == 'all'){
            db.all(query, params, callback);
        } else if (type === 'run') {
            db.run(query, params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        } else {
            reject(new Error('Tipo di query non valido.'));
        }
    });
}

// ------------------------------------------------------------------------------
//   Middleware
// ------------------------------------------------------------------------------


/**
 * Funzione middleware per controllare che l'utente non sia loggato
 */
function ensureUnAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    //se l'utente non é autenticato procedo
    return next();
}

/**
 * Funzione middleware per controllare che l'utente sia loggato
 */
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    //se l'utente non é autenticato lo redirigo alla pagina di accesso
    res.redirect('/login');
}

/**
 * Funzione middleware per controllare che l'utente sia o un admin o che sia loggato
 */
function ensureAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.ruolo === 'admin') {
        return next();
    } else {
        //se l'utete non é loggato e non ha il ruolo admin mostro la pagina accesso negato
        const err = new Error('Accesso negato.');
        err.status = 403;
        return next(err);
    }
}

/**
 * Funzione middleware per controllare che il guest possa guardare il video
 */
function canWatchVideo(req, res, next) {
    if (req.user) {
        return next();
    }
    const ip = req.ip; 

    db.get(`SELECT * FROM guest WHERE ip = ?`, [ip], (err, row) => {
        if (err) {
            return res.status(500).send("Errore nel server");
        }

        const now = new Date();
        /* per la dimostrazione e il test il periodo di attesa é stato ridotto a 1 minuto (con l'aggiunta di una funzione per aggiornare il modale)
        cosi si vede l'update del tasto riproduzione in tempo "reale". */
        const oneWeek = 1000*60 
        //const oneWeek = 7 * 24 * 60 * 60 * 1000; 
        let guestCanWatch = true; // permette la riproduzione, default true
        let unlockDate = null; // data in cui è concesso riprodurre nuovamente il contenuto

        if (row && row.last_watched) {
            const lastWatchedDate = new Date(row.last_watched);

            //se la differenza tra "adesso" e l'ultima volta che ho guardato un contenuto é minore del tempo di attesa allora il video rimane bloccato
            if (now - lastWatchedDate < oneWeek) { 
                guestCanWatch = false;
                const unlockTime = new Date(lastWatchedDate.getTime() + oneWeek);
                unlockDate = unlockTime.toISOString(); 
                req.unlockMessage = `Prossima riproduzione gratuita il: ${unlockTime.getDate()}/${unlockTime.getMonth() + 1}/${unlockTime.getFullYear()} alle ore ${unlockTime.getHours()}:${String(unlockTime.getMinutes()).padStart(2, '0')}:${String(unlockTime.getSeconds()).padStart(2, '0')}`;
            } else {
                //altrimenti elimino il record (questo verra inserito alla prossima richiesta fetch di guest-is-watching)
                db.run(`DELETE FROM guest WHERE ip = ?`, [ip], (err) => {
                    if (err) {
                        console.error("Errore nell'eliminare l'IP:", err);
                    }
                });
            }
        }

        req.guestCanWatch = guestCanWatch; 
        req.unlockDate = unlockDate;
        next();
    });
}


// ------------------------------------------------------------------------------
//   Funzioni get
// ------------------------------------------------------------------------------

/**
 * Recupera la lista dei video a cui l'utente ha messo tra i "mi piace".
 *
 * @param {number} userId - ID dell'utente del quale recuperare i video piaciuti.
 * @returns {Promise<number[]>} - Una promessa che "risolve" un array di ID dei film piaciuti (Se l'utente non è autenticato restituisce una promessa array vuota).
 * @throws {Error} - Se si verifica un errore durante l'esecuzione della query.
 */
function getLikedVideos(userId) {
    return new Promise((resolve, reject) => {
        if (!userId) { //se non c'é l'utente loggato allora passo la lista vuota
            resolve([]);
        } else {
            const query = `SELECT id_film FROM liked_video WHERE id_utente = ?`;
            db.all(query, [userId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const likedVideos = results.map(row => row.id_film);
                    resolve(likedVideos); //restituisco likedvideos al then
                }
            });
        }
    });
}

// ------------------------------------------------------------------------------
//   Funzionalita usate con le fetch
// ------------------------------------------------------------------------------

/**
 * Aggiorno il contenuto del bottone riproduci. Se un contenuto é bloccato e si rimane nel modale, allo scadere del tempo
 * il bottone viene aggiornato abilitando la visione (senza ricaricare la pagina)
 */
app.get('/modal-update', canWatchVideo, (req, res) => {
    if (req.user) {
        res.json({ userType: 'registered' });
    } else {
        res.json({ userType: 'guest', guestCanWatch: req.guestCanWatch, unlockMessage: req.unlockMessage });
    }
});

/**
 * Inserisco o aggiorno lo stato della visione per l'utente guest.
 * Appena riproduco un video inserisco la visione del guest nel database. in caso di riproduzioni già avvenute (e se l'utente può nuovamente
 * riprodurre aggiorno lultima visione con la data attuale)
 */
app.post('/guest-is-watching', (req, res) => {
    const ip = req.ip;
    const now = new Date();
    const sql = `INSERT INTO guest (ip, last_watched) VALUES (?, ?) ON CONFLICT(ip) DO UPDATE SET last_watched = ?`;
    db.run(sql, [ip, now.toISOString(), now.toISOString()], (err) => {
        if (err) {
            return res.status(500).send("Errore nell'aggiornamento dell'ultima visione.");
        }
        res.status(200).send("Video riprodotto con successo.");
    });
});

/**
 * Funzione Switch (like = !like) per gestire mi piace per un contenuto specifico (id)
 * -Se il contenuto é nei mi piace allora viene tolto
 * -Se il contenuto non é nei mi piace allora viene aggiunto
 * Richiede che l'utente sia autenticato.
 * @middleware canWatchVideo
 * @next usato per inviare gli errori che verranno riprodotti in una pagina specifica
 */
app.post('/toggle-like/:id', ensureAuthenticated, (req, res, next) => {
    const filmId = parseInt(req.params.id);
    const userId = req.user.id;

    getLikedVideos(userId) //ritorna una lista di video a cui l'utente ha messo mi piace
        .then(likedVideos => {
            if (likedVideos.includes(filmId)) { //se in questi é presente il film (il cui id arriva dal click) esiste allora tolgo l'interazione
                return queryDatabase('DELETE FROM liked_video WHERE id_utente = ? AND id_film = ?', [userId, filmId], 'all')
                    .then(() => ({ liked: false }));
            } else { //se non é presente arrola l'aggiungo
                return queryDatabase('INSERT INTO liked_video (id_utente, id_film) VALUES (?, ?)', [userId, filmId], 'all')
                    .then(() => ({ liked: true }));
            }
        })
        .then(response => {
            res.json({ success: true, liked: response.liked });
        })
        .catch(err => {
            next(err);
        });
});

// ------------------------------------------------------------------------------
//   PASSPORT
// ------------------------------------------------------------------------------

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const encryptedEmail = encryptEmail(email);

            db.get('SELECT * FROM user WHERE email = ?', [encryptedEmail], async (err, user) => {
                if (err) return done(err);
                if (!user) return done(null, false, { message: 'Indirizzo mail o password errati' });

                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    return done(null, user);
                }
                return done(null, false, { message: 'Indirizzo mail o password errati' });
            });
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.get('SELECT id, ruolo FROM user WHERE id = ?', [id], (err, user) => {
        if (err) {
            return done(err);
        }
        /* visto che lo script db.js può essere eseguito durante l'esecuzione di flopflix (magari per resettare tutto o per ri-caricare i dati via api)
            ho fatto in modo che se l'utente (creato successivamente all'inizializzazione) non sia più presente nel database
            dopo aver fatto il reset allora distruggo la sessione*/
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    });
});

// ------------------------------------------------------------------------------
//   Funzionalita di autenticazione
// ------------------------------------------------------------------------------

/**
 * Route mostrare la pagina di login
 * Richiede che l'utente non sia autenticato.
 * @middleware ensureUnAuthenticated
 */
app.get('/login', ensureUnAuthenticated, (req, res) => {
    res.render('login');
});

/**
 * Route gestire i dati ricevuti dal form login la pagina di accesso
 * Eseguo l'autenticazone con passport.
 */
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {return next(err);}
        if (!user) {return res.render('login', { warning: 'Nome utente o password invalidi!' });}

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            //console.log('[debug] User logged in successfully with ID:', user.id);
            return res.redirect('/');
        });
    })(req, res, next);
});

/**
 * Route per il primo step della registrazione
 * Richiede che l'utente non sia autenticato.
 * @middleware ensureUnAuthenticated
 */
app.get('/register-step-1', ensureUnAuthenticated, (req, res) => {   
    res.render('register-1');
});

/**
 * Route per validare l'indirizzo mail fornito dal primo step della registrazione.
 * Richiede che l'utente non sia autenticato.
 * @middleware ensureUnAuthenticated
 * @next usato per inviare gli errori che verranno riprodotti in una pagina specifica
 */
app.post('/verify-email', ensureUnAuthenticated, (req, res, next) => {
    const { email } = req.body; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //reged per validare la mail

    if (!email || !emailRegex.test(email)) { 
        return res.render('register-1', { error: 'Per favore, inserisci un indirizzo email valido.' });
    }

    queryDatabase('SELECT * FROM user WHERE email = ?', [encryptEmail(email)], 'get')
        .then(user => {
            if (user) { //se l'email è già in uso ricarico la pagina mostrando l'errore
                return res.render('register-1', { error: 'Questa email è già in uso, scegli un\'altra email.' });
            }
            req.session.email = email;
            return res.redirect('/register-step-2');
        })
        .catch(err => {
            next(err);
        });
});

/**
 * Route per il secondo step della registrazione (inserimento della password)
 * Richiede che l'utente non sia autenticato.
 * @middleware ensureUnAuthenticated
 */
app.get('/register-step-2', ensureUnAuthenticated, (req, res) => {
    const email = req.session.email; //recupera l'email dalla sessione
    req.session.email = ''; //ripulisco il valore della mail, cosi se ritorno alla home e poi faccio la redirect manuale su /register step 2 non ho più la mail
   
    if (!email) {
        return res.redirect('/register-step-1'); //se l'email non è presente, o se si accedere direttamente a questa pagina si viene rimandati al primo step
    }

    res.render('register-2', { email }); // Passa l'email alla vista
});


/**
 * Route per il controllo dei dati provenienti dal form (step 2) di registrazione.
 * Richiede che l'utente non sia autenticato.
 * @middleware ensureUnAuthenticated
 * @next usato per inviare gli errori che verranno riprodotti in una pagina specifica
 */
app.post('/register-step-2', ensureUnAuthenticated, (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('register-2', { error: 'Inserisci email e password', email });
    }
    if (password.length < 6 || password.length > 32) {
        return res.render('register-2', { error: 'La password deve essere tra 6 e 32 caratteri.', email });
    }

    const encryptedEmail = encryptEmail(email);
    
    queryDatabase('SELECT * FROM user WHERE email = ?', [encryptedEmail], 'get')
        .then(user => {
            if (user) { //se l'email è già in uso, ritorno alla registrazione con un errore
                return res.render('register-2', { error: 'Email già in uso, scegline un\'altra', email });
            }
            return bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    return queryDatabase('INSERT INTO user (email, password) VALUES (?, ?)', [encryptedEmail, hashedPassword], 'run')
                        .then(result => {
                            req.logIn({ id: result.changes, email: encryptedEmail }, (err) => {
                                if (err) {
                                    return res.render('register-2', { error: 'Errore durante l\'accesso', email });
                                }
                                return res.redirect('/');
                            });
                        });
                });
        })
        .catch(err => {
            next(err);
        });
});

/**
 * Route gestire il logout (la disconnessione) di un utente.
 * Eseguo la disconnessione con passport.
 */
app.get('/logout', (req, res, next) => { //https://www.passportjs.org/concepts/authentication/logout/
    req.logout((err) => {
        if (err) {return next(err);}
        //console.log('[debug] User self-logged out successfully!');
        //dopo il logout si viene reindirizzati alla home
        res.redirect('/');
    });
});


// ------------------------------------------------------------------------------
//   PAGINE HOME | MY LIST | BROWSE CATEGORY | SEARCH 
// ------------------------------------------------------------------------------

/**
 * Home page del sito.
 * Contiene i film suddivisi per categoria e se un utente é loggato anche i mipiace
 * @middleware canWatchVideo
 * @next usato per inviare gli errori che verranno riprodotti in una pagina specifica
 */
app.get('/', canWatchVideo, (req, res, next) => {
    let userId = req.isAuthenticated() ? req.user.id : null;

    queryDatabase('SELECT * FROM categorie', [], 'all')
        .then(categories => {
            const likedVideosPromise = getLikedVideos(userId);
            const categoryFilmsPromises = categories.map(category => {
                return queryDatabase('SELECT * FROM film WHERE categoria = ?', [category.nome_categoria], 'all')
                    .then(films => ({
                        category: category.nome_categoria,
                        films: films
                    }));
            });
            return Promise.all([Promise.all(categoryFilmsPromises), likedVideosPromise]);
        })
        .then(([categoryFilms, likedVideos]) => {
            const categoryFilmsData = {}; //oggetto che conterrà tutti i film per ogni categoria
            categoryFilms.forEach(result => {   //per ogni categoria inserisco in categoryilfmsdata i film corrispondenti
                categoryFilmsData[result.category] = result.films;
            });
            res.render('index', {categoryFilms: categoryFilmsData, likedVideos, user: req.user, guestCanWatch: req.guestCanWatch, unlockMessage: req.unlockMessage});
        })
        .catch(err => {
            next(err);
        });
});

/**
 * Route per visualizzare la lista dei contenuti a cui l'utente ha messo mi piace.
 * Richiede che l'utente sia autenticato.
 * @middleware ensureAuthenticated
 * @next usato per inviare gli errori che verranno riprodotti in una pagina specifica
 */
app.get('/mylist', ensureAuthenticated, (req, res, next) => {
    const userId = req.user.id; 
    const query = `SELECT film.*, liked_video.id_film FROM film JOIN liked_video ON film.id = liked_video.id_film WHERE liked_video.id_utente = ?`;

    queryDatabase(query, [userId], 'all')  // Seleziono i film a cui l'utente ha messo mi piace
        .then(films => {
            const likedVideos = films.map(film => film.id_film);
            res.render('mylist', { films, user: req.user, likedVideos, errorMessage: null });
        })
        .catch(err => {
            next(err);
        });
});

/**
 * Route per visualizzare la lista dei film in base a una specifica categoria
 * Controlla che il guest possa visionare il video.
 * @middleware canWatchVideo
 * @next usato per inviare gli errori che verranno riprodotti in una pagina specifica
 */
app.get('/browse-category', canWatchVideo, (req, res, next) => {
    let userId = req.isAuthenticated() ? req.user.id : null;

    queryDatabase('SELECT nome_categoria FROM categorie', [], 'all').then(categories => {
            let query = 'SELECT * FROM film'; //inizio a comporre la query dinamica, se non ci sono categorie selezionate le prendo tutte (*)
            let queryParams = [];
            const selectedCategory = req.query.category;

            if (selectedCategory) {//se abbiamo una categorio aggiungo la clausola where con la categoria selezionata
                query += ' WHERE categoria = ?';
                queryParams.push(selectedCategory);
            }
            //promise, categorie, film (query dinamica) e likedvideos
            return Promise.all([Promise.resolve(categories), queryDatabase(query, queryParams, 'all'), getLikedVideos(userId)]);
        })
        .then(([categories, film, likedResults]) => {
            const likedVideos = likedResults.map(row => row.id_film);
            res.render('browsecategory', {categories, film, likedVideos, selectedCategory: req.query.category || null, user: req.user,guestCanWatch: req.guestCanWatch, unlockMessage: req.unlockMessage});
        })
        .catch(err => {
            next(err);
        });
});

/**
 * Route per la pagina di ricerca mediante keyword
 * Controlla che il guest possa visionare il video.
 * @middleware canWatchVideo
 * @next usato per inviare gli errori che verranno riprodotti in una pagina specifica
 */
app.get('/search', canWatchVideo, (req, res, next) => {
    const query = req.query.query;
    const user = req.user;
    const userId = req.isAuthenticated() ? req.user.id : null;
    const guestCanWatch = req.guestCanWatch;
    const unlockMessage = req.unlockMessage;

    if (!query) {
        return res.render('search', { exactResults: [], broadResults: [], query, user, guestCanWatch, unlockMessage, likedVideos: [] });
    }

    const keyWords = query.split(/\s+/); //Divide le parole chiave
    const exactConditions = keyWords.map(() => `(titolo LIKE ?)`).join(' AND ');//se metto n° keyword mi cerca i film che hanno tutte queste keyword
    const broadConditions = keyWords.map(() => `(titolo LIKE ?)`).join(' OR ');//altrimenti metto i film che contengono almeno una di questa

    const exactValues = keyWords.map(word => `%${word}%`);
    const broadValues = keyWords.map(word => `%${word}%`);

    const exactQuery = `SELECT * FROM film WHERE ${exactConditions}`;
    const broadQuery = `SELECT * FROM film WHERE ${broadConditions}`;

    //getlikedvideos ritorna i video a cui l'utnte ha messo mi piace, altrimenti una lista vuota
    const promises = [getLikedVideos(userId), queryDatabase(exactQuery, exactValues, 'all'), queryDatabase(broadQuery, broadValues, 'all')];

    Promise.all(promises)
        .then(([likedVideos, exactResults, broadResults]) => {
            //rimuovo dai risultati simili quelli che compaiono nei risultati esatti, cosi da non avere duplicati.
            const exactResultsId = new Set(exactResults.map(film => film.id));
            broadResults = broadResults.filter(broadResult => !exactResultsId.has(broadResult.id));
            res.render('search', { exactResults, broadResults, query, user, guestCanWatch, unlockMessage, likedVideos });
        })
        .catch(err => {
            next(err);
        });

});

// ------------------------------------------------------------------------------
//   Funzionalità ADMIN
// ------------------------------------------------------------------------------

/**
 * Route per visualizzare la dashboard di gestione del sito
 * Richiede che l'utente abbia fatto l'accesso e che il suo ruolo sia admin.
 * @middleware ensureAdmin
 * @next usato per inviare gli errori che verranno riprodotti in una pagina specifica
 */
app.get('/admin-dashboard', ensureAdmin, (req, res, next) => {
    //nella pagina admin carico i film, le categorie e i guest eccetto per i dati degli utenti
    //scelta personale, un admin dovrebbe poter accedere / modificare i dati degli utenti.

    Promise.all([queryDatabase('SELECT * FROM film', [], 'all'),  queryDatabase('SELECT * FROM categorie', [], 'all'), queryDatabase('SELECT * FROM guest', [], 'all')])
        .then(([film, categories, guest]) => {
            req.session.film = film;
            req.session.categories = categories;
            req.session.guest = guest;

            //elimino il messaggio della sessione cosi nel prossimo redirect (o refresh) verrà eliminato
            const success = req.session.success;
            const error = req.session.error;
            delete req.session.success;
            delete req.session.error;

            res.render('admin-dashboard', { film, categories, user: req.user, guest, error, success });
        })
        .catch(err => {
            next(err)
        });
});

/**
 * Route per gestire l'aggiunta di un film
 * Richiede che l'utente abbia fatto l'accesso e che il suo ruolo sia admin.
 * @middleware ensureAdmin
 */
app.post('/admin/add-film', ensureAdmin, (req, res) => {
    let { titolo, anno_uscita, durata, regista, categoria, descrizione, vietatoMinori, trailer } = req.body;
    const { film, categories, guest } = req.session; // Recupero i dati dalla sessione attuale

    if (!titolo || titolo.length < 2 || titolo.length > 64) { //controllo titolo
        return res.render('admin-dashboard', { user: req.user, film, categories, guest, error: 'Il titolo deve essere un testo da 2 a 64 caratteri.'});
    }

    if (anno_uscita && (isNaN(anno_uscita) || anno_uscita < 1890 || anno_uscita > new Date().getFullYear())) { //controllo anno e assegno il massimo all'anno attuale
        return res.render('admin-dashboard', { user: req.user, film, categories, guest, error: `L\'anno di uscita deve essere un numero valido compreso tra 1890 e ${new Date().getFullYear()}.`});
    }

    if (!durata || isNaN(durata) || durata < 5 || durata > 600) { //controllo durata
        return res.render('admin-dashboard', { user: req.user, film, categories, guest, error: 'La durata deve essere un numero tra 5 e 600.'});
    }

    if (!regista || regista.length < 2 || regista.length > 64) { //controllo regista
        return res.render('admin-dashboard', { user: req.user, film, categories, guest, error: 'Il nome del regista deve essere lungo tra 2 e 64 caratteri.' });
    }

    if (!categoria) { //controllo presenza categoria
        return res.render('admin-dashboard', { user: req.user, film, categories, guest, error: 'Seleziona una categoria.' });
    }

    if (!descrizione || descrizione.length < 2 || descrizione.length > 2000) { // Controllo descrizione
        return res.render('admin-dashboard', { user: req.user, film, categories, guest, error: "La descrizione deve avere essere compresa tra 2 e 2000 caratteri." });
    }

    if (!vietatoMinori || isNaN(vietatoMinori) || vietatoMinori < 0 || vietatoMinori > 1) {  //controllo vietato ai minori
        return res.render('admin-dashboard', { user: req.user, film, categories, guest, error: 'Inserisci un valore corretto per i limiti di età' });
    }

    if(trailer){
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/; //regex formato url youtube
        if (!youtubeRegex.test(trailer)) {
            return res.render('admin-dashboard', { user: req.user, film, categories, guest, error: 'Il trailer deve essere un URL valido di YouTube.' });
        }
    } else{
        trailer = null;
    }

    const query = 'INSERT INTO film (titolo, anno_uscita, durata, regista, categoria, descrizione, limeta, trailer) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    db.run(query, [titolo, anno_uscita, durata, regista, categoria, descrizione, vietatoMinori, trailer ], (err) => {
        if (err) {
            req.session.error = `Errore durante l'aggiunta del film.`;
            return res.redirect('/admin-dashboard');
        }

        req.session.success = (`Aggiunto film con i seguenti parametri: [Titolo: ${titolo}] - [Descrizione: ${descrizione}] - [Durata: ${durata}] - [Categoria: ${categoria}] - [Regista: ${regista}] - [Trailer: ${trailer}] - [Anno di Uscita: ${anno_uscita}]`);
        return res.redirect('/admin-dashboard');
    });
});

/**
 * Route per gestire l'azione di modifica di uno specifico film (dato da id)
 * Richiede che l'utente abbia fatto l'accesso e che il suo ruolo sia admin.
 * @middleware ensureAdmin
 */
app.post('/admin/edit-film/:id', ensureAdmin, (req, res) => {
    const film_id = req.params.id;
    let { titolo, anno_uscita, durata, regista, categoria, descrizione, vietatoMinori, trailer } = req.body;

    if (!titolo || titolo.length < 2 || titolo.length > 64) { //controllo titolo
        req.session.error = 'Il titolo deve essere un testo da 2 a 64 caratteri.';
        return res.redirect('/admin-dashboard');
    }

    if (anno_uscita && (isNaN(anno_uscita) || anno_uscita < 1890 || anno_uscita > new Date().getFullYear())) { //controllo anno e assegno il massimo all'anno attuale
        req.session.error = `L\'anno di uscita deve essere un numero valido compreso tra 1890 e ${new Date().getFullYear()}.`;
        return res.redirect('/admin-dashboard');
    }

    if (!durata || isNaN(durata) || durata < 5 || durata > 600) { //controllo durata
        req.session.error = 'La durata deve essere un numero tra 5 e 600.';
        return res.redirect('/admin-dashboard');
    }

    if (!regista || regista.length < 2 || regista.length > 64) { //cntrollo regista
        req.session.error = 'Il regista deve essere un testo da 2 a 64 caratteri.';
        return res.redirect('/admin-dashboard');
    }

    if (!categoria) { //controllo presenza categoria
        req.session.error = 'Seleziona una categoria.';
        return res.redirect('/admin-dashboard');
    }

    if (!descrizione || descrizione.length < 2 || descrizione.length > 2000) { // Controllo descrizione
        req.session.error = 'La descrizione deve avere essere compresa tra 2 e 2000 caratteri.';
        return res.redirect('/admin-dashboard');
    }

    if (!vietatoMinori || isNaN(vietatoMinori) || vietatoMinori < 0 || vietatoMinori > 1) { 
        req.session.error = 'Valore vietato ai minori non valido';
        return res.redirect('/admin-dashboard');
    }

    if(trailer){
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/; // regex formato url
        if (!youtubeRegex.test(trailer)) {
            req.session.error = 'L\'URL del trailer deve essere un link di YouTube valido.';
            return res.redirect('/admin-dashboard');
        }
    }else{
        trailer = null;
    }

    const query = `UPDATE film SET titolo = ?, anno_uscita = ?, durata = ?, regista = ?, categoria = ?, descrizione = ?, limeta = ?, trailer = ? WHERE id = ?`;
    const params = [titolo, anno_uscita, durata, regista, categoria, descrizione, vietatoMinori, trailer, film_id];

    db.run(query, params, (err) => {
        if (err) {
            req.session.error = `Errore durante l'aggiornamento del film ${film_id}.`;
            return res.redirect('/admin-dashboard');
        }
        req.session.success = `Film con id ${film_id} modificato con successo.`;
        return res.redirect('/admin-dashboard');
    });
});

/**
 * Route per gestire l'azione di rimozione di uno specifico film (dato da id)
 * Richiede che l'utente abbia fatto l'accesso e che il suo ruolo sia admin.
 * @middleware ensureAdmin
 */
app.post('/admin/delete-film/:id', ensureAdmin, (req, res) => {
    const film_id = req.params.id;
    queryDatabase('DELETE FROM film WHERE id = ?', [film_id], 'run')
        .then(result => {
            if (result.changes === 0) {
                req.session.error = `Nessun film trovato con l'ID ${film_id}.`;
                return res.redirect('/admin-dashboard');
            } else {
                req.session.success = `Film con ID ${film_id} rimosso con successo.`;
                return res.redirect('/admin-dashboard');
            }
        })
        .catch(err => {
            req.session.error = `Errore durante la rimozione del film ${film_id}.`;
            return res.redirect('/admin-dashboard');
        });
});

/**
 * Route per gestire l'azione di rimozione delle restrizioni per un utente guest (dato da :ip)
 * Richiede che l'utente abbia fatto l'accesso e che il suo ruolo sia admin.
 * @middleware ensureAdmin
 */
app.post('/admin/delete-restrizione/:ip', ensureAdmin, (req, res) => {
    const guest_ip = req.params.ip;

    //elimino la restizione per quell'ip
    queryDatabase('DELETE FROM guest WHERE ip = ?', [guest_ip], 'run')
        .then(changes => {
            if (changes === 0) {
                req.session.error = `Nessuna restrizione trovata per l'IP ${guest_ip}.`;
            } else {
                req.session.success = `Restrizioni per l'IP ${guest_ip} rimosse con successo.`;
            }
            return res.redirect('/admin-dashboard');
        })
        .catch(err => {
            req.session.error = `Errore durante la rimozione delle restrizioni per il guest ${guest_ip}.`;
            return res.redirect('/admin-dashboard');
        });
}); 

/**
 * Route per gestire l'azione aggiunta di una categoria
 * Richiede che l'utente abbia fatto l'accesso e che il suo ruolo sia admin.
 * @middleware ensureAdmin
 */
app.post('/admin/add-category', ensureAdmin, (req, res, next) => {
    const { nome_categoria } = req.body;
    const cat_regex = /^[a-zA-Z\s]{2,32}$/;  //solo caratteri e lunghezza da 2 a 32

    //controllo se ho un nuovo nome, e se queste rispettano il formato cat_regex
    if (!nome_categoria || !cat_regex.test(nome_categoria)) {
        req.session.error = 'Il nome della categoria deve essere un testo da 2 a 32 caratteri e non deve contenere numeri.';
        return res.redirect('/admin-dashboard');
    }

    queryDatabase('INSERT INTO categorie (nome_categoria) VALUES (?)', [nome_categoria], 'run')
        .then(() => {
            req.session.success = `Categoria ${nome_categoria} aggiunta con successo!`;
            return res.redirect('/admin-dashboard');
        })
        .catch(err => {
            if (err.code === 'SQLITE_CONSTRAINT') { //visto che é unique, se viene sollevata quest'eccezione significa che é già presente
                req.session.error = `Esiste già una categoria con questo nome! (${nome_categoria}).`;
            } else {
                next(err);
            }
            return res.redirect('/admin-dashboard');
        });
});

/**
 * Route per gestire l'azione di modifica di una categoria (ricavata dal body)
 * Richiede che l'utente abbia fatto l'accesso e che il suo ruolo sia admin.
 * @middleware ensureAdmin
 */
app.post('/admin/edit-category', ensureAdmin, (req, res) => {
    const { old_nome_categoria, new_nome_categoria } = req.body; //recupero i due nomi dalla pagina
    const cat_regex = /^[a-zA-Z\s]{2,32}$/; //solo caratteri e lunghezza da 2 a 32

    //controllo se ho un nuovo nome, e se queste rispettano il formato cat_regex
    if (!new_nome_categoria || !cat_regex.test(new_nome_categoria)) {
        req.session.error = 'Il nome della categoria deve essere un testo da 2 a 32 caratteri senza numeri.';
        return res.redirect('/admin-dashboard');
    }
    //controllo che i due nomi non siano uguali
    if(old_nome_categoria === new_nome_categoria){
        req.session.error = 'Il nome della categoria deve essere diverso da quello vecchio';
        return res.redirect('/admin-dashboard');
    }

    queryDatabase('UPDATE categorie SET nome_categoria = ? WHERE nome_categoria = ?', [new_nome_categoria, old_nome_categoria], 'run')
        .then(result => {
            if (result.changes === 0) { //verifico se è stato effettuato l'update
                req.session.error = `Nessuna categoria trovata con il nome ${old_nome_categoria}.`;
                return res.redirect('/admin-dashboard');
            }
            req.session.success = `Categoria ${old_nome_categoria} modificata in ${new_nome_categoria} con successo!`;
            return res.redirect('/admin-dashboard');
        })
        .catch(err => {
            req.session.error = `Errore durante la modifica della categoria da ${old_nome_categoria} a ${new_nome_categoria}.`;
            return res.redirect('/admin-dashboard');
        });
});

/**
 * Route per gestire l'azione di rimozione di una specifica categoria (data da :categoria)
 * Richiede che l'utente abbia fatto l'accesso e che il suo ruolo sia admin.
 * @middleware ensureAdmin
 */
app.post('/admin/delete-category/:categoria', ensureAdmin, (req, res) => {
    const nome_categoria = req.params.categoria;
    const cat_regex = /^[a-zA-Z\s]{2,32}$/;  //solo caratteri e lunghezza da 2 a 32

    /* Se ho il nome della categoria e se questo rispetta il cat_regex (questi ultmi sono extra in quanto le categorie
    già presentisono state inserite eseguendo i controlli precedenti */
    if (!nome_categoria || !cat_regex.test(nome_categoria)) {
        req.session.error = 'Il nome della categoria deve essere composto da 2 a 32 caratteri.';
        return res.redirect('/admin-dashboard');
    }

    //eliminazione categoria, uso run cosi posso avere un feedback sui cambiamenti
    queryDatabase('DELETE FROM categorie WHERE nome_categoria = ?', [nome_categoria], 'run') 
        .then(result => {
            if (result.changes === 0) {
                req.session.error = `Errore durante la rimozione della categoria ${nome_categoria}, potrebbe essere già stata eliminata o non esistere.`;
                return res.redirect('/admin-dashboard');
            }
            req.session.success = `Categoria ${nome_categoria} e i relativi film rimossi con successo.`;
            res.redirect('/admin-dashboard');
        })
        .catch(err => {
            req.session.error = `Errore durante la rimozione della categoria ${nome_categoria}.`;
            res.redirect('/admin-dashboard');
        });
});


// ------------------------------------------------------------------------------
//   Funzionalità PAGINA ACCOUNT
// ------------------------------------------------------------------------------

/**
 * Route per visualizzare la pagina di gestione del profilo.
 * Richiede che l'utente sia autenticato.
 * @middleware ensureAuthenticated
 * @next usato per inviare gli errori che verranno riprodotti in una pagina specifica
 */
app.get('/account', ensureAuthenticated, (req, res, next) => {
    const userId = req.user.id;

    queryDatabase('SELECT * FROM user WHERE id = ?', [userId], 'get')
        .then(user => {        
            //invio alla pagina la mail decifrata cosi che si possa vedere nell'account (senza doverla salvare in chiaro o decrifrarla localmente dal client)
            res.render('account', { user: {nome: user.nome, cognome: user.cognome, email: decryptEmail(user.email), telefono: user.telefono, ddn: user.ddn} });
        })
        .catch(err => {
            next(err);
        });
});

/**
 * Route per gestire le modifiche del proprio profilo
 * Richiede che l'utente sia autenticato.
 * @middleware ensureAuthenticated
 * @next usato per inviare gli errori che verranno riprodotti in una pagina specifica
 */
app.post('/account', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    //recupero i campi dalla pagina
    const { nome, cognome, email, confermaEmail, ddn, telefono, currentPassword, newPassword, confirmPassword } = req.body;

    db.get('SELECT * FROM user WHERE id = ?', [userId], async (err, user) => {
        if (err || !user) {
            return res.render('account', { user: { nome: nome || user.nome,cognome: cognome || user.cognome, email: decryptEmail(user.email), ddn: ddn || user.ddn,telefono: telefono || user.telefono},error: 'Impossibile recuperare i dati dell\'utente.' });
        }

        //combinazioni di errori per l'indirizzo email
        if (email || confermaEmail) {
            //verifica se l'email è valida
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return res.render('account', {user: { ...user, email: decryptEmail(user.email) }, warning: 'L\'email fornita non è valida.'});
            }
            //verifico che ci sia la nuova mail
            if(!email){
                return res.render('account', {user: { ...user, email: decryptEmail(user.email) }, error: 'Inserisci il nuovo indirizzo email.'});
            }
            //verifico che ci sia la conferma della mail
            if(!confermaEmail){
                return res.render('account', {user: { ...user, email: decryptEmail(user.email) }, error: 'Inserisci la conferma dell\'indirizzo email.'});
            }
            // Verifica se la nuova email è uguale a quella precedente
            if (email === decryptEmail(user.email)) {
                return res.render('account', {user: { ...user, email: decryptEmail(user.email) }, warning: 'La nuova email deve essere diversa da quella attuale.'});
            }
            //verifica se l'email e la conferma sono uguali
            if (email && email !== confermaEmail) {
                return res.render('account', {user: { ...user, email: decryptEmail(user.email) }, error: 'Le email inserite non corrispondono.'});
            }
        }

        //combinazioni di errori per la password
        if (newPassword || confirmPassword) { //controlla se l'utente ha inserito una nuova password o una conferma
            //la password attuale diventa obbligatoria se si vuole cambiare la password
            if (!currentPassword) {
                return res.render('account', { user: { ...user, email: decryptEmail(user.email) }, error: 'Inserisci la password attuale per cambiare la password.' });
            }

            //verifica la correttezza della password attuale
            let pswCompare = await bcrypt.compare(currentPassword, user.password);
            if (!pswCompare) {
                return res.render('account', { user: { ...user, email: decryptEmail(user.email) }, error: 'La password attuale non è corretta.' });
            }

            //verifica se la nuova password è stata inserita e ha la lunghezza adeguata
            if (newPassword.length < 8 || newPassword.length > 16) {
                return res.render('account', { user: { ...user, email: decryptEmail(user.email) }, warning: 'La nuova password deve essere lunga tra 8 e 16 caratteri.' });
            }

            //verifica se è stata inserita la conferma della password
            if (!confirmPassword) {
                return res.render('account', { user: { ...user, email: decryptEmail(user.email) }, error: 'Inserisci la conferma della password.' });
            }

            //controlla se la nuova password e la conferma coincidono
            if (newPassword !== confirmPassword) {
                return res.render('account', { user: { ...user, email: decryptEmail(user.email) }, error: 'La nuova password e la conferma password non corrispondono.' });
            }

            //controlla che la nuova password non sia uguale alla password attuale
            if (currentPassword === newPassword) {
                return res.render('account', { user: { ...user, email: decryptEmail(user.email) }, warning: 'La nuova password non può essere uguale a quella vecchia.' });
            }
        } else if (currentPassword) {
            let pswCompare = await bcrypt.compare(currentPassword, user.password);
            if (!pswCompare) {
                return res.render('account', { user: { ...user, email: decryptEmail(user.email) }, error: 'La password attuale non è corretta e non hai fornito una nuova password' });
            }else{
                return res.render('account', { user: { ...user, email: decryptEmail(user.email) }, warning: 'Hai inserito la password attuale ma non hai fornito una nuova password.' });
            }
        }
                
        //validazione numero di telefono
        if (telefono && !/^\d{6,16}$/.test(telefono)) { 
            return res.render('account', {user: { ...user, email: decryptEmail(user.email) }, warning: 'Il numero di telefono deve contenere solo numeri ed essere lungo tra 6 e 16 caratteri.'});
        }

        //validazione nome e cognome
        const nameRegex = /^[A-Za-zÀ-ÿ\s]{2,32}$/; //per il nome e il cognome (uso la stessa regex)
        if (nome && !nameRegex.test(nome)) {
            return res.render('account', {user: { ...user, email: decryptEmail(user.email) }, warning: 'Il nome deve contenere solo lettere ed essere lungo tra 2 e 32 caratteri.'});
        }

        if (cognome && !nameRegex.test(cognome)) {
            return res.render('account', {user: { ...user, email: decryptEmail(user.email) }, warning: 'Il cognome deve contenere solo lettere ed essere lungo tra 2 e 32 caratteri.'});
        }

        //validazione data di nascita
        if (ddn) {
            const dataInserita = new Date(ddn); //data inserita nel form
            const currentDate = new Date(); //data attuale
            const minDate = new Date(); //data minima di iscrizione
            const minRegDate = new Date(); //data minima accettata (14 anni partendo da oggi)
            const maxDate = new Date(); //età massima del calendario (non maggiore di oggi)

            minDate.setFullYear(currentDate.getFullYear() - 120);//120 anni fa partendo da oggi
            minRegDate.setFullYear(currentDate.getFullYear() - 14); //imposto che l'utente deve avere almeno 14 anni
            maxDate.setFullYear(currentDate.getFullYear()); 
        
            if (dataInserita < minDate || dataInserita > maxDate) { //se la data supera i limiti
                return res.render('account', {user: { ...user, email: decryptEmail(user.email) },error: `La data di nascita deve essere compresa tra ${minDate.toLocaleDateString()} e ${maxDate.toLocaleDateString()}.`});
            }

            if (dataInserita > minRegDate) { //se la data inserita non rispetta i limiti di età
                return res.render('account', {user: { ...user, email: decryptEmail(user.email) },error: 'Devi avere almeno 14 anni per poter utilizzare FlopFlix.'});
            }
        }

        //se abbiamo inserito una mail allora la cifriamo e la sostituiamo, altrimenti teniamo la vecchia
        let emailToUpdate = email ? encryptEmail(email) : user.email;
        //se abbiamo inserito una nuova password allora la cifriamo e la sostituiamo, altrimenti teniamo la vecchia
        let passwordToUpdate = newPassword ? await bcrypt.hash(newPassword, 10) : user.password;

        const updateQuery = `UPDATE user SET nome = ?, cognome = ?, email = ?, ddn = ?, telefono = ?, password = ? WHERE id = ?`;

        //visto che nella pagina dell'account i campi sono facoltativi (pui anche non riempirli tutti)
        //per evitare di fare una query dinamica ho preferito creare un nuovo utente updateUser
        //se i campi sono vuoi tengo i vecchi (precedenti) (nulli o con valore vecchio) mentre se sono presenti dei campi aggiornati uso quelli
        
        const updatedUser = {  //normalizzo l'utente aggiornato per poterlo comparare con l'utente attuale
            id: userId,
            email: emailToUpdate,
            password: passwordToUpdate,
            nome: nome || user.nome,
            cognome: cognome || user.cognome,
            ddn: ddn || user.ddn,
            telefono: parseInt(telefono) || user.telefono,
            ruolo: user.ruolo
        };

        if (_.isEqual(user, updatedUser)) { //uso lodash per confrontre i due oggetti utente
            return res.render('account', {user: { ...user, email: decryptEmail(user.email) }, warning: 'Non sono state apportate modifiche'});
        }
        //se passa tutti i controlli e se i due "utenti" sono diversi allora procendo ad aggiornare l'utente
        db.run(updateQuery, [updatedUser.nome, updatedUser.cognome, emailToUpdate, updatedUser.ddn, updatedUser.telefono, passwordToUpdate, userId], (err) => {
            if (err) {
                return res.render('account', { user: { ...user, email: decryptEmail(user.email) }, error: 'Errore durante l\'aggiornamento dei dati. Riprova più tardi.' });
            }

            req.login(updatedUser, (loginErr) => { //quando modifico i dati dell'utente ricarico la sessione
                if (loginErr) {
                    return res.render('account', { user: { ...user, email: decryptEmail(user.email) }, error: 'Errore durante l\'aggiornamento della sessione. Riprova più tardi.' });
                }
                res.render('account', { user: { ...updatedUser, email: decryptEmail(updatedUser.email) }, success: 'I tuoi dati sono stati aggiornati con successo.' });
            });
        });
    });
});

/**
 * Route per gestire l'eliminazione dell'account
 * Richiede che l'utente sia autenticato.
 * @middleware ensureAuthenticated
 * @next usato per inviare gli errori che verranno riprodotti in una pagina specifica
 */
app.post('/delete-account', ensureAuthenticated, (req, res, next) => {
    const userId = req.user.id;

    if (req.user.ruolo === 'admin') { //ho messo che un admin non può cancellare il suo account (questo possono farlo solo i "tecnici")
        return res.render('account', { user: req.user, error: 'Non puoi eliminare il tuo account come amministratore, contatta il reparto tecnico.' });
    }

    queryDatabase('DELETE FROM user WHERE id = ?', [userId], 'run')
        .then(result => {
            if (result.changes === 0) {
                return res.status(404).json({ error: 'Account non trovato o già eliminato.' });
            }
            req.logout(err => {
                if (err) {
                    return next(err);
                }
            //una volta eliminato l'account eseguo elimino la sessione dell'utente e lo mando alla pagina di registrazione (l'alternativa era la home)
                return res.render('register-1', { success: 'Account eliminato con successo!' });
            });
        })
        .catch(err => {
            return res.render('account', { user: req.user, error: 'Errore durante l\'eliminazione dell\'account. Riprova più tardi.' });
       });
});


// ------------------------------------------------------------------------------
//   Pagina errori
// ------------------------------------------------------------------------------

/**
 * Ci permette di gestire gli errori e di mostrarli su una pagina dedicata.
 * é possibile impostare messaggi personalizzati per i vari status code
 */
app.use((err, req, res, next) => { // per tutti gli errori
    const statusCode = err.status || 500;
    const errorMessage = err.message || "Si è verificato un errore inaspettato.";
    res.status(statusCode).render('error', {errorCode: statusCode, errorMessage: errorMessage});
});

app.use((req, res) => { //messaggio specifico per l'errore 404
    res.status(404).render('error', {errorCode: 404, errorMessage: "La pagina che stai cercando non esiste." });
});