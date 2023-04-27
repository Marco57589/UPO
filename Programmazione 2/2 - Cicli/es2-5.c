// Invertire le cifre di un numero

#include <stdio.h>

int main(){
    int numero = 15;
    int numero_invertito = 0;
    int aus = 0;

    while(numero != 0){
        aus = numero % 10;
        numero_invertito = numero_invertito * 10 + aus;
        numero /= 10;
    }

    printf("Il numero %d invertito é uguale a: %d", numero, numero_invertito);

    return 0;
}