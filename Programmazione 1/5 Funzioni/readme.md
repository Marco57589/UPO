# 5) Funzioni #


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

> ## 1. Scrivere un programma che, sfruttando le funzioni, permetta di calcolare l’area di un cerchio o di un quadrato. L’utente inserisce un numero, dichiarando se si tratta del raggio di un cerchio o del lato di un quadrato. Se l’utente inserisce un numero negativo viene visualizzato un errore, altrimenti il sistema calcola l’area in modo appropriato.
```c
#include <stdio.h>

#define p 3.14

int area(char tipo_area, int n){
    int area = 0;

    switch (tipo_area){
        case 'q':
            area = n*n;
            break;
        case 'c':
            area = (n*n) * p;
            break;
        default:
            break;
    }

    return area;
}

int main(){

    int n = -1;
    int aus = -1;
    char tipo; // c = cerchio, q = quadrato
    
    while(n < 0){
        puts("Inserisci un numero");
        scanf("%d", &n);

        if(n < 0){
            puts("Il numero inserito deve essere maggiore di 0!");
        }
    }   

    puts("Questo numero e' l'area del cerchio o del quadrato? inserisci 'c' per cerchio e 'q' per quadrato");

    while(aus < 0){

        puts("Inserisci il tipo di area");
        scanf(" %c", &tipo);

        if(tipo == 'c' || tipo == 'q'){
            break;
        }else{
            puts("Valore non valido!");
        }
    }   

    aus = area(tipo = tipo, n = n);

    puts("Inserisci il tipo di area");
    printf("L'area calcolata e': %d ", aus);
    
    return 0;
}
```

<hr/>

> ## 2. Scrivere un programma che permetta di inserire due vettori lunghi N e stampi un terzo vettore i cui elementi sono la somma degli elementi dei due vettori in input. Il programma utilizza 3 funzioni:
> • Inserisci elementi nel vettore
> • Calcola somma
> • Stampa vettore

```c
#include <stdio.h>

int crea_vettore(int vettore[], int lunghezza){
    int i=0;

    for(i=0; i < lunghezza; i++){
        printf("Inserisci il [%d] valore: ", i);
        scanf("%d", &vettore[i]);
    } 
    puts("Vettore creato!");
    return vettore;
}

void stampa_vettore(int vettore[], int n){
    for(int i = 0; i < n; i++){
        printf("%d \t", vettore[i]);
    }
}

int somma_vettori(int vettore1[], int  vettore2[], int somma[], int n){
    for(int i = 0; i < n; i++){
        somma[i] = vettore1[i] + vettore2[i];
    }
    return somma;
}


int main(){

    int lunghezza = -1;

    while(lunghezza < 0){
        puts("Inserisci N (MAGGIORE DI 0)");
        scanf("%d", &lunghezza);
        if(lunghezza < 0){
            puts("Il numero inserito deve essere maggiore di 0!");
        }
    }  
    
    int vettore1[lunghezza];
    int vettore2[lunghezza];
    int somma[lunghezza];

    crea_vettore(vettore1, lunghezza);
    crea_vettore(vettore2, lunghezza);

    somma_vettori(vettore1, vettore2, somma, lunghezza);

    puts("");
    puts("Vettore1:");
    stampa_vettore(vettore1, lunghezza);
    puts("\nVettore2:");
    stampa_vettore(vettore2, lunghezza);
    puts("\nSomma:");
    stampa_vettore(somma, lunghezza);
    
    return 0;
}
```

<hr/>

> ## 3. Scrivere un programma che calcola il fattoriale di un numero. Il programma conterra una funzione denominata fatt, che calcola il fattoriale di un numero intero passato come parametro e che restituisce il risultato.
> Si consiglia di utilizzare il tipo double per il valore di ritorno in quanto la funzione fattoriale cresce molto velocemente.
> Il calcolo del fattoriale deve essere ottenuto in maniera iterativa (ciclo for o ciclo while).
> f att(N ) = 1 ∗ 2 ∗ 3 ∗ . . . ∗ (N )
> f att(0) = 1
```c
#include <stdio.h>

double calcola_fattoriale(int n){
    int i = 0 ;
    for(i = (n-1); i>1; i--){
        n *= i;
    }
    return n;
}

int main(){
    int n = -1;
    double fattoriale = 0;

     while(n < 0){
        puts("Inserisci N (MAGGIORE DI 0)");
        scanf("%d", &n);
        if(n < 0){
            puts("Il numero inserito deve essere maggiore di 0!");
        }
    }  
    
    fattoriale  = calcola_fattoriale(n);

    printf("Il fattoriale di %d é: %f", n, fattoriale);
    
    return 0;
}
```

