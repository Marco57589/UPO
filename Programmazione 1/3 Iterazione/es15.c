/*
15) Chiesti in input i valori di r e di c, stampare a video un rettangolo (o quadrato se r=c) di r righe e c colonne di caratteri X
    es. r=3 c=5
            XXXXX
            XXXXX
            XXXXX

*/

#include <stdio.h>

void main(){

    int riga = 0;
    int colonna = 0;

    puts("Inserisci riga");
    scanf("%d", &riga);

    puts("Inserisci colonna");
    scanf("%d", &colonna);


    for(int i = 0; i<riga; i++){
        for(int j = 0; j<colonna; j++){
            printf("X");
        }
        puts("\n"); 
    }
}