// PAGE 2 - SCREEN1.html

var localMenu = localStorage.getItem('localMenu');
var yearClassMenu = localStorage.getItem('yearClassMenu');

if (!localMenu || !yearClassMenu) {
  window.location.href = 'index.html';
}

var selectedLocal = document.querySelector("#selectedLocal");

selectedLocal.innerHTML = localMenu + ' - ' + yearClassMenu;

google.charts.load('current', {
  'packages': ['corechart']
});

//grafico 1 (pizza) - Ativas e Inativas por sede
google.charts.setOnLoadCallback(drawChartPizza);

function printActiveStudents() {

  var active = 0;
  var inactive = 0;

  for (student of data[localMenu][yearClassMenu]["students"]) {
    if (student.active === true) {
      active++;
    } else {
      inactive++;
    }
  }
  var arr = [
    ["Ativas", active],
    ["Inativas", inactive]
  ];
  // printando os dados antes do grafico
  // pegar a div do html para manipular
  var dateDiv = document.querySelector(".dateDiv1");

  // criar nome da seção
    var sectionName = document.createElement("h1");
    sectionName.innerHTML = "Alunas inscritas"
    dateDiv.appendChild(sectionName);

    // criar div drop pra colocar 2 dados: numero e leganda
    var divActive = document.createElement("div"); 
      // p - Numero
      var intoBoxActiveP1 = document.createElement("h2");
      intoBoxActiveP1.innerHTML = active;
      divActive.appendChild(intoBoxActiveP1);
      // p - legenda
      var intoBoxActiveP2 = document.createElement("small");
      intoBoxActiveP2.innerHTML = "Alunas Ativas";
      divActive.appendChild(intoBoxActiveP2);
  // colocar dentro da div do html
  dateDiv.appendChild(divActive);

  // calculos drop
  var studentsTotal = (active + inactive);
  var drop = (inactive / studentsTotal) * 100 ;

    // criar div drop pra colocar 2 dados: numero e leganda
    var divDrop = document.createElement("div"); 
      
      // p - Numero
      var intoBoxP1 = document.createElement("h2");
      intoBoxP1.innerHTML = drop.toFixed(1);
      divDrop.appendChild(intoBoxP1);
      // p - legenda
      var intoBoxP2 = document.createElement("small");
      intoBoxP2.innerHTML = "Desistentes";
      divDrop.appendChild(intoBoxP2);

  // colocar dentro da div do html
  dateDiv.appendChild(divDrop);

  return arr;
}

function drawChartPizza() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Status");
  data.addColumn("number", "Qts");
  data.addRows(printActiveStudents());
  var options = {
    title: 'Média de alunas inscritas',
    titleTextStyle: {
      fontSize: 14,
      bold: true
    },
    "width": 400,
    "height": 300,
    "colors": ["#FFE521", "#CD2626"]
  };
  var chart = new google.visualization.PieChart(document.getElementById("chart_div"));
  chart.draw(data, options);
}


// grafico 2 (linha) - maiores de 70% tech e hse por sprints
google.charts.setOnLoadCallback(drawChart);

