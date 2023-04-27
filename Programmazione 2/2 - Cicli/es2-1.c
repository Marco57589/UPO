// Calcolare un fattoriale usando un ciclo

#include <stdio.h>

int miain(){
    int i = 0;
    int numero_da_fattorizzare = 10;
    int fattoriale = 0;

    for(i = 0 ; i < numero_da_fattorizzare; i++){
        fattoriale *= i;
    }

    printf("Il fattoriale di %d é: %d", numero_da_fattorizzare, fattoriale);

    return 0;
}