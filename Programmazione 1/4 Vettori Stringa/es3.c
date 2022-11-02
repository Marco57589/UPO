/*
3. Scrivere un programma che data una stringa (s1) in input genera due stringhe (s2, s3) in questo modo:
s2 contiente la prima meta' dei caratteri di s1;
s3 contiente la seconda meta' dei caratteri di s1.
Esempio:
s1: buongiorno	--->	s2: buong	s3: iorno	
*/

#include <stdio.h>
#include <string.h>

void main(){
    
    char s1[100];
    char s2[50];
    char s3[50];
    int i = 0;
   
    puts("\nInserisci s1");
    scanf(" %[^\n]", s1);

    for(i = 0; i < strlen(s1)/2; i++){
        s2[i] = s1[i];
        s3[i] = s1[strlen(s1)/2+i];

        if(strlen(s1)%2 == 1 && i == (strlen(s1)/2)-1){ //se s1 é dispari allora  aggiungo il valore alla seconda stringa (S3)
            i++;
            s3[i] = s1[strlen(s1)/2+i];        
        }
    }


    printf("La stringa iniziale e': %s\ns2: %s \ns3: %s", s1, s2, s3);

}