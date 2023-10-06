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
    addButton.disabled = true;
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
        addButton.disabled = true;
    }
}

//Lägger till items i vår att göra-lista, rensar fältet efter, uppdaterar lagring
function addListItems() {
    console.log("Lägger till i lista");

    saveToStorage()
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