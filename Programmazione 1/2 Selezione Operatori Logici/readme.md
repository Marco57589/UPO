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
	int l1 = 0;
	int l2 = 0;
    float area = 0;
	
	print("inserire l1");
	scanf("%d",&l1);
	printf("inserire l1");
	scanf("%d",&l2);
	
	if(l1 > 0 && l2 > 0){
	  area = l1 * l2;
	  printf("Lato1 = %d \n Lato2 = %d \n Area = %f  ",l1, l2, area);

	}else{
		printf("errore")
	}
}
```

<hr/>

> ## 3 Scrivere un programma C che esegua le seguenti operazioni:
> - Legga da tastiera tre variabili x, y e h;
>		
> Se x, y e h sono tutte maggiori di 0, allora
> - Calcoli l'area del trapezio di basi x e y e altezza h;
> - Stampi a video le misure delle basi, dell'altezza e l'area del trapezio in modo che l'output abbia la forma seguente:
>```
>	Base1 = (valore di x)
>	Base2 = (valore di y)
>	Altezza = (valore di h)
>   Area = (area calcolata)
>```
> Altrimenti
> - Visualizzi un messaggio di errore. 
>


```c
#include <stdio.h>

void main(){
	int b1 = 0;
	int b2 = 0;
	int h = 0
    float area = 0;
	
	print("inserire b1");
	scanf("%d",&b1);
	printf("inserire b2");
	scanf("%d",&b2);
	printf("inserire h");
	scanf("%d",&h);
	
	if(l1 > 0 && l2 > 0 && h > 0){
	  area = l1 * l2;
	  printf("Base1 = %d \n Base2 = %d \n Altezza = %d \n Area = %f ",b1, b2, h, area);

	}else{
		printf("errore")
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
