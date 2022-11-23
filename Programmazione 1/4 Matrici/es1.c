/*
1.  Scrivere un programma che 
- genera una matrice di numeri pseudo-casuali composti da una o due cifre;
- visualizza la matrice;
- chiede all'utente di inserire l'indice di una riga;
- se l'indice non e' compatibile con le dimensioni della matrice, visualizza un messaggio di errore;
- altrimenti calcola la somma dei valori su quella riga. 

*/

#include <stdio.h>
#include <stdlib.h>  

void main(){
    int riga = 5;
    int colonna = 5;
    int mat[riga][colonna];
    int i,j = 0;
    int r = 0;
    int somma = 0;

    puts("Inserisci la riga da controllare");
    scanf("%d", &r);
    

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            mat[i][j] = rand()%100;
        }
    }

    for(i = 0; i < riga; i++){
        printf("%d) ", i);
        for(j = 0; j < colonna; j++){
            printf("%d \t", mat[i][j]);
        }
        puts("");
    }

    if(r > riga){
        puts("JavaIO.IndexOutOfBound");
    }else{
        for(j = 0; j < colonna; j++){
            somma += mat[r][j];
        }
        printf("La somma dei valore nella riga %d e': %d", r, somma);
    }



}