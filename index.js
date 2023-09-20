window.onload = () => {

document.getElementById("loginButton").addEventListener("click", createAccount);
document.getElementById("connexionBtn").addEventListener("click", connexion);

//function to create a new user and store it in baserow
async function createAccount() {
    const password = document.getElementById("password").value;
    const hashedPassword = await hashPassword(password);
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
        "password": hashedPassword,
        "nbOfSticks": document.getElementById("nbOfSticks").value,
        "moneyBox" : 0,
        "counter" : 0
      })
    })
      .then( response => response.json());
      sessionStorage.setItem("user",JSON.stringify(user));
      //document.location.href="main.html"
}

//function to log in
async function connexion() {
  // let email = document.getElementById("connexionEmail").value;
  // let password = document.getElementById("connexionPassword").value;
  // let user = await fetch(`https://api.baserow.io/api/database/rows/table/173457/?user_field_names=true&filter__field_1154427__equal=${email}&filter__field_1195631__equal=${password}`, {
  //   method: "GET",
  //   headers: {
  //     "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((result) => result.results[0]);

  // sessionStorage.setItem("user", JSON.stringify(user));
  // document.location.href = "main.html";
  const email = document.getElementById("connexionEmail").value;
  const enteredPassword = document.getElementById("connexionPassword").value;
  const user = await fetch(`https://api.baserow.io/api/database/rows/table/173457/?user_field_names=true&filter__field_1154427__equal=${email}`, {
      method: "GET",
      headers: {
        "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
      },
    })
      .then((response) => response.json())
      .then((result) => result.results[0]);
  const storedHashedPassword = user.password;
  console.log(storedHashedPassword);
  // Convert the entered password to a Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(enteredPassword);

  // Generate a cryptographic hash (SHA-256) of the entered password
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the hash to a hexadecimal string
  const enteredHashedPassword = Array.from(new Uint8Array(hashBuffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');

  // Compare the entered hashed password with the stored hashed password
  if (enteredHashedPassword === storedHashedPassword) {
    // Authentication successful, redirect or perform further actions
    console.log("Authentication successful");
    sessionStorage.setItem("user", JSON.stringify(user));
    document.location.href = "main.html"; // Redirect to the main page
  } else {
    // Authentication failed
    console.log("Authentication failed");
    // Handle authentication failure (e.g., display an error message)
  }
}

async function hashPassword (password) {
  // Create a Uint8Array from the password
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  // Generate a cryptographic hash (SHA-256)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the hash to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hashedPassword;
}
}