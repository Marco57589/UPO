/*
6. Scrivere un programma che fa inserire una sequenza di numeri all’utente e un numero da cercare. Dopo aver esaminato la sequenza di numeri il
programma deve stampare se il numero da cercare `e presente o no.
*/

#include <stdio.h>

void main(){

    int n = 0;
    int ricerca_valore = 0;
    int valore = 0;
    int massimo = 0;

    int i = 0;

    puts("Quanti valori vuoi inserire?");
    scanf("%d", &n);

    int array[n];

    for(i = 0; i < n; i++){
        printf("Inserisci il valore %d :", i);
        scanf("%d", &valore);
        array[i] = valore;
    }

    puts("Inserisci il valore da cercare");
    scanf("%d", &ricerca_valore);

    for(i = 0; i < n; i++){
        if(array[i] == ricerca_valore){
            puts("Il valore é presente");
        }
    }

}