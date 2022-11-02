# 4) Vettori #


## Compilazione file c
```
$ gcc file_name.c -lm
```
## Esecuzione
```
$ ./file_name
```

<br/>
<hr/>

> ## 1.  Scrivere un programma che memorizzi in un array e stampi una sequenza di numeri inseriti dall’utente 

```c
include <stdio.h>

void main(){

    int n = 0;
    int valore = 0;
    int i = 0;

    puts("Quanti valori vuoi inserire?");
    scanf("%d", &n);

    int array[n];

    for(i = 0; i < n; i++){
        printf("Inserisci il valore %d :", i);
        scanf("%d", &valore);
        array[i] = valore;
    }

    //Stampa
    for(i = 0; i < n; i++){
        printf("%d ", array[i]);
    }

}
```

<hr/>

> ## 2. Scrivere un programma che stampi in ordine inverso una sequenza di numeri inseriti dall’utente memorizzandola in un array.
> 

```c
#include <stdio.h>

void main(){

    int n = 0;
    int valore = 0;
    int i = 0;

    puts("Quanti valori vuoi inserire?");
    scanf("%d", &n);

    int array[n];

    for(i = 0; i < n; i++){
        printf("Inserisci il valore %d :", i);
        scanf("%d", &valore);
        array[i] = valore;
    }

    //Stampa
    for(i = (n-1); i >= 0; i--){
        printf("%d ", array[i]);
    }

}
```

<hr/>

> ## 3. Scrivere un programma che memorizzi in un array una sequenza di numeri inserita dall’utente e stampi come output gli elementi di posizione pari.
> 

```c
#include <stdio.h>

void main(){

    int n = 0;
    int valore = 0;
    int i = 0;

    puts("Quanti valori vuoi inserire?");
    scanf("%d", &n);

    int array[n];

    for(i = 0; i < n; i++){
        printf("Inserisci il valore %d :", i);
        scanf("%d", &valore);
        array[i] = valore;
    }

    // Stampa
    for(i = 0; i < n; i++){ //    for (i = 0; i < n; i=i+2) {
        if(i%2 == 0){
            printf("%d ", array[i]);
       }
    }

}
```

<hr/>
<hr/>

> ## 4. Scrivere un programma che memorizzi in un array una sequenza di numeri inserita dall’utente e stampi come output gli elementi pari.
> 

```c
#include <stdio.h>

void main(){

    int n = 0;
    int valore = 0;
    int i = 0;

    puts("Quanti valori vuoi inserire?");
    scanf("%d", &n);

    int array[n];

    for(i = 0; i < n; i++){
        printf("Inserisci il valore %d :", i);
        scanf("%d", &valore);
        array[i] = valore;
    }

    // Stampa
    for(i = 0; i < n; i++){
        if(array[i]%2 == 0){
            printf("%d ", array[i]);
       }
    }

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
