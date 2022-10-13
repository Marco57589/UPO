/*

2) Scrivere un programma che richieda in input una sequenza di n numeri interi e ne individui i primi due massimi.

*/

#include <stdio.h>

void main(){

    int n_numeri = 0;
    int n = 0;
    int i=0;
    int n_max = 0;
    int n_max2 = 0;

    puts("Inserisci n numeri");
    scanf("%d",&n_numeri);

    for(i=0; i<n_numeri; i++){
        puts("Inserisci un numero");
        scanf("%d",&n);
        

        if(n > n_max2){
            n_max2 = n;
            if(n_max2 > n_max){
                n_max2 = n_max;
                n_max = n;
            }
        }
        printf("n: %d nmax2: %d nmax: %d ", n,n_max2, n_max);


    }

    //printf("Il numero massimo e': %d, mentre il secondo massimo e': %d", n_max, n_max2);

}