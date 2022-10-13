/*
Scrivere un programma C che esegua le seguenti operazioni:

    legga da tastiera due variabili x e y;

Se x e y sono entrambi maggiori di 0, allora

    calcoli l'area del rettangolo di lati x e y;

    stampi a video le misure dei lati e l'area del rettangolo in modo che

    l'output abbia la forma seguente:

    Lato1 = (valore di x)

    Lato2 = (valore di y)

    Area = (area calcolata)

Altrimenti

    visualizzi un messaggio di errore.

*/

#include <stdio.h>

void main(){
        int l1,l2;
        float area;
        print("inserire l1");
        scanf("%d",&l1);
        printf("inserire l1");
        scanf("%d",&l2);
        if(l1>0 && l2>0){
          area=l1*l2;
          printf("lato1 = valore di l1 %d \n lato2 = valore di ld %D \n area = area calcolata %f  ",l1, l2, area);

        } else{printf("errore")}
}

