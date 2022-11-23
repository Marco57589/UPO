/*
2. 
Scrivere un programma che 
- genera una matrice di numeri pseudo-casuali composti da esattamente due cifre;
- visualizza la matrice;
- chiede all'utente di inserire l'indice di una colonna;
- se l'indice non e' compatibile con le dimensioni della matrice, visualizza un messaggio di errore;
- altrimenti calcola il massimo dei valori su quella colonna.
*/

#include <stdio.h>
#include <stdlib.h>  

void main(){
    int riga = 5;
    int colonna = 5;
    int mat[riga][colonna];
    int i,j = 0;
    int c = 0;
    int somma = 0;

    puts("Inserisci la colonna da controllare");
    scanf("%d", &c);
    

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            mat[i][j] = rand()%100;
        }
    }

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            printf("%d \t", mat[i][j]);
        }
        puts("");
    }

    if(c > riga){
        puts("JavaIO.IndexOutOfBound");
    }else{
        for(i = 0; i < riga; i++){
            somma += mat[i][c];
        }
        printf("La somma dei valore nella colonna %d e': %d", c, somma);
    }



}