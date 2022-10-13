/*

6) Scrivere un programma che permetta di inserire 4 numeri 
float e ne stampi la somma,la media, il prodotto.

*/

#include <stdio.h>

void main(){
	
    float num1 = 0;
    float num2 = 0;
    float num3 = 0;
    float num4 = 0;

    float somma = 0;
    float media = 0;
    float prodotto = 0;

    printf("Inserisci num1:");
    scanf("%f", &num1);
    printf("Inserisci num2:");
    scanf("%f", &num2);
    printf("Inserisci num3:");
    scanf("%f", &num3);
    printf("Inserisci num4:");
    scanf("%f", &num4);
	
//Metodo 1:
    somma = num1+num2+num3+num4;
    media = (somma / 4);
    prodotto = num1 * num2 * num3 * num4;
 
    printf("Somma: %f \nMedia: %f \nProdotto %f\n", somma, media, prodotto);
	
//Metodo 2 (Senza creazione variabili dedicate):
    printf("Somma: %f \nMedia: %f \nProdotto %f\n", (num1+num2+num3+num4), (somma / 4), (num1 * num2 * num3 * num4));

}
