/*
2. Scrivere un programma che date due stringhe (s1, s2) in input genera la stringa s3 composta da s1 e s2 concatenate. 
Esempio:
s1: buon	s2: giorno	--->	s3: buongiorno

*/

#include <stdio.h>
#include <string.h>


void main(){
    
    char s1[50];
    char s2[50];
    char s3[100];
    int i = 0;
   
    puts("\nInserisci s1");
    scanf(" %[^\n]", s1);

    puts("\nInserisci s2");
    scanf(" %[^\n]", s2);


    for(i = 0; i < strlen(s1); i++){
        s3[i] = s1[i];
    }

    for(i = 0; i < strlen(s2); i++){
        s3[strlen(s1)+i] = s2[i];
    }

    printf("La stringa risultate e': %s", s3);




}