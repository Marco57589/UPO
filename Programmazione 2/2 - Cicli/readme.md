# 2) Cicli (Ripasso "Sperimentazioni Programmazione 2") #


## Compilazione file c
```
$ gcc -Wall file_name.c -o alias
```
## Esecuzione
```
$ ./alias (senza argomenti)
$ ./alias arg1 arg2 argn (con argomenti)
```

<br/>
<hr/>

> ## 1. Calcolare un fattoriale usando un ciclo
```c
#include <stdio.h>

int main(){
    int i = 0;
    int numero_da_fattorizzare = 10;
    int fattoriale = 0;

    for(i = 0 ; i < numero_da_fattorizzare; i++){
        fattoriale *= i;
    }

    printf("Il fattoriale di %d é: %d", numero_da_fattorizzare, fattoriale);

    return 0;
}
```

<hr/>

> ## 2. Numero di fibonacci

```c
int main(){
    int i;
    int lunghezza = 10;
    int n3 = 0;
    int n2 = 1;
    int n1 = 1;


    printf("\nSequenza di fibonacci per lunghezza %d", lunghezza);
    for(i = 0; i < lunghezza; i++){
        n3 = n2 + n1;
        n1 = n2;
        n2 = n3;

        printf("\n %d): %d",i,  n3);
    }
    puts("\n");

    return 0;
}
```

<hr/>

> ## 3. Numero primo
```c
int main(){
    int i = 0;
    int n = 43;

    if(n > 2){
        if(n % 2 == 0){
            if(n == 2){
                printf("%d é un numero primo", n);
            }else{
                printf("%d non é un numero primo", n);
            }
        }else{
            printf("%d é un numero primo", n);
        }

    }else{
        printf("%d non é un numero primo", n);
    }

    return 0;
}
```

<hr/>

> ## 4. Trovare la somma delle cifre di un numero
```c
int main(){

    int numero = 15; //modificabile
    int somma_cifre = 0;

    while(numero != 0){
        somma_cifre += numero % 10;
        numero /= 10;
    }

    printf("La somma delle cifre del numero %d é: %d", numero, somma_cifre);
    
    return 0;
}
```
<hr/>

> ## 5. Invertire le cifre di un numero

```c
#include <stdio.h>

int main(){
    int numero = 15;
    int numero_invertito = 0;
    int aus = 0;

    while(numero != 0){
        aus = numero % 10;
        numero_invertito = numero_invertito * 10 + aus;
        numero /= 10;
    }

    printf("Il numero %d invertito é uguale a: %d", numero, numero_invertito);

    return 0;
}
```
