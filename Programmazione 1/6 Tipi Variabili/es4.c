/*
  4. Scrivere una funzione che 
    - riceve in ingresso un vettore di caratteri;
    - stampa valore e indirizzo di memoria (&) di ogni elemento;
    - stampa la dimensione del tipo char.  
    
    Scrivere delle funzioni analoghe per vettori di tipo int, float, ecc.

    La funzione main
    - dichiara e assegna i vettori;
    - invoca le funzioni.

    Verificare sul terminale che la differenza tra un indirizzo di memoria e il successivo 
    corrisponda alla dimensione del tipo di dato (gli indirizzi sono espressi in esadecimale).

*/
#include <stdio.h>

#define len 10
#define tappo '-'



void info_vettore(char* vettore){
    int i = 0;
    for(i = 0; vettore[i] != tappo; i++){
        printf("\n Valore vettore [%d]: %c -> %p size: %d byte \t", i, vettore[i], &vettore[i], sizeof(vettore[i]));
    }
}

int main(){
    char vettore[len];
    char car;

    for(int i = 0; i < len; i++){
        printf("\nInserisci il carattere v[%d] (-) per fermarsi): ", i);
        scanf(" %c", &car);

        if(car == tappo){
            vettore[i] = tappo;
            break;
        }else{
            vettore[i] = car;
        }
    }

    info_vettore(&vettore);

    return 0;
}