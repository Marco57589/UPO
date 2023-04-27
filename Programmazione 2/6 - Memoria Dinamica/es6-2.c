/* Scrivere delle funzioni per gestire la creazione di array dinamici (di tipo char). 
Le funzioni create_array, expand_array, e delete_array, dovranno allocare, espandere e liberare la memoria dell'array. */

#include <stdio.h>
#include <stdlib.h>

char *create_array(int size){
    char *array = (char*) malloc(sizeof(char) * size);
    char carattere = 'c';

    if(array == NULL){
        fprintf(stderr, "Errore nell'allocazione della memoria!");
        return NULL;
    }
    
    for(int i = 0; i < size; i++){
        *(array+i) = carattere+i; 
    }

    return array;
}

char *expand_array(int old_size, int new_size, char* array){

    array = realloc(array, new_size);

    if(array == NULL){
        fprintf(stderr, "Errore nell'allocazione della memoria!");
        return NULL;
    }

    for(int i = old_size; i < new_size; i++){
        *(array+i) = 'z';
    }

    return array;
}

void delete_array(char* array){
    free(array);
}

void print_array(char* array, int size){
    for(int i = 0; i < size; i++){
        printf("Array[%d] = %c\n", i, *(array+i));
    }
}

int main(){
    int size = 10;
    char* array = create_array(10);

    puts("\nArray iniziale:");
    print_array(array, size);

    int new_size = size + size/2;
    expand_array(size, new_size, array);

    puts("\nArray dopo l'espansione");
    print_array(array, new_size);

    delete_array(array);

    puts("\nArray dopo essere stato elimitato: ");
    print_array(array, new_size);
  
    return 0;
}