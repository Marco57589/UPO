/*
1) Scrivere un programma che prenda in input la base e l'altezza di un triangolo.
   Se entrambi sono maggiori di 0, allora
     calcola e visualizza l'area del triangolo 
   altrimenti 
     visualizza un messaggio di errore. 

*/

#include <stdio.h>

void main(){
    int b, h;
    float area;
    
    printf("inserisci h: ");
    scanf("%d", b);
    printf("inserisci b: ");
    scanf("%d", b);


    if(b>0 && h>0){
        area = b*h;
        printf("l'area del triangolo e': %f", area);
    }else{
        puts("errore");
    }

}

