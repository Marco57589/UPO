/*
Aggiornare la funzione upperExtract (es. 5.2) in modo da restituire
il risultato in una nuova stringa allocata all'interno della funzione (suggerimento: si può usare sprintf).
*/

#include <stdio.h>
#include <string.h>
#include <ctype.h>

void upperExtract(char* string, char* string2){
    int i = 0;
    char *token;
    
    token = strtok(string, " ");

    while(token != NULL){
        printf("TOKEN: %s\n", token);
        if(isupper(token[0])){
            printf("    TOKEN UPPER: %s\n", token);
            strcpy(string2, token);

            string2 += strlen(token);
        }

        token = strtok(NULL, " ");
    }
}


int main(){
    char string[] = "Ci sono Ventinove cavalle E due Pere";
    char string2[50];

    upperExtract(string, string2);

    printf("\n Stringa risultante: %s \n", string2);
}
