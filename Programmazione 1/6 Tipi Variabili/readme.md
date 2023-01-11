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

> ## 6. Creare un programma che permetta di cifrare e di decifrare una stringa (considerare solo caratteri minuscoli e senza spazi) attraverso 
> l’algoritmo di cifratura di Cesare. Ogni lettera del testo in chiaro `e sostituita nel testo cifrato dalla lettera che si trova k posizioni dopo nell > 'alfabeto. 
> Il numero k rappresenta la chiave (0 < k < 26). Per esempio, con k = 3 : ’a’ diventa ’d’, ’m’ diventa ’p’, ’z’ diventa ’c’. La stringa si decripta eseguendo
> l’operazione inversa. Si scriva un programma che tramite apposite funzioni permetta di:
>   • inserire la stringa
>   • criptare la stringa
>   • decriptarla
>   • stampare la stringa
```c
#include <stdio.h>
#include <string.h>

void inserimento_stringa(char* s){
    puts("\n--------------------");
    puts("Inserisci la Stringa: ");
    scanf(" %s", s);
}

int inserimento_valore(){
    int aus;
    puts("\n--------------------");
    puts("Inserisci K: ");
    scanf("%d", &aus);

    return aus;
}
 
void stampa_stringa(char* string){
    printf("%s", string);
}

void cifra(char* stringa, int k){
    int scarto = 0;
    int k2 = 0;

    for(int i = 0; i < strlen(stringa); i++){
        if(stringa[i] + k > 122){
            scarto = 122 - stringa[i];
            k2 = k - scarto;
            stringa[i] = 96 + k2;
        }else{
            stringa[i] += k;
        }
    }

}

void decifra(char* stringa, int k){

    int scarto = 0;
    int k2 = 0;

    for(int i = 0; i < strlen(stringa); i++){
        if(stringa[i] - k < 97){
            scarto = stringa[i] - 97;
            k2 = k - scarto;
            stringa[i] = 122 - k2;
        }else{
            stringa[i] -= k;
        }
    }

}

int main(){
    char stringa[100];
    int k = inserimento_valore();

    inserimento_stringa(stringa);

    cifra(stringa, k);
    printf("\nstringa cifrata: %s", stringa);

    decifra(stringa, k);
    printf("\nstringa decifrata: %s", stringa);


    return 0;
}

```
<hr/>
