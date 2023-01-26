/*
1. Scrivere un programma che riceve (da terminale) dei valori interi strettamente positivi (quantita' indefinita). 
Restituisce al terminale:
- il risultato della somma dei valori se i valori sono presenti e strettamente positivi;
- 1 se i valori non sono tutti interi strettamente positivi;
- 0 se nessun valore e' ricevuto.
*/

#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]){ //ARGC: Argument Counter, ARGV: Argument Values

    int minore = 0;
    int somma = 0;
    

    if(argc == 1){
        puts("Non ho ricevuto argomenti");
        exit(0);
    }else{
        for(int i = 1; i < argc; i++){
            printf("ARGV[%d]: %s\n", i, argv[i]);

            if(atoi(argv[i]) > 0){
                    somma += atoi(argv[i]);
            }else{
                puts("Ho trovato un argomento negativo");
                puts("I valori inseriti non sono tutti strettamente posiivi");
                minore++;
                exit(1);
            }
        
        }

        if(minore == 0){
            puts("Tutti i valori sono strettamente positivi");
            printf("La somma degli argomenti e': %d", somma);
            return somma;
        }
    }

}