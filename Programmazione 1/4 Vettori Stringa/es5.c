/*
5. Scrivere un programma che chiede all'utente di inserire un carattere e una lunghezza. 
Poi crea una stringa di tale lunghezza composta dal carattere inserito e dai caratteri successivi nell'alfabeto, fino a completare la stringa. 
Esempio:
carattere: 'd'	lunghezza: 6	--->	defghi
*/

#include <stdio.h>
#include <string.h>

void main(){
    
    char c;
    int lunghezza = 0;
    int i = 0;
    int carattere = 0;
   
    puts("\nInserisci un carattere");
    scanf("%c", &c);
    
    carattere = c;

    puts("\nInserisci una lunghezza");
    scanf("%d", &lunghezza);

    char s3[lunghezza];

    for(i = 0; i < lunghezza; i++){
        s3[i] = carattere;
        if(carattere == 122){
            carattere = 97;
        }else{
            carattere++;
        }
    }

    printf("\nCarattere: %c di lunghezza: %d --> %s", c, lunghezza, s3);

}