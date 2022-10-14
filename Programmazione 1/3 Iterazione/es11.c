/*
11) Scrivere un programma che legge da tastiera un intero n maggiore di 0 e
    stampa n seguito da tutti i suoi divisori, come negli esempi.
    Se n e' primo, stampa il messaggio "n e' un numero primo".

    Esempi di esecuzione
    --------------------

    Se n = 48 deve essere stampato

    48: 1 2 3 4 6 8 12 16 24 48

    Se n = 1764 deve essere stampato

    1764: 1 2 3 4 6 7 9 12 14 18 21 28 36 42 49 63 84 98 126 147 196 252 294 441 588 882 1764

    Se n = 1777 deve essere stampato

    1777: 1 1777
    1777 e' un numero primo
*/

#include <stdio.h>

void main(){

    int n = 0;
    int i = 0;
    int c = 0;

    while(n<1){
        puts("Inserisci n: ");
        scanf("%d", &n);
    }
    
    for(i=1; i<=n; i++){
        if(n%i == 0){
            printf("%d ", i);
        }else{
            c++;
        }
        
    }
    if((n-c)<3){
        puts("é un numero primo");
    }
}