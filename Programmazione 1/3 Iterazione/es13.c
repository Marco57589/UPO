/*

13) Scrivere un programma che legge da tastiera un intero n maggiore di 0.
    e stampa i numeri interi da 0 a n, quattro per riga.

    Per incolonnare i numeri si puo' usare:
    - il carattere TAB \t
      printf("%d\t", x);

    - Assumendo che gli interi non abbiano piu' di sei cifre, 
      usare la specifica di formato "%6d", che stampa un intero usando 6 caratteri:
      printf("%6d", x);
      Se x e' uguale a 1234, x viene preceduto da due spazi, in modo da stampare complessivamente sei caratteri.


Esempio di esecuzione
--------------------

Se n e' uguale a 14 deve essere stampato

     0     1     2     3
     4     5     6     7
     8     9    10    11
    12    13    14  


*/

#include <stdio.h>

void main(){

    int n = 0;
    int k = 0;

    while(n<1){ //controllo input > 0
        puts("Inserisci n: ");
        scanf("%d", &n);
    }

    for(int i = 0; i<=n; i++){
        printf(" %d \t", i);
        k++;
        if(k==4){
            puts("\n");
            k=0;
        }
    }
}