//scrivere un programma che legga a un file di testo una serie di numeri interi, li sommmi e stampi il risultato

#include <stdio.h>

int main(){
    int somma = 0; 
    int n = 0;

    FILE *fp = fopen("file.txt", "r");  //Creo un puntatore a FILE (nomefile, tipo di operazione: r read, w write )

    while(!(feof(fp))){ //FEOF = FileEndOfFile (quando il puntatore arriva alla fine)
        fscanf(fp, "%d", &n);   //fscanf lettura sequenziale da file (ogni volta che viene eseguito sposta automaticamnete il puntatore al successivo)
                                //fscanf (filePointer, "tipo del dato letto", dove salvo il dato appena letto)

        somma += n;              //a somma aggiungo il valore letto
    }

    printf("La somma dei valori é %d", somma);  //stampo la variabile somma
    fclose(fp);

    return 0;
}