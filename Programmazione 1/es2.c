/*
2. Scrivere un programma che permetta di inserire due vettori lunghi N e
stampi un terzo vettore i cui elementi sono la somma degli elementi dei
due vettori in input. Il programma utilizza 3 funzioni:
• Inserisci elementi nel vettore
• Calcola somma
• Stampa vettore
*/
#include <stdio.h>

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

int somma_vettori(int vettore1[], int  vettore2[], int somma[], int n){
    for(int i = 0; i < n; i++){
        somma[i] = vettore1[i] + vettore2[i];
    }
    return somma;
}


int main(){

    int lunghezza = -1;

    while(lunghezza < 0){
        puts("Inserisci N (MAGGIORE DI 0)");
        scanf("%d", &lunghezza);
        if(lunghezza < 0){
            puts("Il numero inserito deve essere maggiore di 0!");
        }
    }  
    
    int vettore1[lunghezza];
    int vettore2[lunghezza];
    int somma[lunghezza];

    crea_vettore(vettore1, lunghezza);
    crea_vettore(vettore2, lunghezza);

    somma_vettori(vettore1, vettore2, somma, lunghezza);

    puts("");
    puts("Vettore1:");
    stampa_vettore(vettore1, lunghezza);
    puts("\nVettore2:");
    stampa_vettore(vettore2, lunghezza);
    puts("\nSomma:");
    stampa_vettore(somma, lunghezza);





}