let expenses = [];
let totalAmount = 0;
let openingBalanceSet = false;
const categorySelect = document.getElementById('category_select');
const amountInput = document.getElementById('amount_input');
const infoInput = document.getElementById('info');
const dateInput = document.getElementById('date_input');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');
const setOpeningBalanceBtn = document.getElementById('set_opening_balance_btn');
const openingBalanceInput = document.getElementById('opening_balance');
const sortDateBtn = document.getElementById('sort_date_btn');
const exportExcelBtn = document.getElementById('export_excel_btn');
const monthSelect = document.getElementById('month_select');
const yearSelect = document.getElementById('year_select');
const searchInput = document.getElementById('search_input');

function formatDate(dateStr) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
}

setOpeningBalanceBtn.addEventListener('click', () => {
    const openingBalance = Number(openingBalanceInput.value);
    if (isNaN(openingBalance) || openingBalance < 0) {
        alert("Please enter a valid opening balance.");
        return;
    }
    totalAmount = openingBalance;
    openingBalanceSet = true;
    updateTotalBalance();
    expenses.unshift({ date: '', info: 'Opening Balance', receipt: '', payment: '', balance: openingBalance });
    updateTable();
});

addBtn.addEventListener('click', function () {
    if (!openingBalanceSet) {
        alert("Please set an opening balance first.");
        return;
    }
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const info = infoInput.value;
    const date = dateInput.value;
    if (!category || isNaN(amount) || amount <= 0 || !info || !date) {
        alert("Please fill all fields correctly.");
        return;
    }
    let receipt = '';
    let payment = '';
    if (category === 'Receipt') {
        receipt = amount;
        totalAmount += amount;
    } else {
        payment = amount;
        totalAmount -= amount;
    }
    expenses.push({ date, info, receipt, payment, balance: totalAmount });
    updateTotalBalance();
    updateTable();
});

function updateTable(expenseList = expenses) {
    expenseTableBody.innerHTML = '';
    expenseList.forEach(expense => {
        const newRow = expenseTableBody.insertRow();
        const dateCell = newRow.insertCell();
        const infoCell = newRow.insertCell();
        const receiptCell = newRow.insertCell();
        const paymentCell = newRow.insertCell();
        const balanceCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();
        dateCell.textContent = expense.date ? formatDate(expense.date) : '';
        infoCell.textContent = expense.info;
        receiptCell.textContent = expense.receipt ? expense.receipt : '';
        paymentCell.textContent = expense.payment ? expense.payment : '';
        receiptCell.style.color = 'blue';
        paymentCell.style.color = 'red';
        balanceCell.textContent = expense.balance;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function () {
            if (expense.info === 'Opening Balance') {
                openingBalanceSet = false;
            } else if (expense.receipt) {
                totalAmount -= expense.receipt;
            } else if (expense.payment) {
                totalAmount += expense.payment;
            }
            expenses = expenses.filter(e => e !== expense);
            updateTotalBalance();
            updateTable();
        });
        deleteCell.appendChild(deleteBtn);
    });
}

function updateTotalBalance() {
    totalAmountCell.textContent = totalAmount;
    totalAmountCell.style.color = totalAmount < 0 ? 'red' : 'black';
}

document.getElementById("filter_date_btn").addEventListener("click", function () {
    const fromDate = new Date(document.getElementById("from_date").value);
    const toDate = new Date(document.getElementById("to_date").value);

    if (isNaN(fromDate) || isNaN(toDate)) {
        alert("Please select valid from and to dates.");
        return;
    }

    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expense.date && expenseDate >= fromDate && expenseDate <= toDate;
    });

    updateTable(filteredExpenses);
});

document.getElementById("reset_filter_btn").addEventListener("click", function () {
    document.getElementById("search_input").value = "";
    document.getElementById("month_select").value = "";
    document.getElementById("year_select").value = "";
    document.getElementById("from_date").value = "";
    document.getElementById("to_date").value = "";
    updateTable();
});


