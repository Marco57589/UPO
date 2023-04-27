/* Scrivere un programma che legga da un file di testo una serie di numeri interi, li inserisca in un array e li scriva 
su un altro file in ordine inverso (usando le primitive fscanf e fwrite). */

#include <stdio.h>
#include <stdlib.h>

#define path "dati.txt"
#define path2 "dati2.txt"
#define path3 "dati3.bin"

int main(){
    int i = 0;

    int array[5]; //array di dimensione 5

    FILE *fp = fopen(path, "r");  //Creo un puntatore FILE (nomefile, tipo di operazione: r read, w write )

    if (fp == NULL){
        perror("Apertura file fallita!");
        exit(0);
    }

    while(!(feof(fp))){ //FEOF = FileEndOfFile (quando il puntatore arriva alla fine)
        fscanf(fp, "%d", &array[i]);   //fscanf (filePointer, "tipo del dato letto", dove salvo il dato appena letto)                   
        i++;
    }

    fclose(fp); //chiudo il primo file

    FILE *fp2 = fopen(path2, "w");  //Creo un secondo puntatore FILE (nomefile, tipo di operazione: r read, w write )
    FILE *fp3 = fopen(path3, "wb");  //Creo un terzo puntatore, con la differenza che questo é wb 'write binary' (da usare con fwrite)

    if (fp2 == NULL || fp3 == NULL){
        perror("Impossibile trovare i due file di output!");
        exit(0);
    }
    
    for(i = 4 ; i >= 0; i--){
        fprintf(fp2, "%d ", array[i]);  //scrivo i dati in fp2 "normalmente"
        fwrite(&array[i], sizeof(int), 1, fp3); //salvo i dati "binari" in fp3
    }

    fclose(fp2);
    fclose(fp3);

    return 0;
}