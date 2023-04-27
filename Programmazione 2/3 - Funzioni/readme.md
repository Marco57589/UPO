# 3) File (Ripasso "Sperimentazioni Programmazione 2") #


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

> ## 1. Scrivere una funzione che accetta un array di interi e la sua dimensione come argomenti e restituisce il valore medio dell'array.
```c
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
```

<hr/>

> ## 2. Scrivere una funzione che accetta un array di interi e la sua dimensione come argomenti e restituisce il valore massimo dell'array.

```c
#include <stdio.h>

#define DIM 10

int max_value(int size, int array[]){
    int max = 0;
    int i = 0;
    int somma = 0;

    for(i = 0; i < size; i++){
        if(array[i] > max){
            max = array[i];
        }
    }

    return max;
}

int main(){
    int array[] = {1,5,7,2,3,9,6,7,1,2};

    int max = max_value(DIM, array);

    printf("il valore massimo nel vettore é %d", max);

    return  0;
}
```
