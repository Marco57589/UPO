/*
5. Scrivere una funzione che ha in input un vettore con tappo, un valore x un valore k e restituisce l'eventuale 
posizione della k-esima occorrenza di x nel vettore, -1 altrimenti
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

int ripetizioni(int vettore[], int x, int k){
    int conta = 0;
    int trovati = 0;

    if(vettore[0] == TAPPO){
        puts("Il vettore é vuoto!");
        return conta;
    }

    for(int i = 0; vettore[i] != TAPPO; i++){
        if(vettore[i] == x){
            trovati++;
        }
        if(trovati == k){
            printf("Il %d si ripete per la %d volta in posizione %d", x, k, i);
            return i;
        }
    }

    if(trovati < k){
        printf("Il %d si ripete solo %d volte, non %d", x, trovati, k);
        return -1;
    }

    

    return conta;
}

int main(){
    int *v;
    int x = 5;  //numero da cercare
    int k = 2;  //numero volte in cui x si ripete

    v = crea_vettore();
    stampa_vettore(v);
    ripetizioni(v, x, k);

    return 0;
}