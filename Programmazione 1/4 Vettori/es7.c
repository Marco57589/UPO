/*
7. Si scriva un programma che acquisisca da tastiera una parola (cioé una stringa di caratteri priva di separatori) e la stampi a video se e solo se tale
parola é palindroma, ossia leggibile nello stesso modo da destra a sinistra e viceversa (es. OSSESSO).
*/

#include <stdio.h>
#include <string.h>

void main(){

    int i = 0;
    int k = 0;
    char aus[20];

    puts("inserisci la stringa da controllare");
    scanf("%s", aus);

    k = strlen(aus)-1;


    for (i = 0; i < strlen(aus)/2; i++) {
        if(aus[i] != aus[k]){
            puts("La frase non é un palindromo");
        }
        k--;
    }
    
}
