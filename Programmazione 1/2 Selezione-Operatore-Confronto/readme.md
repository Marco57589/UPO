# 2a) Selezione Operatori Confronto #


## Compilazione file c
```
$ gcc file_name.c
```
## Esecuzione
```
$ ./file_name
```

<br/>
<hr/>

> ## 1  Scrivere un programma che dato un numero intero in input, visualizza se il numero e' pari o dispari. 

```c
#include <stdio.h>
#include <math.h>

void main(){

    int n = 0;

    printf("Inserisci N: ");
    scanf("%d", &n); 

    if(n%2 == 0){
        printf("Il numero inserito e' pari");

    }else{
        printf("Il numero inserito e' dispari");
    }

}
```

<hr/>

> ## 2 Scrivere un programma che dati in input due valori visualizzi il maggiore. 
> 

```c
#include <stdio.h>

void main(){

    int n1 = 0;
    int n2 = 0;

    printf("Inserisci N1: ");
    scanf("%d", &n1); 
    printf("\nInserisci N2: ");
    scanf("%d", &n2); 

    if(n1 == n2){
        printf("N1 e' uguale a N2");
		
    }else{
        if(n1 > n2){
            
	    printf("N1 e' maggiore di N2");	
        }else{
            printf("N2 e' maggiore di N1");
	    
        }
	
    }

}
```

<hr/>

> ## 3 Realizzare un programma che legga due numeri interi e controlli se il primo e' multiplo del secondo.
> 

```c
#include <stdio.h>

void main(){

    int n1 = 0;
	int n2 = 0;

    printf("Inserisci n1: ");
    scanf("%d", &n1); 
    printf("\nInserisci n2: ");
    scanf("%d", &n2); 

    if(a%b == 0){
        printf("b e' multiplo a a");
		
    }else{
        printf("b non e' multiplo di a");
		
    }

}
```

<hr/>

> ## 4 Si realizzi un programma in linguaggio C che acquisisca da tastiera un numero e stampi il valore assoluto di tale numero.
> -	Se il numero x inserito e' positivo o nullo, basta visualizzare x. 
> - Se il numero inserito e' negativo, bisogna visualizzare -x.  
> 

```c
#include <stdio.h>

void main(){

    int x = 0;

    printf("Inserisci X: ");
    scanf("%d", &x); 

    if(x==0 || x>0){
        printf("Il valore di x e' positivo %d", x);
		
    }else{
        printf("Il valore di x e' negativo %d", x);
		
    }

}
```

<hr/>

> ## 5 Scrivere un programma che dato un numero intero in input, visualizza se il numero e' nullo, positivo o negativo. 
> 
```c
#include <stdio.h>

void main(){

    int x = 0;

    printf("Inserisci N: ");
    scanf("%d", &n); 

    if(n >- 1){
        printf("Il valore di n e' positivo\n");
		
        if(n == 0){
            printf("Il valore di n e' nullo\n");
        }
    }
  
    if(n < 0){
        printf("Il valore di n e' negativo\n");
		
    }

}
```

<hr/>

> ## 6 Scrivere un programma che dati in input tre valori, visualizza il maggiore. 
> 
```c
#include <stdio.h>

void main(){

    int n1 = 0;
	int n2 = 0;
	int n3 = 0;

    printf("Inserisci N1: ");
    scanf("%d", &n1); 
    printf("Inserisci N2: ");
    scanf("%d", &n2); 
    printf("Inserisci N3: ");
    scanf("%d", &n3);

    if(n1>n2 && n1 > n3){
        printf("Il numero maggiore e' N1");
		
    }else if(n2>n1 && n2>n3){
        printf("Il numero maggiore e' N2");
		
    }else{
        printf("Il numero maggiore e' N3");
		
    }
}
```
