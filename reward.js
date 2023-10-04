window.onload = async () => {

    let user = JSON.parse(sessionStorage.getItem("user"));

    document.getElementById("moneyBox").innerText = user.moneyBox;
    document.getElementById("remainingMoney").innerText = user.remainingMoney;

    const addButton = document.getElementById("Add");


    addButton.addEventListener("click", async () => {
        const inputName = document.getElementById("input-name").value;
        const inputPrice = document.getElementById("input-price").value;
        console.log(inputName, inputPrice);
        if (inputName.value === '' || inputPrice.value === '') {
            alert("Entre des valeurs avant de cliquer !");
        } else {
            console.log(inputName, inputPrice);
            await saveReward(inputName,inputPrice);
            await displayRewards();
            inputName.value = "";
            inputPrice.value = "";
        }
    }, false);


    async function saveReward(name, value) {
      if (Number(value)<Number(user.moneyBox)) {
        //ajout de la dépense dans la table
        await fetch("https://api.baserow.io/api/database/rows/table/197556/?user_field_names=true", {
        method:"POST",
        headers: {
          "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          "price": Number(value),
          "idUser": [
              user.id
          ],
          "name": name
        })
        });
        // mise à jour de la cagnotte
        await fetch(`https://api.baserow.io/api/database/rows/table/173457/${user.id}/?user_field_names=true`, {
            method:"PATCH",
            headers: {
            "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            "remainingMoney" : Number(user.remainingMoney) - Number(value)
            })
            });
      }
      else alert("Tu n'as pas assez économiser pour t'offrir ça. Encore un effort et tu pourras !!");
    }

    async function getRewards(userId) {
        let response = await fetch("https://api.baserow.io/api/database/rows/table/197556/?user_field_names=true", {
          method: "GET",
          headers: {
            "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
          }
        });
      let result = await response.json();
      let rewards = await result.results;
      let rewardById = rewards.filter( reward => reward.idUser[0].id === Number(userId));
      return rewardById;
    }

    async function displayRewards () {
      let rewards = await getRewards(user.id);
      console.table(rewards);
      let listContainer = document.getElementById("list")
      for (const reward of rewards) {
        let item = document.createElement('li');
        item.innerHTML = reward.name + reward.price;
        listContainer.appendChild(item);
      }
    }
    

}

