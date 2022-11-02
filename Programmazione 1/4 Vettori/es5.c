/*
5. Scrivere un programma che memorizzi in un array una sequenza di numeri inserita dall’utente e stampi il valore massimo.
*/

#include <stdio.h>

void main(){

    int n = 0;
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

        if(array[i] > massimo){
            massimo = array[i];
        }
    }

    // Stampa
    printf("Il valore massimo e': %d ", massimo);



}