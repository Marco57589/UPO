/*
10. Scrivere un programma che riceva in input una sequenza di N numeri interi. I numeri sono memorizzati in un vettore. Il programma esegue le
seguenti operazioni:

- visualizza il vettore 
- esegue uno spostamento (shift) a sinistra di una posizione del contenuto del vettore. Pertanto ogni elemento del vettore deve assumere1
il valore dell’elemento immediatamente successivo all’interno del vettore. L’elemento di indice N-1 deve assumere il valore zero.
Ad esempio dato il vettore: 1 10 15 18
Il programma deve generare il vettore: 10 15 18 0
Il programma visualizza il vettore ottenuto.

- esegue uno spostamento (shift) a destra di una posizione del con-
tenuto del vettore ottenuto nel passo precedente. Pertanto ogni ele-
mento del vettore deve assumere il valore dell’elemento immediata-
mente precedente all’interno del vettore. L’elemento di indice 0 deve
assumere il valore zero.
Ad esempio dato il vettore: 10 15 18 0
Il programma deve generare il vettore: 0 10 15 18

-Il programma visualizza il vettore ottenuto.
*/

#include <stdio.h>

void main(){

    int i = 0;
    int n = 0;
    int valore = 0;

    int left_shift_value = 0;
    int right_shift_value = 0;

    puts("Quanti valori vuoi inserire?");
    scanf("%d", &n);

    int array[n];

    for(i = 0; i < n; i++){
        printf("Inserisci il valore %d: ", i);
        scanf("%d", &valore);
        array[i] = valore;
    }

    left_shift_value = array[0];

    //stampa
    puts("\nArray:");
    for(i = 0; i < n; i++){ //stampa 
        printf("%d ", array[i]);
    }


    for(i = 0; i < n; i++){ //left shift
        array[i] = array[(i+1)];
        if(i==(n-1)){
            array[i] = left_shift_value;
        }
    }

    //stampa
    puts("\nLeft shifed array:");
    for(i = 0; i < n; i++){ 
        printf("%d ", array[i]);
    }

    right_shift_value = array[n-1];

    for(i = (n-1); i > 0; i--){ //right shift  
        array[i] = array[i-1];
    }
    array[0] = right_shift_value;

    //stampa
    puts("\nRight shifed array: "); 
    // NB: sto eseguendo il right shift sullo vettore precedentemente shiftato, quindi il risultato e' uguale al vettore di partenza.
    for(i = 0; i < n; i++){ //stampa 
        printf("%d ", array[i]);
    }
   
}
