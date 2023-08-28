const { schedule } = require("@netlify/functions");

const handler = async function (event, context) {
  // your server-side functionality
  let response = await fetch("https://api.baserow.io/api/database/rows/table/173457/?user_field_names=true", {
    method: "GET",
    headers: {
      "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
    }
  })
  let result = await response.json();
  let users = await result.results;
  console.table(users);
  let yesterdayDate = new Date();
  yesterdayDate.setDate(new Date().getDate() - 1);
  console.log(yesterdayDate);
  for (const user of users) {
           //function to create a new conso for an user and store it in baserow
          await fetch("https://api.baserow.io/api/database/rows/table/187499/?user_field_names=true", {
            method:"POST",
            headers: {
              "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "idUser": [user.id],
              "Date": yesterdayDate.toISOString(),
              "dailyConsumption": Number(user.counter)
              })
          })
          
          let saving = 0;
          if (Number(user.counter) <= Number(user.nbOfSticks)) {
          saving = Math.round((Number(user.nbOfSticks)-Number(user.counter))*0.58);
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
          .then(response => response.json());
          }
      }
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "la base de donnees est a jour" }),
  };
};

exports.handler = schedule("@daily", handler);


/* No need to it by using netlify      
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
}*/




