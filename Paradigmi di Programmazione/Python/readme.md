# 1) Esercizi String #


## Compilazione ed esercuzione:
```
colab.research.google.com/
```

<br/>
<hr/>

> ## 1. Crea un variabile c con valore "Winter is coming" utilizzando string:



```python
a = "Winter"
b = "is coming"

c = a+b
print(c)
```

<hr/>

> ## 2. crea un variabile d con valore "WinterWinterWinter":


```python
d = a * 3
print(d)
```

<hr/>

> ## 3. Stampa la lunghezza di c:

```python
print(len(c))
```

<hr/>

> ## 4. Controlla se c contiene il carattere 'a', 'g', 'w'.
> 
```python
isIn = 'w'.lower() in c.lower() #ignoro le maiuscole

if(isIn):
  print("carattere presente")
else:
  print("carattere non presente")
```

<hr/>

> ## 5. Stampa il terzo e il terzultimo carattere di c.
> 
```python
print(f"Terzo carattere: {c[2]}, 
    \nTerzultimo carattere: {c[len(c)-3]}")
```

<hr/>

> ## 6. Stampa quanti 'i' ci sono in c.
> 
```python
print(c.count('i'))
```

<hr/>

> ## 7. Stampa l'indice del primo 'i' in c.
> 
```python
print(c.index('i'))
```

<hr/>

> ## 8. Stampa quanti 'in' ci sono in c.
> 
```python
print(c.count('in'))
```

<hr/>

> ## 9. Crea una funzione che prende una stringa come parametro, e ritorna la stringa in cui i caratteri di indice dispari sono rimossi. Se la stringa e' vuota ritorna None.<br> Attenzione le stringhe sono immutabili.
>Esempio: fn2('abcdefg') = 'aceg'

```python
def remove_odd(stringa: str):
  if len(stringa) == 0:
    return None
  else:
    return stringa[0::2]#slicing partendo da 0 con passo 2

s = "abcdefg"
s2 = remove_odd(s)
```
>'aceg'

<hr/>

> ## 10. Crea una funziona come quella sopra, ma rimuove i caratteri con indice pari e ritorna il resto in ordine inverso. Se la lista non ha almeno 2 caratteri ritorna None 
>Esempio: fn3('abcdefg') = 'fdb'

```python
def remove_even_and_reverse(stringa: str):
  if len(stringa) == 0:
    return None
  else:
    stringa = stringa[1::2]#slicing partendo da 1 con passo 2
    return stringa[::-1]

s = "abcdefg"
s2 = remove_even_and_reverse(s)
```
>'fdb'

<hr/>

> ## 11. Applica le due funzioni precedenti alla stringa 'teovruoj'

```python
str = 'teovruoj'
str1 = remove_odd(str)
str2 = remove_even_and_reverse(str)
print(f"STR1: {str1}  \nSTR2: {str2}")
```

<hr/>

> ## 12. Ora crea una funzione per fare l'inverso; cioe' per mescolare due stringhe della stessa lunghezza, la prima nell'ordine originale e la seconda al rovescio. Se gli input non sono idonei, ritorna None. >
>Esempio: fn4(str1,str2) = 'teovruoj'

```python
def concat_and_reverse(str1: str, str2: str):
  s=""
  if len(str1) == len(str2):
    str2 = str2[::-1]
    for x in range(len(str1)):
      s += str1[x] + str2[x]
    return s
  else:
    return None


str = concat_and_reverse(str1, str2)
```
>str = 'teovruoj'
