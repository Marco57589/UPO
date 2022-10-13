/*

6) Realizzare un programma che calcoli il prodotto di due interi x ed y acquisiti da tastiera,  usando solo la somma. 

*/

#include <stdio.h>

void main(){

    int x = 0;
    int y = 0;
    int risultato = 0;

    puts("Inserisci x:");
    scanf("%d", &x);

    puts("Inserisci y:");
    scanf("%d", &y);

    for(int i = y; i>0; i--){
        risultato += x;
    }

    printf("il prodotto dei numeri e': %d", risultato);


}