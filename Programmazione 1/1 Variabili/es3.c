/*

3) Scrivere un programma C che esegua le seguenti operazioni:
- inizializzi tre variabili intere x, y e h;
- calcoli l'area del trapezio di basi x e y e altezza h;
- stampi a video le misure delle basi e dell'altezza e l'area del trapezio.
- in modo che l'output abbia la forma seguente:
Base1 = (valore di x)
Base2 = (valore di y)
Altezza = (valore di h)
Area = (area calcolata)

*/

#include <stdio.h>

void main(){
    int x, y, h;
    float area;

    x = 7;
    y = 3;
    h = 5;

    area = ((x+y) * h)  / 2;

    printf("Base1: %d \nBase2Y: %d \nAltezza %d\nArea: %f", x, y, h, area);

}