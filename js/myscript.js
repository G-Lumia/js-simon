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
var timeleft = 5;
let numbers;

button.addEventListener("click" , gameStart);
function gameStart()
{
    numbers = [];
    game.classList.remove("d-none");
    form.classList.add("d-none");
    end.classList.add("d-none");
    timer.innerHTML = `<h2> Memorizza i numeri! </h2>`;

    for(let i=0; i<5; i++)
    {
        numbers.push((Math.floor(Math.random() * 100) + 1));
        game.innerHTML += `<h2>${numbers[i]}</h2>`;
    }
    var downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        timeOut();
      } else {
        timer.innerHTML = `<h2> ${timeleft} secondi rimanenti </h2>`;
      }
      timeleft -= 1;
    }, 1000);
}

function timeOut()
{
    game.classList.add("d-none");
    timer.innerHTML = `<h2> Simone dice:<br> Ti ricordi i numeri? </h2>`
    form.classList.remove("d-none");
    let answers = [];
    let rightNumbers = [];
    let numID;
    let point = 0;
    formButton.addEventListener("click", function()
    {
        form.classList.add("d-none");
        for(let i=0; i<5; i++)
        {
            numID = "num" + (i + 1);
            answers.push(document.getElementById(numID).value);
        }
        for(let i=0; i<5; i++)
        {
            if(answers[i] == numbers[i])
            {
                point ++;
                rightNumbers.push(answers[i]);
            }
        }
        
        end.classList.remove("d-none");

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