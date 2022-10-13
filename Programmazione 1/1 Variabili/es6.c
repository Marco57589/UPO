/*

6) Scrivere un programma che permetta di inserire 4 numeri 
float e ne stampi la somma,la media, il prodotto.

*/

#include <stdio.h>

void main(){

    float num1, num2, num3, num4;
    float somma, media, prodotto = 0;

    printf("Inserisci num1:");
    scanf("%f", &num1);
    printf("Inserisci num2:");
    scanf("%f", &num2);
    printf("Inserisci num3:");
    scanf("%f", &num3);
    printf("Inserisci num4:");
    scanf("%f", &num4);

    somma = num1+num2+num3+num4;
    media = (somma / 4);
    prodotto = num1 * num2 * num3 * num4;

    printf("Somma: %f \nMedia: %f \nProdotto %f\n", somma, media, prodotto);

}