/*
2. Scrivere un programma che stampi in ordine inverso una sequenza di numeri inseriti dall’utente memorizzandola in un array.
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

    //Stampa
    for(i = (n-1); i >= 0; i--){
        printf("%d ", array[i]);
    }

}