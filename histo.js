window.onload = async () => {

    let user = JSON.parse(localStorage.getItem("user"));

    let datas = await getConso(user.idUser);
    let ctx = document.getElementById("chart").getContext('2d');
    

    
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
        labels: datas[0],
        datasets: [{
            label: 'Ma conso quotidienne',
            data: datas[1],
            borderColor: '#e5a124'
          }]
        }
    });
}

async function getConso (userId) {
    let response = await fetch("https://api.baserow.io/api/database/rows/table/187499/?user_field_names=true", {
        method: "GET",
        headers: {
          "Authorization": "Token x2iRlrA7czwFxbDMWj2v8wAzMhi0DLK4",
        }
      })
    let result = await response.json();
    let consos = await result.results;
    console.table(consos);
    let consoById = consos.filter( conso => conso.idUser[0].value === userId);
    console.table(consoById);
    let labelForGraph = [];
    let dataForGraph = [];
    for (const conso of consoById) {
        let label = conso.Date.slice(0,10);
        let data = parseInt(conso.dailyConsumption);
        labelForGraph.push(label);
        dataForGraph.push(data);
    }
    console.table(labelForGraph);
    console.table(dataForGraph);
    return [labelForGraph,dataForGraph];
}
