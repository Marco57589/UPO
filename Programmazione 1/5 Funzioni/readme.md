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

> ## 1. Scrivere un programma che, sfruttando le funzioni, permetta di calcolare l’area di un cerchio o di un quadrato. 
> L’utente inserisce un numero, dichiarando se si tratta del raggio di un cerchio o del lato di un quadrato.
> Se l’utente inserisce un numero negativo viene visualizzato un errore, altrimenti il sistema calcola l’area in modo appropriato.
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

> ## 2. Scrivere un programma che permetta di inserire due vettori lunghi N e
> stampi un terzo vettore i cui elementi sono la somma degli elementi dei
> due vettori in input. Il programma utilizza 3 funzioni:
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

> ## 3. Scrivere un programma che calcola il fattoriale di un numero. Il programma conterra una funzione denominata fatt, che calcola il fattoriale
> di un numero intero passato come parametro e che restituisce il risultato.
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

> ## 5. Scrivere un programma che memorizzi in un array una sequenza di numeri inserita dall’utente e stampi il valore massimo.
> 

```c
#include <stdio.h>

void main(){

    int n = 0;
    int valore = 0;
    int massimo = 0;

    int i = 0;

    puts("Quanti valori vuoi inserire?");
    scanf("%d", &n);

    int array[n];

    for(i = 0; i < n; i++){
        printf("Inserisci il valore %d :", i);
        scanf("%d", &valore);
        array[i] = valore;

        if(array[i] > massimo){
            massimo = array[i];
        }
    }

    // Stampa
    printf("Il valore massimo e': %d ", massimo);

}
```
<hr/>

> ## 6. Scrivere un programma che fa inserire una sequenza di numeri all’utente e un numero da cercare. Dopo aver esaminato la sequenza di numeri il programma deve stampare se il numero da cercare `e presente o no.
> 

```c
#include <stdio.h>

void main(){

    int n = 0;
    int ricerca_valore = 0;
    int valore = 0;
    int massimo = 0;

    int i = 0;

    puts("Quanti valori vuoi inserire?");
    scanf("%d", &n);

    int array[n];

    for(i = 0; i < n; i++){
        printf("Inserisci il valore %d :", i);
        scanf("%d", &valore);
        array[i] = valore;
    }

    puts("Inserisci il valore da cercare");
    scanf("%d", &ricerca_valore);

    for(i = 0; i < n; i++){
        if(array[i] == ricerca_valore){
            puts("Il valore é presente");
        }
    }

}
```
<hr/>

> ## 7. Si scriva un programma che acquisisca da tastiera una parola (cioé una stringa di caratteri priva di separatori) e la stampi a video se e solo se tale parola é palindroma, ossia leggibile nello stesso modo da destra a sinistra e viceversa (es. OSSESSO).
> 

```c
include <stdio.h>
#include <string.h>

void main(){

    int i = 0;
    int k = 0;
    int not_equal = 0;
    char aus[20];

    puts("inserisci la stringa da controllare");
    scanf("%s", aus);

    k = strlen(aus)-1;


    for (i = 0; i < strlen(aus)/2; i++) {
        if(aus[i] != aus[k]){
            puts("La frase non é un palindromo");
        }else{
            not_equal++;
        }
        k--;
    }
    if(not_equal > 0){
        puts("La frase é un palindromo");
    }
    
}


```
<hr/>

> ## 8. Scrivere un programma che riceva in input una sequenza di N numeri interi. I numeri sono memorizzati in un vettore. Terminato l’inserimento della sequenza di numeri, il programma deve verificare se gli elementi del vettore sono tutti uguali tra loro.
> 

```c
#include <stdio.h>

void main(){

    int i = 0;
    int k = 0;
    int n = 0;
    int valore = 0;

    puts("Quanti valori vuoi inserire?");
    scanf("%d", &n);
    k = n;

    int array[n];

    for(i = 0; i < n; i++){
        printf("Inserisci il valore %d: ", i);
        scanf("%d", &valore);
        array[i] = valore;
    }

    for (i = 0; i < n; i++) {
        if((i+1)< n){   //controllo overflow
            if(array[i] != array[i+1]){
                k--;
            }
        }
    }

    if(k==n){
        puts("\nTutti i valori sono uguali");
    }else{
        puts("\nNon tutti i valori sono uguali");
    }
    
}

```
<hr/>

> ## 9. Scrivere un programma che riceva in input una sequenza di N numeri interi. I numeri sono memorizzati in un vettore. Terminato l’inserimento della sequenza di numeri, il programma deve verificare se il vettore contiene una sequenza di numeri ordinata in modo strettamente crescente.
> 

