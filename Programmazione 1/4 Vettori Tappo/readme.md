# 4) Vettori Tappo (limite) #


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

> ## 1. Scrivere una funzione che ha in input un vettore con tappoe ne determina la media. 
> La funzione deve restituire la media in formato float.
>```
> Esempio:
> v[0] = 1, v[1] = 5, v[2] = 6, v[3] = 8, v[4] = -1
> media = (1 + 5 + 8 ) / 3
>```
```c
#include <stdio.h>

#define TAPPO -1
#define LENGTH 10

int* crea_vettore(){
    int i = 0;
    static int vet[LENGTH];

    for(i = 0; i < (LENGTH-1); i++){
        printf("Inserisci il valore [%d]: ", i);
        scanf(" %d", &vet[i]);

        if(vet[i] == TAPPO){    //una volta inserito il tappo esco dal ciclo.
            break;
        }

        if(i == LENGTH-2){  //una volta raggiunta la penultima cella assegno a questa il valore inserito e a quella successiva il tappo
            vet[LENGTH-1] = TAPPO;
            break;
        }
    }

    return vet;
}

void stampa_vettore(int vettore[]){
    int i;

    if(vettore[0] == TAPPO){
        puts("Il vettore é vuoto!");
    }else{
        printf("|");
        for(i = 0; vettore[i] != TAPPO; i++){   //stampo tutti i valori fino al tappo
            printf("POS: %d => %d |", i, vettore[i]);
        }
    }
}

float media_vettore(int vettore[]){

    if(vettore[0] == TAPPO){
        puts("Il vettore é vuoto!");
        return 0;
    }
    int somma = 0;
    int conta = 0; //lunghezza vettore fino al tappo

    for(int i = 0; vettore[i] != TAPPO; i++){
        somma += vettore[i];
        conta++;
    }

    return somma / conta;
}

int main(){
    int *v;
    float media = 0;

    v = crea_vettore();
    stampa_vettore(v);
    media = media_vettore(v);
    printf("\n - La media del vettore é: %f", media);
    
    return 0;
}
```

<hr/>

> ## 2. Scrivere una funzione che ha in input un vettore con tappo e determina massimo e minimo. 
> La funzione non restituisce valori ma deve salvare i valori di massimo e minimo in due variabili ricevute per riferimento.
>```
> Esempio:
> v[0] = 1, v[1] = 5, v[2] = 6, v[3] = 8, v[4] = -1
> max = 8 e min = 1
>```
```c
#include <stdio.h>

#define TAPPO -1
#define LENGTH 10

int* crea_vettore(){
    int i = 0;
    static int vet[LENGTH];

    for(i = 0; i < (LENGTH-1); i++){
        printf("Inserisci il valore [%d]: ", i);
        scanf(" %d", &vet[i]);

        if(vet[i] == TAPPO){    //una volta inserito il tappo esco dal ciclo.
            break;
        }

        if(i == LENGTH-2){  //una volta raggiunta la penultima cella assegno a questa il valore inserito e a quella successiva il tappo
            vet[LENGTH-1] = TAPPO;
            break;
        }
    }

    return vet;
}

void stampa_vettore(int vettore[]){
    int i;

    if(vettore[0] == TAPPO){
        puts("Il vettore é vuoto!");
    }else{
        printf("|");
        for(i = 0; vettore[i] != TAPPO; i++){   //stampo tutti i valori fino al tappo
            printf("POS: %d => %d |", i, vettore[i]);
        }
    }
}

void massimo_minimo(int vettore[], int *massimo, int *minimo){

    if(vettore[0] == TAPPO){
        puts("Il vettore é vuoto!");
        massimo = 0;
        minimo = 0;
    }

    *minimo = vettore[0];

    for(int i = 0; vettore[i] != TAPPO; i++){
        if(vettore[i] > *massimo){
            *massimo = vettore[i];
        }
        if(vettore[i] < *minimo){
            *minimo = vettore[i];
        }
    }

}

int main(){
    int *v;
    int max = 0;
    int min = 0;
    int *pmax = &max;
    int *pmin = &min;

    v = crea_vettore();
    stampa_vettore(v);
    massimo_minimo(v, pmax, pmin);

    printf("\n - Il valore massimo e minimo nel vettore sono: MAX: %d  | MIN: %d", max, min);
    
    return 0;
}
```

<hr/>

