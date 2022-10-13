/*
2) Scrivere un programma che dati in input due valori, visualizza il maggiore. 
*/

#include <stdio.h>

void main(){

    int n1 = 0;
    int n2 = 0;

    printf("Inserisci N1: ");
    scanf("%d", &n1); 
    printf("\nInserisci N2: ");
    scanf("%d", &n2); 

    if(n1 == n2){
        printf("N1 e' uguale a N2");
		
    }else{
        if(n1 > n2){            
	    printf("N1 e' maggiore di N2");
		
        }else{
            printf("N2 e' maggiore di N1");
	    
        }
	
    }

}

