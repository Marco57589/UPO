/*
4. Scrivere un programma che data una stringa (s1) in input genera due stringhe (s2, s3) in questo modo:
s2 contiene le vocali presenti in s1, evitando le ripetizioni; 
s3 contiene le consonanti presenti in s1, evitando le ripetizioni.
Esempio:
s1: buongiorno	---> s1: uoi	s2: bngr
*/

#include <stdio.h>
#include <string.h>

void main(){
    
    char s1[100];
    char s2[50];
    char s3[50];
    int i = 0;
    int k = 0;
    int j = 0;
   
    puts("\nInserisci s1");
    scanf(" %[^\n]", s1);

    for(i = 0; i < strlen(s1); i++){
        if(s1[i] == 'a' || s1[i] == 'e' || s1[i] == 'i' || s1[i] == 'o' || s1[i] == 'u'){
            s2[k] = s1[i];
            k++;
        }else{
            s3[j] = s1[i];
            j++;     
        }
    }


    printf("La stringa iniziale e': %s\ns2: %s \ns3: %s", s1, s2, s3);

}