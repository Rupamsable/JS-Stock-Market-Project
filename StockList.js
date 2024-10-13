import { renderSelectedStock } from "./SelectedStock.js";
import {stockListURL} from "./StockConst.js";
import { renderSummary } from "./StockSummary.js";
import {renderChartOnDataChange} from "./chart.js";
let stockListData={};
const rightContainerElement = document.getElementById("rightContainer");

function handleStockClick(data){
    window.selectedStock=data.key;
    renderSelectedStock({
        stockName: data.key,
        profit: data.profit,
        stockValue: data.bookValue,
    });
    renderChartOnDataChange();
    renderSummary();
}

function getStockListData(){
   
    fetch(stockListURL) 
    .then((res) => res.json())
    .then((res)=>{
        // console.log(res);
        const { stocksStatsData } = res;
        const [data] = stocksStatsData;
        // console.log(data)
        // stockListData.push(...stocksStatsData);
        // const [selectedKey] = Object.keys(stockListData);
        stockListData = { ...data };
        const [selectedKey]=Object.keys(stockListData)
        // console.log(stockListData)
        //call the render function
        renderStockList();
        // cal render selected stock
        renderSelectedStock({stockName:selectedStock, stockValue:stockListData[selectedKey].bookValue, profit:stockListData[selectedKey].profit,})
    });
}

export function renderStockList(){
//     <div class="stock-stat">
//     <button>AAPL</button>
//     <span>$3.953</span>
//     <span class="profit">0.24%</span>
// </div>

Object.keys(stockListData).forEach((key)=>{
    if(typeof stockListData[key]==="string") return;
    // console.log(stockListData[key]);
const{bookValue, profit} = stockListData[key];



const stockStatDiv = document.createElement('div');
stockStatDiv.classList.add('stock-stat');

const button = document.createElement("button");
button.innerText=key;
button.addEventListener('click', (event) => handleStockClick({key, profit, bookValue }));

const priceSpan=document.createElement("span");
priceSpan.innerText=`$${bookValue}`;

const profitSpan=document.createElement("span");
profitSpan.innerText=`${profit.toFixed(2)}%`;
if (profit<=0) profitSpan.classList.add("loss");
else profitSpan.classList.add("profit");


stockStatDiv.append(button);
stockStatDiv.append(priceSpan);
stockStatDiv.append(profitSpan);

rightContainerElement.append(stockStatDiv);
});


}

export function init(){
    getStockListData();
    // renderStockList();
}
