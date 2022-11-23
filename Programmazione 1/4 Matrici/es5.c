/*
5. Scrivere un programma che
- genera una matrice di numeri pseudo-casuali composti da una cifra;
- visualizza la matrice;
- chiede all'utente di inserire un valore x da cercare;
- cerca x visitando la matrice riga per riga;
- se presente, visualizza gli indici della riga e della colonna della prima occorrenza di x;
- altrimenti visualizza "assente".
*/

#include <stdio.h>
#include <stdlib.h>  

void main(){
    int riga = 3;
    int colonna = 3;
    int mat[riga][colonna];
    int i,j = 0;
    int find = 0;
    int somma = 0;

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            mat[i][j] = rand()%10;
        }
    }

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            printf("%d \t", mat[i][j]);
        }
        puts("");
    }

    puts("Inserisci il valore da cercare");
    scanf("%d", &find);

    int p = 0;
    int a = 0;

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            if(mat[i][j] == find && p==0){
                p++;
                printf("Trovato in posizione %d %d\n", i, j);
            }else{
                a++;
            }
        }
    }
    
    if(a != 0 && p==0){
        a++;
        puts("Non trovato");
    }

}