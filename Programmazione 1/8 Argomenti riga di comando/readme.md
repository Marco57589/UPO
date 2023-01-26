# 8) Argomenti a riga  di comando #


## Compilazione file c
```
$ gcc -Wall file_name.c -lm 
```
## Esecuzione
```
$ ./file_name parametro1 parametro2 parametro-n
```
## Argc - Argv
```
> argc = Argument Counter (numero parametri, NB: é contato anche ./file)
> argv = Argument Values (vettore contenente tutti i parametri extra)
```

<br/>
<hr/>

> ## 1. Scrivere un programma che riceve (da terminale) dei valori interi strettamente positivi (quantita' indefinita). 
> Restituisce al terminale:
> - Il risultato della somma dei valori se i valori sono presenti e strettamente positivi;
> - 1 Se i valori non sono tutti interi strettamente positivi;
> - 0 Se nessun valore e' ricevuto.

```c
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]){

    int minore = 0;
    int somma = 0;
    
    if(argc == 1){
        puts("Non ho ricevuto argomenti");
        exit(0);
    }else{
        for(int i = 1; i < argc; i++){
            printf("ARGV[%d]: %s\n", i, argv[i]);

            if(atoi(argv[i]) > 0){
                    somma += atoi(argv[i]);
            }else{
                puts("Ho trovato un argomento negativo");
                puts("I valori inseriti non sono tutti strettamente posiivi");
                minore++;
                exit(1);
            }
        }

        if(minore == 0){
            puts("Tutti i valori sono strettamente positivi");
            printf("La somma degli argomenti e': %d", somma);
            return somma;
        }
    }
}
```

<hr/>

> ##  2. Scrivere un programma che riceve (da terminale) una stringa e un carattere.
> Restituisce al terminale: 
> - 1 Se il carattere e' presente nella stringa (funzione strchr o strrchr);
> - 0 Se il carattere non e' presente nella stringa;
> - 2 Se il secondo argomento non e' un singolo carattere;
> - 3 Se il numero di argomenti non e' corretto. 

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]){

    if(strlen(argv[2]) != 1){
        puts("Il carattere inserito non é un singolo carattere");
        //return 2; //exit(2)
        return 137;
    }
    if(argc > 3){
        puts("é stato inserito un numero non valido di argomenti (il limite è 2)");
        return 3; //exit(3)
    }

    if(strchr(argv[1], argv[2][0]) != NULL){
        printf("Il carattere %s é presente nella stringa %s", argv[2], argv[1]);
        return 1; //exit(1)
        
    }else{
        puts("Il carattere non é presente nella stringa");
        return 0; //exit(0)
    }
}
```

<hr/>

> ## 3. Scrivere un programma che riceve (da terminale) delle stringhe (quantita' indefinita). 
> Visualizza la stringa ottenuta concatenando le stringhe ricevute (funzione strcat). 
> Restituisce al terminale:
> - 1 Se non ha ricevuto nessuna stringa;
> - 0 Se ha ricevuto almeno una stringa. 

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]){
    int length = 0;

    if(argc > 1){
        
        for(int i = 1; i < argc; i++){
            length += strlen(argv[i]);
        }
        
        char stringa[length];
        stringa[0] = '\0';

        for(int i = 1; i < argc; i++){
            strcat(stringa, argv[i]);
        }
        printf("La stringa ottenuta é: %s", stringa);

        return 0;

    }else{
        puts("Non ho ricevuto argomenti");
        return 1;
    }
}
```
<hr/>

> ##  4. Scrivere un programma che riceve (da terminale) esattamente due stringhe.
> Restituisce al terminale:
> - 0 se il numero di stringhe non e' due;
> - 1 se la prima stringa e' contenuta nella seconda (funzione strstr);
> - 2 se la seconda stringa e' contenuta nella prima;
> - 3 altrimenti.

```c
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
```
<hr/>

> ## 5. Scrivere un programma che riceve (da terminale) una stringa e un carattere. 
> Visualizza le stringhe ottenute separando la stringa ricevuta usando il carattare come separatore (funzione strtok). 
> Restituisce al terminale:
> - 0 Se la separazione e' avvenuta;
> - 1 Se non ha ricevuto un carattere come secondo argomento;
> - 2 Se il numero di argomenti ricevuti e' errato. 

```c
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main(int argc, char *argv[]){

    if(argc > 3){
        puts("Numero di argomenti errato");
        return 2;
    }
    if(strlen(argv[2]) > 1){
        puts("Il secondo argomento non é un carattere ma una stringa!");
        return 2;
    }
    
    if(atoi(argv[2])){
        puts("Il secondo argomento non é un carattere");
        return 1;

    }else{
        char *parte1, *parte2, *c;
        char stringa[strlen(argv[1])];

        strcpy(stringa, argv[1]); //copio argv[1] in stringa 
        parte1 = strtok(argv[1], argv[2]);
        c = strtok(stringa, parte1);
        parte2 = strtok(c, argv[2]);

        printf("%s - %s", parte1, parte2);
    }
    return 0;
}
```
<hr/>
