# 7) Stringhe #


## Compilazione file c
```
$ gcc -Wall file_name.c -lm 
```
## Esecuzione
```
$ ./file_name
```

<br/>
<hr/>

> ## 1. Scrivere un programma organizzato nelle seguenti funzioni:
> - Visualizza vettore di stringhe;
> - Conta quante stringhe iniziano con una lettera maiuscola, e quante stringhe iniziano con una lettera minuscola;
> - Conta quante stringhe contengono un certo carattere;
> - Main: dichiara e assegna un vettore di stringhe (immutabili), chiede all'utente un carattere, invoca le altre funzioni e visualizza i risultati dei conteggi. 

```c
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
```

<hr/>

> ##  2. Scrivere un programma organizzato nelle seguenti funzioni:
> - Carica vettore di stringhe da tastiera, una per volta;
> - Per ogni stringa, converte tutti i caratteri minuscoli in maiuscoli;
> - Visualizza vettore di stringhe;
> - Main: dichiara un vettore di stringhe (mutabili) e invoca le altre funzioni. 
```c
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
```

<hr/>

> ## 3. Scrivere un programma organizzato nelle seguenti funzioni utilizzando l'aritmetica dei puntatori:
> - Carica vettore di stringhe da tastiera, una per volta;
> - Visualizza vettore di stringhe;
> - Ricerca una parola nel vettore, individuando gli indici della prima e ultima occorrenza (-1,-1 se assente);
> - Main: dichiara un vettore di stringhe (mutabili), chiede all'utente una parola, invoca le altre funzioni e visualizza i risultati della ricerca.
*/
```c
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
```
<hr/>

> ##  4. Scrivere un programma organizzato nelle seguenti funzioni:
> - Chiede all'utente di inserire la prima stringa del vettore; genera le altre stringhe incrementando progressivamente l'ultimo carattere della prima stringa;
>   Esempio: carta, cartb, cartc, cartd, carte, ...
> - Visualizza vettore di stringhe;
> - Effettua lo shift circolare a sinistra del vettore (ogni stringa si sposta nella posizione a sinistra, la prima parola diventa l'ultima);
>   Esempio: carta, cartb, cartc, cartd, carte ---> cartb, cartc, cartd, carte, carta
> - Main: dichiara un vettore di stringhe (mutabili) e invoca le altre funzioni. 

```c
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
```
<hr/>

> ## 5.  Scrivere un programma organizzato nelle seguenti funzioni:
> - Copia in v2 le stringhe di v1 che contengono almeno 4 caratteri; se necessario, completa v2 con stringhe vuote;
> - Visualizza vettore di stringhe;
> - Confronta i due vettori di stringhe restituendo 1 se i vettori hanno le stesse stringhe nelle stesse posizioni, 0 altrimenti;
> - Main: dichiara e assegna un vettore di stringhe (immutabili) v1, dichiara un vettore di stringhe (mutabili) v2, invoca le altre 
> funzioni e visualizza i risultati del confronto. Si assume che v1 e v2 contengano lo stesso numero di stringhe.
```c
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
```
<hr/>
