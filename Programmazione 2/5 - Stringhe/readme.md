# 5) Stringhe (Ripasso "Sperimentazioni Programmazione 2") #


## Compilazione file c
```
$ gcc -Wall file_name.c -o alias
```
## Esecuzione
```
$ ./alias (senza argomenti)
$ ./alias arg1 arg2 argn
```

<br/>
<hr/>

> ## 1. Scrivere una funzione oddExtract che accetta una stringa come argomento e restituisce una
> nuova stringa (attraverso parametro) che contiene solo i caratteri in posizione dispari della stringa originale.
```c
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
```

<hr/>

> ## 2. Scrivere una funzione upperExtract che accetta una stringa come argomento e restituisce una nuova stringa (attraverso parametro) che 
> contiene solo le parole che iniziano con una lettera maiuscola della stringa originale. 
> Utilizzare le funzioni strtok() e isupper() di string.h e ctype.h 

```c
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
```
