window.onload = async () => {

  let user = JSON.parse(sessionStorage.getItem("user"));

  document.getElementById("moneyBox").innerText = user.moneyBox;
  document.getElementById("remainingMoney").innerText = user.remainingMoney;

  await displayRewards();

  const addButton = document.getElementById("Add");

  const deleteRewardButtons = document.getElementsByClassName("deleteRewardButton");

  for (let i = 0; i < deleteRewardButtons.length; i++) {
    deleteRewardButtons[i].addEventListener('click', async () => {
      const rewardId = deleteRewardButtons[i].parentNode.parentNode.getAttribute("id");
      await deleteReward(rewardId);
    }, false);
  }

  addButton.addEventListener("click", async () => {
    const inputName = document.getElementById("input-name").value;
    const inputPrice = document.getElementById("input-price").value;
    if (inputName.value === '' || inputPrice.value === '') {
      alert("Entre des valeurs avant de cliquer !");
    } else {
      await saveReward(inputName, inputPrice);
      inputName.value = "";
      inputPrice.value = "";
    }
  }, false);


  async function saveReward(name, value) {
    if (Number(value) < Number(user.moneyBox)) {
      //ajout de la dépense dans la table
      const formattedPrice = Number(value).toFixed(2);
      await fetch("https://api.baserow.io/api/database/rows/table/197556/?user_field_names=true", {
        method: "POST",
        headers: {
          "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          "price": Number(formattedPrice),
          "idUser": [
            user.id
          ],
          "name": name
        })
      });

      // mise à jour de la cagnotte
      const formattedRemainingMoney = Number(user.remainingMoney).toFixed(2);
      await fetch(`https://api.baserow.io/api/database/rows/table/173457/${user.id}/?user_field_names=true`, {
        method: "PATCH",
        headers: {
          "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "remainingMoney": Number(formattedRemainingMoney) - Number(formattedPrice)
        })
      })
        .then(response => response.json())
        .then(result => sessionStorage.setItem("user", JSON.stringify(result)));
      location.reload();
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
    let rewardById = rewards.filter(reward => reward.idUser[0].id === Number(userId));
    return rewardById;
  }

  async function displayRewards() {
    let rewards = await getRewards(user.id);
    console.table(rewards);
    let listContainer = document.getElementById("list")
    for (const reward of rewards) {
      let li = document.createElement('li');
      li.setAttribute('id', reward.id);
      let item = document.createElement('div');
      item.setAttribute('class', "reward");
      let rewardDescription = document.createElement('p');
      rewardDescription.setAttribute('class', "rewardDescription");
      let deleteRewardButton = document.createElement('button');
      deleteRewardButton.setAttribute('class', "deleteRewardButton");
      item.appendChild(rewardDescription);
      item.appendChild(deleteRewardButton);
      rewardDescription.innerHTML = reward.name + " - " + reward.price + "€";
      deleteRewardButton.innerHTML = "X";
      li.appendChild(item);
      listContainer.appendChild(li);
    }
  }

  async function deleteReward(rewardId) {
    //récupérer le reward à supprimer
    let response = await fetch(`https://api.baserow.io/api/database/rows/table/197556/${rewardId}/?user_field_names=true`, {
      method: "GET",
      headers: {
        "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
      }
    }).then(result => result.json());
    //stocker le montant du reward à suprimer
    let amountToDelete = await response.price;

    //formatter les inputs pour les requetes
    const formattedAmountToDelete = Number(amountToDelete).toFixed(2);
    console.log(formattedAmountToDelete);
    //supprimer le reward de la bdd
    await fetch(`https://api.baserow.io/api/database/rows/table/197556/${rewardId}/`, {
      method: "DELETE",
      headers: {
        "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
      }
    });
    const formattedRemainingMoney = Number(user.remainingMoney).toFixed(2);    //mise à jour de la session
    await fetch(`https://api.baserow.io/api/database/rows/table/173457/${JSON.parse(sessionStorage.getItem("user")).id}/?user_field_names=true`, {
      method: "PATCH",
      headers: {
        "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "remainingMoney": Number(formattedRemainingMoney) + Number(formattedAmountToDelete)
      })
    })
      .then(response => response.json())
      .then(result => sessionStorage.setItem("user", JSON.stringify(result)));
      console.log(sessionStorage.getItem("user"));
    location.reload();
  }


}