<hr/>

> ## 4. Scrivere un programma che, utilizzando le funzioni, calcoli la media, il massimo e il minimo di un array di numeri reali Utilizzare le funzioni:
> leggi(): permette di inserire il vettore di numeri 
> media(): calcola e ritorna la media
> max(): calcola e ritorna il valore massimo
> min(): calcola e ritorna il valore minimo
> stampa(): visualizza il vettore, la media e il massimo e il minimo
```c
#include <stdio.h>

int media_array(int vettore[], int lunghezza){
    int media = 0;

    for(int i = 0; i < lunghezza; i++){
        media += vettore[i];
    }

    media = media / lunghezza;

    return media;
}

int massimo_array(int vettore[], int lunghezza){
    int massimo = 0;

    for(int i = 0; i < lunghezza; i++){
        if(vettore[i] > massimo){
            massimo = vettore[i];
        }
    }

    return massimo;
}

int minimo_array(int vettore[], int lunghezza){
    int min = 0;

    min = vettore[0]; //altrimenti, visto che é inizializzato a 0 questo rimarrà sempre 0

    for(int i = 0; i < lunghezza; i++){
        if(vettore[i] < min){
            min = vettore[i];
        }
    }

    return min;
}

int inserimento(){
    int aus;
    puts("\n--------------------");
    puts("Inserisci N: ");
    scanf("%d", &aus);
    puts("--------------------");

    return aus;
}

int crea_vettore(int vettore[], int lunghezza){
    int i=0;

    for(i=0; i < lunghezza; i++){
        printf("Inserisci il [%d] valore: ", i);
        scanf("%d", &vettore[i]);
    } 
    puts("Vettore creato!");
    return vettore;
}

void stampa_vettore(int vettore[], int n){
    for(int i = 0; i < n; i++){
        printf("%d \t", vettore[i]);
    }
}

int main(){
    int n = inserimento();
    int vettore[n];
    crea_vettore(vettore, n);
    stampa_vettore(vettore, n);

    int massimo = 0;
    int minimo = 0;
    int media = 0;

    massimo = massimo_array(vettore,  n);
    minimo = minimo_array(vettore, n);
    media = media_array(vettore, n);

    printf("\nMassimo nel vettore: %d | Minimo nel vettore: %d | Media del vettore: %d", massimo, minimo, media);

    return 0;
}
```
<hr/>

> ## 5. Si scriva un programma C che richiami tre funzioni:
> • Inserimento degli elementi in un vettore X
> • Funzione cerca, che ricerchi la presenza di un elemento in un vettore di interi.
> La funzione riceve in ingresso tre parametri:
>   – un vettore di interi v[] nel quale ricercare il valore;
>   – un un valore intero N che indica quanti elementi contiene il vettore;
>   – il valore intero x che deve essere ricercato. 
> La funzione deve restituire un valore intero, ed in particolare:
>   – se il valore x é presente nel vettore, allora la funzione restituisce l’indice della posizione alla quale si trova tale valore;
>   – se il valore x é presente più volte, si restituisca l’indice della prima occorrenza;
>   – se il valore x non é presente nel vettore, si restituisca -1.


```c
#include <stdio.h>

int inserimento(){
    int aus;
    puts("\n--------------------");
    puts("Inserisci N: ");
    scanf("%d", &aus);
    puts("--------------------");

    return aus;
}

int crea_vettore(int vettore[], int lunghezza){
    int i=0;

    for(i=0; i < lunghezza; i++){
        printf("Inserisci il [%d] valore: ", i);
        scanf("%d", &vettore[i]);
    } 
    puts("\nVettore creato!");
    return vettore;
}

int cerca(int vettore[], int lunghezza, int trova){
    int x = -1;

    for(int i = 0; i < lunghezza; i++){
       if(vettore[i] == trova){
            return i;
       }
    } 

    return x;
}
 
void stampa_vettore(int vettore[], int n){
    for(int i = 0; i < n; i++){
        printf("%d \t", vettore[i]);
    }
}

int main(){
    int n = inserimento();
    int vettore[n];
    crea_vettore(vettore, n);
    stampa_vettore(vettore, n);

    int valore_da_trovare = inserimento();

    printf("Risultato funzione cerca: %d", cerca(vettore, n, valore_da_trovare));

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
