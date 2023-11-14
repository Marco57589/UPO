# 1) Esercizi String #


## Compilazione ed esercuzione:
```
colab.research.google.com/
```

<br/>
<hr/>

> ## 1. Scrivi una funzione che accetta una lista di numeri e ritorna true se e solo se (sse) tutti i numeri sono distinti:
>Esempi:<br>
>distinti([1,2,3,4]) -> True<br>
>distinti([1,2,3,2]) -> False



```python
def check_equal_value(array):
  for i in array:
    if array.count(i) > 1:
      return False #uno uguale

  return True # tutti diversi

array1 = [1,2,3,4]
array2 = [1,2,3,2]

check_equal_value(array1)
check_equal_value(array2)
```
> array1: True<br>
> array2: False

<hr/>

> ## 2. Scrivi una funzione che ritorna il numero cifre di un intero:
>Esempi:<br>
>cifre(0) -> 1<br>
>cifre(1003) => 4

```python
def number_length(n: int):
  #converto in stringa e guardo la lunghezza di essa
  return len(str(n)) 

number_length(1003)
```
>4

<hr/>

> ## 3. Scrivi una funzione che accetta un int e ritorna il numero di zeri consecutivi con cui finisce. 
>Esempi:<br>
>last_zeros(123) -> 0<br>
>last_zeros(1200086000) -> 3<br>
>last_zeros(-100) -> 2<br>
>last_zeros(0) = 1

```python
#Questa versione conta l'ultima serie di zeri che trova anche se non sono l'ultimo carattero

def last_zeros(num):
  countedZeros = 0
  temp = -1
  num = str(num)[::-1] 
  #inverto la lista cosi che l'ultima serie risulti la prima

  for i in num:
    if int(i) == 0:
        if temp == -1:
          countedZeros += 1
    else:
      if countedZeros != 0:
        temp = 0
      else:
        pass

  return countedZeros

#last_zeros(1200086000) #risultato 3
#last_zeros(120000086000) #risultato 3
last_zeros(12000860000011) #risultato 5
```

<hr/>

> ## 4. Scrivi una funzione che conta la frequenza di tutte la parole in una stringa input: stringa con parole separati da spazi output: dizionario con coppie (parola, numero di occorenza).
>Esempio:<br>
> Se str="mele rab dfgghh mele arance ddfsfs arance" <br>
freq(str) => {'mele': 2, 'rab': 1, 'dfgghh': 1, 'arance': 2, 'ddfsfs': 1}
```python
def freq(stringa: str):
  dic = {a:stringa.count(a) for a in stringa.split()}
  return dic


str = "mele  rab  dfgghh mele arance   ddfsfs arance"
dic = freq(str)
print(dic)
```
>{'mele': 2, 'rab': 1, 'dfgghh': 1, 'arance': 2, 'ddfsfs': 1}

<hr/>

> ## 5. Crea una funzione che ha due parametri, assumi che siano stringhe. Ritorna una tupla con due stringhe che sono le due stringhe di input con il loro primo carattere swappato (l'uno con l'altro). Se uno dei due parametri e' una stringa vuota ritorna None.
>Esempio:<br>
>fn1('foo','bar') ritorna ('boo','far')

```python
def string_to_tuple(stringa1: str, stringa2: str):
  if len(stringa1) == 0 or len(stringa2) == 0:
    return None
  else:
    tup = (stringa2[0]+stringa1[1::], stringa1[0]+stringa2[1::])
    return tup

tup = string_to_tuple('foo', 'bar')
print(tup)
```
>('boo', 'far')

<hr/>

> ## 6. Data una stringa di lunghezza divisibile per 3, ritorna una tupla con il primo terzo, il terzo di mezzo, e l'ultimo terzo della stringa. Se la lunghezza non e' divisibile per 3, oppure e' 0, ritorna None.
>Esempio:<br>
>fn('abcdef') => ('ab','cd','ef')<br>
>st = st + 'x' * ((3-len(st)) % 3)


```python
def split_in_3(stringa: str):
  if len(stringa) %3 == 1 or len(stringa) == 0:
    return None
  else:
    p = round(len(stringa)/3) #p = passo
    tup = (stringa[0:p], stringa[p: (p*2)], stringa[(p*2)::])
    return tup

tup = split_in_3('abcdef')
print(tup)
```
>('ab', 'cd', 'ef')
