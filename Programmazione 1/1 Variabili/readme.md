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




> ## 1 Scrivere un programma C che esegua le seguenti operazioni:
> 
> -   Definisca due variabili intere x e y.
> -   Assegni alle variabili i valori 7 e 3.
> -   Stampi a video i valori di x e y e il loro prodotto.

<hr/>

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
