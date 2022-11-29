/*
3. Scrivere un programma che calcola il fattoriale di un numero. Il programma conterra una funzione denominata fatt, che calcola il fattoriale
di un numero intero passato come parametro e che restituisce il risultato.
Si consiglia di utilizzare il tipo double per il valore di ritorno in quanto la funzione fattoriale cresce molto velocemente.
Il calcolo del fattoriale deve essere ottenuto in maniera iterativa (ciclo for o ciclo while).
f att(N ) = 1 ∗ 2 ∗ 3 ∗ . . . ∗ (N )
f att(0) = 1
*/
#include <stdio.h>

double calcola_fattoriale(int n){
    int i = 0 ;
    for(i = (n-1); i>1; i--){
        n *= i;
    }
    return n;
}


int main(){
    int n = -1;
    double fattoriale = 0;

     while(n < 0){
        puts("Inserisci N (MAGGIORE DI 0)");
        scanf("%d", &n);
        if(n < 0){
            puts("Il numero inserito deve essere maggiore di 0!");
        }
    }  

    fattoriale  = calcola_fattoriale(n);

    printf("Il fattoriale di %d é: %f", n, fattoriale);

}