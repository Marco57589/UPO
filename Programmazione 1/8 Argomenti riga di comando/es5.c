/*
5. Scrivere un programma che riceve (da terminale) una stringa e un carattere. 
Visualizza le stringhe ottenute separando la stringa ricevuta usando il carattare come separatore (funzione strtok). 
Restituisce al terminale:
- 0 se la separazione e' avvenuta;
- 1 se non ha ricevuto un carattere come secondo argomento;
- 2 se il numero di argomenti ricevuti e' errato. 
*/
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main(int argc, char *argv[]){

    if(argc > 3){
        puts("Numero di argomenti errato");
        return 2;
    }
    if(strlen(argv[2]) > 1){
        puts("Il secondo argomento non é un carattere ma una stringa!");
        return 2;
    }
    
    if(atoi(argv[2])){
        puts("Il secondo argomento non é un carattere");
        return 1;

    }else{
        char *parte1, *parte2, *c;
        char stringa[strlen(argv[1])];

        strcpy(stringa, argv[1]); //copio argv[1] in stringa 
        parte1 = strtok(argv[1], argv[2]);
        c = strtok(stringa, parte1);
        parte2 = strtok(c, argv[2]);

        printf("%s - %s", parte1, parte2);

    }

    return 0;
}