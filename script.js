//Declaration of the main variables and initialization 
let myName;
let limit;
let counter = 0;
let unitStickPrice = 0.58;
let moneyBox = 0;
let dataBase = [];
initialization();

//function to inititalize the account
function initialization () {
    myName = window.prompt("Comment t'appelles-tu ?");
    limit = window.prompt("Combien de cigarettes fumes-tu par jour ?");
    document.getElementById("userName").innerText = "Welcome back " + myName;
    document.getElementById("limit").innerText += " "+ limit;
    document.getElementById("counter").innerText = `Running Counter : ${counter}`;
}

//Event listener to increase by 1 the counter when the user click on the button "counterBtn" and update the database
const counterButton = document.getElementById("counterBtn");
counterButton.addEventListener('click', event => {
    counter++;
    dataBase.push(new Date());
    document.getElementById("counter").innerText = `Running Counter : ${counter}`;
    });

//Event listener to decrease by 1 the counter when the user click on the button "reductionBtn" and update the database
const reductionButton = document.getElementById("reductionBtn");
reductionButton.addEventListener('click', event => {
    counter--;
    dataBase.pop(new Date());
    document.getElementById("counter").innerText = `Running Counter : ${counter}`;
    });

//function to fill the money box if the user smoked less sticks than he used to.
function fillMoneyBox() {
    if (counter <= limit) {
        saving = (limit-counter)*unitStickPrice;
        moneyBox += Math.round(saving);
        document.getElementById("moneyBox").innerText = moneyBox;
    }
    return moneyBox;
}
