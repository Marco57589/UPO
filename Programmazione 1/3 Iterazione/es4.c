/*

4) Scrivere un programma che richieda in input una sequenza di interi conclusa da 0 e ne calcoli la somma.


*/

#include <stdio.h>

void main(){

    int n = -1;
    int risultato = 0;

    while(n != 0){
        puts("Inserisci n:");
        scanf("%d", &n);
        risultato += n;
    }

    printf("il risultato e': %d", risultato);
    puts("\n");
}