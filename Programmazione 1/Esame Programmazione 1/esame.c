/*
Esame Programmazione 1

- Marco Yuri Papa
- Matricola: 20051241
- 14/02/2023
*/

#include <stdio.h>
#include <stdlib.h>

#define TAPPO -1
#define DIM 10

int carica_vettore(int vet[], FILE* fp){ //Riceve in ingresso un vettore di numeri interi e un puntatore a file.
	int k = 0; //variabile temporanea per la lettura del valore
	int i = 0;
	int posizioni_libere = 0;

	while(fscanf(fp,"%d",&k) != EOF){
		//Copia dal file al vettore i valori che possono essere voti scolastici, verificando che ci sia spazio nel vettore.
		if(k >= 0 && k <=10){ //controllo che il valore sia un voto (0-10)
			if(i < DIM-1){ // verifico lo spazio rimanente nel vettore, DIM-1 perché l'ultima cella é riservata al TAPPO
				vet[i] = k;
				i++;
			}else{  //i valori in eccesso non verranno scritti nel vettore (ho deciso di mostrare i valori validi che non sono stati inseriti)
				printf("\nIl vettore é pieno, non riesco a inserire il voto: %d", k);
			}
		}
	}

	posizioni_libere = (DIM-1) - i;
	vet[i] = TAPPO;

	return posizioni_libere;
}

void stampa(int vet[]){ //Riceve in ingresso un vettore di numeri interi con -1 come “tappo”.
	int i = 0;

	if(vet[0] == TAPPO){
		puts("\n*[Attenzione] il vettore non contiene valori\n");
	}

	for(i = 0; vet[i] != TAPPO; i++){
		printf("[%d]%d ", i, vet[i]);
	}
	puts("\n");
}

void conteggio_valori(int vet[], int* q1, int* q2){ //Riceve un vettore di numeri interi con -1 come “tappo” e due parametri (q1, q2).
	int i = 0;
	*q1 = 0;
	*q2 = 0;

	for(i = 0; vet[i] != TAPPO; i++){
		if(vet[i] > 5){
			(*q1)++;
		}else{
			(*q2)++;
		}
	}
}

void elimina_secondo(int* vet){ //Riceve un vettore di numeri interi con -1 come “tappo”.
	int i = 1;

	while(vet[i] != TAPPO){
		*(vet+i) = *(vet+i+1);
		i++;
	}
	vet[i] = TAPPO; // non serve
}

int main(int argc, char* argv[]){

    //deve ricevere da riga di comando un solo parametro, cioè il nome di un file. In caso
    //contrario mostra un opportuno messaggio di errore e termina restituendo 1.
    if(argc < 2){
        puts("\nAttenzione, numero di parametri insufficenti (richiesto 1: nomefile)\n");
        exit(1);
    }//else ... sotto
    if(argc > 2){
        puts("\nAttenzione, hai inserito troppi parametri (richiesto 1: nomefile)\n");
        exit(1);
    }

    //Dichiara un vettore di interi, di dimensione 10 (costante)
    int vet[DIM]; //Il programma é stato tastato con i valori: 8 3 -9 7 11 -3 0 14 -5 10 32
    int q1 = 0;
    int q2 = 0;

    FILE* fp;
    fp = fopen(argv[1], "r"); //'r' apro il file in sola lettura

    //Tenta di aprire il file. Se l’apertura fallisce, mostra un opportuno messaggio di errore e termina restituendo 2
    if(fp == NULL){
        puts("Attenzione, non riesco ad aprire il file, controlla che il nome del file sia corretto!");
        exit(2);
    }

    //Invoca la funzione per caricare il vettore da file; poi chiude il file.
    carica_vettore(vet, fp); // non e' void
    fclose(fp);

    // NB: Essendo che nella descrizione della funzione é stata specificata una return e un esempio di esecuzione (4)
    //ho preferito implementarlo in maniera "commentata" in quanto nel main non é richiesto e per tanto non deve essere eseguito.
    /*

    int posizioni_libere = 0;
    posizioni_libere = carica_vettore(vet, fp);
    printf("\nPosizioni libere nel vettore: %d\n", posizioni_libere);

    */

    //Invoca la funzione per visualizzare il vettore.
    printf("\n\nVettore caricato: ");
    stampa(vet);

    /*
    Se il vettore è vuoto (tappo escluso), visualizza un opportuno messaggio di errore e termina restituendo 3.
    -Per vedere se il vettore é vuoto (nullo) mi basta controllare che la prima cella sia un TAPPO, in quanto durante il caricamento viene inserito il tappo (se non ci sono
    valori questo viene inserito nella prima cella (indice 0))
    */
    if(vet[0] == TAPPO){
        puts("Il vettore é vuoto");
        exit(3);
    }else{
        //invoca la funzione per il conteggio dei valori e ne visualizza i risultati tramite un opportuno messaggio.
        conteggio_valori(vet, &q1, &q2);
        printf("Numero di voti sufficenti: %d \nNumero di voti insufficenti: %d\n", q1, q2);

        printf("\nVettore dopo aver rimosso il secondo voto: ");
        //invoca la funzione per cancellare il valore dal vettore;
        elimina_secondo(vet);
        //invoca nuovamente la funzione per visualizzare il vettore;
        stampa(vet);
    }
    
    return 0; //restituisce 0.
}
