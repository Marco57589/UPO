/*
6) Scrivere un programma che dati in input tre valori, visualizza il maggiore. 
*/

#include <stdio.h>

void main(){

    int n1 = 0;
	int n2 = 0;
	int n3 = 0;

    printf("Inserisci N1: ");
    scanf("%d", &n1); 
    printf("Inserisci N2: ");
    scanf("%d", &n2); 
    printf("Inserisci N3: ");
    scanf("%d", &n3);

    if(n1 > n2 && n1 > n3){
        printf("Il numero maggiore e' N1");
		
    }else if(n2 > n1 && n2 > n3){
        printf("Il numero maggiore e' N2");
		
    }else{
        printf("Il numero maggiore e' N3");
		
    }
}
