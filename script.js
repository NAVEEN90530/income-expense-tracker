const balance = document.querySelector("#balance")
const inc_amt = document.querySelector("#inc-amt")
const exp_amt = document.querySelector("#exp-amt")
const trans = document.querySelector("#trans")
const form = document.querySelector("#form")
const description = document.querySelector("#desc")
const amount = document.querySelector("#amount")

// const dummyData = [
//     { id: 1, description:"Flower" , amount: -20},
//     { id: 2, description:"Salary" , amount: 35000},
//     { id: 3, description:"Book" , amount: -100},
//     { id: 4, description:"Camera" , amount: -200},
//     { id: 5, description:"Petrol" , amount: -250},
//     { id: 6, description:"Salary" , amount: 20050},
// ];

// let transactions = dummyData;

const localStorageTrans = JSON.parse(localStorage.getItem("trans"));
let transactions = localStorage.getItem("trans") !== null ? localStorageTrans : [] ;

function loadTransactionDetials(transaction){
    const sign = transaction.amount< 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "exp" : "inc");
    item.innerHTML =`
    ${transaction.description}
    <span> ${sign} ${Math.abs(transaction.amount)} </span>
    <button class="btn-del " onclick="removeTrans(${transaction.id})">X</button>
    `
    trans.appendChild(item)
}

function removeTrans(id){
    if (confirm("Are You Sure you want to delete Transaction?")){
        transactions = transactions.filter((transaction) => transaction.id != id);
        config();
        updateLocalStorage ();
    }
    else{
        return;
    }
}

function updateAmount(){
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((acc,item) => (acc += item), 0).toFixed(2);
    balance.innerHTML= ` &#x20b9; ${total}`;

    const income = amounts.filter((item) => item > 0).reduce((acc,item) => (acc += item), 0).toFixed(2);
    inc_amt.innerHTML= ` &#x20b9; ${income}`;

    const expence = amounts.filter((item) => item < 0).reduce((acc,item) => (acc += item), 0).toFixed(2);
    exp_amt.innerHTML= ` &#x20b9; ${Math.abs(expence)}`;

}


function addTransaction(e){
    e.preventDefault();
    if (description.value.trim() == "" || amount.value.trim() == ""){
        alert("plese Enter Description and Amount");
    }
    else{
        const transaction = {
            id: uniqueId(),
            description:description.value,
            amount: +amount.value,
        };
        transactions.push(transaction);
        loadTransactionDetials(transaction);
        description.value = "";
        amount.value = "";
        updateAmount();
        updateLocalStorage ();
    }
}

form.addEventListener("submit", addTransaction);

function config(){
    trans.innerHTML="";
    transactions.forEach(loadTransactionDetials);
    updateAmount();
}

window.addEventListener("load",function (){
    config();
});


function updateLocalStorage (){
    localStorage.setItem("trans", JSON.stringify(transactions));
}

function uniqueId(){
    return Math.floor(Math.random() * 100000);
}