#include <stdio.h>

// numero primo

int main(){
    int i = 0;
    int n = 43;

    if(n > 2){
        if(n % 2 == 0){
            if(n == 2){
                printf("%d é un numero primo", n);
            }else{
                printf("%d non é un numero primo", n);
            }
        }else{
            printf("%d é un numero primo", n);
        }

    }else{
        printf("%d non é un numero primo", n);
    }

    return 0;
}