# 2b) Selezione Operatori Logici #


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

> ## 1  Scrivere un programma che prenda in input la base e l'altezza di un triangolo. 
>	Se entrambi sono maggiori di 0, allora calcola e visualizza l'area del triangolo altrimenti visualizza un messaggio di errore.
```c
#include <stdio.h>

void main(){
    int b = 0;
    int h = 0;
    float area;
    
    printf("inserisci h: ");
    scanf("%d", b);
    printf("inserisci b: ");
    scanf("%d", b);


    if(b>0 && h>0){
        area = b*h;
        printf("l'area del triangolo e': %f", area);
    }else{
        puts("errore");
    }

}
```

<hr/>

> ## 2  Scrivere un programma C che esegua le seguenti operazioni:
> - Legga da tastiera due variabili x e y.
>		
> Se x e y sono entrambi maggiori di 0, allora
> - Calcoli l'area del rettangolo di lati x e y.
> - Stampi a video le misure dei lati e l'area del rettangolo in modo che l'output abbia la forma seguente:
>```
>	Lato1 = (valore di x)
>	Lato2 = (valore di y)
>	Area = (area calcolata)
>```
> Altrimenti
> - Visualizzi un messaggio di errore. 
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

    if(a % b == 0){
        printf("b e' multiplo a a");
		
    }else{
        printf("b non e' multiplo di a");
		
    }

}
```

<hr/>

> ## 4 Si realizzi un programma in linguaggio C che acquisisca da tastiera un numero e stampi il valore assoluto di tale numero.
> -	Se il numero x inserito e' positivo o nullo, basta visualizzare x. 
> - 	Se il numero inserito e' negativo, bisogna visualizzare -x.  
> 

```c
#include <stdio.h>

