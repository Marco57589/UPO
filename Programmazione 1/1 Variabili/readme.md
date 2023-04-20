# 1) Variabili #


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

> ## 1 Scrivere un programma C che esegua le seguenti operazioni:
> 
> -   Definisca due variabili intere x e y.
> -   Assegni alle variabili i valori 7 e 3.
> -   Stampi a video i valori di x e y e il loro prodotto.

```c
#include <stdio.h>

int main(){
	
	int x = 0;
	int y = 0;

	x = 7;
	y = 3;

	printf("Prodotto: %d", x * y);
	return 0;
}
```

<hr/>

> ## 2 Scrivere un programma C che esegua le seguenti operazioni:
> 
> -   Inizializzi due variabili intere x e y;
> -   Calcoli l'area del rettangolo di lati x e y;
> -   Stampi a video le misure dei lati e l'area del rettangolo in modo che l'output abbia la forma seguente:
>	```
>   Lato1 = (valore di x)
> 	Lato2 = (valore di y)
> 	Area = (area calcolata)
>	```

```c
#include <stdio.h>

int main(){
	int x = 0;
	int y = 0;
	int area = 0;

	x = 5;
	y = 4;

	area = x * y;

	printf("LatoX: %d \nLatoY: %d \nArea %d\n", x, y, area);
	return 0;
}
```

<hr/>

> ## 3 Scrivere un programma C che esegua le seguenti operazioni:
> 
> -   Inizializzi due variabili intere x e y;
> -   Calcoli l'area del trapezio di basi x e y e altezza h;
> -   Stampi a video le misure delle basi e dell'altezza e l'area del trapezio in modo che abbia la forma seguente
> 	```
>	Base1 = (valore di x)
>	Base2 = (valore di y)
> 	Altezza = (valore di h)
>	Area = (area calcolata)
>	```


```c
#include <stdio.h>

int main(){
	int x = 0;
	int y = 0;
	int h = 0;
	float area = 0;

	x = 7;
	y = 3;
	h = 5;

	area = ( (x+y) * h)  / 2;

	printf("Base1: %d \nBase2Y: %d \nAltezza %d\nArea: %f", x, y, h, area);
	return 0;
}
```

<hr/>

> ## 4 Risolvere l'esercizio precedente leggendo in input i valori dei lati (float) e dell'altezza (float) utilizzando il metodo scanf.
> 
```c
#include <stdio.h>

int main(){	
	float x = 0;
	float y = 0;
	float h = 0;
	float area = 0;

	printf("Inserisci lato 1:");
	scanf("%f", &x);
	printf("Inserisci lato 2:");
	scanf("%f", &y);
	printf("Inserisci H:");
	scanf("%f", &h);

	area = ( (x+y) * h)  / 2;

	printf("Base1: %d \nBase2Y: %d \nAltezza %d\nArea: %f", x, y, h, area);
	return 0;
}
```

<hr/>

> ## 5 Scrivere un programma che prenda due numeri in input e li stampi nell'ordine inverso.
> 
```c
#include <stdio.h>

int main(){	
	float num1 = 0;
	float num2 = 0;

	printf("Inserisci num1:");
	scanf("%f", &num1);
	printf("Inserisci num2:");
	scanf("%f", &num2);

	printf("Num2: %f \nNum1: %f", num2, num1);

	return 0;
}
```

<hr/>

> ## 6 Scrivere un programma che permetta di inserire 4 numeri float e ne stampi la somma,la media, il prodotto.
> 
```c
#include <stdio.h>

int main(){	
	float num1 = 0;
	float num2 = 0;
	float num3 = 0;
	float num4 = 0;

	float somma = 0;
	float media = 0;
	float prodotto = 0;

	printf("Inserisci num1:");
	scanf("%f", &num1);
	printf("Inserisci num2:");
	scanf("%f", &num2);
	printf("Inserisci num3:");
	scanf("%f", &num3);
	printf("Inserisci num4:");
	scanf("%f", &num4);

	//Metodo 1:
	somma = num1+num2+num3+num4;
	media = (somma / 4);
	prodotto = num1 * num2 * num3 * num4;

	printf("Somma: %f \nMedia: %f \nProdotto %f\n", somma, media, prodotto);

	//Metodo 2 (Senza creazione variabili dedicate):
	printf("Somma: %f \nMedia: %f \nProdotto %f\n", (num1+num2+num3+num4), (somma / 4), (num1 * num2 * num3 * num4));

	return 0;
}
```
