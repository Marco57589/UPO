/*
4. Scrivere un programma che riceve (da terminale) esattamente due stringhe.
Restituisce al terminale:
- 0 se il numero di stringhe non e' due;
- 1 se la prima stringa e' contenuta nella seconda (funzione strstr);
- 2 se la seconda stringa e' contenuta nella prima;
- 3 altrimenti.
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]){
    char *str;

    if(argc > 3){
        puts("Troppi argomenti");
        exit(0);
    }

    if(strstr(argv[1], argv[2])){
        str = strstr(argv[1], argv[2]);
        printf("La stringa 2 (%s) é contenuta nella stringa 1 (%s)", str, argv[1]);
        return 2;

    }else if(strstr(argv[2], argv[1])){
        str = strstr(argv[2], argv[1]);
        printf("La stringa 1 (%s) é contenuta nella stringa 2 (%s)", str, argv[2]);
        return 2;
    }else{
        return 3;
    }

}