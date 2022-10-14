/*
17) Realizzare un programma che stampi a video un rettangolo la cui cornice sia composta da asterischi * e il suo contenuto da  
    caratteri ‘A’, come nell’esempio:

    ********************
    *AAAAAAAAAAAAAAAAAA*
    *AAAAAAAAAAAAAAAAAA*
    *AAAAAAAAAAAAAAAAAA*
    ********************
*/

#include <stdio.h>

void main(){

    int riga = 0;
    int colonna = 0;

    puts("Inserisci riga");
    scanf("%d", &riga);

    puts("Inserisci colonna");
    scanf("%d", &colonna);


    for(int i = 0; i<riga; i++){
        for(int j = 0; j<colonna; j++){
            if(i == 0 || i == (riga-1) || j == 0 || j == (colonna-1)){
                printf("* \t");
            }else{
                printf("A \t");
            }
        }
        printf("\n"); 
    }
}