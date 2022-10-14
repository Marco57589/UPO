/*

12) Stampare una serie di 200 simboli "+" e "-" alternati

*/

#include <stdio.h>

void main(){

    for(int i = 0; i < 200; i++){
        if(i%2 == 0){
            puts("+");
        }else{
            puts("-");
        }
    }
}