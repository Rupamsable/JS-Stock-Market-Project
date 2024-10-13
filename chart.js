import {chartAPI} from "./StockConst.js";

const ctx = document.getElementById('myChart');

const defaultDataFilter='1mo';
let stocksData={}

function getChartData(){
    fetch(chartAPI).then((res)=>res.json()).then((res)=>{
        console.log(res);
        const[data]=res.stocksData;
        stocksData = data;
        const xAxisValues = stocksData[window.selectedStock][defaultDataFilter].timeStamp;
        const yAxisValues = stocksData[window.selectedStock][defaultDataFilter].value;
        renderChart(xAxisValues,yAxisValues);
    });
}

export function renderChartOnDataChange(id=defaultDataFilter){
    const xAxisValues= stocksData[window.selectedStock][id].timeStamp;
    const yAxisValues = stocksData[window.selectedStock][id].value;
    renderChart(xAxisValues,yAxisValues);
}

document.addEventListener('stockmarket-applyChartFilter',function(event){
    const id = event.detail;
    console.log(id);
    renderChartOnDataChange(id);
});

const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
      const {ctx} = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#99ffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };


let stockChart;
function renderChart(xAxisValues,yAxisValues){
    if(stockChart){
        stockChart.destroy();
    }
    stockChart= new Chart(ctx, {
        type: "line",
        data: {
          labels:xAxisValues,
          datasets: [
          {
            // label: '# of Votes',
            data: yAxisValues,
            borderWidth: 1,
            borderColor:"#39FF15",
          },
        ],
    },
        options: {
            plugins:{
                customCanvasBackgroundColor:{
                    color:"#020145",
                },
                legend:{
                    display:false,
                },
            },
          scales: {
            x:{
                display: false,
                type:"time",
            },
            y: {
              beginAtZero: false,
              display:false,
            }
          }
        },
        plugins: [plugin],
      });
}

export function init(){
    // renderChart();
    getChartData();
}