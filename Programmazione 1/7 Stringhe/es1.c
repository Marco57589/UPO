/*
1. Scrivere un programma organizzato nelle seguenti funzioni:
- visualizza vettore di stringhe;
- conta quante stringhe iniziano con una lettera maiuscola, e quante stringhe iniziano con una lettera minuscola;
- conta quante stringhe contengono un certo carattere;
- main: dichiara e assegna un vettore di stringhe (immutabili), chiede all'utente un carattere, invoca le altre funzioni e visualizza i risultati dei conteggi. 
*/

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

#define R 5

void stampa(char* v[]){
    for(int i = 0; i < R; i++){
        if(v[i] != NULL){
            printf(" %s", v[i]);
        }
    }
}

void conta_iniziali(char* v[], int* maiuscole, int* minuscole){
    for(int i = 0; i < R; i++){
        if(v[i] != NULL){
            if(isupper(v[i][0])){
                (*maiuscole)++;
            }else{
                (*minuscole)++;
            }
        }
    }

}

int conta_carattere(char* v[], char c){
    int conta = 0;

    for(int i = 0; i<R; i++){
        if(v[i] != NULL){
            for(int j = 0; j < strlen(v[i]); j++){
                if(v[i][j] == c){
                    conta++;
                }
            }
        }
    }

    return conta;
}

int main(){
    char* v[R] = {"Ciao,", "come", "stai?"};
    int maiuscole = 0;
    int minuscole = 0;
    char carattere;
    int n_carattere = 0;

    stampa(v);
    conta_iniziali(v, &maiuscole, &minuscole);
    printf("\n Maiuscole: %d Minuscole: %d", maiuscole, minuscole);

    puts("\nInserisci il carattere da contare: ");
    scanf("%c", &carattere);
    n_carattere = conta_carattere(v, carattere);
    printf("Il carattere: %c e' presente per: %d volte", carattere, n_carattere);


}

