/*
3. Scrivere un programma organizzato nelle seguenti funzioni utilizzando l'aritmetica dei puntatori:
- carica vettore di stringhe da tastiera, una per volta;
- visualizza vettore di stringhe;
- ricerca una parola nel vettore, individuando gli indici della prima e ultima occorrenza (-1,-1 se assente);
- main: dichiara un vettore di stringhe (mutabili), chiede all'utente una parola, invoca le altre funzioni e visualizza i risultati della ricerca.
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define R 5
#define C 10

void carica(char (*m)[C]){;
    for(int i = 0; i < R; i++){
        printf("Inserisci la stringa %d: ", i);
        scanf("%s", *(m+i)); 
    }
}

void visualizza(char (*m)[C]){
    for (int i = 0; i < R; i++){
        if(*(*(m+i)+0) != '\0'){
            printf("%d %s\n", i, *(m+i));
        }
    }
        
}

void cerca(char (*m)[C], char* v, int* prima, int* ultima){
    for (int i = 0; i < R; i++){
        if(*(*(m+i)+0) != '\0'){
            if(strcmp(*(m+i), v) == 0){
                *ultima = i;
                if(*prima == -5){
                    *prima = i;
                }
            }
        }
    }
}

int main(){
    char m[R][C];
    int prima = -5;
    int ultima = -5;
    char string[C];


    carica(m);
    visualizza(m);

    puts("Inserisci la stringa da cercare");
    scanf("%s", string);
    cerca(m, string, &prima, &ultima);

    if(prima == -5 && ultima == -5){
        puts("Assente");
    }else{
        printf("Prima in indice: %d, Ultima in indice: %d", prima, ultima);
    }

    return 0;
}