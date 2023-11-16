window.onload = async () => {

  let user = JSON.parse(sessionStorage.getItem("user"));

  let datas = await getConso(Number(user.idUser));
  let ctx = document.getElementById("chart").getContext('2d');


  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: datas[0],
      datasets: [{
        label: 'Ma conso quotidienne',
        data: datas[1],
        borderColor: 'white',
        backgroundColor: 'white'

      }]
    }
  });
}

async function getConso(userId) {
  let pageNumber = 1;
  let consos = [];
  let stopCondition = false;

  while (!stopCondition) {
    let response = await fetch(`https://api.baserow.io/api/database/rows/table/187499/?user_field_names=true&page=${pageNumber}`, {
      method: "GET",
      headers: {
        "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
      }
    });

    if (!response.ok) {
      // Arrêtez la boucle si la réponse n'est pas "OK"
      console.error(`Erreur lors de la requête : ${response.status} - ${response.statusText}`);
      break;
    }

    let result = await response.json();
    let newPage = result.results || [];
    consos = [...consos, ...newPage];
    if (newPage.length < 100) {
      stopCondition = true;
    }
    pageNumber++;
  }

  let consoById = consos.filter(conso => conso.idUser[0].id === userId);
  let labelForGraph = [];
  let dataForGraph = [];

  for (const conso of consoById) {
    let label = conso.Date.slice(0, 10);
    let data = parseInt(conso.dailyConsumption);
    labelForGraph.push(label);
    dataForGraph.push(data);
  }

  console.log(labelForGraph);
  console.log(dataForGraph);

  return [labelForGraph, dataForGraph];
}

