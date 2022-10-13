/*
    Scrivere un programma che prenda in input due valori e un operatore.
   Se l'operatore e' + allora calcola e visualizza la somma dei valori. 
   Se l'operatore e' - allora calcola e visualizza la differenza dei valori. 
   Se l'operatore e' * allora calcola e visualizza il prodotto dei valori.
   Se l'operatore e' / allora calcola e visualizza la divisione del primo valore per il secondo. 
   Se l'operatore e' diverso dai precedenti, allora visualizza il messaggio "operatore sconosciuto".  
*/
#include <stdio.h>

void main(){

    int n1;
    int n2;
    float risultato;
    char operatore;

    printf("inserisci n1\n");
    scanf(" %d", &n1);

    printf("inserisci operatore\n");
    scanf(" %c", &operatore);

    printf("inserisci n2\n");
    scanf(" %d", &n2);

    if(operatore=='+'){
        risultato = n1+n2;
    }else if(operatore=='-'){
        risultato = n1-n2;
    }else if(operatore=='*'){
        risultato = n1*n2;
    }else if(operatore=='/'){
        risultato = n1/n2;
    }else{
        printf("operatore non valido");
    }

    printf("Il risultato e': %f", risultato);



    
}

