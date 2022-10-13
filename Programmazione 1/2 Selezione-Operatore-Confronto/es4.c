/*
4) Si realizzi un programma in linguaggio C che acquisisca da tastiera un numero e stampi il valore assoluto di tale numero.
   (se il numero x inserito e' positivo o nullo, basta visualizzare x. 
    Se il numero inserito e' negativo, bisogna visualizzare -x).  
*/

#include <stdio.h>

void main(){

    int x;

    printf("Inserisci X: ");
    scanf("%d", &x); 

    if(x==0 || x>0){
        printf("Il valore di x e' positivo %d", x);
    }else{
        printf("Il valore di x e' negativo %d", x);
    }

}

