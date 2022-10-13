/*

5) Scrivere un programma che prenda due numeri in input e li stampi nell'ordine
inverso.

*/

#include <stdio.h>

void main(){
	
    float num1 = 0;
    float num2 = 0;

    printf("Inserisci num1:");
    scanf("%f", &num1);
    printf("Inserisci num2:");
    scanf("%f", &num2);

    printf("Num2: %f \nNum1: %f", num2, num1);
}
