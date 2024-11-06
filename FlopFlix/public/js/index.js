'use strict';

/***********************************************************************************************************************************
    Script usato nel template index.ejs
 ************************************************************************************************************************************/
 
/*-------------------------------------------------------------------------------------------------------------------------
 * in questo script gestiamo l'impostanzione randomica dello sfondo nella homepage e il comportamento delle righe dei film
 -------------------------------------------------------------------------------------------------------------------------*/


document.addEventListener('DOMContentLoaded', function() { 
    setBackground();

    let navbar = document.querySelector('.navbar');
    navbar.classList.add('bg-transparent'); //nella homepage la navbar rimane trasparente fino al minimo scroll (di 1px)
});

/**
 * imposto uno sfondo dinamico che "potrebbe"(visto che il random non é mai certo)variare a ogni refresh) della home page
 */
function setBackground(){
    const mainFilm = document.getElementById("mainFilm");
    let n = Math.floor(Math.random() * 6)+1; //estraiamo un numero da 1 a 6 (numero di immagini)
    mainFilm.classList.add('film-background-' + (n));
}

/**
 * Gestisco lo scroll di una specifica riga
 * @param {document.element} element riga da far scorrere
 * @param {string} direction la direzione in cui far scorrere la lista
 */
function scrollRow(element, direction) {
    const $row = $(element).closest('.film-container'); //la riga da far scorrere
    const dimCard = $('.slider-film').outerWidth(true);//lunghezza comoreso padding e margin di una card
    //in base alla dimensione dello schermo metto in evidenza tot card
    const itemsVisible = window.innerWidth <= 480 ? 1 : 
                         window.innerWidth <= 768 ? 2 : 
                         window.innerWidth <= 1080 ? 3 : 6;

    const totalCard = $row.children('.slider-film').length; //numero totale di card per riga .slider-film
    const maxScroll = dimCard * totalCard; //lunghezza della riga (card width*n°card)
    let actualScroll = $row.scrollLeft(); //posizione attuale
    let scroll;

    if (direction === 'left') {
        if (actualScroll === 0) {
            scroll = maxScroll; //riporta alla fine
        } else {
            scroll = actualScroll - dimCard * itemsVisible;
            if (scroll < 0) {
                scroll = 0; 
            }
        }
    } else {
        //fomrmula usata per lo scroll: 
        //posizione attuale + (3.05 * ncarte in mostra) + (dimensione carta * n*carte)

        if (totalCard - itemsVisible === 1 && itemsVisible === 6) {
            if (actualScroll > maxScroll - (dimCard * totalCard)) {
                scroll = 0;
            } else {
                scroll = maxScroll;
            }
        } else {
            scroll = actualScroll +  
                        (window.innerWidth <= 480 ? 3.05*itemsVisible : 
                            window.innerWidth <= 768 ? 3.05*itemsVisible: 
                                window.innerWidth <= 1080 ? 3.05*itemsVisible : 3.05*itemsVisible)
                                    + dimCard * itemsVisible;
            if (scroll >= maxScroll || maxScroll - dimCard/2 <= scroll) {
                scroll = 0;
            }
        }
    }
    $row.scrollLeft(scroll);
}