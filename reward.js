window.onload = async () => {

    let user = JSON.parse(sessionStorage.getItem("user"));

    document.getElementById("moneyBox").innerText = user.moneyBox;
    
    const inputName = document.getElementById("input-name");
    const inputPrice = document.getElementById("input-price");
    const listContainer = document.getElementById("list-container");
    const addButton = document.getElementById("Add");

    addButton.addEventListener("click", function addTask() {
        if (inputName.value === '' || inputPrice.value === '') {
            alert("Entre des valeurs avant de cliquer !");
        } else {
            let li = document.createElement("li");
            li.innerHTML = inputName.value;
            listContainer.appendChild(li);
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
            saveReward();
        }
        inputName.value = "";
        inputPrice.value = "";
    }, false);


    async function saveReward() {
      await fetch("https://api.baserow.io/api/database/rows/table/197556/?user_field_names=true", {
        method:"POST",
        headers: {
          "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          "price": inputPrice.value,
          "idUser": [
              user.id
          ],
          "name": inputName.value
      })
      })
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
      let list = document.getElementById("list")
      for (const reward of rewards) {
        let item = document.createElement('li');
        item.innerHTML = reward.name + reward.price;
        list.appendChild(item);
      }
    }
    
    displayRewards();
}

