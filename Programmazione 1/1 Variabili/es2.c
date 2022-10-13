/*

2) Scrivere un programma C che esegua le seguenti operazioni:
- inizializzi due variabili intere x e y;
- calcoli l'area del rettangolo di lati x e y;
- stampi a video le misure dei lati e l'area del rettangolo in modo che
- l'output abbia la forma seguente:
Lato1 = (valore di x)
Lato2 = (valore di y)
Area = (area calcolata)

*/

#include <stdio.h>

void main(){

    int x = 0;
    int y = 0;
    int area = 0;

    x = 5;
    y = 4;

    area = x * y;

    printf("LatoX: %d \nLatoY: %d \nArea %d\n", x, y, area);
}
