// Trovare la somma delle cifre di un numero

#include <stdio.h>

int main(){

    int numero = 15;
    int somma_cifre = 0;

    while(numero != 0){
        somma_cifre += numero % 10;
        numero /= 10;
    }

    printf("La somma delle cifre del numero %d é: %d", numero, somma_cifre);
    
    return 0;
}