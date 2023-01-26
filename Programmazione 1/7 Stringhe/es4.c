/*
4. Scrivere un programma organizzato nelle seguenti funzioni:
- chiede all'utente di inserire la prima stringa del vettore; genera le altre stringhe incrementando progressivamente l'ultimo carattere della prima stringa;
  esempio: carta, cartb, cartc, cartd, carte, ...
- visualizza vettore di stringhe;
- effettua lo shift circolare a sinistra del vettore (ogni stringa si sposta nella posizione a sinistra, la prima parola diventa l'ultima);
  esempio: carta, cartb, cartc, cartd, carte ---> cartb, cartc, cartd, carte, carta
- main: dichiara un vettore di stringhe (mutabili) e invoca le altre funzioni. 
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define R 5
#define C 10


void crea_stringhe(char (*m)[C]){
    int aus = strlen(*(m+0));

    for(int i = 1; i < R; i++){
        strcpy(m[i], m[0]);
        m[i][aus-1] += i;
    }
    
}

void stampa(char (*m)[C]){
    for(int i = 0; i < R; i++){
        if(*(*(m+i)+0) != '\0'){
            printf("\n%d): %s",i, *(m+i));
        }
    }
}

void shift(char (*m)[C]){
    char s[C];
    strcpy(s, m[0]);
    for(int i = 0; i < R; i++){
        strcpy(m[i], m[i+1]);
    }
    strcpy(m[(R-1)], s);
}


int main(){
    char m[R][C];

    puts("Inserisci la stringa");
    scanf("%s", m[0]);


    crea_stringhe(m);
    stampa(m);

    puts("\nShiftate:");
    shift(m);
    stampa(m);

    return 0;
}