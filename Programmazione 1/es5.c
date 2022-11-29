/*
5. Si scriva un programma C che richiami tre funzioni:
• Inserimento degli elementi in un vettore X
• Funzione cerca, che ricerchi la presenza di un elemento in un vettore di interi.
La funzione riceve in ingresso tre parametri:
– un vettore di interi v[] nel quale ricercare il valore;
– un un valore intero N che indica quanti elementi contiene il vettore;
– il valore intero x che deve essere ricercato. 
La funzione deve restituire un valore intero, ed in particolare:
– se il valore x `e presente nel vettore, allora la funzione restituisce
l’indice della posizione alla quale si trova tale valore;
– se il valore x `e presente pi`u volte, si restituisca l’indice della
prima occorrenza;
– se il valore x non `e presente nel vettore, si restituisca -1.
*/

#include <stdio.h>



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
    puts("\nVettore creato!");
    return vettore;
}

int cerca(int vettore[], int lunghezza, int trova){
    int x = -1;

    for(int i = 0; i < lunghezza; i++){
       if(vettore[i] == trova){
            return i;
       }
    } 

    return x;
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

    int valore_da_trovare = inserimento();

    printf("Risultato funzione cerca: %d", cerca(vettore, n, valore_da_trovare));


}