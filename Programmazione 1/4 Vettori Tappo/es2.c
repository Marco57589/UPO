/*
2 Scrivere una funzione che ha in input un vettore con tappo e determina massimo e minimo. La funzione non restituisce
valori (void) ma deve salvare i valori di massimo e minimo in due variabili ricevute per riferimento
*/
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