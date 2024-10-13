const getChartDataFilterEvent= (detail)=>{
    return new CustomEvent("stockmarket-applyChartFilter",{detail});
};



function chartFiltersClickHandler(event){
    // console.log("Parent");
    // console.log(event.target);
    const element = event.target;
    if(element){
        // element.getAttribute('data-id')

        const id = element.dataset.id;
        const event = getChartDataFilterEvent(id);
        document.dispatchEvent(event);
        // console.log(id);
    }

}

// function child(event){
//     event.stopPropagation();
//     console.log("Child");
// }