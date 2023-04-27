/* Scrivere una funzione che accetta un array di interi e la sua dimensione come argomenti e restituisce
il valore massimo e il valore minimo dell'array attraverso due puntatori passati come argomenti. */

#include <stdio.h>

void get_max_min(int size, int* array,int* max, int* min){

    *min = *(array);
    for(int i = 0; i < size; i++){
        if(*max < *(array+i)){
            *max = *(array+i);
        }

        if(*(array+i) < *min){
            *min = *(array+i);
        }
    }
}

int main(){
    int array[] = {1,4,6,7,8,9,23,6,1,2,45,22};
    int size = (sizeof(array) / sizeof(array[0]));

    int max = 0;
    int min = 0;

    get_max_min(size, array, &max, &min);

    printf("Il valore massimo dell'array é %d, il valore minimo é %d", max, min);

    return 0;
}