'use strict';

/***********************************************************************************************************************************
    Script usato nei template admin.ejs - browsecategory.ejs - index.ejs - mylist.ejs - search.ejs
 ************************************************************************************************************************************/
 
/*------------------------------------------------------------------------------------------------------------------
 * in questo script gestiamo il comportamento dell'header, scroll, pulsante ricerca, e animazione barra ricerca
 ------------------------------------------------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');

	//gestisco l'animazione della barra di ricerca
    searchBtn.addEventListener('click', function () {
        if (searchInput.classList.contains('show')) {   //se la barra é aperta
            setTimeout(function () {
                searchInput.classList.remove('show');
            }, 50);
        } else {//se la barra é chiusa
            searchInput.classList.remove('show');
            
            setTimeout(function () { //meto i timeout per gestire meglio l'animazione, in certi casi veniva troncata
                searchInput.classList.add('show');
                searchInput.focus();
            }, 50);
        }
    });

    window.addEventListener('scroll', function() { //al minimo scorrimeno verticale applico lo sfondo nero alla navbar 
        if(this.document.title != 'Sfoglia per categoria'){ //in quanto in sfoglia categoria la ricerca é inclusa nell'header
            let navbar = document.querySelector('.navbar'); //seleziono la navbar
    
            if(window.scrollY > 1) { //rilevo lo scorrimento e aggiungo/rimuovo la classe dello sfondo nero
                navbar.classList.remove('bg-transparent');
                navbar.classList.add('bg-black');
            } else {
                navbar.classList.remove('bg-black');
                navbar.classList.add('bg-transparent');
            }
        }
    });

    //chiudo la search-bar (se aperta) quando clicco all'esterno
    document.addEventListener('click', function (event) {
        if (!searchInput.contains(event.target) && !searchBtn.contains(event.target)) { //rileva il click sul target, con il ! invertiamo (tutti eccetto)
            if (searchInput.classList.contains('show')) {   //operiamo solo se é visibile
                setTimeout(function () {
                    searchInput.classList.remove('show');
                }, 50);
            }
        }
    });
});


