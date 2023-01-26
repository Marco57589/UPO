/*
2. Scrivere un programma che riceve (da terminale) una stringa e un carattere.
Restituisce al terminale: 
- 1 se il carattere e' presente nella stringa (funzione strchr o strrchr);
- 0 se il carattere non e' presente nella stringa;
- 2 se il secondo argomento non e' un singolo carattere;
- 3 se il numero di argomenti non e' corretto. 
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]){

    if(strlen(argv[2]) != 1){
        puts("Il carattere inserito non é un singolo carattere");
        //return 2; //exit(2)
        return 137;
    }
    if(argc > 3){
        puts("é stato inserito un numero non valido di argomenti (il limite è 2)");
        return 3; //exit(3)
    }

    if(strchr(argv[1], argv[2][0]) != NULL){
        printf("Il carattere %s é presente nella stringa %s", argv[2], argv[1]);
        return 1; //exit(1)
        
    }else{
        puts("Il carattere non é presente nella stringa");
        return 0; //exit(0)
    }
}