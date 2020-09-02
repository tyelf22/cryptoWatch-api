//API Key
const apiKey = "75b0b3fef6c683a72c433a1002a9cf22a5dbbcb5e8bc5a3ac1ec36a37536d510"

//URL to retrieve data
const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,USDT,XRP,LINK,BCH,LTC,BSV,CRO,BNB,ADA,EOS,XTZ,TRX,XLM,XMR,USDC,NEO,ATOM,LEO,XEM,UMA,HT,YFI,MIOTA,VET,LEND,DASH,ZEC,ETC&tsyms=USD&api_key=${'75b0b3fef6c683a72c433a1002a9cf22a5dbbcb5e8bc5a3ac1ec36a37536d510'}`

//Initial Coins
const topCoins = ["BTC", "ETH", "USDT", "XRP", "LINK", "BCH", "LTC", "BSV", "CRO", "BNB", "ADA", "EOS", "XTZ", "TRX", "XLM", "XMR", "USDC", "NEO", "ATOM", "LEO", "XEM", "UMA", "HT", "YFI", "MIOTA", "VET", "LEND", "DASH", "ZEC", "ETC"]

const table = document.querySelector('.cryptoTable')

let allEntries = []

//Fetch data from API
fetch(url)
.then(res => res.json())
.then(data => {
    Object.entries(data.DISPLAY).map((el, index) =>{
        let row = table.insertRow(-1)
        let cell0 = row.insertCell(0)
        let cell1 = row.insertCell(1)
        let cell2 = row.insertCell(2)
        let cell3 = row.insertCell(3)
        let cell4 = row.insertCell(4)
        let cell5 = row.insertCell(5)

        cell0.innerText = index + 1
        cell1.innerText = el[0]
        cell2.innerText = el[1].USD.PRICE
        cell3.innerText = el[1].USD.CHANGE24HOUR
        cell4.innerText = el[1].USD.CHANGEPCT24HOUR
        cell5.innerText = el[1].USD.MKTCAP

        allEntries.push(el)
    })
    
})
.then(() => {
    for(i=1; i<table.rows.length; i++){
        let tableData = table.rows[i].cells[3]
        let tableDataPercent = table.rows[i].cells[4]
        let tableDataText = table.rows[i].cells[3].innerText.split('')

        if(tableDataText[2] == "-"){
            tableData.style.color = '#DF5F66'
            tableDataPercent.style.color = '#DF5F66'
        }else {
            tableData.style.color = '#3AB169'
            tableDataPercent.style.color = '#3AB169'   
        }
    }
})
.catch(err => console.log(err))

//Search button
const seachBtn = document.querySelector('.search').addEventListener('click', search)

//User search
function search() {
    for(var i = table.rows.length - 1; i > 0; i--){
        table.deleteRow(i);
    }
    const tableTwo = document.querySelector('.cryptoTable')

    let searchQuery = document.querySelector("#searchQuery").value
    const urlTwo = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${searchQuery}&tsyms=USD&api_key=${'75b0b3fef6c683a72c433a1002a9cf22a5dbbcb5e8bc5a3ac1ec36a37536d510'}`


    fetch(urlTwo)
    .then(res => res.json())
    .then(data => {
        Object.entries(data.DISPLAY).map((el, index) =>{
            let row = tableTwo.insertRow(-1)
            let cell0 = row.insertCell(0)
            let cell1 = row.insertCell(1)
            let cell2 = row.insertCell(2)
            let cell3 = row.insertCell(3)
            let cell4 = row.insertCell(4)
            let cell5 = row.insertCell(5)

            cell0.innerText = index + 1
            cell1.innerText = el[0]
            cell2.innerText = el[1].USD.PRICE
            cell3.innerText = el[1].USD.CHANGE24HOUR
            cell4.innerText = el[1].USD.CHANGEPCT24HOUR
            cell5.innerText = el[1].USD.MKTCAP

            allEntries.push(el)
        })
        
    })
    .then(() => {
        for(i=1; i<tableTwo.rows.length; i++){
            let tableData = tableTwo.rows[i].cells[3]
            let tableDataPercent = tableTwo.rows[i].cells[4]
            let tableDataText = tableTwo.rows[i].cells[3].innerText.split('')

            if(tableDataText[2] == "-"){
                tableData.style.color = '#DF5F66'
                tableDataPercent.style.color = '#DF5F66'
            }else {
                tableData.style.color = '#3AB169'
                tableDataPercent.style.color = '#3AB169'   
            }
        }
    })
    .catch(err => console.log(err))

}

//reload button
const reloadBtn = document.querySelector('#refresh').addEventListener('click', reload)

function reload() {
    location.reload();
}








