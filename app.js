async function loadJSON() {
    try {
        const response = await fetch('user.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        console.log(users.map(user => user.name));
        users.map(user => user.name)
        localStorage.setItem('users', JSON.stringify(users))
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

loadJSON();

const username = document.querySelector('.username');
const getUserInfo = JSON.parse(localStorage.getItem("mainUser"))
username.innerHTML = getUserInfo[0].name
// console.log(getUserInfo.filter(mainUser => mainUser ===));



let tableEntries = [];

function updateSummary() {
    const totalIncome = tableEntries.reduce((total, el) => {
        if (el.type === 1) total += el.amount;
        return total;
    }, 0);

    const totalExpense = tableEntries.reduce((total, el) => {
        if (el.type === 0) total += el.amount;
        return total;
    }, 0);

    updatedInc.innerText = totalIncome;
    updatedExp.innerText = totalExpense;
    updatedBal.innerText = totalIncome - totalExpense;
}

function addItem() {
    let type = itemType.value;
    let name = document.getElementById("name");
    let amount = document.getElementById("amount");

    if (name.value === "" || Number(amount.value) === 0)
        return alert("مقدار ورودی را درست وارد کنید!");
    if (Number(amount.value) <= 0)
        return alert(
            "مقدار نمی تواند منفی باشد!"
        );

    tableEntries.push({
        type: Number(type),
        name: name.value,
        amount: Number(amount.value),
        date: new Date().toLocaleDateString(),
    });
    updateTable();
    name.value = "";
    amount.value = 0;
    saveToLocalStorage(tableEntries);
}

function loadItems(e, i) {
    let cls;

    let table = document.getElementById("table");
    let row = table.insertRow(i + 1);
    let cell_0 = row.insertCell(0);
    let cell_1 = row.insertCell(1);
    let cell_2 = row.insertCell(2);
    let cell_3 = row.insertCell(3);
    let cell_4 = row.insertCell(4);
    let cell_5 = row.insertCell(5);
    cell_0.innerHTML = i + 1;
    cell_1.innerHTML = e.name;
    cell_2.innerHTML = e.amount;
    cell_4.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
    cell_4.classList.add("zoom");
    cell_4.addEventListener("click", () => del(e));
    cell_5.innerHTML = new Date().toLocaleDateString();
    if (e.type == 0) {
        cls = "red";
        cell_3.innerHTML = `<i class="fa-solid fa-arrow-down"></i>`;
    } else {
        cls = "green";
        cell_3.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
    }
    cell_3.style.color = cls;
}


function remove() {
    while (table.rows.length > 1) table.deleteRow(-1);
}

function del(el) {
    if (confirm(`Are you sure you want to delete ${el.name}?`)) {
        remove();
        tableEntries = tableEntries.filter(
            (e) => e.name !== el.name
        );
        
    }
    localStorage.setItem('tableEntries', JSON.stringify(tableEntries));
    tableEntries.map((e, i) => loadItems(e, i));
    updateSummary();
}
function updateTable() {
    remove();
    tableEntries.map((e, i) => {
        loadItems(e, i);
    });
    updateSummary();
}

function saveToLocalStorage(data) {
    localStorage.setItem('tableEntries', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const storedData = JSON.parse(localStorage.getItem('tableEntries'));
    if (storedData) {
        tableEntries = storedData;
        updateTable();
    }
}

function loadUserToLocalStorage() {
    localStorage.setItem('users', JSON.stringify())
}


loadFromLocalStorage();
updateTable();