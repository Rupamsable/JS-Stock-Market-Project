import { init as stockListInit } from "./StockList.js";
import { init as stocDetailsInit } from "./StockSummary.js";
import {init as chartInit } from "./chart.js";
// var selectedStock="AAPL";

// function setSelectedStock(val)
// {
//     selectedStock = val;
// }

stockListInit();
stocDetailsInit();
chartInit();

// # Event Bubbling
// - when we trigger an event on any element it will keep bubbling up till the root of the document.
// here bubbling up refers to triggering the event.

// data ->
// data-tooltip
// data-some-random-name -> Element.dataset.someRandomName


//How events work ?
// eventListner - Listner the emitted event
// eventDispatch - when we click, event gets emitted, what event? (click event gets emitted)

const event = new CustomEvent("thisIsMyCustomEvent",{
    detail:"any kind of data",
});

document.addEventListener("thisIsMyCustomEvent",function(event){
    // console.log("Event Capture !!!",event.detail);
});

document.addEventListener("click",function(event){
    // console.log("Event Capture !!!",event.detail);
});

// How do I dispatch a click event ? By clicking on the element where its added
// How Do i dispatch my custom event? By dispatching it from the element where it added.

setTimeout(()=>{
    document.dispatchEvent(event);
},2000);