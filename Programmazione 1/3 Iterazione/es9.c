/*

8) Scrivere un programma che legge n da tastiera e ne calcola il fattoriale (n!). 
   Esempio: n=4   fatt(n)=1*2*3*4=24
            n=1   fatt(n)=1
	        n=0   fatt(n)=1
*/

#include <stdio.h>

void main(){

    int n = 0;
    int risultato = 1;

    puts("Inserisci il numero da 'fattorizzare' :");
    scanf("%d", &n);

    for(int i = 1; i<n; i++){
        risultato = risultato * i;
        printf("%d", risultato);
    }

    printf("la potenza di x elevato alla n e': %d", risultato);

}