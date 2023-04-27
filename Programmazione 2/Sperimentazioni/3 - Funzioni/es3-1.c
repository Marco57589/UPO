//Scrivere una funzione che accetta un array di interi e la sua dimensione come argomenti e restituisce il valore medio dell'array.

#include <stdio.h>

#define DIM 10

int avg_value(int size, int array[]){
    int max = 0;
    int i = 0;
    int somma = 0;

    for(i = 0; i < size; i++){
        somma += array[i];
    }

    return (somma / size);
}

int main(){
    int array[] = {1,5,7,2,3,9,6,7,1,2};

    int max = max_value(DIM, array);

    printf("il valore massimo nel vettore é %d", max);

    return  0;
}
