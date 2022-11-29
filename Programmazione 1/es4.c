/*
4. Scrivere un programma che, utilizzando le funzioni, calcoli la media, il massimo e il minimo di un array di numeri reali Utilizzare le funzioni:
leggi(): permette di inserire il vettore di numeri 
media(): calcola e ritorna la media
max(): calcola e ritorna il valore massimo
min(): calcola e ritorna il valore minimo
stampa(): visualizza il vettore, la media e il massimo e il minimo
*/

#include <stdio.h>

int media_array(int vettore[], int lunghezza){
    int media = 0;

    for(int i = 0; i < lunghezza; i++){
        media += vettore[i];
    }

    media = media / lunghezza;

    return media;
}

int massimo_array(int vettore[], int lunghezza){
    int massimo = 0;

    for(int i = 0; i < lunghezza; i++){
        if(vettore[i] > massimo){
            massimo = vettore[i];
        }
    }

    return massimo;
}

int minimo_array(int vettore[], int lunghezza){
    int min = 0;

    min = vettore[0]; //altrimenti, visto che é inizializzato a 0 questo rimarrà sempre 0

    for(int i = 0; i < lunghezza; i++){
        if(vettore[i] < min){
            min = vettore[i];
        }
    }

    return min;
}

int inserimento(){
    int aus;
    puts("\n--------------------");
    puts("Inserisci N: ");
    scanf("%d", &aus);
    puts("--------------------");

    return aus;
}


int crea_vettore(int vettore[], int lunghezza){
    int i=0;

    for(i=0; i < lunghezza; i++){
        printf("Inserisci il [%d] valore: ", i);
        scanf("%d", &vettore[i]);
    } 
    puts("Vettore creato!");
    return vettore;
}

void stampa_vettore(int vettore[], int n){
    for(int i = 0; i < n; i++){
        printf("%d \t", vettore[i]);
    }
}

int main(){
    int n = inserimento();
    int vettore[n];
    crea_vettore(vettore, n);
    stampa_vettore(vettore, n);

    int massimo = 0;
    int minimo = 0;
    int media = 0;

    massimo = massimo_array(vettore,  n);
    minimo = minimo_array(vettore, n);
    media = media_array(vettore, n);

    printf("\nMassimo nel vettore: %d | Minimo nel vettore: %d | Media del vettore: %d", massimo, minimo, media);



}