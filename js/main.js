"use strict";

// -*- Variabler att lagra element i -*-
let toDoTextField = document.getElementById("newtodo"); //Input-textfält dvs där vi skriver nya att göra-punkter
let addButton = document.getElementById("newtodobutton"); //Lägg till-knappen
let errorMessage = document.getElementById("message"); //span-element som ska visa felmeddelande
let toDoList = document.getElementById("todolist"); //section-element inuti vilket jag ska lägga article-element
let clearAllButton = document.getElementById("clearbutton"); //rensa-knapp som rensar skärm och webstorage


// -*- Händelsehantering -*-
toDoTextField.addEventListener("keyup", inputControl, false); //triggas när man skriver i textfältet av att man släpper tangent
addButton.addEventListener("click", addListItems, false); //triggas av att man klickar på Lägg till-knapp
clearAllButton.addEventListener("click", clearAll, false); //triggas av att man klickar på rensa-knapp
window.onload = startUp; //triggas så fort sidan laddas

// -*- Funktioner -*-

// Avaktiverar knappen för att lägga till items, och anropar funktion som hämtar det vi lagrat i storage så det hänger kvar på skärmen. 
function startUp() {
    console.log("Sidan laddad");
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
    console.log("Lägger till i lista");
    
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

    //Händelsehanterare som tar bort vid klick på att göra-grejer
    newTask.addEventListener("click", function (evtobj) {
        evtobj.target.remove();
        saveToStorage(); //uppdatera lagring
    });
    
    saveToStorage(); //uppdatera lagring här med
}

//spara i web storage 
function saveToStorage() {
    //Hämta alla article-element som har klass task. Detta hämtar hela elementet, tagg och allt, och skapar en Nodelist
    let allTasks = document.querySelectorAll(".task");
    //tom array att peta in alla texter i
    let taskArray = [];

    //for-loop som för varje item i node-listan lägger till bara innehållet i den tomma arrayen
    for (let i = 0; i < allTasks.length; i++) {
        taskArray.push(allTasks[i].innerHTML);
    }

    // Konvertera till JSON-textsträng så det kan lagras
    let jsonString = JSON.stringify(taskArray);
    localStorage.setItem("To do: ", jsonString);
}

//Ladda in från web storage och skriv ut på skärm
function getStorage() {
    console.log("Hämtar från storage")

    saveToStorage();
}

//Funktion som rensar allt på skärm och lagring:
function clearAll() {
    console.log("clearing storage");
}

//funktion som inaktiverar lägg till-knappen
function disableButton() {
    addButton.disabled = true;
}