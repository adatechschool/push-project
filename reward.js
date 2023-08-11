window.onload = async () => {

    let user = JSON.parse(localStorage.getItem("user"));

    document.getElementById("moneyBox").innerText = user.moneyBox;
    console.log(user);
    let datas = await getConso(user.idUser);
    console.log(datas);
    var ctx = document.getElementById("chart").getContext('2d');
    
    var options = {
        title: {
          display: true,
          text: "Ta conso au quotidien"
        },
        legend: {
          position: 'bottom',
        },
          tooltips: {
            enabled: true
          },
          plugins: {
            datalabels: {
              color: '#fff',
            }
          }
        };

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: datas[0],
        datasets: [{
            label: 'Ma conso quotidienne',
            data: datas[1],
            fill: false,
            borderColor: '#fff',
            tension: 0.1
          }]
        },
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
        let label = conso.Date;
        let data = Number(conso.dailyConsumption);
        labelForGraph.push(label);
        dataForGraph.push(data);
    }
    console.table(labelForGraph);
    console.table(dataForGraph);
    return [labelForGraph,dataForGraph];
}

