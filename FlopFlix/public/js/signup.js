'use strict';

/***********************************************************************************************************************************
    Script usato nel template register-2.js
 ************************************************************************************************************************************/
 
/*--------------------------------------------------------------------------------------
 * in questo script proviamo a convincere l'utente a non usare password come password
 ---------------------------------------------------------------------------------------*/

//funzione "easter" quando l'utente prova a usare password come password
function checkpsw(){
    if(document.getElementById('reg-psw-s2').value==="password"){ 
        let risposta = prompt("Sei sicuro di voler usare questa password? (si o no)");

        if(!risposta.toLowerCase().includes('si')){
            document.getElementById("reg-psw-s2").value = '';
            alert("ottima decisione");
        }else{
            alert("Non é una scelta molto saggia.... ma l'account é tuo");
            window.open('https://www.cybersecurity360.it/cybersecurity-nazionale/come-creare-password-sicura/');
        }
    }
}
