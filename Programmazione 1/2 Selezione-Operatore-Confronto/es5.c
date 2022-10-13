/*
5) Scrivere un programma che dato un numero intero in input, visualizza se il numero e' nullo, positivo o negativo. 
*/

#include <stdio.h>

void main(){

    int x = 0;

    printf("Inserisci N: ");
    scanf("%d", &n); 

    if(n >- 1){	//Per noi 0 é un valore positivo
        printf("Il valore di n e' positivo\n");
		
        if(n == 0){
            printf("Il valore di n e' nullo\n");
        }
    }
  
    if(n < 0){
        printf("Il valore di n e' negativo\n");
		
    }

}
