/*

3) Realizzare un programma che calcoli la somma dei primi N numeri naturali, dove N e' un intero acquisito da tastiera.
	Utilizzare prima il costrutto while, poi do-while, e poi for. 

*/

#include <stdio.h>

void main(){

    int n_numeri = 0;
    int aus = 0;
    int risultato = 0;
  
    puts("Inserisci n:");
    scanf("%d", &n_numeri);
    
    aus=n_numeri;

    while(n_numeri>0){
        n_numeri -= 1;
        risultato += (n_numeri + 1) + n_numeri;
        n_numeri--;
    }

    printf("while -> la somma dei numeri e': %d", risultato);
    n_numeri = aus;
    risultato = 0;
    puts("\n");

    do{
        n_numeri -= 1;
        risultato += (n_numeri + 1) + n_numeri;
        n_numeri--;
    }while(n_numeri>0);

    printf("do-while -> la somma dei numeri e': %d", risultato);
    n_numeri = aus;
    risultato = 0;
    puts("\n");

    for(int i = n_numeri; i>0; i--){
        risultato += i;
    }

    printf("for -> la somma dei numeri e': %d", risultato);
    n_numeri = aus;
    risultato = 0;
    puts("\n");


// printf("i: %d", i);


}