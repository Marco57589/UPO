/*

5) Stampare tutti i numeri pari da 0 a 100.

*/

#include <stdio.h>

void main(){

    for(int i = 0; i<101; i++){
        if(i%2 == 0){
            printf("valore: %d\n", i);
        }
    }

}