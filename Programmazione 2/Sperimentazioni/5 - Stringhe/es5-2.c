/*
Scrivere una funzione upperExtract che accetta una stringa come argomento e restituisce una nuova stringa (attraverso parametro) che 
contiene solo le parole che iniziano con una lettera maiuscola della stringa originale. 
Utilizzare le funzioni strtok() e isupper() di string.h e ctype.h
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

    return 0;
}
