//Numero di fibonacci

#include <stdio.h>

int main(){
    int i;
    int lunghezza = 10;
    int n3 = 0;
    int n2 = 1;
    int n1 = 1;


    printf("\nSequenza di fibonacci per lunghezza %d", lunghezza);
    for(i = 0; i < lunghezza; i++){
        n3 = n2 + n1;
        n1 = n2;
        n2 = n3;

        printf("\n %d): %d",i,  n3);
    }
    puts("\n");

    return 0;
}