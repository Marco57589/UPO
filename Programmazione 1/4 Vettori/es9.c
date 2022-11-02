/*
9. Scrivere un programma che riceva in input una sequenza di N numeri interi. I numeri sono memorizzati in un vettore. Terminato l’inserimento
della sequenza di numeri, il programma deve verificare se il vettore contiene una sequenza di numeri ordinata in modo strettamente crescente.
*/

#include <stdio.h>

void main(){

    int i = 0;
    int k = 0;
    int n = 0;
    int valore = 0;

    puts("Quanti valori vuoi inserire?");
    scanf("%d", &n);

    int array[n];

    for(i = 0; i < n; i++){
        printf("Inserisci il valore %d: ", i);
        scanf("%d", &valore);
        array[i] = valore;
    }

    for (i = 1; i < n; i++) {
        printf("%d-%d ", array[i-1], array[i]);
        if(array[i-1] < array[i]){
            puts("minore");
            k++;
        }else{
            puts("maggiore");
        }
    }
    if(k == (n-1)){ //n-1 perché partiamo da i = 1
        puts("\nTutti i valori sono strettamente crescenti\n");
    }else{
        puts("\nNon tutti i numeri sono strettamente crescenti\n");
    }
    
}
