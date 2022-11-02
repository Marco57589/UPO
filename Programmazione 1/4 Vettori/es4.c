/*
4. Scrivere un programma che memorizzi in un array una sequenza di numeri inserita dall’utente e stampi come output gli elementi pari.
*/

#include <stdio.h>

void main(){

    int n = 0;
    int valore = 0;
    int i = 0;

    puts("Quanti valori vuoi inserire?");
    scanf("%d", &n);

    int array[n];

    for(i = 0; i < n; i++){
        printf("Inserisci il valore %d :", i);
        scanf("%d", &valore);
        array[i] = valore;
    }

    // Stampa
    for(i = 0; i < n; i++){
        if(array[i]%2 == 0){
            printf("%d ", array[i]);
       }
    }

}