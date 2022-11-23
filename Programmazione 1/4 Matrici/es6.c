/*
6. Scrivere un programma che
- genera una matrice di numeri pseudo-casuali composti da una cifra;
- visualizza la matrice;
- chiede all'utente di inserire un valore x da cercare;
- cerca x visitando la matrice colonna per colonna;
- se presente, visualizza gli indici della riga e della colonna dell'ultima occorrenza di x;
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

    int a = 0;

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            if(mat[i][j] == find){
                printf("Trovato in posizione %d %d", i, j);
                break;
            }else{
                a++;
            }
        }
    }
    
    if(a == riga*colonna){
        puts("Non trovato");
    }

}