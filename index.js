// Define the expense data structure as an array of objects
// let expenses = [];

// Here we get refrence for all the elements.

const balance = document.getElementById("balance");
const earning = document.getElementById("earning");
const expense1 = document.getElementById("expense");
const list = document.getElementById("list");
const description = document.getElementById("description");
const form = document.getElementById("form");
const amount = document.getElementById("amount");
const btn = document.getElementById('btn')

//* To store data in local storage by using JSON.parse we will convert the data that we are getting from the web browser as a string with this we will covert them into js object

//* To store data in local storage by using JSON.parse we will cconvert the data that we are getting from the web browser as a string with this we will covert them into js object
const localStorageTransactions = JSON.parse(
    localStorage.getItem("transactions")
  );
  
  let transactions =
    localStorage.getItem("transactions") !== null ? localStorageTransactions : [];
  
  
  function addTransaction(e) {
    debugger;
    e.preventDefault();
  
    if (description.value.trim() === "" || amount.value.trim() === "") {
      alert("Please add a Description and Amount");
    } else {
      const transaction = {
        id: generateID(),
        text: description.value,
        amount: +amount.value,
      };
  
      transactions.push(transaction);
  
      addTransactionDOM(transaction);
  
      updateValues();
  
      updateLocalStorage();
  
      description.value = "";
      amount.value = "";
    }
  }
  
 
  function generateID() {
    return Math.floor(Math.random() * 100000000);
  }
  

  function addTransactionDOM(transaction) {
    debugger;
    
    const sign = transaction.amount < 0 ? "-" : "+";
  
    const item = document.createElement("li");
  
   
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  
    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(
      transaction.amount
    )}</span> <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
    `;
  
    list.appendChild(item);
  }
  
  
  function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount);
  
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
  
    const expense = (
      amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
      -1
    ).toFixed(2);
  
    balance.innerText = `₹${total}`;
    earning.innerText = `₹${income}`;
    expense1.innerText = `₹${expense}`;
  }
  
 
  function removeTransaction(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);
  
    updateLocalStorage();
  
    init();
  }
  
 
  function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
  

  function init() {
    list.innerHTML = "";
  
    transactions.forEach(addTransactionDOM);
    updateValues();
  }
  
  init();
  
  btn.addEventListener("click", addTransaction);