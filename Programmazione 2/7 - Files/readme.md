# 7) File (Ripasso "Sperimentazioni Programmazione 2") #


## Compilazione file c
```
$ gcc -Wall file_name.c -o alias
```
## Esecuzione
```
$ ./alias (senza argomenti)
$ ./alias arg1 arg2 argn (con argomenti)
```

<br/>
<hr/>

> ## 1. Scrivere un programma che legga a un file di testo una serie di numeri interi, li sommmi e stampi il risultato
```c
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
```

<hr/>

> ## 2. Scrivere un programma che legga da un file di testo una serie di numeri interi, li inserisca in un array e li scriva su un altro file in ordine inverso (usando le primitive fscanf e fwrite).

```c
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
```

<hr/>

> ## 3. Scrivere un programma che legga da un file di testo una serie di parole e conti quanti volte compare una determinata parola all'interno del file.
```c
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
```
