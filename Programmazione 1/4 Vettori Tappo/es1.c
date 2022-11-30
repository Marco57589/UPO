/*
1. Scrivere una funzione che ha in input un vettore con tappo e ne determina la media. La funzione deve restituire la
media in formato float.
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