/*
  5. Scrivere un programma organizzato in quattro funzioni:
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
    int length = 0;

    for(int i = 0; vettore[i] != tappo; i++){
        length++;
    }

    return length;
}

void calcola_media(int lunghezza, int* vettore){
    float media = 0;

    for(int i = 0; vettore[i] != tappo; i++){
        if(vettore[i] == 31){
            media += (30*110) /30;
        }else{
            media += (vettore[i]*110) /30;
        }
    }

    media =  media/lunghezza;

    for(int i = 0; vettore[i] != tappo; i++){
        if(vettore[i] == 31){
            media += 0.25;
        }
    }

    printf("\n La media e': %f", media);
}

int main(){
    int vettore[len];
    int num;

    for(int i = 0; i < len; i++){
        printf("\nInserisci il voto [%d] che deve essere >= 18 <= 31 (-1) per fermarsi): ", i);
        scanf("%d", &num);
        if(num < 18 || num > 31){
            puts("Il valore deve essere compreso tra 18 e 31");
            i--;
        }else{
            vettore[i] = num;
        }

        if(num == tappo){
            vettore[i+1] = tappo;
            break;
        }
    }

    stampa_vettore(vettore);
    int lunghezza = calcola_lunghezza(vettore);
    calcola_media(lunghezza, vettore);

    return 0;
}
