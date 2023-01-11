# 6) Tipi di variabili #


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

> ## 1. Scrivere tre versioni della funzione per il cacolo del fattoriale (X!) utilizzando rispettivamente i tipi short int, int long int.

```c
#include <stdio.h>

void fattoriale_short(int n){
    short int ris=1;

    for (int i = 1; i <= n; i++){
        ris*=i;
    }

    printf("\nil fattoriale short-int e': %hu", ris);
}

void fattoriale_long(int n){
    long int ris=1;

    for (int i = 1; i <= n; i++){
        ris*=i;
    }

    printf("\nil fattoriale long-int e': %ld", ris);
}

void fattoriale_int(int n){
    int ris=1;

    for (int i = 1; i <= n; i++){
        ris *= i;
    }

    printf("\nil fattoriale int e': %d", ris);
}

int main(){
    int num;

    printf("Inserisci un numero: ");
    scanf("%d", &num);
    printf("\n");

    fattoriale_int(num);
    fattoriale_long(num);
    fattoriale_short(num);

    return 0;
}
```

<hr/>

> ##  2.  Scrivere una funzione che: 
> - Riceve in ingresso un valore float;
> - Lo dimezza ripetutamente fino a farlo diventare uguale a 0;
> - Restituisce il numero di volte in cui il valore e' stato dimezzato. 

> Scrivere due funzioni analoghe che ricevano ingresso un valore double e long double rispettivamente.

> La funzione main 
> - Chiede all'utente di inserire un valore;
> - Invoca le tre funzioni sullo stesso valore;
> - Visualizza i risultati. 

> Eseguire il programma piu' volte inserendo valori diversi.

```c
#include <stdio.h>

int divisione_float(float n){
    int k = 0;

    while(n>0){
        n /= 2;
        k++;
    }

    return k;
}

int divisione_double(double n){
    int k = 0;

    while(n>0){
        n /= 2;
        k++;
    }

    return k;
}

int divisione_long_double(long double n){
    int k = 0;

    while(n>0){
        n /= 2;
        k++;
    }

    return k;
}

int main(){
    int num = 0;
    int n_float = 0;
    int n_double = 0;
    int n_longdouble = 0;

    puts("Inserisci n");
    scanf("%d",&num);

    n_float = divisione_float(num);
    n_double = divisione_double(num);
    n_longdouble = divisione_long_double(num);

    printf("Divisione float: %d\n", n_float);
    printf("Divisione double: %d\n", n_double);
    printf("Divisione long double: %d\n", n_longdouble);

    return 0;
}
```

<hr/>

> ## 3.  Scrivere un programma organizzato in queste funzioni:
> - Caricamento in una matrice di caratteri 8x8 di una mini-tabella ASCII che contenga tutte le lettere minuscole, tutte le lettere maiuscole, 
>   tutte le cifre e le parentesi tonde (64 caratteri complessivamente);
> - Stampa della matrice indicando per ogni carattere il codice corrispondente (8 caratteri e 8 codici per riga);>
> - Main: invoca le funzioni.
```c
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
```
<hr/>

> ##  4. Scrivere una funzione che 
> - riceve in ingresso un vettore di caratteri;
> - stampa valore e indirizzo di memoria (&) di ogni elemento;
> - stampa la dimensione del tipo char.  
>    
> Scrivere delle funzioni analoghe per vettori di tipo int, float, ecc.
> La funzione main
> - dichiara e assegna i vettori;
> - invoca le funzioni.
>
> Verificare sul terminale che la differenza tra un indirizzo di memoria e il successivo 
> corrisponda alla dimensione del tipo di dato (gli indirizzi sono espressi in esadecimale).


```c
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
```
<hr/>

> ## 5. Scrivere un programma organizzato in quattro funzioni:
> - caricamento in un vettore con tappo (-1) di una sequenza di voti interi controllando che siano compresi tra 18 e 31 (31 corrisponde a 30 e lode);
> - stampa del vettore;
> - calcolo della lunghezza del vettore;
> - calcolo della media (con decimali) dei voti, conversione della media da scala 30 a scala 110, e incremento della media di 0.25 per ogni lode;
> - main: invoca le funzioni e stampa la media finale. 
```c
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
```
<hr/>