sortDateBtn.addEventListener('click', function () {
    expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    updateTable();
});

monthSelect.addEventListener('change', filterByMonthYear);
yearSelect.addEventListener('change', filterByMonthYear);

function filterByMonthYear() {
    const selectedMonth = parseInt(monthSelect.value);
    const selectedYear = parseInt(yearSelect.value);

    const filteredExpenses = expenses.filter(expense => {
        if (expense.date) {
            const expenseDate = new Date(expense.date);
            const monthMatches = isNaN(selectedMonth) || (expenseDate.getMonth() + 1 === selectedMonth);
            const yearMatches = isNaN(selectedYear) || (expenseDate.getFullYear() === selectedYear);
            return monthMatches && yearMatches;
        }
        return false;
    });

    updateTable(filteredExpenses);
}

const defaultOption = document.createElement('option');
defaultOption.value = '';
defaultOption.textContent = 'Select Year';
defaultOption.disabled = true;
defaultOption.selected = true;
yearSelect.appendChild(defaultOption);

const currentYear = new Date().getFullYear();
for (let year = currentYear; year >= currentYear - 100; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
}


searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredExpenses = expenses.filter(expense => expense.info && expense.info.toLowerCase().includes(searchTerm));
    updateTable(filteredExpenses);
});

const monthNames = {
    '1': 'January', '2': 'February', '3': 'March', '4': 'April', '5': 'May', '6': 'June',
    '7': 'July', '8': 'August', '9': 'September', '10': 'October', '11': 'November', '12': 'December'
};

exportExcelBtn.addEventListener('click', function () {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Date,Info,Receipt,Payment,Balance\n";

    const filteredExpenses = expenses; // Apply filters if needed

    filteredExpenses.forEach(expense => {
        let formattedDate = '';

        if (expense.date) {
            const fullDate = new Date(expense.date);
            if (!isNaN(fullDate)) {
                formattedDate = `${monthNames[fullDate.getMonth()]}-${String(fullDate.getDate()).padStart(2, '0')}-${fullDate.getFullYear()}`;
            }
        }

        const row = [
            formattedDate,
            expense.info || '',
            expense.receipt || '',
            expense.payment || '',
            expense.balance || ''
        ].join(",");
        csvContent += row + "\n";
    });

    // Filename with date filter
    const fromDateVal = document.getElementById('from_date').value;
    const toDateVal = document.getElementById('to_date').value;
    const selectedYear = document.getElementById('year_select').value;
    const selectedMonthIndex = monthSelect.value;
    const monthName = monthNames[selectedMonthIndex] || 'All';

    let filename = `${monthName}_Expenses.csv`;
    if (fromDateVal && toDateVal) {
        filename = `Expenses_${fromDateVal}_to_${toDateVal}.csv`;
    } else if (selectedYear && selectedMonthIndex) {
        filename = `Expenses_${monthName}_${selectedYear}.csv`;
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
});



  function makeResizableTable(table) {
    const cols = table.querySelectorAll('th');
    cols.forEach((col, index) => {
      const resizer = document.createElement('div');
      resizer.style.width = '5px';
      resizer.style.height = '100%';
      resizer.style.position = 'absolute';
      resizer.style.top = '0';
      resizer.style.right = '0';
      resizer.style.cursor = 'col-resize';
      resizer.style.userSelect = 'none';
      resizer.style.zIndex = '1';

      col.style.position = 'relative';
      col.appendChild(resizer);

      resizer.addEventListener('mousedown', function onMouseDown(e) {
        e.preventDefault();
        const startX = e.pageX;
        const startWidth = col.offsetWidth;

        function onMouseMove(e) {
          const newWidth = startWidth + (e.pageX - startX);
          col.style.width = newWidth + 'px';
        }

        function onMouseUp() {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('resizable-table');
    makeResizableTable(table);
  });
