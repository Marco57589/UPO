/*
4.
Scrivere un programma che
- chiede all'utente di inserire i valori della prima colonna di una matrice;
- carica automaticamente le altre colonne in modo che i valori su una colonna siano il doppio dei valori sulla colonna precedente;
- visualizza la matrice.
Esempio:
3	6	12
2	4	8
5	10	20
*/

#include <stdio.h>
#include <stdlib.h>  

void main(){
    int riga = 5;
    int colonna = 5;
    int mat[riga][colonna];
    int i,j = 0;
    int value = 0;
    
    for(i = 0; i < riga; i++){
        printf("Inserisci il valore nella riga %d colonna 0\n", i);
        scanf("%d", &mat[0][j]);
    }


    puts("");
    for(i = 0; i < riga; i++){
        for(j = 1; j < colonna; j++){
            mat[i][j] = mat[i][j-1]*2;
        }
    }

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            printf("%d \t", mat[i][j]);
        }
        puts("");
    }

}