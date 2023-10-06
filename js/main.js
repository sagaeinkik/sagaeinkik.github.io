"use strict";

// -*- Variabler att lagra element i -*-
let toDoTextField = document.getElementById("newtodo"); //Input-textfält dvs där vi skriver nya att göra-punkter
let addButton = document.getElementById("newtodobutton"); //Lägg till-knappen
let errorMessage = document.getElementById("message"); //span-element som ska visa felmeddelande
let toDoList = document.getElementById("todolist"); //section-element inuti vilket jag ska lägga article-element
let clearAllButton = document.getElementById("clearbutton"); //rensa-knapp som rensar skärm och webstorage


// -*- Händelsehantering -*-
toDoTextField.addEventListener("keyup", inputControl); //triggas när man skriver i textfältet av att man släpper tangent
addButton.addEventListener("click", addListItems); //triggas av att man klickar på Lägg till-knapp
clearAllButton.addEventListener("click", clearAll); //triggas av att man klickar på rensa-knapp
window.onload = startUp; //triggas så fort sidan laddas

// -*- Funktioner -*-

// Avaktiverar knappen för att lägga till items, och anropar funktion som hämtar det vi lagrat i storage så det hänger kvar på skärmen. 
function startUp() {
    disableButton();
    getStorage();
}

// Kontrollerar input att det är mer än 5 tecken. Om ja, aktivera lägg till-knappen. om nej, avaktivera knappen och skriv text i span-element
function inputControl() {
    let toDoItem = toDoTextField.value;

    if (toDoItem.length > 4) {
        errorMessage.innerHTML = "";
        addButton.disabled = false;
    } else {
        errorMessage.innerHTML = "Måste ha mer än fem tecken!";
        disableButton();
    }
}

//Lägger till items i vår att göra-lista, rensar fältet efter, ropar på lagringsfunktionen för att lagra bara aktuella poster
function addListItems() {

    //Skapa nytt element och lägg till i DOM
    let newTask = document.createElement("article");
    //skapa ny textnod med det som skrivs i textfält
    let newTaskText = document.createTextNode(toDoTextField.value);
    //infoga texten i det nya elementet och peta in det elementet i section-elementet
    newTask.appendChild(newTaskText);
    newTask.className = "task";
    toDoList.appendChild(newTask);

    //rensa fältet efteråt, avaktivera knappen:
    toDoTextField.value = "";
    disableButton();

    //Händelsehanterare som tar bort vid klick på to Do-grejer
    newTask.addEventListener("click", function (evtobj) {
        evtobj.target.remove();
    });

    saveToStorage(); //uppdatera lagringen
}

//spara aktuella poster i web storage
function saveToStorage() {
    //Hämta alla article-element som har klass task. Detta hämtar hela elementet, tagg och allt, och skapar en Nodelist
    let allTasks = document.querySelectorAll(".task");
    //tom array att peta in alla texter i
    let taskArray = [];

    //for-loop som för varje item i node-listan lägger till bara article-elementens textinnehåll i den tomma arrayen
    for (let i = 0; i < allTasks.length; i++) {
        taskArray.push(allTasks[i].innerHTML);
    }
    // Konvertera till JSON-textsträng, lagra
    let jsonString = JSON.stringify(taskArray);
    localStorage.setItem("To do:", jsonString);
}

//Ladda in från web storage och skriv ut på skärm
function getStorage() {
    //Hämta grejerna från lagring och konvertera till array
    let taskArray = JSON.parse(localStorage.getItem("To do:"));
    //OM det finns items i taskArray, kör for-loop som skapar element för varje item och lägger till på skärmen
    if (taskArray !== null) {
        for (let i = 0; i < taskArray.length; i++) {
            //återanvänder koden från lägg till-funktionen med liten ändring för [i]
            let newTask = document.createElement("article");
            let newTaskText = document.createTextNode(taskArray[i]);
            newTask.appendChild(newTaskText);
            newTask.className = "task";
            toDoList.appendChild(newTask);
            //Händelsehanterare igen eftersom annars kan man inte klicka och radera om man har refreshat sidan
            newTask.addEventListener("click", function (evtobj) {
                evtobj.target.remove();
                saveToStorage(); //uppdatera lagring inuti for-loopen, annars kommer posterna man raderat tillbaka
            });
        }
    }
    saveToStorage(); //uppdatera lagring så allt är synkat annars kommer poster tillbaka vid refresh
}

//Funktion som rensar allt på skärm och lagring:
function clearAll() {
    //hämta alla article element igen, lägg i node-list
    const tasks = toDoList.querySelectorAll("article");

    // om vi har några items i node-list, ta bort från DOM och rensa storage
    if (tasks.length !== null) {
        tasks.forEach((task) => task.remove());
        localStorage.clear();
    }

}

//funktion som inaktiverar lägg till-knappen
function disableButton() {
    addButton.disabled = true;
}