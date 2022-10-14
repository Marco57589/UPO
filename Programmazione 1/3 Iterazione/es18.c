/*
18) Scrivere un programma che legge un intero n maggiore di 1 e genera una tabella di n righe e n colonne in cui:
    - la diagonale e' composta da 0
    - la parte sopra la diagonale e' composta X
    - la parte sotto la diagonale e' composta da Y

    Esempio:    n=4

    0 X X X
    Y 0 X X
    Y Y 0 X
    Y Y Y 0

    Sulla diagonale, il numero della riga coincide con il numero della colonna. 
    Sopra la diagonale, il numero della colonna e' maggiore del numero della riga. 
    Sotto la diagonale, il numero della colonna e' minore del numero della riga.
*/

#include <stdio.h>

void main(){

    int n = 0;

     while(n<1){ //controllo input > 0
        puts("Inserisci n: ");
        scanf("%d", &n);
    }


    for(int i = 0; i<n; i++){
        for(int j = 0; j<n; j++){
            if(i==j){
                printf("0 \t");
            }else if(j>i){
                printf("X \t");
            }else{
                printf("Y \t");
            }
        }
        printf("\n");
    }
}