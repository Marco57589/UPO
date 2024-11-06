'use strict';

/***********************************************************************************************************************************
    Script usato nel template account.ejs
 ************************************************************************************************************************************/
 
/*------------------------------------------------------------
 * In questo script gestiamo solo l'inserimento dei limiti 
 * per il campo date e il toggle per la modifica di password e mail
 ------------------------------------------------------------*/



document.addEventListener('DOMContentLoaded', function() {
    //imposto i limiti nella selezione delle date
    let date = new Date();               //time attuale
    let mese = date.getMonth()+1;        //prendo il mese corrente
    let anno = date.getFullYear();    //anno corrente - 14 (età minima consentita)

    date = (anno-14)+'-'+mese+'-'+1;  //creo una stringa che concatena le date (anno-14, mese, primo giorno del mese)
    document.getElementById("ddn").setAttribute("max", date);
    date = (anno-120)+'-'+mese+'-'+1;  //modifico la data per ottenere l'anno attuale -120
    document.getElementById("ddn").setAttribute("min", date);

    //mostra o nascondi campi modifica mail/passowr
    document.getElementById('editMail').addEventListener('click', function (e) {
        e.preventDefault();
        const emailSection = document.getElementById('editEmailSection'); //mostro/nascondo la sezione con i campi delle mail
        emailSection.classList.toggle('show');
    });
    
    document.getElementById('editPassword').addEventListener('click', function (e) {
        e.preventDefault();
        const passwordSection = document.getElementById('editPasswordSection'); //mostro/nascondo la sezione con i campi delle password
        passwordSection.classList.toggle('show');
    });
});

