//Scrivere una funzione che accetta un array di interi e la sua dimensione come argomenti e restituisce un array (Attraverso argomento) 
//che continee solo gli elementi pari dell'array originale. Utilizzare il puntatore per accedere agli elementi dell'array.


#include <stdio.h>

void only_even_array(int size, int* array, int* array_even){

    int i = 0;
    int k = 0;

    for(i = 0; i < size; i++){
        if(*(array+i) %2 == 0){
            array_even[k] = *(array+i);
            k++;
        }   
    }

    puts("Gli elementi pari dell'array sono:");
    for(i = 0; *(array_even+i) != 0; i++){
        printf("%d ", *(array_even+i));
    }
}

int main(){
    int array[] = {3,5,7,8,3,1,2,4,9,8};
    int size = 0;

    size = sizeof(array) / sizeof(array[0]);
    int array_even[size];

    only_even_array(size, array, array_even);

    return 0;
}