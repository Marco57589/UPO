/*
3) Realizzare un programma che legga due numeri interi e controlli se il primo e' multiplo del secondo.
   (a e' multiplo di b se il resto della divisione di a per b e' 0).
*/

#include <stdio.h>

void main(){

    int a, b;

    printf("Inserisci a: ");
    scanf("%d", &a); 
    printf("\nInserisci b: ");
    scanf("%d", &b); 

    if(a%b == 0){
        printf("b e' multiplo a a");
    }else{
        printf("b non e' multiplo di a");
    }

}

