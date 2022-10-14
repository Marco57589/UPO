/*
14) Scrivere un programma che legge da tastiera due interi righe e colonne
    e stampa due tabelle delle dimensioni specificate e contenenti i numeri 
    da 0 in avanti, fino al riempimento della tabella.

    La prima tabella  e' riempita riga per riga, partendo dalla riga 0 (prima riga),
    la seconda tabella e' riempita  colonna per colonna partendo dalla colonna 0
    (prima colonna), come negli esempi.

    Si assume righe>0 e colonne>0.

    Notare che, in entrambi i casi, le tabelle vanno stampate riga per riga. 
    Usare un ciclo della forma

for( r = 0 ;  ....  ){
   // stampa la riga r 
   for( c = 0 ; ....  ){ 
     // stampa numero alla riga r e colonna c    
       printf("%6d", EXPR);
      ...
  }
}

dove EXPR e' una opportuna espressione aritmetica.


Esempi di esecuzione
--------------------

Se righe = 4 e colonne = 8 deve essere stampato

     0     1     2     3     4     5     6     7
     8     9    10    11    12    13    14    15
    16    17    18    19    20    21    22    23
    24    25    26    27    28    29    30    31


     0     4     8    12    16    20    24    28
     1     5     9    13    17    21    25    29
     2     6    10    14    18    22    26    30
     3     7    11    15    19    23    27    31

Notare che le due tabelle hanno 4 righe e 8 colonne e che contengono i 
numeri da 0 a 31 (in tutto 32 numeri). 


Se righe = 12 e colonne = 15 deve essere stampato

     0     1     2     3     4     5     6     7     8     9    10    11    12    13    14
    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29
    30    31    32    33    34    35    36    37    38    39    40    41    42    43    44
    45    46    47    48    49    50    51    52    53    54    55    56    57    58    59
    60    61    62    63    64    65    66    67    68    69    70    71    72    73    74
    75    76    77    78    79    80    81    82    83    84    85    86    87    88    89
    90    91    92    93    94    95    96    97    98    99   100   101   102   103   104
   105   106   107   108   109   110   111   112   113   114   115   116   117   118   119
   120   121   122   123   124   125   126   127   128   129   130   131   132   133   134
   135   136   137   138   139   140   141   142   143   144   145   146   147   148   149
   150   151   152   153   154   155   156   157   158   159   160   161   162   163   164
   165   166   167   168   169   170   171   172   173   174   175   176   177   178   179

*/

#include <stdio.h>

void main(){

    int riga = 0;
    int colonna = 0;
    int n = 0;

    puts("Inserisci riga");
    scanf("%d", &riga);

    puts("Inserisci colonna");
    scanf("%d", &colonna);


    for(int i = 0; i<riga; i++){
        for(int j = 0; j<colonna; j++){
            printf(" %d \t", n);
            n++;
        }
        puts("\n"); 
    }

    puts("\n Tabella 2");
    int valore = 0;

    for(int i = 0; i<riga; i++){
        puts("\n");
        valore = i;

        for(int j = 0; j<colonna; j++){
            printf(" %d \t", valore);
            valore += riga;
        }
    }

}