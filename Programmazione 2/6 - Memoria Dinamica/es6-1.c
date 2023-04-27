/*
Scrivere un programma per allocare un array di interi, con dimensione e valori specificati
dall'utente, e calcolarne la somma.
*/

#include <stdio.h>
#include <stdlib.h>



int main(){
    int size = 10;
    int* array = (int*) malloc(sizeof(int) * size);
    int i = 0;
    for(i = 0; i < size; i++){
        *(array+i) = i;
    }

    for(i = 0; i < size; i++){
        printf("Array[%d] = %d\n", i, *(array+i));
    }

    free(array);

    return 0;
}