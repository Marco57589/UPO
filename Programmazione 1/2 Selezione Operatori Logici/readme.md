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
	int h = 0;
	float area = 0;
	
	print("inserire b1");
	scanf("%d",&b1);
	printf("inserire b2");
	scanf("%d",&b2);
	printf("inserire h");
	scanf("%d",&h);
	
	if(l1 > 0 && l2 > 0 && h > 0){
		area = ( (x+y) * h)  / 2;
		printf("Base1 = %d \n Base2 = %d \n Altezza = %d \n Area = %f ",b1, b2, h, area);

	}else{
		printf("errore")
	}
}
```

<hr/>

> ## 4  L'utente inserisce un anno ed il calcolatore verifica se e' bisestile. Un anno e' bisestile se e' divisibile per 4 ma non per 100, oppure se e' divisibile per 400.
>```
>	Esempi esecuzione:
>
>	anno --> 1997
>	L'anno 1997 non e' bisestile
>
>	anno --> 1996
>	L'anno 1996 e' bisestile
>
>	anno --> 1900
>	L'anno 1900  non e' bisestile
>
>	anno --> 2000
>	L'anno 2000  e' bisestile
>
>	anno --> 2012
>	L'anno 2012 e' bisestile
>``` 

```c
#include <stdio.h>

int main(){

    int anno = 0;
	
    puts("Inserisci l'anno");
    scanf("%d", &anno);
    
	printf("anno --> %d \n", anno);
	
    if((anno%4 == 0 && anno%100 != 0) || anno%400 == 0){
        printf("L'anno %d e' bisestile", anno);
		
    }else{
         printf("L'anno %d non e' bisestile", anno);
		 
	}
}
```

<hr/>

> ## 5 
> 
```c
```

<hr/>

> ## 6 
> 
```c
```