> ## 3. Scrivere una funzione che ha in input un vettore con tappo e un parametro x. 
> La funzione deve restituire la quantità di elementi del vettore strettamente maggiori di x.
>```
> Esempio:
> v[0] = 1, v[1] = 5, v[2] = 6, v[3] = 8, v[4] = -1
> se x = 7, allora risultato = 1
>```
```c
#include <stdio.h>

#define TAPPO -1
#define LENGTH 10

int* crea_vettore(){
    int i = 0;
    static int vet[LENGTH];

    for(i = 0; i < (LENGTH-1); i++){
        printf("Inserisci il valore [%d]: ", i);
        scanf(" %d", &vet[i]);

        if(vet[i] == TAPPO){    //una volta inserito il tappo esco dal ciclo.
            break;
        }

        if(i == LENGTH-2){  //una volta raggiunta la penultima cella assegno a questa il valore inserito e a quella successiva il tappo
            vet[LENGTH-1] = TAPPO;
            break;
        }
    }

    return vet;
}

void stampa_vettore(int vettore[]){
    int i;

    if(vettore[0] == TAPPO){
        puts("Il vettore é vuoto!");
    }else{
        printf("|");
        for(i = 0; vettore[i] != TAPPO; i++){   //stampo tutti i valori fino al tappo
            printf("POS: %d => %d |", i, vettore[i]);
        }
    }
}

int maggiori_di_x(int vettore[], int k){
    int conta = 0;

    if(vettore[0] == TAPPO){
        puts("Il vettore é vuoto!");
        return conta;
    }

    for(int i = 0; vettore[i] != TAPPO; i++){
        if(vettore[i] > k){
            conta++;
        }
    }
    return conta;
}

int main(){
    int *v;
    int x = 5;
    int n_valori = 0;

    v = crea_vettore();
    stampa_vettore(v);
    n_valori = maggiori_di_x(v, x);

    printf("\n - Il numero di valori maggiori di %d presenti nel vettore sono: %d", x, n_valori);
    
    return 0;
}
```

<hr/>

> ## 4. Scrivere una funzione che ha in input un vettore con tappo, un valore x e restituisce il numero di volte un cui il valore x si
> ripete nel vettore.
>```
> Esempio:
> v[0] = 1, v[1] = 3, v[2] = 4, v[3] = 5, v[4] = 5, v[5] = -1
> se x = 5, allora conteggio = 2
>```
```c
#include <stdio.h>

#define TAPPO -1
#define LENGTH 10

int* crea_vettore(){
    int i = 0;
    static int vet[LENGTH];

    for(i = 0; i < (LENGTH-1); i++){
        printf("Inserisci il valore [%d]: ", i);
        scanf(" %d", &vet[i]);

        if(vet[i] == TAPPO){    //una volta inserito il tappo esco dal ciclo.
            break;
        }

        if(i == LENGTH-2){  //una volta raggiunta la penultima cella assegno a questa il valore inserito e a quella successiva il tappo
            vet[LENGTH-1] = TAPPO;
            break;
        }
    }

    return vet;
}

void stampa_vettore(int vettore[]){
    int i;

    if(vettore[0] == TAPPO){
        puts("Il vettore é vuoto!");
    }else{
        printf("|");
        for(i = 0; vettore[i] != TAPPO; i++){   //stampo tutti i valori fino al tappo
            printf("POS: %d => %d |", i, vettore[i]);
        }
    }
}

int ripetizioni_di_x(int vettore[], int x){
    int conta = 0;

    if(vettore[0] == TAPPO){
        puts("Il vettore é vuoto!");
        return conta;
    }

    for(int i = 0; vettore[i] != TAPPO; i++){
        if(vettore[i] == x){
            conta++;
        }
    }
    return conta;
}

int main(){
    int *v;
    int x = 2;
    int ripetizioni = 0;

    v = crea_vettore();
    stampa_vettore(v);
    ripetizioni = ripetizioni_di_x(v, x);

    printf("\n - Il valore %d compare nel vettore %d volte!", x, ripetizioni);
    
    return 0;
}
```
<hr/>

> ## 5. Scrivere una funzione che ha in input un vettore con tappo, un valore x un valore k e restituisce l'eventuale posizione 
> della k-esima occorrenza >di x nel vettore, -1 altrimenti.
>```
> Esempio:
> v[0] = 1, v[1] = 3, v[2] = 4, v[3] = 5, v[4] = 5, v[5] = -1
> - se x = 5 e k = 2, allora posizione = 4 (il 5 si ripete per la seconda volta in posizione 4).
> – se x = 4 e k = 2, allora posizione = -1 (il 4 si ripete solo una volta, non due).
> – se x = 3 e k = 1, allora posizione = 1 (il 2 si ripete solo una volta, in posizione 1).
>```

```c
EH VOLEVI LA SOLUZIONE
```
<hr/>

> ## 6. SScrivere una funzione che ha in input un vettore con tappo e restituisce il numero di elementi che sono la somma dei due precedenti.
>```
> Esempio:
> v[0] = 1, v[1] = 3, v[2] = 4, v[3] = 5, v[4] = 5, v[5] = -1
> allora conteggio = 1 (perché nella posizione 2 c'è 4 che è la somma della posizione 0 e 1 ovvero 1 + 3).
>```

```c
EH VOLEVI LA SOLUZIONE
```
<hr/>

