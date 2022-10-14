/*
16) Scrivere un programma che stampi la tavola pitagorica per valori da 1 a 10
*/

#include <stdio.h>

void main(){

    int riga = 10;
    int colonna = 10;

    for(int i = 1; i<riga; i++){
        for(int j = 1; j<colonna; j++){
            printf("%d \t", i*j);
        }
        puts("\n"); 
    }
}