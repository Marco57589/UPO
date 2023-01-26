/*
5.  Scrivere un programma organizzato nelle seguenti funzioni:
- copia in v2 le stringhe di v1 che contengono almeno 4 caratteri; se necessario, completa v2 con stringhe vuote;
- visualizza vettore di stringhe;
- confronta i due vettori di stringhe restituendo 1 se i vettori hanno le stesse stringhe nelle stesse posizioni, 0 altrimenti;
- main: dichiara e assegna un vettore di stringhe (immutabili) v1, dichiara un vettore di stringhe (mutabili) v2, invoca le altre 
funzioni e visualizza i risultati del confronto. Si assume che v1 e v2 contengano lo stesso numero di stringhe.
*/



#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define C 10
#define R 5

void copia(char* v1[], char v2[][C]){
    int k = 0;

    for(int i = 0; i < R; i++){
        if(v1[i] != NULL){
            if(strlen(v1[i]) > 4){
                strcpy(v2[k], v1[i]);
                k++;
            }
        }
    }
    if(R-k > 0){
        for(int i = k; i < R; i++){
            strcpy(v2[i], "\0");
        }
    }else{
        puts("Copiati");
    }
    
}

void stampa(char* v[]){
    
    for(int i = 0; i < R; i++){
        if(v[i] != NULL){
            printf("->[%s]<-\t", v[i]);
        }
    }
}

void stampa2(char v[][C]){
    
    for(int i = 0; i < R; i++){
        if(v[i][0] != '\0'){
            printf("->[%s]<-\t", v[i]);
        }
    }
}


int main(){
    char* v1[R] = {"Hip", "Bananas", "Scimmia", "Casa", "Trota"}; //inserimento non era richiesto
    char v2[R][C];

    puts("\nv1\n:");
    stampa(v1);
    copia(v1, v2);
    puts("\nv2\n:");
    stampa2(v2);

    return 0;
}