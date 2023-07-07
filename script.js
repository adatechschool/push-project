//Declaration of the main variables and initialization 
let userName;
let email;
let password;
let limit;
let counter = 0;
const unitStickPrice = 0.58;
let moneyBox = 0;


//Display user informations
  document.getElementById("userName").innerText = "Welcome back " + userName;
  document.getElementById("limit").innerText += " " + limit;
  document.getElementById("counter").innerText = `Counter : ${counter}`;


//Event listener to increase by 1 the counter when the user click on the button "counterBtn" and update the database
const counterButton = document.getElementById("counterBtn");
counterButton.addEventListener("click", () => {
  counter++;
  document.getElementById("counter").innerText = `Counter : ${counter}`;}
);

//Event listener to decrease by 1 the counter when the user click on the button "reductionBtn" and update the database
const reductionButton = document.getElementById("reductionBtn");
reductionButton.addEventListener("click", () => {
  counter--;
  document.getElementById("counter").innerText = `Counter : ${counter}`;
});