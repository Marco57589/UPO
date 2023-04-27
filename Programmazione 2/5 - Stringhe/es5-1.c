/* Scrivere una funzione oddExtract che accetta una stringa come argomento e restituisce una
nuova stringa (attraverso parametro) che contiene solo i caratteri in posizione dispari della stringa originale. */

#include <stdio.h>
#include <string.h>

void oddExtract(char string[], char odd_string[]){
    int i = 0;
    int k = 0;

    for(i = 0; i < strlen(string); i++){
        if(i %2 == 1){
            odd_string[k] = string[i];
            k++;
        }
    }

    puts("");
}

int main(){
    char string[] = "Cavallo";
    char string2[20];

    oddExtract(string, string2);

    printf("Gli elementi pari della stringa \"%s\" sono: %s", string, string2);
    
    return 0;
}