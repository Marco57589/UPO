/*
1. Scrivere un programma che, sfruttando le funzioni, permetta di calcolare l’area di un cerchio o di un quadrato. 
L’utente inserisce un numero, dichiarando se si tratta del raggio di un cerchio o del lato di un quadrato.
Se l’utente inserisce un numero negativo viene visualizzato un errore, altrimenti il sistema calcola l’area in modo appropriato.
*/

#include <stdio.h>

#define p 3.14

int area(char tipo_area, int n){
    int area = 0;

    switch (tipo_area){
        case 'q':
            area = n*n;
            break;
        case 'c':
            area = (n*n) * p;
            break;
        default:
            break;
    }

    return area;
}

void main(){

    int n = -1;
    int aus = -1;
    char tipo; // c = cerchio, q = quadrato


    while(n < 0){
        puts("Inserisci un numero");
        scanf("%d", &n);

        if(n < 0){
            puts("Il numero inserito deve essere maggiore di 0!");
        }
    }   

    puts("Questo numero e' l'area del cerchio o del quadrato? inserisci 'c' per cerchio e 'q' per quadrato");

    while(aus < 0){

        puts("Inserisci il tipo di area");
        scanf(" %c", &tipo);

        if(tipo == 'c' || tipo == 'q'){
            break;
        }else{
            puts("Valore non valido!");
        }
    }   


    aus = area(tipo = tipo, n = n);

    puts("Inserisci il tipo di area");
    printf("L'area calcolata e': %d ", aus);


}