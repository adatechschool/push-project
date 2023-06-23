//Store authentification variables
function getValue() {
  var userName = document.getElementById("name").value;
  var limit = document.getElementById("nbOfSticks").value;
  document.getElementById("userName").innerText = "Welcome back " + userName;
  document.getElementById("limit").innerText += " " + limit;
  document.getElementById("counter").innerText = `Counter : ${counter}`;
}

//Declaration of the main variables and initialization
let userName;
let limit;
let counter = 0;
let unitStickPrice = 0.58;
let moneyBox = 0;
let dataBase = [];

//Event listener to increase by 1 the counter when the user click on the button "counterBtn" and update the database
const counterButton = document.getElementById("counterBtn");
counterButton.addEventListener("click", (event) => {
  counter++;
  dataBase.push(new Date());
  document.getElementById("counter").innerText = `Counter : \n ${counter}`;
});

//Event listener to decrease by 1 the counter when the user click on the button "reductionBtn" and update the database
const reductionButton = document.getElementById("reductionBtn");
reductionButton.addEventListener("click", (event) => {
  counter--;
  dataBase.pop(new Date());
  document.getElementById("counter").innerText = `Counter : ${counter}`;
});

//function to fill the money box if the user smoked less sticks than he used to.
function fillMoneyBox() {
  if (counter <= limit) {
    saving = (limit - counter) * unitStickPrice;
    moneyBox += Math.round(saving);
    document.getElementById("moneyBox").innerText = moneyBox;
  }
  return moneyBox;
}
