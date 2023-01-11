/*
  3.  Scrivere un programma organizzato in queste funzioni:
    - caricamento in una matrice di caratteri 8x8 di una mini-tabella ASCII che contenga tutte le lettere minuscole, tutte le lettere maiuscole, 
    tutte le cifre e le parentesi tonde (64 caratteri complessivamente);
    - stampa della matrice indicando per ogni carattere il codice corrispondente (8 caratteri e 8 codici per riga);
    - main: invoca le funzioni.

*/
#include <stdio.h>

#define r 8
#define c 8

// 48-57, 65-90, 97-122, 40,41

void crea_matrice(int matrice[][c]){
    int val_ascii = 40;

    for(int i = 0; i < r; i++){
        for(int j = 0; j < c; j++){
            if(val_ascii == 42){ //41 -> 48
                val_ascii = 48;
            }
            if(val_ascii == 58){ //58 -> 65
                val_ascii = 65;
            }
            if(val_ascii == 91){ //90 -> 96
                val_ascii = 97;
            }
         
            *(*(matrice + i) + j) = val_ascii;
            val_ascii++;
        }
    }
}

void stampa_matrice(int *matrice){
    puts("\n");
    for(int i = 0; i < 8; i++){
        for(int j = 0; j < 8; j++){
            printf("[%d - '%c'] \t", *(matrice + i * c + j), *(matrice + i * c + j));
        }
        puts("\n");
    }
}


int main(){
    int matrice[r][c];
    crea_matrice(&matrice);
    stampa_matrice(&matrice);

    return 0;
}