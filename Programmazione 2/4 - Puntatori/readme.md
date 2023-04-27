# 4) Puntatori (Ripasso "Sperimentazioni Programmazione 2") #


## Compilazione file c
```
$ gcc -Wall file_name.c -o alias
```
## Esecuzione
```
$ ./alias (senza argomenti)
$ ./alias arg1 arg2 argn
```

<br/>
<hr/>

> ## 1. Scrivere una funzione che accetta un array di interi e la sua dimensione come argomenti e restituisce il valore massimo e il valore minimo dell'array attraverso due puntatori passati come argomenti.
```c
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
```

<hr/>

> ## 2. Scrivere una funzione che accetta un array di interi e la sua dimensione come argomenti e restituisce un array (Attraverso argomento) che contine solo gli elementi pari dell'array originale. Utilizzare il puntatore per accedere agli elementi dell'array.

```c
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
```
