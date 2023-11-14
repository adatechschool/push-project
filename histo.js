window.onload = async () => {

  let user = JSON.parse(sessionStorage.getItem("user"));

  let datas = await getConso(user.idUser);
  let ctx = document.getElementById("chart").getContext('2d');


  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: datas[0],
      datasets: [{
        label: 'Ma conso quotidienne',
        data: datas[1],
        borderColor: 'white',

      }]
    }
  });
}

async function getConso(userId) {
  let pageNumber = 1
  let consos = [];
  let stopCondition = false;
  while (!stopCondition) {
    let response = await fetch(`https://api.baserow.io/api/database/rows/table/187499/?user_field_names=true&page=${pageNumber}`, {
      method: "GET",
      headers: {
        "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
      }
    })
    let result = await response.json();
    let newPage = await result.results;
    consos = [...consos, ...newPage];
    if (newPage.length < 100) {
      stopCondition = true;
    }
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

