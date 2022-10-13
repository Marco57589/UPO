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


# 1
Scrivere un programma C che esegua le seguenti operazioni:
- definisca due variabili intere x e y;
- assegni alle variabili i valori 7 e 3;
- stampi a video i valori di x e y e il loro prodotto

> ## 1.
> 
> 1.   This is the first list item.
> 2.   This is the second list item.
> 
>  

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
