/*
 2.  Scrivere una funzione che 
- riceve in ingresso un valore float;
- lo dimezza ripetutamente fino a farlo diventare uguale a 0;
- restituisce il numero di volte in cui il valore e' stato dimezzato. 

Scrivere due funzioni analoghe che ricevano ingresso un valore double e long double rispettivamente.

La funzione main 
- chiede all'utente di inserire un valore;
- invoca le tre funzioni sullo stesso valore;
- visualizza i risultati. 

Eseguire il programma piu' volte inserendo valori diversi.


*/
#include <stdio.h>

int divisione_float(float n){
    int k = 0;

    while(n>0){
        n /= 2;
        k++;
    }

    return k;
}

int divisione_double(double n){
    int k = 0;

    while(n>0){
        n /= 2;
        k++;
    }

    return k;
}

int divisione_long_double(long double n){
    int k = 0;

    while(n>0){
        n /= 2;
        k++;
    }

    return k;
}

int main(){
    int num = 0;
    int n_float = 0;
    int n_double = 0;
    int n_longdouble = 0;

    puts("Inserisci n");
    scanf("%d",&num);

    n_float = divisione_float(num);
    n_double = divisione_double(num);
    n_longdouble = divisione_long_double(num);


    printf("Divisione float: %d\n", n_float);
    printf("Divisione double: %d\n", n_double);
    printf("Divisione long double: %d\n", n_longdouble);


    return 0;
}