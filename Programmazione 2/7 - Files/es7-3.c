// Scrivere un programma che legga da un file di testo una serie di parole e conti quanti volte compare una determinata parola all'interno del file.

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define path "frasi.txt"

int main(){
    int i = 0;

    FILE *fp = fopen(path, "r");  //Creo un puntatore FILE (nomefile, tipo di operazione: r read, w write)

    if (fp == NULL){
        perror("Apertura file fallita!");
        exit(0);
    }

    int count = 0;
    char *parola = "Lorem";

    while(!(feof(fp))){ //FEOF = FileEndOfFile (quando il puntatore arriva alla fine)
        char buffer[64];
        fscanf(fp, "%s", buffer);

        if (!strcmp(parola, buffer)) {
            count++;
        }
    }

    fclose(fp);

    printf("La parola \'%s\' compare nel file %s per %d volte", parola, path, count);

    return 0;
}