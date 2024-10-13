import { detailsAPI } from "./StockConst.js";

let getData={};
const detailsEl=document.getElementById("SummaryInfo");
function getDetailData(){
    fetch(detailsAPI).then((res)=> res.json()).then((res)=>{
        // console.log(res);
        const{stocksProfileData}=res;
        const[data]=stocksProfileData;
        getData = { ...data };
        renderSummary();
    });

}

export function renderSummary(){
    // console.log(getData, window.selectedStock);
    detailsEl.innerText=getData[window.selectedStock].summary;
}

export function init(){
    getDetailData();
}