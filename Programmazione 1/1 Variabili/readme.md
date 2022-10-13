# 1) Variabili #


## Compilazione
```
$ gcc file_name.c
```
## Esecuzione
```
$ ./file_name
```

## Pushing Changes

ℹ️ The following commands only work for the project maintainer
because they require Google Drive authorization.

| Command | Description |
| --- | --- |
| `npm run push:gas` | just GAS files |
| `npm run push:js` | just `sidebar.js` |
| `npm run push:static` | just HTML & CSS |
| `npm run push` | everything |

<br/>
<hr/>

> ## 1 Scrivere un programma C che esegua le seguenti operazioni:
> 
> -   Definisca due variabili intere x e y.
> -   Assegni alle variabili i valori 7 e 3.
> -   Stampi a video i valori di x e y e il loro prodotto.

```c
#include <stdio.h>

void main(){
	
    	int x = 0;
	int y = 0;
	
	x = 7;
	y = 3;

	printf("Prodotto: %d", x * y);
}
```

<hr/>

> ## 2 Scrivere un programma C che esegua le seguenti operazioni:
> 
> -   Inizializzi due variabili intere x e y;
> -   Calcoli l'area del rettangolo di lati x e y;
> -   Stampi a video le misure dei lati e l'area del rettangolo in modo che l'output abbia la forma seguente:
> 	Lato1 = (valore di x)
>	Lato2 = (valore di y)
>	Area = (area calcolata)
>	
```c
#include <stdio.h>

void main(){

    int x = 0;
    int y = 0;
    int area = 0;

    x = 5;
    y = 4;

    area = x * y;

    printf("LatoX: %d \nLatoY: %d \nArea %d\n", x, y, area);
}
```
