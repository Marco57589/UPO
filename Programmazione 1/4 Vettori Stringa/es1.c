/*
1. 
Scrivere un programma che chiede all'utente di inserire una password.
La password deve contenere:
- almeno 8 caratteri
- almeno una lettera maiuscola
- almeno una lettera minuscola
- almeno una cifra
- almeno un simbolo di punteggiatura (. , ; : ? !)
- almeno un carattere speciale (@ # * $ %)
Se la password non rispetta tutti i requisiti si visualizza un messaggio di errore e si ripete la richiesa fino a quando la password non e' adeguata. 
Se la password e' corretta si visualizza un messaggio di accettazione.

*/

#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#include <ctype.h>

void main(){
    
    char password[100];
    char errori[] = {'#', ';', '1', 'A', 'a', 'L'}; //carattere speciale, punteggiatura, cifra, maiuscola, minuscola, lunghezza
    int controlli[] = {0,0,0,0,0,0};
    int corretto = 0;
    int i,j = 0;

    while(corretto != 6){
    

        for(j = 0; j < 6; j++){ //reset conrolli
            controlli[j] = 0;
        }
        corretto = 0;

        puts("\nInserisci la password");
        scanf("%s", password);


        for(i = 0; i < strlen(password); i++){
            if(password[i] == '@' || password[i] == '#' || password[i] ==  '*' || password[i] == '$' || password[i] == '%'){
                controlli[0] = 1;
            }
            if(password[i] == '.' || password[i] == ',' || password[i] ==  ';' || password[i] == ':' || password[i] == '?' || password[i] == '!'){
                controlli[1] = 1;
            }
            if(isdigit(password[i])){
                controlli[2] = 1;
            }
            if(password[i] >= 'A' && password[i] <= 'Z'){
                controlli[3] = 1;
            }
            if(password[i] >= 'a' && password[i] <= 'z'){
                controlli[4] = 1;
            }
        }
        if(strlen(password) >= 8){
            controlli[5] = 1;
        }

        puts("\nControllo password");

        for(j = 0; j < 6; j++){
            if(controlli[j] == 1){
                printf("\nCarattere - %c V", errori[j]);
                corretto++;
            }else{
                printf("\nCarattere - %c X", errori[j]);
            }
        }
    }
    puts("Password accettata");



}