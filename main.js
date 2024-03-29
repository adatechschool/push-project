window.onload = () => {

      let user = JSON.parse(sessionStorage.getItem("user"));
      console.log(user);
      
      //Display user informations
      document.getElementById("userName").innerText = "Welcome back " + user.name;
      document.getElementById("limit").innerHTML = `${user.nbOfSticks}`;
      document.getElementById("counter").innerHTML = `${user.counter}`;


      //Event listener to increase by 1 the counter when the user click on the button "counterBtn" and update the database
      const counterButton = document.getElementById("counterBtn");
      counterButton.addEventListener("click", async () => {
        await fetch(`https://api.baserow.io/api/database/rows/table/173457/${JSON.parse(sessionStorage.getItem("user")).id}/?user_field_names=true`, {
          method:"PATCH",
          headers: {
            "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "counter" : Number(JSON.parse(sessionStorage.getItem("user")).counter) + 1
          })
        })
        .then(response => response.json())
        .then( result => sessionStorage.setItem("user",JSON.stringify(result)));
        document.getElementById("counter").innerHTML = JSON.parse(sessionStorage.getItem("user")).counter;
      }
      );

      //Event listener to decrease by 1 the counter when the user click on the button "reductionBtn" and update the database
      const reductionButton = document.getElementById("reductionBtn");
      reductionButton.addEventListener("click", async () => {
          await fetch(`https://api.baserow.io/api/database/rows/table/173457/${JSON.parse(sessionStorage.getItem("user")).id}/?user_field_names=true`, {
          method:"PATCH",
          headers: {
            "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "counter" : Number(JSON.parse(sessionStorage.getItem("user")).counter) - 1
          })
        })
        .then(response => response.json())
        .then( result => sessionStorage.setItem("user",JSON.stringify(result)));
        document.getElementById("counter").innerHTML = JSON.parse(sessionStorage.getItem("user")).counter;
      }
      );

};

      