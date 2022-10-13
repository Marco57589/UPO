/*
    Un bancomat soddisfa una richiesta di prelievo di una somma di denaro adottando
    la seguente strategia:

    - Emette  fin che puo' banconote da 50 (ossia, emette banconote
      da 50 fin tanto che il totale non supera la somma richiesta).

    - Quando ha terminato con le banconote da 50, emette fin che
      puo' banconote da 20.
 
    Ad esempio, se la somma richiesta e' 190, verranno emesse
    3 banconote da 50 e 2 da 20.
    Si noti che non tutte le richieste possono essere soddisfatte.
    Ad esempio, se la somma richiesta e' 180, vengono emesse
    3 banconote da 50 e una da 20, per un totale di 170 euro.

    Scrivere un programma che chiede all'utente di inserire
    la somma richiesta (un intero), calcola quante banconote da
    50 e 20 verranno emesse e il totale corrispondente ai soldi emessi.

    I messaggi vanno scritti come negli esempi sotto, in particolare
    le banconote emesse vanno stampate solo quando il numero e' diverso da 0.
*/
#include <stdio.h>

void main(){

    int richiesta = 0;
    int b5 = 0; //banconote 50
    int b2 = 0; //banconote 20
    int aus = 0; //variabile ausiliaria

    puts("Inserisci la somma da prelevare: ");
    scanf("%d", &richiesta); 

    b5 = richiesta / 50;
    aus = richiesta-(b5*50);
    b2 = aus / 20;
    
    printf("Somma richiesta %d banconote da 50 => %d banconote da 20 => %d", richiesta, b5, b2);        
}
