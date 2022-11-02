/*
8. Scrivere un programma che riceva in input una sequenza di N numeri interi. I numeri sono memorizzati in un vettore. Terminato l’inserimento
della sequenza di numeri, il programma deve verificare se gli elementi del vettore sono tutti uguali tra loro.
*/

#include <stdio.h>

void main(){

    int i = 0;
    int k = 0;
    int n = 0;
    int valore = 0;

    puts("Quanti valori vuoi inserire?");
    scanf("%d", &n);
    k = n;

    int array[n];

    for(i = 0; i < n; i++){
        printf("Inserisci il valore %d: ", i);
        scanf("%d", &valore);
        array[i] = valore;
    }

    for (i = 0; i < n; i++) {
        if((i+1)< n){   //controllo overflow
            if(array[i] != array[i+1]){
                k--;
            }
        }
    }

    if(k==n){
        puts("\nTutti i valori sono uguali");
    }else{
        puts("\nNon tutti i valori sono uguali");
    }
    
}