function averageGeneral() {

  var sprintSize = data[localMenu][yearClassMenu].ratings.length;
  
  var arr = [
    ['Sprints', 'quantidade de alunas ativas com media maior que 70']
  ];

  for (var i = 1; i <= sprintSize; i++) {
    arr.push(["SP" + i, 0]);
  }

  for (student of data[localMenu][yearClassMenu]["students"]) {
    // console.log(student)
    for (sprint of student.sprints) {
      // console.log(sprint.number);
      
      if (student.active === true) {
        if(calcHseSprint(sprint) >= 70 && calcTechSprint(sprint) >= 70) {
          switch(sprint.number) {
            case 1:
              arr[1][1] += 1;  
              break;
            case 2:
              arr[2][1] += 1; 
              break;
            case 3:
              arr[3][1] += 1; 
              break;
            case 4:
              arr[4][1] += 1; 
              break;
          }
        }
      } 
    }
  }

  
  console.log(arr);

  // printando os dados antes do grafico
  // pegar a div do html para manipular
  // var dateDiv2 = document.querySelector(".dateDiv2");

  // // criar nome da seção
  //   var sectionName = document.createElement("h1");
  //   sectionName.innerHTML = "Alunas em Destaque > 70% em Tech e HSE"
  //   dateDiv2.appendChild(sectionName);

  //   // conta média
  //   var sprintMedia = parseInt((sp1 + sp2 + sp3 + sp4) / 4);
  //   // console.log(sprintMedia)

  //   // criar div total number pra colocar 2 dados: numero e leganda
  //   var divTotalNumber = document.createElement("div"); 
  //     // p - Numero
  //     var intoBoxActiveP1 = document.createElement("h2");
  //     intoBoxActiveP1.innerHTML = sprintMedia;
  //     divTotalNumber.appendChild(intoBoxActiveP1);
  //     // p - legenda
  //     var intoBoxActiveP2 = document.createElement("small");
  //     intoBoxActiveP2.innerHTML = "Alunas contemplam essa média.";
  //     divTotalNumber.appendChild(intoBoxActiveP2);
  // // colocar dentro da div do html
  // dateDiv2.appendChild(divTotalNumber);

  //   // criar div drop pra colocar 2 dados: numero e leganda
  //   var divTotalNumberPercent = document.createElement("div"); 
      
  //     // p - Numero
  //     var intoBoxP1 = document.createElement("h2");
  //     intoBoxP1.innerHTML = sprintMedia * 100;
  //     divTotalNumberPercent.appendChild(intoBoxP1);
  //     // p - legenda
  //     var intoBoxP2 = document.createElement("small");
  //     intoBoxP2.innerHTML = "Porcento do Total de " + (sprintMedia * 100);
  //     divTotalNumberPercent.appendChild(intoBoxP2);

  // // colocar dentro da div do html
  // dateDiv2.appendChild(divTotalNumberPercent);

  return arr;
}

function calcTechSprint(sprint) {
  var percent = (sprint.score.tech / 1800) * 100;
  return percent.toFixed(1);
}

function calcHseSprint(sprint) {
  var percent = (sprint.score.hse / 1200) * 100;
  return percent.toFixed(1);
}

function drawChart() {
  var data = google.visualization.arrayToDataTable(averageGeneral());
  var options = {
    title: 'Quantidade de alunas acima da média em todos os sprints',
    titleTextStyle: {
      fontSize: 14,
      bold: true
    },
    curveType: 'function',
    legend: {
      position: 'bottom'
    }
  };
  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  chart.draw(data, options);
}

//grafico 3 (barra) - NPS
google.charts.setOnLoadCallback(drawBarChart);

function calcNps(){
  var sprint = 0;
  var totalNps = 0;
  var promoters = 0;
  var passive = 0;
  var detractors = 0;
  for (rating of data[localMenu][yearClassMenu]["ratings"]) {
    promoters += rating.nps.promoters;
    passive += rating.nps.passive;
    detractors += rating.nps.detractors;
    sprint ++;
  }
  totalNps = promoters - detractors;
  
  var arr =[
    ['Name', '%'],
    ['NPS', (totalNps/sprint)],
    ['Promoters', (promoters/sprint)],
    ['Passive',(passive/sprint)],
    ['Detractors',(detractors/sprint)]
  ];
  return arr;
}

function drawBarChart() {
  var data = google.visualization.arrayToDataTable(calcNps());
  var options = {
    title: "NPS médio dos sprints",
    titleTextStyle: {
      fontSize: 14,
      bold: true
    },
    width: 600,
    height: 400,
    bar: {groupWidth: "70%"},
    legend: { position: "none" },
  };
  var chart = new google.visualization.BarChart(document.getElementById('bar_chart'));
  chart.draw(data, options);
}

//Gráfico 4 - Tech Skills
google.charts.setOnLoadCallback(drawPieChartTech);

// Qtd e Porcentagem de alunas com media > 70 por sprint em TECH
function avgTechStudents() {

  var techSprint = document.getElementById('techSprint');
  var sprint = techSprint.value;

  console.log(sprint);

  // for (student of data[localMenu][yearClassMenu]["students"]) {
  //   var grade = 0;
  //   var average = 0;
  //   var count = student.sprints.length;
  //   for (sprint of student.sprints) {
  //     grade += sprint.score.tech;
  //   }
  //   average = grade / count;
  //   var percent = (average / 1260) * 100;
  //   var total = Math.round(percent);
  // }
  // return total;
}


function drawPieChartTech() {

  var data = google.visualization.arrayToDataTable([
    ['Effort', 'Amount given'],
    ['My all',     100],
  ]);

  var options = {
    pieHole: 0.5,
    pieSliceTextStyle: {
      color: 'black',
    }
  };

  var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  chart.draw(data, options);
}