/*
  5. 5.
    Scrivere un programma organizzato in quattro funzioni:
    - caricamento in un vettore con tappo (-1) di una sequenza di voti interi controllando che siano 
        compresi tra 18 e 31 (31 corrisponde a 30 e lode);
    - stampa del vettore;
    - calcolo della lunghezza del vettore;
    - calcolo della media (con decimali) dei voti, conversione della media da scala 30 a scala 110, 
        e incremento della media di 0.25 per ogni lode;
    - main: invoca le funzioni e stampa la media finale. 



*/
#include <stdio.h>

#define len 10
#define tappo -1



void stampa_vettore(int* vettore){
    int i = 0;
    for(i = 0; vettore[i] != tappo; i++){
        printf("\n Voto: %d", vettore[i]);
    }
}

int calcola_lunghezza(int* vettore){
    int k = 0;
    for(int i = 0; vettore[i] != tappo; i++){
        k++;
    }

    return len;
}

int main(){
    int vettore[len];
    int num;

    for(int i = 0; i < len; i++){
        printf("\nInserisci il voto > 18 < 32 (-1) per fermarsi): ", i);
        scanf("%d", &num);
        if(num < 18 || num > 31){
            puts("Il valore deve essere compreso tra 18 e 31");
            i--;
        }

        if(num == tappo){
            vettore[i] = tappo;
            break;
        }else{
            vettore[i] = num;
        }
    }

    stampa_vettore(&vettore);

    return 0;
}