'use strict';
 
/***********************************************************************************************************************************
    Script usato nel template admin.ejs
 ************************************************************************************************************************************/
 
/*-------------------------------------------------------------------------
 * In questo script gestiamo solo i modali per le modifiche amministrative.
 ------------------------------------------------------------------------*/

/**
 * Funzione per impostare i valori del film che vogliamo modificare all'iterno del modale per poi mostrarlo
 */
function openFilmEditModal(id, titolo, durata, categoria, anno, regista, trailer, descrizione, vietatoMinori) {
    document.getElementById('editFilmModal').classList.add('show');
    document.getElementById('editFilmForm').action = '/admin/edit-film/' + encodeURIComponent(id);
    document.getElementById('editTitolo').value = titolo;
    document.getElementById('editDurata').value = durata;
    document.getElementById('editCategoria').value = categoria;
    document.getElementById('editAnno').value = anno;
    document.getElementById('editRegista').value = regista;
    document.getElementById('editTrailer').value = trailer;
    document.getElementById('editDescrizione').value = descrizione;
    document.getElementById('editVietatoMinori').value = vietatoMinori;
}

/**
 * Funzione per impostare i valori della categoria nel modale per poi aprirlo. Se ci fossero stati altri parametri da modificare singolarmente,
 * Esempio nel casi si decidesse di implementare la modifica del ruolo per gli utenti questo  modale sarebbe stato usato in modo "generico"
 * per tutte le modifich che richiedevano la modifica di un singolo campo.
 * Nota: non é stato implementato perché ritenuto non idoneo al progetto (forse se fosse stato un gestore di articoli / blog ) 
 */
function openEditModal(categoria) {
    document.getElementById('editModal').classList.add('show');
    document.getElementById('oldCategoriaText').textContent = decodeURIComponent(categoria);
    document.getElementById('oldCategoria').value = decodeURIComponent(categoria);
}