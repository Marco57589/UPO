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
> - Genera una matrice di numeri pseudo-casuali composti da una o due cifre;
> - Visualizza la matrice;
> - Chiede all'utente di inserire l'indice di una riga;
> - Se l'indice non e' compatibile con le dimensioni della matrice, visualizza un messaggio di errore;
> - Altrimenti calcola la somma dei valori su quella riga. 

```c
#include <stdio.h>
#include <stdlib.h>  

int main(){

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
        printf("\n");
    }

    if(r > riga){
        puts("Questa riga non esiste nella matrice");
    }else{
        for(j = 0; j < colonna; j++){
            somma += mat[r][j];
        }
        printf("La somma dei valore nella riga %d e': %d", r, somma);
    }
    
    return 0;
}
```

<hr/>

> ## 2. Scrivere un programma che 
> - Genera una matrice di numeri pseudo-casuali composti da esattamente due cifre;
> - Visualizza la matrice;
> - Chiede all'utente di inserire l'indice di una colonna;
> - Se l'indice non e' compatibile con le dimensioni della matrice, visualizza un messaggio di errore;
> - Altrimenti calcola il massimo dei valori su quella colonna.
```c
#include <stdio.h>
#include <stdlib.h>  

int main(){

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
        printf("\n");
    }

    if(c > colonna){
        puts("Questa colonna non esiste nella matrice");
    }else{
        for(i = 0; i < riga; i++){
            somma += mat[i][c];
        }
        printf("La somma dei valore nella colonna %d e': %d", c, somma);
    }
    
    return 0;
}
```

<hr/>

> ## 3. Scrivere un programma che
> - Chiede all'utente di inserire i valori della prima riga di una matrice;
> - Carica automaticamente le altre righe in modo che i valori su una riga siano i successivi dei valori sulla riga precedente;
> - Visualizza la matrice.
> Esempio:
>```
> 3	2	5
> 4	3	6
> 5	4	7
>```
```c
#include <stdio.h>
#include <stdlib.h>  

int main(){
    int riga = 5;
    int colonna = 5;
    int mat[riga][colonna];
    int i,j = 0;
    int value = 0;
    
    for(j = 0; j < colonna; j++){
        printf("Inserisci il valore nella riga 0 colonna %d\n", j);
        scanf("%d", &mat[0][j]);
    }
    printf("\n");
    
    for(i = 1; i < riga; i++){
        for(j = 0; j < colonna; j++){
            mat[i][j] = mat[i-1][j]+1;
        }
    }

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            printf("%d \t", mat[i][j]);
        }
        printf("\n");
    }
    
    return 0
}
```

<hr/>

> ## 4. Scrivere un programma che
>- Chiede all'utente di inserire i valori della prima colonna di una matrice;
>- Carica automaticamente le altre colonne in modo che i valori su una colonna siano il doppio dei valori sulla colonna precedente;
>- Visualizza la matrice.
> Esempio:
> ```
> 3  6	12
> 2	 4	8
> 5	10	20
> ```

```c
#include <stdio.h>
#include <stdlib.h>  

int main(){

    int riga = 5;
    int colonna = 5;
    int mat[riga][colonna];
    int i,j = 0;
    int value = 0;
    
    for(i = 0; i < riga; i++){
        printf("Inserisci il valore nella riga %d colonna 0\n", i);
        scanf("%d", &mat[0][j]);
    }

    printf("\n");
    
    for(i = 0; i < riga; i++){
        for(j = 1; j < colonna; j++){
            mat[i][j] = mat[i][j-1]*2;
        }
    }

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            printf("%d \t", mat[i][j]);
        }
        printf("\n");
    }

    return 0;
}
```
<hr/>

> ## 5. Scrivere un programma che
> - Genera una matrice di numeri pseudo-casuali composti da una cifra;
> - Visualizza la matrice;
> - Chiede all'utente di inserire un valore x da cercare;
> - Cerca x visitando la matrice riga per riga;
> - Se presente, visualizza gli indici della riga e della colonna della prima occorrenza di x;
> - Altrimenti visualizza "assente".

```c
#include <stdio.h>
#include <stdlib.h>  

int main(){

    int riga = 3;
    int colonna = 3;
    int mat[riga][colonna];
    int i,j = 0;
    int find = 0;
    int somma = 0;

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            mat[i][j] = rand()%10;
        }
    }

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            printf("%d \t", mat[i][j]);
        }
        printf("\n");
    }

    puts("Inserisci il valore da cercare");
    scanf("%d", &find);

    int p = 0;
    int a = 0;

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            if(mat[i][j] == find && p==0){
                p++;
                printf("Trovato in posizione %d %d\n", i, j);
            }else{
                a++;
            }
        }
    }
    
    if((a != 0) && (p==0)){
        a++;
        puts("Non trovato");
    }
    
    return 0;
}
```
<hr/>

> ## 6. Scrivere un programma che
> - Genera una matrice di numeri pseudo-casuali composti da una cifra;
> - Visualizza la matrice;
> - Chiede all'utente di inserire un valore x da cercare;
> - Cerca x visitando la matrice colonna per colonna;
> - Se presente, visualizza gli indici della riga e della colonna dell'ultima occorrenza di x;
> - Altrimenti visualizza "assente". 

```c
#include <stdio.h>
#include <stdlib.h>  

int main(){

    int riga = 3;
    int colonna = 3;
    int mat[riga][colonna];
    int i,j = 0;
    int find = 0;
    int somma = 0;

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            mat[i][j] = rand()%10;
        }
    }

    for(i = 0; i < riga; i++){
        for(j = 0; j < colonna; j++){
            printf("%d \t", mat[i][j]);
        }
        printf("\n");
    }

    puts("Inserisci il valore da cercare");
    scanf("%d", &find);

    int a = 0;

    for(j = colonna; j > 0; j--){   //parto dal fondo, la prima dal fondo é l'ultima dall'inizio.
        for(i = riga; i > 0; i--){
            if(mat[i][j] == find){
                printf("Trovato in posizione %d %d", i, j);
                break;
            }else{
                a++;
            }
        }
    }
    
    if(a == (riga*colonna)){
        puts("Non trovato");
    }
    
    return 0;

}
```
<hr/>
