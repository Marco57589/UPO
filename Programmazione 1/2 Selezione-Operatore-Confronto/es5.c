/*
5) Scrivere un programma che dato un numero intero in input, visualizza se il numero e' nullo, positivo o negativo. 
*/

#include <stdio.h>

void main(){

    int x;

    printf("Inserisci X: ");
    scanf("%d", &x); 

    if(x>-1){
        printf("Il valore di x e' positivo\n");
        if(x==0){
            printf("Il valore di x e' nullo\n");
        }
    }
  
    if(x<0){
        printf("Il valore di x e' negativo\n");
    }

}

