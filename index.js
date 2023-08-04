//function to create a new user and store it in baserow
async function createAccount() {
  let user = await fetch("https://api.baserow.io/api/database/rows/table/173457/?user_field_names=true", {
    method:"POST",
    headers: {
      "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      "name": document.getElementById("name").value,
      "email": document.getElementById("email").value,
      "password": document.getElementById("password").value,
      "nbOfSticks": document.getElementById("nbOfSticks").value,
      "moneyBox" : 0,
      "counter" : 0
    })
  })
    .then( response => response.json());
    localStorage.clear();
    localStorage.setItem("user",JSON.stringify(user));
    document.location.href="main.html"
}

//function to log in
async function connexion () {
      let email = document.getElementById("connexionEmail").value;
      let password = document.getElementById("connexionPassword").value;
      let user = await fetch(`https://api.baserow.io/api/database/rows/table/173457/?user_field_names=true&filter__field_1154427__equal=${email}&filter__field_1195631__equal=${password}`, {
        method: "GET",
        headers: {
          "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
        }
      })
        .then(response => response.json())
        .then(result => result.results[0])
        localStorage.clear();
        localStorage.setItem("user",JSON.stringify(user));
        document.location.href="main.html"
}
