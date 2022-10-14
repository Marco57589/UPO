# 3) Iterazione #


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

> ## 1  Scrivere un programma che richieda in input una sequenza di n numeri interi e ne individui il massimo. 

```c
#include <stdio.h>

void main(){

    int n_numeri = 0;
    int n = 0;
    int i = 0;
    int n_max = 0;

    puts("Inserisci n numeri");
    scanf("%d", &n_numeri);

    for(i = 0; i < n_numeri; i++){
        puts("Inserisci un numero");
        scanf("%d",&n);

        if(n > n_max){
            n_max=n;
        }

    }

    printf("Il numero massimo e': %d", n_max);

}
```

<hr/>

> ## 2 Scrivere un programma che richieda in input una sequenza di n numeri interi e ne individui i primi due massimi.
> 

```c
#include <stdio.h>

void main(){

    int n_numeri = 0;
    int n = 0;
    int i = 0;
    int n_max = 0;
    int n_max2 = 0;

    puts("Inserisci n numeri");
    scanf("%d",&n_numeri);

    for(i=0; i<n_numeri; i++){
        puts("Inserisci un numero");
        scanf("%d",&n);
        
        if(n > n_max2){
            n_max2 = n;
            
            if(n_max2 > n_max){
                n_max2 = n_max;
                n_max = n;
            }
        }
    }
    printf("Il numero massimo e': %d, mentre il secondo massimo e': %d", n_max, n_max2);

}
```

<hr/>

> ## 3 Realizzare un programma che legga due numeri interi e controlli se il primo e' multiplo del secondo.
> 

```c
#include <stdio.h>

void main(){

    int n1 = 0;
	int n2 = 0;

    printf("Inserisci n1: ");
    scanf("%d", &n1); 
    printf("\nInserisci n2: ");
    scanf("%d", &n2); 

    if(a % b == 0){
        printf("b e' multiplo a a");
		
    }else{
        printf("b non e' multiplo di a");
		
    }

}
```

<hr/>

> ## 4 Scrivere un programma che richieda in input una sequenza di interi conclusa da 0 e ne calcoli la somma.
> 

```c
#include <stdio.h>

void main(){

    int n = -1;
    int risultato = 0;

    while(n != 0){
        puts("Inserisci n:");
        scanf("%d", &n);
        risultato += n;
    }

    printf("il risultato e': %d", risultato);
    puts("\n");
}
```

<hr/>

> ## 5 Stampare tutti i numeri pari da 0 a 100.
> 
```c
#include <stdio.h>

void main(){

    for(int i = 0; i<101; i++){
        if(i%2 == 0){
            printf("valore: %d\n", i);
        }
    }

}
```

<hr/>

> ## 6 Realizzare un programma che calcoli il prodotto di due interi x ed y acquisiti da tastiera,  usando solo la somma.
> 
```c
#include <stdio.h>

void main(){

    int x = 0;
    int y = 0;
    int risultato = 0;

    puts("Inserisci x:");
    scanf("%d", &x);

    puts("Inserisci y:");
    scanf("%d", &y);

    for(int i = y; i>0; i--){
        risultato += x;
    }

    printf("il prodotto dei numeri e': %d", risultato);

}
```

> ## 7  Realizzare un programma che calcoli la potenza di x elevato alla n (con x ed n interi acquisiti da tastiera) usando solo il prodotto.
> 

```c
#include <stdio.h>

void main(){

    int x = 0;
    int n = 0;
    int risultato = 1;

    puts("Inserisci x:");
    scanf("%d", &x);

    puts("Inserisci n:");
    scanf("%d", &n);

    for(int i = n; i>0; i--){
        risultato = risultato * x;
        printf("%d", risultato);
    }

    printf("la potenza di x elevato alla n e': %d", risultato);
}
```

<hr/>

> ## 8  Scrivere un programma che legge n da tastiera e ne calcola il fattoriale (n!). 
> ```
>   n=4   fatt(n)=1*2*3*4=24
>   n=1   fatt(n)=1
>   n=0   fatt(n)=1
> ```

```c
#include <stdio.h>

void main(){

    int n = 0;
    int risultato = 1;

    puts("Inserisci il numero da 'fattorizzare' :");
    scanf("%d", &n);

    for(int i = 1; i<n; i++){
        risultato = risultato * i;
        printf("%d", risultato);
    }

    printf("la potenza di x elevato alla n e': %d", risultato);

}
```

<hr/>

> ## 9  

```c
```

<hr/>

> ## 10 

```c
```

<hr/>

> ## 11 Scrivere un programma che legge da tastiera un intero n maggiore di 0 e stampa n seguito da tutti i suoi divisori, come negli esempi.
    Se n e' primo, stampa il messaggio "n e' un numero primo".
> ```
>   Se n = 48 deve essere stampato 
>   48: 1 2 3 4 6 8 12 16 24 48
>   Se n = 1764 deve essere stampato
>   1764: 1 2 3 4 6 7 9 12 14 18 21 28 36 42 49 63 84 98 126 147 196 252 294 441 588 882 1764
>   Se n = 1777 deve essere stampato
>   1777: 1 1777
>    1777 e' un numero primo
> ```
```c
#include <stdio.h>

void main(){

    int n = 0;

     while(n<1){
        puts("Inserisci n: ");
        scanf("%d", &n);
    }
    int i = 0;
    int c = 0;

    for(i=1; i<=n; i++){
        if(n%i == 0){
            printf("%d ", i);
        }else{
            c++;
        }
        
    }
    if((n-c)<3){
        puts("é un numero primo");
    }
}
```

