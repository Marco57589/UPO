/*
    Scrivere un programma che dato un numero intero in input, visualizza se il numero e' pari o dispari. 
   (un numero a e' pari se il resto della divisione di a per 2 e' 0)
   Usare l'operatore % (modulo) per calcolare il resto della divisione per 2: a%2
*/

#include <stdio.h>
#include <math.h>

void main(){

    int n;

    printf("Inserisci N: ");
    scanf("%d", &n); 

    if(n%2 == 0){
        printf("Il numero inserito e' pari");

    }else{
        printf("Il numero inserito e' dispari");
    }

}