```c
#include <stdio.h>

void main(){

    int i = 0;
    int k = 0;
    int n = 0;
    int valore = 0;

    puts("Quanti valori vuoi inserire?");
    scanf("%d", &n);

    int array[n];

    for(i = 0; i < n; i++){
        printf("Inserisci il valore %d: ", i);
        scanf("%d", &valore);
        array[i] = valore;
    }

    for (i = 1; i < n; i++) {
        printf("%d-%d ", array[i-1], array[i]);
        if(array[i-1] < array[i]){
            puts("minore");
            k++;
        }else{
            puts("maggiore");
        }
    }
    if(k == (n-1)){ //n-1 perché partiamo da i = 1
        puts("\nTutti i valori sono strettamente crescenti\n");
    }else{
        puts("\nNon tutti i numeri sono strettamente crescenti\n");
    }
    
}

```
<hr/>

> ## 10. Scrivere un programma che riceva in input una sequenza di N numeri interi. I numeri sono memorizzati in un vettore. Il programma esegue le seguenti operazioni:
> - Visualizza il vettore.
> - Eegue uno spostamento (shift) a sinistra di una posizione del contenuto del vettore. Pertanto ogni elemento del vettore deve assumere l valore dell’elemento immediatamente successivo all’interno del vettore. L’elemento di indice N-1 deve assumere il valore zero. 
> ```
> Dato il vettore: 1 10 15 18
> Il programma deve generare il vettore: 10 15 18 0
>```
> - Il programma visualizza il vettore ottenuto.
> - Esegue uno spostamento (shift) a destra di una posizione del contenuto del vettore ottenuto nel passo precedente. Pertanto ogni elemento del vettore deve assumere il valore dell’elemento immediatamente precedente all’interno del vettore. L’elemento di indice 0 deve assumere il valore zero.
> ```
> Ad esempio dato il vettore: 10 15 18 0
> Il programma deve generare il vettore: 0 10 15 18
>```
> - Il programma visualizza il vettore ottenuto.


```c
#include <stdio.h>

void main(){

    int i = 0;
    int n = 0;
    int valore = 0;

    int left_shift_value = 0;
    int right_shift_value = 0;

    puts("Quanti valori vuoi inserire?");
    scanf("%d", &n);

    int array[n];

    for(i = 0; i < n; i++){
        printf("Inserisci il valore %d: ", i);
        scanf("%d", &valore);
        array[i] = valore;
    }

    left_shift_value = array[0];

    //stampa
    puts("\nArray:");
    for(i = 0; i < n; i++){ //stampa 
        printf("%d ", array[i]);
    }


    for(i = 0; i < n; i++){ //left shift
        array[i] = array[(i+1)];
        if(i==(n-1)){
            array[i] = left_shift_value;
        }
    }

    //stampa
    puts("\nLeft shifed array:");
    for(i = 0; i < n; i++){ 
        printf("%d ", array[i]);
    }

    right_shift_value = array[n-1];

    for(i = (n-1); i > 0; i--){ //right shift  
        array[i] = array[i-1];
    }
    array[0] = right_shift_value;

    //stampa
    puts("\nRight shifed array: "); 
    // NB: sto eseguendo il right shift sullo vettore precedentemente shiftato, quindi il risultato e' uguale al vettore di partenza.
    for(i = 0; i < n; i++){ //stampa 
        printf("%d ", array[i]);
    }
   
}

```
<hr/>

> ## 11. Scrivere un programma che legga da tastiera una sequenza ordinata di N numeri interi eventualmente intervallati da alcuni 0 e li memorizzi in un vettore. Il programma deve generare un secondo vettore che compatta i numeri contenuti nel primo vettore. In particolare:
> - Ogni numero che compare ripetuto nel primo vettore, deve comparire una sola volta nel secondo vettore.
> - Ogni numero uguale a zero presente nel primo vettore non deve comparire nel secondo vettore.

```c
```

<hr/>

> ## 12. Scrivere un programma che legga una frase introdotta da tastiera. La frase é terminata dall’introduzione del carattere di invio. La frase contiene solo
caratteri minuscoli e complessivamente al più 100 caratteri. Il programma dovrà stampare su schermo le seguenti informazioni:
> - Per ognuna delle lettere dell’alfabeto, il numero di volte che la lettera compare nella stringa.
> - Il numero di consonanti presenti nella stringa.
> - Il numero di vocali presenti nella stringa.

```c
```
