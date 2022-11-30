/*
4. Scrivere una funzione che ha in input un vettore con tappo,
un valore x e restituisce il numero di volte un cui il valore x si ripete nel vettore.
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