/*
3. Scrivere un programma che riceve (da terminale) delle stringhe (quantita' indefinita). 
Visualizza la stringa ottenuta concatenando le stringhe ricevute (funzione strcat). 
Restituisce al terminale:
- 1 se non ha ricevuto nessuna stringa;
- 0 se ha ricevuto almeno una stringa. 
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]){
    int length = 0;

    if(argc > 1){
        
        for(int i = 1; i < argc; i++){
            length += strlen(argv[i]);
        }
        
        char stringa[length];
        stringa[0] = '\0';

        for(int i = 1; i < argc; i++){
            strcat(stringa, argv[i]);
        }
        printf("La stringa ottenuta é: %s", stringa);

        return 0;

    }else{
        puts("Non ho ricevuto argomenti");
        return 1;
    }
}