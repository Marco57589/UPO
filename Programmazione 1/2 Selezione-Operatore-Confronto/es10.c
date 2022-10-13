/*
10) Scrivere un programma che dati in input i coefficienti a, b, c di una equazione di 2° grado, 
    calcola il discriminante Delta=(b*b - 4*a*c).
      Se Delta<0 il programma visualizza "nessuna soluzione". 
      Se Delta=0 il programma calcola e visualizza l'unica soluzione dell'equazione x=-b / (2*a)
      Se Delta>0 il programma calcola e visualizza le due soluzioni dell'equazione:
        x1=( -b + sqrt(b*b - 4*a*c) ) / (2*a)
        x2=( -b - sqrt(b*b - 4*a*c) ) / (2*a)
    Includere la libreria math.h per poter utilizzare la funzione sqrt (radice quadrata).
*/

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
