/*
3.
Scrivere un programma che
- chiede all'utente di inserire i valori della prima riga di una matrice;
- carica automaticamente le altre righe in modo che i valori su una riga siano i successivi dei valori sulla riga precedente;
- visualizza la matrice.
Esempio:
3	2	5
4	3	6
5	4	7
*/

#include <stdio.h>
#include <stdlib.h>  

void main(){
    int riga = 5;
    int colonna = 5;
    int mat[riga][colonna];
    int i,j = 0;
    int value = 0;
    
    for(j = 0; j < colonna; j++){
        printf("Inserisci il valore nella riga 0 colonna %d\n", j);
        scanf("%d", &mat[0][j]);
    }


    puts("");
    for(i = 1; i < riga; i++){
        for(j = 0; j < colonna; j++){
            mat[i][j] = mat[i-1][j]+1;
        }
    }

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            printf("%d \t", mat[i][j]);
        }
        puts("");
    }

}