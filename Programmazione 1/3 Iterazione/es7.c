/*

7) Realizzare un programma che calcoli la potenza di x elevato alla n (con x ed n interi acquisiti da tastiera) usando solo il prodotto.

*/

#include <stdio.h>

void main(){

    int x = 0;
    int n = 0;
    int risultato = 1;

    puts("Inserisci x:");
    scanf("%d", &x);

    puts("Inserisci n:");
    scanf("%d", &n);

    for(int i = n; i>0; i--){
        risultato = risultato * x;
        printf("%d", risultato);
    }

    printf("la potenza di x elevato alla n e': %d", risultato);

}