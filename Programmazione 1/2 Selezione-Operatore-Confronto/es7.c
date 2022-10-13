/*
    Scrivere un programma che prenda in input il raggio di una circonferenza. 
    Se il raggio e' maggiore di 0, allora il programma calcola e visualizza il valore della circonferenza e dell'area del cerchio. 
    Altrimenti visualizza il messaggio "il raggio deve essere maggiore di 0".  
*/

#include <stdio.h>

#define pg 3.14

void main(){

    int raggio;
    float area;

    printf("Inserisci il raggio: ");
    scanf("%d", &raggio); 
  

    if(raggio > 0){
        area = (raggio*raggio) * pg;
        printf("L'area della circonferenza e' %f ", area);
    }else{
        printf("Il raggio deve essere maggiore di 0");
    }



}

