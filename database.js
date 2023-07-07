//function to create a new user and store it in baserow
function createAccount() {
  userName = document.getElementById("name").value;
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  limit = document.getElementById("nbOfSticks").value;
  fetch("https://api.baserow.io/api/database/rows/table/173457/?user_field_names=true", {
    method:"POST",
    headers: {
      Authorization: "Token fpJSaQSJGm3J2noGoYzTXzrBn6cHAVUe",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": userName,
      "email": email,
      "password": password,
      "nbOfSticks": limit,
      "moneyBox" : 0
    })
  })
  document.location.href="index.html"; 
}

//function to log in
function connexion() {
  email = document.getElementById("email2").value;
  password = document.getElementById("password2").value;
  document.location.href="index.html"; 
}


//function to fill the money box if the user smoked less sticks than he used to.
function fillMoneyBox() {
    if (counter <= limit) {
        saving = (limit-counter)*unitStickPrice;
        moneyBox += Math.round(saving);
        document.getElementById("moneyBox").innerText = moneyBox;
        //updateMoneyBox();
    }

}



function getUserData(id) {
  return fetch(`https://api.baserow.io/api/database/rows/table/173457/${id}/?user_field_names=true`, {
    method:"GET",
    headers: {
      Authorization: "Token fpJSaQSJGm3J2noGoYzTXzrBn6cHAVUe"
    }
  })
    .then (response => response.json())
    .then (body => body.name)
};



//function to update the moneyBox in baserow
function updateMoneyBox () {
  fetch("https://api.baserow.io/api/database/rows/table/173457/27/?user_field_names=true", {
            method:"PATCH",
            headers: {
              Authorization: "Token fpJSaQSJGm3J2noGoYzTXzrBn6cHAVUe",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "moneyBox": moneyBox
            })
  });
}