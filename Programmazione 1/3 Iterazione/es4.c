/*

4) Scrivere un programma che richieda in input una sequenza di interi conclusa da 0 e ne calcoli la somma.


*/

#include <stdio.h>
#include <stdbool.h>

void main(){

    int n = -1;
    bool end = false;
    int risultato = 0;

    while(!end){
        puts("Inserisci n:");
        scanf("%d", &n);
        risultato += n;
        if(n == 0){
            end = true;
        }
    }

    printf("il risultato e': %d", risultato);
    puts("\n");


}