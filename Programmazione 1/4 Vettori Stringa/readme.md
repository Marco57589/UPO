# 4) Vettori #


## Compilazione file c
```
$ gcc file_name.c -lm
```
## Esecuzione
```
$ ./file_name
```

<br/>
<hr/>

> ## 1. Scrivere un programma che chiede all'utente di inserire una password.
> La password deve contenere:
> - almeno 8 caratteri
> - almeno una lettera maiuscola
> - almeno una lettera minuscola
> - almeno una cifra
> - almeno un simbolo di punteggiatura (. , ; : ? !)
> - almeno un carattere speciale (@ # * $ %)
> Se la password non rispetta tutti i requisiti si visualizza un messaggio di errore e si ripete la richiesa fino a quando la password non e' adeguata. 
> Se la password e' corretta si visualizza un messaggio di accettazione.

```c
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#include <ctype.h>

void main(){
    
    char password[100];
    char errori[] = {'#', ';', '1', 'A', 'a', 'L'}; //carattere speciale, punteggiatura, cifra, maiuscola, minuscola, lunghezza
    int controlli[] = {0,0,0,0,0,0};
    int corretto = 0;
    int i,j = 0;

    while(corretto != 6){
    

        for(j = 0; j < 6; j++){ //reset conrolli
            controlli[j] = 0;
        }
        corretto = 0;

        puts("\nInserisci la password");
        scanf("%s", password);


        for(i = 0; i < strlen(password); i++){
            if(password[i] == '@' || password[i] == '#' || password[i] ==  '*' || password[i] == '$' || password[i] == '%'){
                controlli[0] = 1;
            }
            if(password[i] == '.' || password[i] == ',' || password[i] ==  ';' || password[i] == ':' || password[i] == '?' || password[i] == '!'){
                controlli[1] = 1;
            }
            if(isdigit(password[i])){
                controlli[2] = 1;
            }
            if(password[i] >= 'A' && password[i] <= 'Z'){
                controlli[3] = 1;
            }
            if(password[i] >= 'a' && password[i] <= 'z'){
                controlli[4] = 1;
            }
        }
        if(strlen(password) >= 8){
            controlli[5] = 1;
        }

        puts("\nControllo password");

        for(j = 0; j < 6; j++){
            if(controlli[j] == 1){
                printf("\nCarattere - %c V", errori[j]);
                corretto++;
            }else{
                printf("\nCarattere - %c X", errori[j]);
            }
        }
    }
    puts("Password accettata");
}
```

<hr/>

> ## 2. Scrivere un programma che date due stringhe (s1, s2) in input genera la stringa s3 composta da s1 e s2 concatenate. 
> Esempio:
>```
> s1: buon	s2: giorno	--->	s3: buongiorno
>```
```c
#include <stdio.h>
#include <string.h>

void main(){
    
    char s1[50];
    char s2[50];
    char s3[100];
    int i = 0;
   
    puts("\nInserisci s1");
    scanf(" %[^\n]", s1);

    puts("\nInserisci s2");
    scanf(" %[^\n]", s2);


    for(i = 0; i < strlen(s1); i++){
        s3[i] = s1[i];
    }

    for(i = 0; i < strlen(s2); i++){
        s3[strlen(s1)+i] = s2[i];
    }

    printf("La stringa risultate e': %s", s3);

}
```

<hr/>

> ## 3. Scrivere un programma che data una stringa (s1) in input genera due stringhe (s2, s3) in questo modo:
> - s2 contiente la prima meta' dei caratteri di s1;
> - s3 contiente la seconda meta' dei caratteri di s1.
>```
> Esempio:
> s1: buongiorno	--->	s2: buong	s3: iorno	
>```
```c
#include <stdio.h>
#include <string.h>

void main(){
    
    char s1[100];
    char s2[50];
    char s3[50];
    int i = 0;
   
    puts("\nInserisci s1");
    scanf(" %[^\n]", s1);

    for(i = 0; i < strlen(s1)/2; i++){
        s2[i] = s1[i];
        s3[i] = s1[strlen(s1)/2+i];

        if(strlen(s1)%2 == 1 && i == (strlen(s1)/2)-1){ //se s1 é dispari allora  aggiungo il valore alla seconda stringa (S3)
            i++;
            s3[i] = s1[strlen(s1)/2+i];        
        }
    }
    printf("La stringa iniziale e': %s\ns2: %s \ns3: %s", s1, s2, s3);

}
```

<hr/>

> ## 4. Scrivere un programma che data una stringa (s1) in input genera due stringhe (s2, s3) in questo modo:
> s2 contiene le vocali presenti in s1, evitando le ripetizioni; 
> s3 contiene le consonanti presenti in s1, evitando le ripetizioni.
> ```
> Esempio:
> s1: buongiorno	---> s1: uoi	s2: bngr
> ```

```c
##include <stdio.h>
#include <string.h>

void main(){
    
    char s1[100];
    char s2[50];
    char s3[50];
    int i = 0;
    int k = 0;
    int j = 0;
   
    puts("\nInserisci s1");
    scanf(" %[^\n]", s1);

    for(i = 0; i < strlen(s1); i++){
        if(s1[i] == 'a' || s1[i] == 'e' || s1[i] == 'i' || s1[i] == 'o' || s1[i] == 'u'){
            s2[k] = s1[i];
            k++;
        }else{
            s3[j] = s1[i];
            j++;     
        }
    }
    printf("La stringa iniziale e': %s\ns2: %s \ns3: %s", s1, s2, s3);
}
```
<hr/>

> ## 5. Scrivere un programma che chiede all'utente di inserire un carattere e una lunghezza. 
> Poi crea una stringa di tale lunghezza composta dal carattere inserito e dai caratteri successivi nell'alfabeto, fino a completare la stringa. 
>```
> Esempio:
> carattere: 'd'	lunghezza: 6	--->	defghi
> ```

```c
#include <stdio.h>
#include <string.h>

void main(){
    
    char c;
    int lunghezza = 0;
    int i = 0;
    int carattere = 0;
   
    puts("\nInserisci un carattere");
    scanf("%c", &c);
    
    carattere = c;

    puts("\nInserisci una lunghezza");
    scanf("%d", &lunghezza);

    char s3[lunghezza];

    for(i = 0; i < lunghezza; i++){
        s3[i] = carattere;
        if(carattere == 122){
            carattere = 97;
        }else{
            carattere++;
        }
    }

    printf("\nCarattere: %c di lunghezza: %d --> %s", c, lunghezza, s3);

}
```
<hr/>
