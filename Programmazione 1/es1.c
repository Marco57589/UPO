/*
    Scrivere tre versioni della funzione per il cacolo del fattoriale (X!) utilizzando rispettivamente i tipi short int, int long int.
*/
#include <stdio.h>

void fattoriale_short(int n){
    short int ris=1;

    for (int i = 1; i <= n; i++){
        ris*=i;
    }

    printf("\nil fattoriale short-int e': %hu", ris);
}

void fattoriale_long(int n){
    long int ris=1;

    for (int i = 1; i <= n; i++){
        ris*=i;
    }

    printf("\nil fattoriale long-int e': %ld", ris);
}

void fattoriale_int(int n){
    int ris=1;

    for (int i = 1; i <= n; i++){
        ris *= i;
    }

    printf("\nil fattoriale int e': %d", ris);
}

int main(){
    int num;

    printf("Inserisci un numero: ");
    scanf("%d", &num);
    printf("\n");

    fattoriale_int(num);
    fattoriale_long(num);
    fattoriale_short(num);

    

    return 0;
}