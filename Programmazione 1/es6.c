/*
6. Creare un programma che permetta di cifrare e di decifrare una stringa (considerare solo caratteri minuscoli e senza spazi) attraverso l’algoritmo
di cifratura di Cesare. Ogni lettera del testo in chiaro `e sostituita nel testo cifrato dalla lettera che si trova k posizioni dopo nell’alfabeto. 
Il numero k rappresenta la chiave (0 < k < 26). Per esempio, con k = 3 : ’a’ diventa ’d’, ’m’ diventa ’p’, ’z’ diventa ’c’. La stringa si decripta eseguendo
l’operazione inversa. Si scriva un programma che tramite apposite funzioni permetta di:

• inserire la stringa
• criptare la stringa
• decriptarla
• stampare la stringa
*/

#include <stdio.h>
#include <string.h>

void inserimento_stringa(char* s){
    puts("\n--------------------");
    puts("Inserisci la Stringa: ");
    scanf(" %s", s);
}

int inserimento_valore(){
    int aus;
    puts("\n--------------------");
    puts("Inserisci K: ");
    scanf("%d", &aus);

    return aus;
}
 
void stampa_stringa(char* string){
    printf("%s", string);
}

void cifra(char* stringa, int k){
    int scarto = 0;
    int k2 = 0;

    for(int i = 0; i < strlen(stringa); i++){
        if(stringa[i] + k > 122){
            scarto = 122 - stringa[i];
            k2 = k - scarto;
            stringa[i] = 96 + k2;
        }else{
            stringa[i] += k;
        }
    }

}

void decifra(char* stringa, int k){

    int scarto = 0;
    int k2 = 0;

    for(int i = 0; i < strlen(stringa); i++){
        if(stringa[i] - k < 97){
            scarto = stringa[i] - 97;
            k2 = k - scarto;
            stringa[i] = 122 - k2;
        }else{
            stringa[i] -= k;
        }
    }
}

int main(){
    char stringa[100];
    int k = inserimento_valore();

    inserimento_stringa(stringa);

    cifra(stringa, k);
    printf("\nstringa cifrata: %s", stringa);

    decifra(stringa, k);
    printf("\nstringa decifrata: %s", stringa);

    return 0;
}