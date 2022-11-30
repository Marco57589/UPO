/*
3. Scrivere una funzione che ha in input un vettore con tappo e un parametro x. 
La funzione deve restituire la quantità di elementi del vettore strettamente maggiori di x.
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