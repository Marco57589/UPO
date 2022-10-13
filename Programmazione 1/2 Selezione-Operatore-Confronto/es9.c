/*
9) Scrivere un programma che prenda in input il valore di una casa e il codice della zona in cui si trova (1, 2, 3 o 4). 
   Il programma deve calcolare la tassa di proprieta' come percentuale del valore della casa. 
     In zona 1, la percentuale e' 5%. 
     In zona 2, la percentuale e' 10%.
     In zona 3, la percentuale e' 15%. 
     In zona 4, la percentuale e' 20%.
   Il programma deve visualizzare l'importo della tassa se la zona varia tra 1 e 4, altrimenti un messaggio di errore.
*/

#include <stdio.h>

#define pg 3.14

void main(){

    float casa;
    float valore;
    int zona;

    printf("Inserisci il valore della casa: ");
    scanf("%f", &casa); 

    printf("Inserisci il codice della zona: "); 
    scanf("%d", &zona); 

    if(zona > 4 || zona < 1){
        printf("codice non valido ");
    }else if(zona==1){
        valore = (casa * 1.05);
        printf("il valore della casa e' di %f:", &valore);

    }else if(zona==2){
        valore = (casa * 1.10);
        printf("il valore della casa e' di %f:", &valore);

    }else if(zona==3){
        valore = (casa * 1.15);
        printf("il valore della casa e' di %f:", &valore);

    }else{
        valore = (casa * 1.20);
        printf("il valore della casa e' di %f:", &valore);

    }


    
}

