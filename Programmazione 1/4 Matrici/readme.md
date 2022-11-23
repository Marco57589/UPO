# 4c) Matrici


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

> ## 1. Scrivere un programma che 
> - genera una matrice di numeri pseudo-casuali composti da una o due cifre;
> - visualizza la matrice;
> - chiede all'utente di inserire l'indice di una riga;
> - se l'indice non e' compatibile con le dimensioni della matrice, visualizza un messaggio di errore;
> - altrimenti calcola la somma dei valori su quella riga. 

```c
#include <stdio.h>
#include <stdlib.h>  

void main(){
    int riga = 5;
    int colonna = 5;
    int mat[riga][colonna];
    int i,j = 0;
    int r = 0;
    int somma = 0;

    puts("Inserisci la riga da controllare");
    scanf("%d", &r);
    

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            mat[i][j] = rand()%100;
        }
    }

    for(i = 0; i < riga; i++){
        printf("%d) ", i);
        for(j = 0; j < colonna; j++){
            printf("%d \t", mat[i][j]);
        }
        puts("");
    }

    if(r > riga){
        puts("JavaIO.IndexOutOfBound");
    }else{
        for(j = 0; j < colonna; j++){
            somma += mat[r][j];
        }
        printf("La somma dei valore nella riga %d e': %d", r, somma);
    }
}
```

<hr/>

> ## 2. Scrivere un programma che 
> - genera una matrice di numeri pseudo-casuali composti da esattamente due cifre;
> - visualizza la matrice;
> - chiede all'utente di inserire l'indice di una colonna;
> - se l'indice non e' compatibile con le dimensioni della matrice, visualizza un messaggio di errore;
> - altrimenti calcola il massimo dei valori su quella colonna.
```c
#include <stdio.h>
#include <stdlib.h>  

void main(){
    int riga = 5;
    int colonna = 5;
    int mat[riga][colonna];
    int i,j = 0;
    int c = 0;
    int somma = 0;

    puts("Inserisci la colonna da controllare");
    scanf("%d", &c);
    

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            mat[i][j] = rand()%100;
        }
    }

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            printf("%d \t", mat[i][j]);
        }
        puts("");
    }

    if(c > riga){
        puts("JavaIO.IndexOutOfBound");
    }else{
        for(i = 0; i < riga; i++){
            somma += mat[i][c];
        }
        printf("La somma dei valore nella colonna %d e': %d", c, somma);
    }
}
```

<hr/>

> ## 3. Scrivere un programma che
> - chiede all'utente di inserire i valori della prima riga di una matrice;
> - carica automaticamente le altre righe in modo che i valori su una riga siano i successivi dei valori sulla riga precedente;
> - visualizza la matrice.
> Esempio:
>```
> 3	2	5
> 4	3	6
> 5	4	7
>```
```c
#include <stdio.h>
#include <stdlib.h>  

void main(){
    int riga = 5;
    int colonna = 5;
    int mat[riga][colonna];
    int i,j = 0;
    int value = 0;
    
    for(j = 0; j < colonna; j++){
        printf("Inserisci il valore nella riga 0 colonna %d\n", j);
        scanf("%d", &mat[0][j]);
    }


    puts("");
    for(i = 1; i < riga; i++){
        for(j = 0; j < colonna; j++){
            mat[i][j] = mat[i-1][j]+1;
        }
    }

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            printf("%d \t", mat[i][j]);
        }
        puts("");
    }

}
```

<hr/>

> ## 4. Scrivere un programma che data una stringa (s1) in input genera due stringhe (s2, s3) in questo modo:
> s2 contiene le vocali presenti in s1, evitando le ripetizioni; 
> s3 contiene le consonanti presenti in s1, evitando le ripetizioni.
> Esempio:
> ```
> s1: buongiorno	---> s1: uoi	s2: bngr
> ```

```c
#include <stdio.h>
#include <string.h>

void main(){
    
    char s1[100];
    char s2[50];
    char s3[50];
    int i = 0;
    int k = 0;
    int j = 0;
   
    puts("\nInserisci s1");
    scanf(" %[^\n]", s1);

    for(i = 0; i < strlen(s1); i++){
        if(s1[i] == 'a' || s1[i] == 'e' || s1[i] == 'i' || s1[i] == 'o' || s1[i] == 'u'){
            s2[k] = s1[i];
            k++;
        }else{
            s3[j] = s1[i];
            j++;     
        }
    }
    printf("La stringa iniziale e': %s\ns2: %s \ns3: %s", s1, s2, s3);
}
```
<hr/>

> ## 5. Scrivere un programma che chiede all'utente di inserire un carattere e una lunghezza. 
> Poi crea una stringa di tale lunghezza composta dal carattere inserito e dai caratteri successivi nell'alfabeto, fino a completare la stringa. 
> Esempio:
>```
> carattere: 'd'	lunghezza: 6	--->	defghi
> ```

```c
#include <stdio.h>
#include <string.h>

void main(){
    
    char c;
    int lunghezza = 0;
    int i = 0;
    int carattere = 0;
   
    puts("\nInserisci un carattere");
    scanf("%c", &c);
    
    carattere = c;

    puts("\nInserisci una lunghezza");
    scanf("%d", &lunghezza);

    char s3[lunghezza];

    for(i = 0; i < lunghezza; i++){
        s3[i] = carattere;
        if(carattere == 122){
            carattere = 97;
        }else{
            carattere++;
        }
    }

    printf("\nCarattere: %c di lunghezza: %d --> %s", c, lunghezza, s3);

}
```
<hr/>
