/*
1) Scrivere un programma C che esegua le seguenti operazioni:
- definisca due variabili intere x e y;
- assegni alle variabili i valori 7 e 3;
- stampi a video i valori di x e y e il loro prodotto
*/

#include <stdio.h>

void main(){
    int x, y;

    x = 7;
    y = 3;

    int prodotto = x + y;

    printf("X: %d Y: %d PRODOTTO %d", x, y, prodotto);

}