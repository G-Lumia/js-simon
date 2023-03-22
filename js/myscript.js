// Descrizione:
// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi i numeri scompaiono e l'utente deve inserire, i numeri che ha visto precedentemente.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

const game = document.getElementById("game");
const timer = document.getElementById("timer");
const form = document.getElementById("form");
const end = document.getElementById("end");
const button = document.getElementById("play");
const formButton = document.getElementById("send");
let randomNum;

button.addEventListener("click" , gameStart, {once : true});
// al click del bottone, apparirà il timer ed una serie di numeri generati casualmente
function gameStart()
{
    // viene inizializzato e svuotato un vettore che conterrà i numeri generati casuallemente
    randomNum = [];
    // viene svuotato il div che andrà a contenere i numeri generati casualmente
    game.innerHTML = ``;
    let timeleft = 5;

    // nel caso il giocatore volesse ripetere il gioco, le varie sezioni ritornano al loro stadio originale
    game.classList.remove("d-none");
    timer.classList.remove("d-none");
    form.classList.add("d-none");
    end.classList.add("d-none");

    timer.innerHTML = `<h2> Memorizza i numeri! </h2>`;

    // viene creato un vettore di numeri generati casualmente

    while(randomNum.length < 5)
    {
        const rngNum = Math.floor(Math.random() * 100) + 1;
        if(randomNum.indexOf(rngNum) < 0)
        {
            randomNum.push(rngNum);
        }
    }

    for(let i = 0; i < 5; i++)
        game.innerHTML += `<h2> ${randomNum[i]} </h2> `;

    // viene creato e gestito il timer del gioco
    var gameTimer = setInterval(function(){
        // ogni secondo avverrano le seguenti istruzioni
      if(timeleft <= 0)
      {
        // nel caso il timer arrivi a 0, viene terminata l'istruzione e viene avviata la funzione timeout()
        clearInterval(gameTimer);
        button.addEventListener("click" , gameStart, {once : true});
        timeOut();
      } 
      else 
      {
        // altrimenti viene stampato in schermo il tempo rimanente 
        timer.innerHTML = `<h2> ${timeleft} secondi rimanenti </h2>`;
      }
    //   se c'è ancora tempo a disposizione, il timer viene decrementato di 1
      timeleft -= 1;
    }, 1000);
}

// funzione che gestirà il termine del gioco, stampando in schermo gli eventuali numeri indovinati o un messaggio di sconfitta
function timeOut()
{
    game.classList.add("d-none");
    timer.innerHTML = `<h2> Simone dice:<br> Ti ricordi i numeri? </h2>`
    form.classList.remove("d-none");
    // vengono creati due vettori: uno per le risposte inserite dall'utente ed uno per i numeri indovinati
    let answers = [];
    let rightNumbers = [];
    // viene creata una variabile che andrà a contenere l'id della risposta inserita dall'utente, utilizzato in seguito
    let numID;
    // variabile che conterrà i punti ottenuti dopo aver indovinato i diversi numeri
    let point = 0;
    formButton.addEventListener("click", function()
    {
        form.classList.add("d-none");
        // viene implementato il vettore answers con le risposte inserite dall'utente
        for(let i=0; i<5; i++)
        {
            numID = "num" + (i + 1);
            if(!answers.includes(document.getElementById(numID).value))
                answers.push(document.getElementById(numID).value);
        }
        // vengono comparati i due vettori, asnwers e randomNum. Se viene trovata una corrispondenza viene incrementato il punteggio e inserito il numero
        // nel vettore rightNumbers
        for(let i=0; i<5; i++)
        {
            for(let j=0; j<5;j++)
            {
                if(answers[i] == randomNum[j])
                {
                    point ++;
                    rightNumbers.push(answers[i]);
                }
            }
        }
        
        // viene stampato in schermo l'esito del gioco
        end.classList.remove("d-none");

        // se il punteggio equivale a zero viene dichiarata sconfitta, altrimenti vengono stampate le risposte giuste ed il punteggio ottenuto
        if(point == 0)
        {
            end.innerHTML = `<h2 class = "text-danger"> Nessun numero indovinato </h2>`;
        }
        else
        {
            end.innerHTML = `<h2 class = "text-success"> Numeri ricordati : ${rightNumbers} <br> Punti ottenuti : ${point}`;
        }
    })
}