window.addEventListener('load', () => {

    let inputAmount = document.querySelector('#amount');
    let inputDetail = document.querySelector('#detail');
    let inputType = document.querySelector('#type');
    let addBtn = document.querySelector('#add');

    // const userAccount = {
    //     firstName: 'Helmi',
    //     lastName: 'Nguyen',
    //     income: [{
    //             detail: 'Salary',
    //             amount: 4000,
    //             time: 'Feb 12,2020 9:26'
    //         },
    //         {
    //             detail: 'Prize',
    //             amount: 5000,
    //             time: 'Feb 12,2020 9:26'
    //         }
    //     ],
    //     expense: [{
    //             detail: 'Rent',
    //             amount: 900,
    //             time: 'Feb 12,2020 9:26'
    //         },
    //         {
    //             detail: 'Transport',
    //             amount: 100,
    //             time: 'Feb 12,2020 9:26'
    //         }
    //     ],
    // }
    

    addBtn.addEventListener('click', calculate);

    function calculate() {

        checkSubmit ();

        if (inputDetail.value === "" || inputAmount.value === "" || inputType.value === '0') {

        } else {
            getTime();
            getInput();
            displayInput();
            getBalance();
        }

    }

    let incomeArr = [];
    let expenseArr = [];

    // function getInput() {

    //     let detail = inputDetail.value;
    //     let amount = +inputAmount.value;
    //     let time = getTime();

    //     if (inputType.value === 'income') {
    //         userAccount.income.push({detail, amount, time});
    //     } else if (inputType.value === 'expense') {
    //         userAccount.expense.push({detail, amount, time});
    //     }
    // }

        
    

    function getTime() {
        const now = new Date();
        let year = now.getFullYear();
        let date = now.getDate();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let monthText = months[now.getMonth()];

        let dateMonthYear = monthText + ' ' + date + ',' + year;
        let time = hours + ":" + minutes;
        let fullTime = dateMonthYear + " " + time;
        return fullTime;
    }

    

    let incomeBox = document.querySelector('.income__container');
    let expenseBox = document.querySelector('.expense__container');

    function displayInput() {

        if (incomeBox.innerHTML != '' || expenseBox.innerHTML != '') {
            incomeBox.innerHTML = '';
            expenseBox.innerHTML = '';
            incomeArr = [];
            expenseArr = [];

        }

        for (let item of userAccount.income) {

            let {
                detail,
                amount,
                time
            } = item;
            
            incomeBox.innerHTML += `<div>
                <p>${detail}</p>
                <p>${amount}</p>
                <p>${time}</p>
            </div>`
          
            incomeArr.push(amount); 

        }

        for (let item of userAccount.expense) {

            let {
                detail,
                amount,
                time
            } = item;
            
            expenseBox.innerHTML += `<div>
                <p>${detail}</p>
                <p>${amount}</p>
                <p>${time}</p>
            </div>`
  
            expenseArr.push(amount);

        }

    }

    function getBalance() {
        let totalIncome = 0;
        let totalExpense = 0;
        let balance;

        if ( incomeArr && incomeArr.length ) {
            incomeArr.reduce((total, num) => {
                return totalIncome = total + num;
            }, 0)
        }

        if ( expenseArr && expenseArr.length ) {
            expenseArr.reduce((total, num) => {
                return totalExpense = total + num;
            }, 0)
        }
        
        balance = totalIncome - totalExpense;

        document.getElementById('result').innerText = balance;
    }

    function checkSubmit () {

        if (inputAmount.value === "") {
            inputAmount.style.border = '1px solid red';
        } 
        
        if (inputDetail.value === "") {
            inputDetail.style.border = '1px solid red';
        } 
        
        if (inputType.value === '0') {
            inputType.style.border = '1px solid red';
        }
    }

    inputType.addEventListener('change', () => {
        if (inputType.value !== 0) {
            inputType.style.border = '1px solid grey';
        }
    })

    inputDetail.addEventListener('keyup', checkInput);
    inputAmount.addEventListener('keyup', checkInput);

    function checkInput() {
        
        inputDetail.style.border = '1px solid grey';
        inputAmount.style.border = '1px solid grey';


        if (inputDetail.value.length > 15 ) {
            inputDetail.style.border = '1px solid red';

        }
        
        if (isNaN(inputAmount.value) === true ) {
            inputAmount.style.border = '1px solid red';

        } 
        
    }

    inputDetail.addEventListener('click', () => {
        if (inputDetail.value != '') {
            inputDetail.value = ''
        }
    });

    inputAmount.addEventListener('click', () => {
        if (inputAmount.value != '') {
            inputAmount.value = ''
        }
    });

    
    let userAccount;

    function getInput() {


        let input = {
            income: [],
            expense: [],
        }
    
        let detail = inputDetail.value;
        let amount = +inputAmount.value;
        let time = getTime();

        if (inputType.value === 'income') {
            input.income.push({detail, amount, time});
        } else if (inputType.value === 'expense') {
            input.expense.push({detail, amount, time});
        }
       
        let inputStr = [];

        inputStr = JSON.stringify(input, undefined, 4);

        if (localStorage.getItem('key') === null) {     
            localStorage.setItem('key', inputStr);
            userAccount = JSON.parse(localStorage.getItem('key'), undefined, 4);

        } else {
            userAccount = JSON.parse(localStorage.getItem('key'), undefined, 4);

            if (userAccount.income.length > 0) {
                for (let item of userAccount.income) {
                    input.income.push(item);
                }
            } else {

            }

            if (userAccount.expense.length > 0) { 
                for (let item of userAccount.expense) {
                    input.expense.push(item);
                }
            } else {

            }
            
            inputStr = JSON.stringify(input, undefined, 4);
            localStorage.setItem('key', inputStr);
            userAccount = JSON.parse(localStorage.getItem('key'), undefined, 4);
            
        }

        return userAccount;
        
    }

    let form = document.getElementById('form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });


})
    

