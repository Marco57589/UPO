/*
2. Scrivere un programma organizzato nelle seguenti funzioni:
- carica vettore di stringhe da tastiera, una per volta;
- per ogni stringa, converte tutti i caratteri minuscoli in maiuscoli;
- visualizza vettore di stringhe;
- main: dichiara un vettore di stringhe (mutabili) e invoca le altre funzioni. 
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define R 5
#define C 10

void stampa_vettore(char m[][C]){

    for(int i = 0; i < R; i++){
        if(m[i] != NULL){
            printf("%s", m[i]);
        }
        puts("\n");
    }

}

void carica_vettore(char m[][C]){

    for(int i = 0; i < R; i++){
        printf("Inserisci la [%d] stringa: ", i);
        scanf("%s", m[i]);
    }
}

void converti(char m[][C]){

    for(int i = 0; i < R; i++){
        if(m[i][0] != '\0'){
            for(int j = 0; j < strlen(m[i]); j++){
                if(islower(m[i][j])){
                    m[i][j] = toupper(m[i][j]);
                }
            }
            
        }
    }
}

int main(){
    char m[R][C];

    carica_vettore(m);
    stampa_vettore(m);
    converti(m);
    stampa_vettore(m);

    return 0;
}