"use strict";

// -*- Variabler att lagra element i -*-
let toDoTextField = document.getElementById("newtodo"); //Input-textfält dvs där vi skriver nya att göra-punkter
let addButton = document.getElementById("newtodobutton"); //Lägg till-knappen
let errorMessage = document.getElementById("message"); //span-element som ska visa felmeddelande
let toDoList = document.getElementById("todolist"); //section-element inuti vilket jag ska lägga article-element
let clearAllButton = document.getElementById("clearbutton"); //rensa-knapp som rensar skärm och webstorage


// -*- Händelsehantering -*-
toDoTextField.addEventListener("keyup", inputControl, false);
addButton.addEventListener("click", addListItems, false);
clearAllButton.addEventListener("click", clearAll, false);
window.onload = startUp;

// -*- Funktioner -*-

/* Körs direkt när sidan laddats in. Avaktiverar knappen för att lägga till items, och anropar funktion som hämtar det vi lagrat
i storage så det hänger kvar på skärmen. */
function startUp() {
    console.log("Sidan laddad");
    disableButton();
    getStorage();
}

// Kontrollerar input att det är mer än 5 tecken
function inputControl() {
    console.log("kontrollerar");
    let toDoItem = toDoTextField.value;
    if (toDoItem.length > 4) {
        errorMessage.innerHTML = "";
        addButton.disabled = false;
    } else {
        errorMessage.innerHTML = "Måste ha mer än fem tecken!";
        disableButton();
    }
}

//Lägger till items i vår att göra-lista, rensar fältet efter, uppdaterar lagring
function addListItems() {
    console.log("Lägger till i lista");
    
    //Skapa nytt element och lägg till i DOM
    //skapa nytt article-element
    let newTask = document.createElement("article");
    //skapa ny textnod med det som skrivs
    let newTaskText = document.createTextNode(toDoTextField.value);
    //infoga texten i det nya elementet
    newTask.appendChild(newTaskText);
    //infoga elementet i section-elementet
    toDoList.appendChild(newTask);

    //rensa fältet efteråt, avaktivera knappen:
    toDoTextField.value = " ";
    disableButton();

    //Händelsehanterare som tar bort vid klick på att göra-grejer
    newTask.addEventListener("click", function (evtobj) {
        evtobj.target.remove();
    });
    // kallar på funktion som sparar aktuella poster till web storage
    saveToStorage();
}

//spara i web storage
function saveToStorage() {
    console.log("Sparar till local storage")
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