/*

Scrivere un programma C che esegua le seguenti operazioni:
- inizializzi tre variabili intere x, y e h;
- calcoli l'area del trapezio di basi x e y e altezza h;
- stampi a video le misure delle basi e dell'altezza e l'area del trapezio.
- in modo che l'output abbia la forma seguente:
Base1 = (valore di x)
Base2 = (valore di y)
Altezza = (valore di h)
Area = (area calcolata)

4) Risolvere i due esercizi precedenti leggendo in input i valori dei lati (float) e
dell'altezza (float) utilizzando il metodo scanf.

*/

#include <stdio.h>

void main(){
	
    float x = 0;
    float y = 0;
    float h = 0;
    float area = 0;
    
    printf("Inserisci lato 1:");
    scanf("%f", &x);
    printf("Inserisci lato 2:");
    scanf("%f", &y);
    printf("Inserisci H:");
    scanf("%f", &h);

    area = ( (x+y) * h)  / 2;

    printf("Base1: %d \nBase2Y: %d \nAltezza %d\nArea: %f", x, y, h, area);
}
