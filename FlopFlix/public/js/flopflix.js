'use strict';

/***********************************************************************************************************************************
    Script implementato in tutti i template
 ************************************************************************************************************************************/
 
/*-------------------------------------------------------------------------------------------------------
 * Questo script contiene le funzioni che potrebbero essere sfruttate da più o tutte le pagine.
 -------------------------------------------------------------------------------------------------------*/

/* 
Note:
   -Ho deciso di implementare l'easter egg per una questione puramente creativa, ho cercando di renderlo il più strano possibile.

   In alcuni casi ho optato per jquery per la semplicita di lettura / numero di righe risparmiate o sia in casi in cui l'istruzione non funzionava correttamente
   (esempio lo scroll verso l'alto che dava problemi con firefox (con jquery funziona su tutti)). In generale ho preferito
   scrivere la maggiorparte del codice on javascript normale.

*/

document.addEventListener('DOMContentLoaded', function() { 

    easterEgg();

    const videoPlayer = document.getElementById('videoPlayer');
    const exitFullScreenButton = document.getElementById('exitFullScreen');

    if(videoPlayer != null){    //prevengo eventuali fullscreen bloccati
        videoPlayer.addEventListener('fullscreenchange', function() {
            if (document.fullscreenElement) {
                exitFullScreenButton.classList.add('show');
            } else {
                exitFullScreenButton.classList.remove('show');
            }
        });
    }

    //chiusura automatica del modale quando clicchiamo all'esterno
    window.onclick = function(event) {
        const modal = document.getElementById('modal');
        if (event.target == modal) {
            closeModal('modal');
        }
    }

    /* 
    https://bobbyhadz.com/blog/post-form-data-using-javascript-fetch-api
    */
    
    /**
     * Gestione dei like senza dover ricaricare la pagina, come scritto in app.js ho rimosso il redirect per ogni like (non era bello da vedere) 
     * e ho implementato un modo alternativo inviando con javascript delle fetch a una route specifica per ottenere aggiornamento e ricaricando il dom.
     * Nella pagina mylist che mostra contenuti piaciuti, (per rimuovere i film dalla pagina senza refresh) rimuovo il like con questo metodo e
     *  successivamente elimino tale elemento dal dom
     */
    document.querySelectorAll('.like-button').forEach(button => {

        button.addEventListener('click', async function(event) {
            event.preventDefault();
            const filmId = this.getAttribute('data-film-id');
            const isLiked = this.getAttribute('data-liked') === 'true'; // liked  é true? vero o falso
            
            try {
                const response = await fetch(`/toggle-like/${encodeURIComponent(filmId)}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
    
                if (data.success) { //se la fetch é andata a buon fine
                    const icon = this.querySelector('.like-icon');
                    if (isLiked) { //valore booleano impostato per ogni film
                        icon.textContent = 'favorite_border'; //metto l'icona del cuore vuoto
                        this.setAttribute('data-liked', 'false'); //imposto il film a data-liked su false

                        if (document.title === 'La mia lista') { // se sono nella pagina la mia lista
                            document.getElementById(`film-${filmId}`).remove();  //elimino questo elemento dal dom
                            const films = document.querySelectorAll('.slider-film');
                            if (films.length === 0) {  //se tolgo tutti i film dai mi piace vengo riportato alla home 
                                                        //(Scelta personale), altrimenti mettevo in vista il testo "non hai messo mi piace a nessun contenuto"
                                window.location.href = '/';
                            }
                        }
                    } else {
                        icon.textContent = 'favorite'; //metto l'icona cuore pieno
                        this.setAttribute('data-liked', 'true'); //metto a true 
                    }
                } else {
                    console.error('Errore durante l\'aggiornamento del like.');
                }
            } catch (error) {
                console.error('Errore:', error);
            }
        });
    });

    
});

/**
 * Funzione per l'easter egg.
 * L'easter egg é stato creato per sfruttare anche l'utilizzo manuale dei cookie e per integrare una funzionalità extra "nascosta".
 * Questo consiste nel ******* ** volte il ****, una volta raggiunto ** limite "flopy" si ********... per farsi perdonare
 * é necessario ******* *****, però non sempre si viene perdonati in quanto più volte viene fatto ** **** più diventa difficile.
 */
function easterEgg(){
    const body = document.body;
    if (getCookie('flopy') === 'true') {
        body.classList.add('flopy-invert');
        
        setTimeout(function() {
            let userResponse = prompt("Flopy: Ti conviene chiedermi scusa... altrimenti ti renderò le cose ancora più difficili");
            let numeroPerdoni = parseInt(getCookie('numeroPerdoni')) || 0; // Recupera il conteggio dei perdoni dal cookie
            let perdonato = Math.floor(Math.random() * numeroPerdoni) + 1;

            if (userResponse.toLowerCase().includes("scusa")) {
                if(perdonato===1){
                    body.classList.remove('flopy-invert');
                    alert("Flopy ti perdona.. però sappi che sara sempre più difficile farsi perdonare");
                    aumentaPerdoni();
                    deleteCookie('flopy');
                }else{
                    alert("Flopy crede che le tue scuse siano sincere (per riprovare ricarica la pagina)");
                    punizione();
                }
            }else{
                alert("Risposta sbagliata!");
                punizione();
            }
        }, 500);
    } else {
        console.log('Cookie flopy non trovato.');
    
        const logo = document.getElementById('logo');
        let click = 0;
        let msgIndex = 0;

        const messages = [
            "Flopy: Perché mi stai cliccando?",
            "Flopy: Smettila!",
            "Flopy: Primo avvertimento, non sfidare flopy",
            "Non ti conviene cliccare ancora, fidati di flopy!"
        ];

        logo.addEventListener('click', function () {
            click++;
            if (click <= 20) {
                if(click >= 2){
                    logo.classList.add('shake');

                    setTimeout(() => {
                        logo.classList.remove('shake');
                    }, 500);
                }
                if (click % 5 === 0) {
                    if (msgIndex < messages.length) {
                        if(msgIndex === 2){
                            body.classList.add('flopy-opacity');
                        }
                        alert(messages[msgIndex]);
                        msgIndex++;
                    }
                }
            } else {
                //al raggiungimento dei 20 click, aggiungo a tutta la pagina l'effetto 'inverso'.
                //questo verrà salvato nei cookie in modo permanente fino a quando l'utente non chiederà scusa
                body.classList.add('flopy-invert');
                setCookie('flopy', 'true');
                body.classList.remove('flopy-opacity')

                setTimeout(() => {
                    alert("Flopy ti aveva avvisato!");
                    location.reload(); 
                }, 1500);
            }   
        });
    }
}

/**
 * Funzione per impostare il "payload" di flopy
 */
function punizione() {
    $('img').attr('src', '/img/flopyAngry.jpg'); //sostituisco ogni immagine
    $('#mainFilm').css('background-image', "url('/img/flopyAngry.jpg')"); //modifico quella dello sfondo
    $('body').addClass('flopy-body'); //rimpiazzo il body con l'immagine di flopy
    //sostituisco tutti i testi con "chiedi scusa a floppy" e aggiungo l'effetto shade con l'hover
    $('h1, h2, h3, h5, p, label, a, select, button, textarea').text("Chiedi scusa a Flopy").addClass('shake-hover');
    //sostituisco e riempio tutti gli input con il valore "chiedi scusa a flopy"
    $('input').val("Chiedi scusa a Flopy").addClass('shake-hover');
    //aggiungo l'effetto anche alla navbar
    $('.slider-film, .nav-item').addClass('shake-hover');
}


/**
 * Funzione incrementare il cookie dei "perdoni"
 */
function aumentaPerdoni() { 
    //se non trovo il cookie lo creo e lo imposto 0, lo salvo incrementando il valore
    let perdoniCount = parseInt(getCookie('numeroPerdoni')) || 0;
    setCookie('numeroPerdoni', perdoniCount++);
}

/**
 * Funzione per creare un cookie nome:valore
 * @param {string} name nome del cookie
 * @param {int} value valore da salvare
 * //https://www.w3schools.com/js/js_cookies.asp
 */
function setCookie(name, value) {
    document.cookie = name + "=" + value + "; path=/;";
}

/**
 * Funzione per recuperare un cookie dato il nome
 * @param {string} name nome del cookie
 * @return {cookie} cookie trovato
 */
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}

/**
 * Funzione eliminare un cookie
 * @param {string} name nome del cookie
 */
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

/**
 * Funzione per switchare il tipo del campo input password (da text a password e viceversa)
 * @param {input} field campo input su cui fare lo switch
 */
function togglePassword(field) { //"occhiolino" toggle per mostrare/nascondere la password
    const passwordField = document.getElementById(field);
    const icon = document.getElementById("show-password");

    if (passwordField.type === 'password') {//inverto il tipo dell'input (text-password) e l'icona
        passwordField.type = 'text';
        icon.textContent="visibility";
    } else {
        passwordField.type = 'password';
        icon.textContent="visibility_off";
    }
}

/**
 * Funzione per avviare la riproduzione a schermo intero
 * @param {string} filmUrl link del video da riprodurre a schermo intero
 */
function playVideo(filmUrl) {
    const body = document.getElementById('mainBody');
    const videoPlayer = document.getElementById('fullScreenVideoOverlay');
    const showControlsIcon = document.getElementById('showControlsIcon');

    videoPlayer.classList.toggle('show');
    showControlsIcon.classList.toggle('show');
    //toggle dell'icona
    showControlsIcon.textContent = videoPlayer.classList.contains('show') ? 'arrow_drop_up' : 'arrow_drop_down'; 
    body.classList.toggle('body-hide-overflow');

    if (videoPlayer.classList.contains('show')) {
        videoPlayer.src = filmUrl;
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    } else {
        videoPlayer.src = '';
    }
}

/**
 * Funzione per mostrare i controlli (tendina e tasto exit)
 */
function showControls() {
    const showControlsIcon = document.getElementById('showControlsIcon');
    const controlBar = document.getElementById('controlBar');
    const exitFullScreen = document.getElementById('exitFullScreen');

    if (controlBar.classList.contains('show')) {
        controlBar.classList.remove('show');
        exitFullScreen.classList.remove('show');
        showControlsIcon.textContent = 'arrow_drop_up';
    } else {
        controlBar.classList.add('show');
        exitFullScreen.classList.add('show');
        showControlsIcon.textContent = 'arrow_drop_down';
    }
}

/**
 * Funzione per chiudere la riproduzione dello schermo intero
 */
function exitFullScreen() {
    const videoPlayer = document.getElementById('fullScreenVideoOverlay');
    const showControlsIcon = document.getElementById('showControlsIcon');
    const controlBar = document.getElementById('controlBar');
    const exitFullScreen = document.getElementById('exitFullScreen');
    const body = document.getElementById('mainBody');

    exitFullScreen.classList.remove('show');
    showControlsIcon.classList.remove('show');
    controlBar.classList.remove('show');

    videoPlayer.src = "";
    videoPlayer.classList.remove('show');

    body.classList.remove('body-hide-overflow');
}

let unlockMessage;
/**
 * Funzione per aggiornare il contenuto del modale con i dettagli di un film.
 * 
 * @param {string} titolo - Titolo del film.
 * @param {string} descrizione - Descrizione del film.
 * @param {number} anno - Anno di uscita del film.
 * @param {string} trailer - L'URL del trailer del film che verrà riprodotto nell'anteprima del modale.
 * @param {string} durata - Durata del film.
 * @param {string} categoria - Categoria del film.
 * @param {string} limeta - Classificazione per età del film (ad esempio, "PG-13", "R").
 * @param {string} regista - Regista del film.
 * @param {string} filmUrl - L'URL del film che verrà visualizzato nella riproduzione a schermo intero.
 * @param {string} userType - Serve per identificare se il video viene riprodotto da un guest o da un utente registrato.
 * @param {boolean} guestCanWatch - Se un utente guest può guardare il film.
 * @param {string} unlockMessage - Messaggio mostrato all'utente sul tasto per riprodurre (ad esempio, "Riproduci" "Riproduzione bloccata fino a X ").
 */
function updateModalContent(titolo, descrizione, anno, trailer, durata, categoria, limeta, regista, filmUrl, userType, guestCanWatch, unlockMessage) {
    document.getElementById('filmTitle').textContent = titolo;
    document.getElementById('filmTitle2').textContent = titolo + " (" + anno + ")";
    document.getElementById('filmDescription').textContent = descrizione;
    document.getElementById('videoPlayer').src = trailer;
    document.getElementById('filmDuration').textContent = durata;
    document.getElementById('filmCategory').textContent = categoria;
    document.getElementById('filmLimeta').textContent = limeta;
    document.getElementById('filmRegista').textContent = regista;
    document.getElementById('playButton').setAttribute('onclick', `playVideo(${filmUrl})`);

    updateButtonContent(filmUrl, userType, guestCanWatch, unlockMessage);
}

/**
 * Funzione per aggiornare il contenuto del bottone del modale (per la riproduzione)
 *  
 * @param {string} filmUrl - L'URL del film che verrà visualizzato nella riproduzione a schermo intero.
 * @param {string} userType - Serve per identificare se il video viene riprodotto da un guest o da un utente registrato.
 * @param {boolean} guestCanWatch - Se un utente guest può guardare il film.
 * @param {string} unlockMessage - Messaggio mostrato all'utente sul tasto per riprodurre (ad esempio, "Riproduci" "Riproduzione bloccata fino a X ").
 */
function updateButtonContent(filmUrl, userType, guestCanWatch, unlockMessage) {
    const playButton = document.querySelector('.choice-btn');
    const playText = document.getElementById('play-video-txt');
    const playIcon = document.getElementById('play-video');

    if (userType === 'registered') {
        playButton.onclick = () => {
            playVideo(filmUrl);
            closeModal('modal');
        };
        playButton.classList.add('small');
        playText.textContent = "Riproduci";
        playButton.disabled = false;
        playIcon.textContent = "play_arrow";
    } else if (guestCanWatch) {
        playButton.onclick = () => {
            fetch('/guest-is-watching', { method: 'POST' })
                .then(response => {
                    if (response.ok) {
                        playVideo(filmUrl);
                        closeModal('modal');
                        playButton.disabled = true;
                    } else {
                        console.error('Errore nel registrare la visione.');
                    }
                })
                .catch(error => console.error('Error:', error));
        };
        playButton.classList.remove('small');
        playText.textContent = "Riproduci gratuitamente (riproduzioni rimaste: 1)";
        playButton.disabled = false;
        playIcon.textContent = "play_arrow";
    } else {
        playButton.onclick = null;
        playText.textContent = unlockMessage;
        playButton.classList.remove('small');
        playButton.disabled = true;
        playIcon.textContent = "lock";
    }
}

/**
 * Funzione per richiedere aggiornamenti sullo stato dell'utete nel modale (il tasto per la riproduzione)
 */
async function fetchUserStatus() {
    try {
        const response = await fetch('/modal-update');
        const data = await response.json();
        return {userType: data.userType,guestCanWatch: data.guestCanWatch,unlockMessage: data.unlockMessage};
    } catch (error) {
        return null;
    }
}


let modalUpdateInterval;
/**
 * Funzione per aggiornare il contenuto del modale con i dettagli di un film.
 * 
 * @param {string} titolo - Titolo del film.
 * @param {string} descrizione - Descrizione del film.
 * @param {number} anno - Anno di uscita del film.
 * @param {string} trailer - L'URL del trailer del film che verrà riprodotto nell'anteprima del modale.
 * @param {string} durata - Durata del film.
 * @param {string} categoria - Categoria del film.
 * @param {string} limeta - Classificazione per età del film (ad esempio, "PG-13", "R").
 * @param {string} regista - Regista del film.
 * @param {string} filmUrl - L'URL del film che verrà visualizzato nella riproduzione a schermo intero.
 * @param {string} userType - Serve per identificare se il video viene riprodotto da un guest o da un utente registrato.
 * @param {boolean} guestCanWatch - Se un utente guest può guardare il film.
 * @param {string} unlockMessage - Messaggio mostrato all'utente sul tasto per riprodurre (ad esempio, "Riproduci" "Riproduzione bloccata fino a X ").
 */
function openModal(titolo, descrizione, anno, trailer, durata, categoria, limeta, regista, filmUrl) {
    fetchUserStatus().then(fetch => {
        if (fetch) { 
            const modal = document.getElementById('modal');

            updateModalContent(titolo, descrizione, anno, trailer, durata, categoria, limeta, regista, filmUrl, fetch.userType, fetch.guestCanWatch, fetch.unlockMessage);
            
            setTimeout(function () {
                modal.classList.add('show');
                modal.focus();
            }, 10);

            modalUpdateInterval = setInterval(() => {//quando il modal é aperto aggiorno il bottone ogni 5 secondi 
                if (modal.classList.contains('show')) {
                    const playText = document.getElementById('play-video-txt');

                    if (playText.textContent !== "Riproduci") {
                        fetchUserStatus().then(updatedFetch => {
                            if (updatedFetch) {
                                updateButtonContent(filmUrl, updatedFetch.userType, updatedFetch.guestCanWatch, updatedFetch.unlockMessage);
                            }
                        });
                    }
                } else {
                    clearInterval(modalUpdateInterval); 
                }
            }, 5000);
        }
    });
}

/**
 * Funzione generica per chiudere il modale
 * @param {string} modalId id del modale da chiudere
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    setTimeout(function () {
        document.body.classList.remove('body-hide-overflow');
        clearInterval(modalUpdateInterval);
    }, 10);
}