void main(){

    int x = 0;

    printf("Inserisci X: ");
    scanf("%d", &x); 

    if(x == 0 || x > 0){
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

    if(n >- 1){ //Per noi 0 é un valore positivo
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

    if(n1 > n2 && n1 > n3){
        printf("Il numero maggiore e' N1");
		
    }else if(n2 > n1 && n2 > n3){
        printf("Il numero maggiore e' N2");
		
    }else{
        printf("Il numero maggiore e' N3");
		
    }
}
```

> ## 7  Scrivere un programma che prenda in input il raggio di una circonferenza. 
> -	Se il raggio e' maggiore di 0, allora il programma calcola e visualizza il valore della circonferenza e dell'area del cerchio. 
> -	Altrimenti visualizza il messaggio "il raggio deve essere maggiore di 0". 
> 

```c
#include <stdio.h>

#define pg 3.14

void main(){

    int raggio = 0;
    float area = 0;

    printf("Inserisci il raggio: ");
    scanf("%d", &raggio); 

    if(raggio > 0){
        area = (raggio*raggio) * pg;
        printf("L'area della circonferenza e' %f ", area);
	
    }else{
        printf("Il raggio deve essere maggiore di 0");
	
    }    
}
```

<hr/>

> ## 8  Scrivere un programma che prenda in input due valori e un operatore.
> -	Se l'operatore e' + allora calcola e visualizza la somma dei valori.  
> -	Se l'operatore e' - allora calcola e visualizza la differenza dei valori.  
> -	Se l'operatore e' * allora calcola e visualizza il prodotto dei valori. 
> -	Se l'operatore e' / allora calcola e visualizza la divisione del primo valore per il secondo. 
> -	Se l'operatore e' diverso dai precedenti, allora visualizza il messaggio "operatore sconosciuto".   

```c
#include <stdio.h>

void main(){

    int n1 = 0;
    int n2 = 0;
    float risultato = 0;
    char operatore = '';

    printf("inserisci n1\n");
    scanf(" %d", &n1);

    printf("inserisci operatore\n");
    scanf(" %c", &operatore);

    printf("inserisci n2\n");
    scanf(" %d", &n2);

    if(operatore == '+'){
        risultato = n1+n2;
	
    }else if(operatore == '-'){
        risultato = n1-n2;
	
    }else if(operatore == '*'){
        risultato = n1*n2;
	
    }else if(operatore == '/'){
        risultato = n1/n2;
	
    }else{
        printf("operatore non valido");
	
    }

    printf("Il risultato e': %f", risultato);    
}
```

<hr/>


> ## 9 Scrivere un programma che prenda in input il valore di una casa e il codice della zona in cui si trova (1, 2, 3 o 4).
> -	Il programma deve calcolare la tassa di proprieta' come percentuale del valore della casa. 
> -		In zona 1, la percentuale e' 5%. 
> -     In zona 2, la percentuale e' 10%.
> -     In zona 3, la percentuale e' 15%. 
> -     In zona 4, la percentuale e' 20%.
> -	Se l'operatore e' diverso dai precedenti, allora visualizza il messaggio "operatore sconosciuto".   
> Il programma deve visualizzare l'importo della tassa se la zona varia tra 1 e 4, altrimenti un messaggio di errore.
> 
```c
#include <stdio.h>

void main(){

    float casa = 0;
    float valore = 0;
    int zona = 0;

    printf("Inserisci il valore della casa: ");
    scanf("%f", &casa); 

    printf("Inserisci il codice della zona: "); 
    scanf("%d", &zona); 

    if(zona > 4 || zona < 1){
        printf("codice non valido ");
	
    }else if(zona == 1){
        valore = (casa * 1.05);
        printf("il valore della casa e' di %f:", &valore);

    }else if(zona == 2){
        valore = (casa * 1.10);
        printf("il valore della casa e' di %f:", &valore);

    }else if(zona == 3){
        valore = (casa * 1.15);
        printf("il valore della casa e' di %f:", &valore);

    }else{
        valore = (casa * 1.20);
        printf("il valore della casa e' di %f:", &valore);

    }    
}
```

<hr/>

> ## 10) Scrivere un programma che dati in input i coefficienti a, b, c di una equazione di 2° grado, calcola il discriminante Delta=(b*b - 4*a*c).
> -	Se Delta<0 il programma visualizza "nessuna soluzione".  
> -	In zona 1, la percentuale e' 5%. 
> - Se Delta=0 il programma calcola e visualizza l'unica soluzione dell'equazione x=-b / (2*a)
> -	Se Delta>0 il programma calcola e visualizza le due soluzioni dell'equazione:
> - 	x1=( -b + sqrt(b*b - 4*a*c) ) / (2*a)
> -		x2=( -b - sqrt(b*b - 4*a*c) ) / (2*a)
> Includere la libreria math.h per poter utilizzare la funzione sqrt (radice quadrata).
> 
```c
#include <stdio.h>
#include <math.h>

void main(){

    int a = 0;
	int b = 0;
	int c = 0;
    int x = 0;
	
    float x1 = 0;
    float x2 = 0;
    float delta = 0;
    float eq = 0;


    puts("Inserisci il valore di a: ");
    scanf("%d", &a); 

    puts("Inserisci il valore di b: ");
    scanf("%d", &b); 

    puts("Inserisci il valore di c: ");
    scanf("%d", &c); 

    delta = (b*b) - 4*(a*c);
    printf("Il valore di delta  e' %f: \n", delta);
    
    if(delta < 0){   
        puts("Nessuna soluzione\n");

    }else if(delta == 0){
        x = (b*-1) / (2*a);

    }else{
        x1 = (b*-1) + sqrt((b*b) - 4*(a*c)) / (2*a);
        x2 = (b*-1) - sqrt((b*b) - 4*(a*c)) / (2*a);

        printf("la soluzione x1 e' %f, mentre quella di x2 e' %f: ", x1, x2);
    }    
}
```

<hr/>


> ## 11)  Un bancomat soddisfa una richiesta di prelievo di una somma di denaro adottando la seguente strategia:
> -	Emette  fin che puo' banconote da 50 (ossia, emette banconote da 50 fin tanto che il totale non supera la somma richiesta).  
> - Quando ha terminato con le banconote da 50, emette fin che puo' banconote da 20.
>  Scrivere un programma che chiede all'utente di inserire la somma richiesta (un intero), calcola quante banconote da 50 e 20 verranno emesse e il totale corrispondente ai soldi emessi.
> -	I messaggi vanno scritti come negli esempi sotto, in particolare le banconote emesse vanno stampate solo quando il numero e' diverso da 0.
> 
> 		somma -->  500
> 		banconote da 50: 10
> 		Somma erogata: 500
> 
> 		somma -->  290
> 		banconote da 50: 5
> 		banconote da 20: 2
> 		Somma erogata: 290
> 
> 		somma -->  40
> 		banconote da 20: 2
> 		Somma erogata: 40
> 
> 		somma -->  595
> 		banconote da 50: 11
> 		banconote da 20: 2
> 		Somma erogata: 590
> 		
> 		somma -->  48
> 		banconote da 20: 2
> 		Somma erogata: 40 
> 
```c
#include <stdio.h>

void main(){

    int richiesta = 0;
    int b5 = 0; //banconote 50
    int b2 = 0; //banconote 20
    int aus = 0; //variabile ausiliaria

    puts("Inserisci la somma da prelevare: ");
    scanf("%d", &richiesta); 

    b5 = richiesta / 50;
    aus = richiesta-(b5*50);
    b2 = aus / 20;
    
    printf("Somma richiesta %d banconote da 50 => %d banconote da 20 => %d", richiesta, b5, b2);        
}
```

<hr/>

> ## 12 Ripetere gli esercizi 8 e 9 usando il costrutto switch (selezione multipla).


<hr/>

> ## 13 Scrivere un programma che legge da tastiera un mese espresso come numero (da 1 a 12), e restituisce il numero di giorni in quel mese. Utilizzare il costrutto switch aggregando i casi con lo stesso esito.

<hr/>
