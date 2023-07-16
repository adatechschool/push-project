window.onload = () => {

      //Display user informations
      document.getElementById("userName").innerText = "Welcome back " + JSON.parse(localStorage.getItem("user")).name;
      document.getElementById("limit").innerText += " " + JSON.parse(localStorage.getItem("user")).nbOfSticks;
      document.getElementById("counter").innerText = "Counter : " + JSON.parse(localStorage.getItem("user")).counter;


      //Event listener to increase by 1 the counter when the user click on the button "counterBtn" and update the database
      const counterButton = document.getElementById("counterBtn");
      counterButton.addEventListener("click", async () => {
          await fetch(`https://api.baserow.io/api/database/rows/table/173457/${JSON.parse(localStorage.getItem("user")).id}/?user_field_names=true`, {
          method:"PATCH",
          headers: {
            "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "counter" : Number(JSON.parse(localStorage.getItem("user")).counter) + 1
          })
        })
        .then(response => response.json())
        .then( result => localStorage.setItem("user",JSON.stringify(result)));
        document.getElementById("counter").innerText = "Counter : " + JSON.parse(localStorage.getItem("user")).counter;
      }
      );

      //Event listener to decrease by 1 the counter when the user click on the button "reductionBtn" and update the database
      const reductionButton = document.getElementById("reductionBtn");
      reductionButton.addEventListener("click", async () => {
          await fetch(`https://api.baserow.io/api/database/rows/table/173457/${JSON.parse(localStorage.getItem("user")).id}/?user_field_names=true`, {
          method:"PATCH",
          headers: {
            "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "counter" : Number(JSON.parse(localStorage.getItem("user")).counter) - 1
          })
        })
        .then(response => response.json())
        .then( result => localStorage.setItem("user",JSON.stringify(result)));
        document.getElementById("counter").innerText = "Counter : " + JSON.parse(localStorage.getItem("user")).counter;
      }
      );
};


 //function to fill the money box if the user smoked less sticks than he used to.
 function fillMoneyBox() {
  if (counter <= limit) {
      saving = (limit-counter)*unitStickPrice;
      moneyBox += Math.round(saving);
      document.getElementById("moneyBox").innerText = moneyBox;
      //updateMoneyBox();
  }
}