<hr/>

> ## 12 Stampare una serie di 200 simboli "+" e "-" alternati

```c
#include <stdio.h>

void main(){

    for(int i = 0; i < 200; i++){
        if(i%2 == 0){
            puts("+");
        }else{
            puts("-");
        }
    }
}
```

<hr/>

> ## 13 Scrivere un programma che legge da tastiera un intero n maggiore di 0 e stampare i numeri interi da 0 a n, quattro per riga.
>
>
>```
>Esempio di esecuzione
>--------------------
>
>Se n e' uguale a 14 deve essere stampato
>
>     0     1     2     3
>     4     5     6     7
>     8     9    10    11
>    12    13    14  
>```
```c
#include <stdio.h>

void main(){

    int n = 0;
    int k = 0;

    while(n<1){ //controllo input > 0
        puts("Inserisci n: ");
        scanf("%d", &n);
    }

    for(int i = 0; i<=n; i++){
        printf(" %d \t", i);
        k++;
        if(k==4){
            puts("\n");
            k=0;
        }
    }
}
```

<hr/>

> ## 14 Scrivere un programma che legge da tastiera due interi righe e colonne e stampa due tabelle delle dimensioni specificate e contenenti i numeri da 0 in avanti, fino al riempimento della tabella.
>
>Esempio di esecuzione
>
>```
> Se righe = 4 e colonne = 8 deve essere stampato
>
>Se n e' uguale a 14 deve essere stampato
>
>     0     1     2     3     4     5     6     7
>     8     9    10    11    12    13    14    15
>    16    17    18    19    20    21    22    23
>    24    25    26    27    28    29    30    31
>
>
>     0     4     8    12    16    20    24    28
>     1     5     9    13    17    21    25    29
>     2     6    10    14    18    22    26    30
>     3     7    11    15    19    23    27    31
>```

```c
#include <stdio.h>

void main(){

    int riga = 0;
    int colonna = 0;
    int n = 0;
    int valore = 0;

    puts("Inserisci riga");
    scanf("%d", &riga);

    puts("Inserisci colonna");
    scanf("%d", &colonna);


    for(int i = 0; i<riga; i++){
        for(int j = 0; j<colonna; j++){
            printf(" %d \t", n);
            n++;
        }
        puts("\n"); 
    }

    puts("\n");

    for(int i = 0; i<riga; i++){
        puts("\n");
        valore = i;

        for(int j = 0; j<colonna; j++){
            printf(" %d \t", valore);
            valore += riga;
        }
    }

}
```

<hr/>

> ## 15 Chiesti in input i valori di r e di c, stampare a video un rettangolo (o quadrato se r=c) di r righe e c colonne di caratteri X
>
>Esempio di esecuzione
>
>```
>  XXXXX
>  XXXXX
>  XXXXX
>```
>
```c
#include <stdio.h>

void main(){

    int riga = 0;
    int colonna = 0;

    puts("Inserisci riga");
    scanf("%d", &riga);

    puts("Inserisci colonna");
    scanf("%d", &colonna);


    for(int i = 0; i<riga; i++){
        for(int j = 0; j<colonna; j++){
            printf("X");
        }
        puts("\n"); 
    }
}
```

<hr/>

> ## 16 Scrivere un programma che stampi la tavola pitagorica per valori da 1 a 10


```c
#include <stdio.h>

void main(){

    int riga = 10;
    int colonna = 10;

    for(int i = 1; i<riga; i++){
        for(int j = 1; j<colonna; j++){
            printf("%d \t", i*j);
        }
        puts("\n"); 
    }
}
```

<hr/>

> ## 17  Realizzare un programma che stampi a video un rettangolo la cui cornice sia composta da asterischi * e il suo contenuto da  caratteri ‘A’, come nell’esempio:
> ```
>  ********************
>  *AAAAAAAAAAAAAAAAAA*
>  *AAAAAAAAAAAAAAAAAA*
>  *AAAAAAAAAAAAAAAAAA*
>  ********************
>```
```c
#include <stdio.h>

void main(){

    int riga = 0;
    int colonna = 0;

    puts("Inserisci riga");
    scanf("%d", &riga);

    puts("Inserisci colonna");
    scanf("%d", &colonna);


    for(int i = 0; i<riga; i++){
        for(int j = 0; j<colonna; j++){
            if(i == 0 || i == (riga-1) || j == 0 || j == (colonna-1)){
                printf("* \t");
            }else{
                printf("A \t");
            }
        }
        printf("\n"); 
    }
}
```

<hr/>

> ## 18 Scrivere un programma che legge un intero n maggiore di 1 e genera una tabella di n righe e n colonne in cui:
> - la diagonale e' composta da 0
> - la parte sopra la diagonale e' composta X
> - la parte sotto la diagonale e' composta da Y
>
> Esempio:
> ```
>    n=4
>
>    0 X X X
>    Y 0 X X
>    Y Y 0 X
>    Y Y Y 0
> ```
```c
#include <stdio.h>

void main(){

    int n = 0;

     while(n<1){ //controllo input > 0
        puts("Inserisci n: ");
        scanf("%d", &n);
    }


    for(int i = 0; i<n; i++){
        for(int j = 0; j<n; j++){
            if(i==j){
                printf("0 \t");
            }else if(j>i){
                printf("X \t");
            }else{
                printf("Y \t");
            }
        }
        printf("\n");
    }
}
```

<hr/>
