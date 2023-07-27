let user = JSON.parse(localStorage.getItem("user"));
console.log(user);

window.onload = () => {
      //Display user informations
      document.getElementById("userName").innerText = "Welcome back " + user.name;
      document.getElementById("limit").innerText += " " + user.nbOfSticks;
      document.getElementById("counter").innerText = "Counter : " + user.counter;


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

      // function to increment the money box each day regarding the daily counter
      runAtSpecificTimeOfDay(00,01,async () => {
        let saving = 0;
        if (Number(user.counter) <= Number(user.nbOfSticks)) {
          saving = Math.round((Number(user.nbOfSticks)-Number(user.counter))*0.58);
          console.log(saving);
          await fetch(`https://api.baserow.io/api/database/rows/table/173457/${user.id}/?user_field_names=true`, {
          method:"PATCH",
          headers: {
            "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "moneyBox" : Number(user.moneyBox) + saving,
            "counter" : Number(0)
          })
          })
          .then(response => response.json())
          .then( result => localStorage.setItem("user",JSON.stringify(result)));
          }
      });
      
      //function to run a specific function at a specific time of day
      function runAtSpecificTimeOfDay(hour, minutes, func) {
        const twentyFourHours = 86400000;
        const now = new Date();
        let eta_ms = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minutes, 0, 0).getTime() - now;
        if (eta_ms < 0)
        {
          eta_ms += twentyFourHours;
        }
        setTimeout(function() {
          //run once
          func();
          // run every 24 hours from now on
          setInterval(func, twentyFourHours);
        }, eta_ms);
      }




//  //function to fill the money box if the user smoked less sticks than he used to.
//  function fillMoneyBox(user) {
//   if (user.counter <= user.limit) {
//       saving = (user.limit-user.counter)*0.58;
//       user.moneyBox += Math.round(saving);
//       document.getElementById("moneyBox").innerText = user.moneyBox;
//       console.log(user.moneyBox);
//   }
// }

