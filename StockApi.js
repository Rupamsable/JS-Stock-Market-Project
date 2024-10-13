function getDataFromServer(url) {
return fetch(url);
}

getDataFromServer("https://stocks3.onrender.com/api/stocks/getstocksprofiledata")