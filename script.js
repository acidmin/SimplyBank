'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500.13, 250, -300.93, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-02T14:43:31.074Z',
    '2020-12-02T14:43:31.074Z',
    '2021-01-02T14:43:31.074Z',
    '2021-02-02T14:43:31.074Z',
    '2021-03-02T14:43:31.074Z',
    '2021-05-02T14:43:31.074Z',
    '2023-02-26T14:43:31.074Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-11-02T14:43:31.074Z',
    '2020-12-02T14:43:31.074Z',
    '2021-01-02T14:43:31.074Z',
    '2021-02-02T14:43:31.074Z',
    '2021-03-02T14:43:31.074Z',
    '2021-05-02T14:43:31.074Z',
    '2021-06-22T14:43:31.074Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-11-02T14:43:31.074Z',
    '2020-12-02T14:43:31.074Z',
    '2021-01-02T14:43:31.074Z',
    '2021-02-02T14:43:31.074Z',
    '2021-03-02T14:43:31.074Z',
    '2021-05-02T14:43:31.074Z',
    '2021-06-22T14:43:31.074Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-11-02T14:43:31.074Z',
    '2020-12-02T14:43:31.074Z',
    '2021-01-02T14:43:31.074Z',
    '2021-02-02T14:43:31.074Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:4331.074Z',
    '2020-11-02T14:4331.074Z',
    '2020-12-02T14:4331.074Z',
    '2021-01-02T14:4331.074Z',
    '2021-02-02T14:4331.074Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatTransactionDate = function (date, locale) {
  const getDaysBetween2Dates = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = getDaysBetween2Dates(new Date(), date);

  if (daysPassed === 0) return `Сегодня`;
  if (daysPassed === 1) return `Вчера`;
  if (daysPassed <= 7) return `${daysPassed} дней назад`;
  else {
    // const day = `${date.getDate()}`.padStart(2, '0');
    // const month = `${date.getMonth() + 1}`.padStart(2, '0');
    // const year = date.getFullYear();

    // return ` ${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayTransactions = function (account, sort = false) {
  containerTransactions.innerHTML = '';
  const transacs = sort
    ? account.transactions.slice().sort((x, y) => x - y)
    : account.transactions;
  transacs.forEach(function (trans, index) {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(account.transactionsDates[index]);
    const transDate = formatTransactionDate(date, account.locale);

    const formatedTrans = formatCurrency(
      trans,
      account.locale,
      account.currency
    );

    console.log(formatedTrans);
    const transactRow = ` 
   <div class="transactions__row">
          <div class="transactions__type transactions__type--${transType}">
            ${index + 1} ${transType}$
          </div>
          <div class="transactions__date">${transDate}</div>
          <div class="transactions__value">${formatedTrans}</div>
        </div>
   
   `;
    containerTransactions.insertAdjacentHTML('afterbegin', transactRow);
  });
};

displayTransactions(account1);

const creatNicknames = function (accs) {
  accs.forEach(function (acc) {
    acc.nickname = acc.userName
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

creatNicknames(accounts);
// console.log(accounts);
// const userName = 'Oliver Avila'; // nickname 'oa'

// const nickname = userName
//   .toLowerCase()
//   .split(' ')
//   .map(word => word[0])
//   .join('');

const displayBalance = function (account) {
  const balance = account.transactions.reduce((acc, item) => acc + item, 0);
  account.balance = balance;

  labelBalance.textContent = formatCurrency(
    balance,
    account.locale,
    account.currency
  );
};

displayBalance(account1);

const displayTotal = function (account) {
  const depositTotal = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = formatCurrency(
    depositTotal,
    account.locale,
    account.currency
  );

  const withdrawalsTotal = account.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = formatCurrency(
    withdrawalsTotal,
    account.locale,
    account.currency
  );

  const interestTotal = account.transactions
    .filter(trans => trans > 0)
    .map(depos => (depos * account.interest) / 100)
    .filter((interest, index, arr) => {
      return interest >= 5;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = formatCurrency(
    interestTotal,
    account.locale,
    account.currency
  );
};

displayTotal(account1);

const updateUi = function (account) {
  //Display transactions
  displayTransactions(account);
  //Display Blance
  displayBalance(account);
  //Display Total
  displayTotal(account);
};

let currentAccount, currentLogoutTimer;

//Always log in

// currentAccount = account1;
// updateUi(currentAccount);
// containerApp.style.opacity = 100;

const startLogoutTimer = function () {
  const logOutTimerCallBack = function () {
    const minute = String(Math.trunc(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    //В каждом вызове выводить оставшееся время
    labelTimer.textContent = `${minute}:${seconds}`;

    //После истечения времени остановить таймер и выйти из приложения

    if (time === 0) {
      clearInterval(logOutTimer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Войдите в свой аккаунт`;
    }
    time--;
  };
  //Установить время выхода через 5 минут
  let time = 300;

  //Вызов таймера каждую секунду
  logOutTimerCallBack();
  const logOutTimer = setInterval(logOutTimerCallBack, 1000);

  return logOutTimer;
};
//Login

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    account => account.nickname === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    //Display UI and welcome message
    containerApp.style.opacity = 100;

    labelWelcome.textContent = `Рады, что вы снова с нами ${
      currentAccount.userName.split(` `)[0]
    }!`;

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, '0');
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const year = now.getFullYear();
    // labelDate.textContent = `${day}/${month}/${year}`;
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //Clear inputs
    inputLoginUsername.value = ``;
    inputLoginPin.value = ``;
    inputLoginPin.blur();

    //Check if the time exists
    if (currentLogoutTimer) clearInterval(currentLogoutTimer);
    currentLogoutTimer = startLogoutTimer();
    updateUi(currentAccount);
  }
});

//Transfer money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(
    account => account.nickname === recipientNickname
  );
  console.log(transferAmount);
  console.log(recipientAccount);
  inputTransferTo.value = ``;
  inputTransferAmount.value = ``;
  if (
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount &&
    recipientAccount &&
    currentAccount.nickname !== recipientAccount.nickname
  ) {
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);
    //Add date

    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccount.transactionsDates.push(new Date().toISOString());

    updateUi(currentAccount);

    //Reset the timer
    clearInterval(currentLogoutTimer);
    currentLogoutTimer = startLogoutTimer();
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    +inputClosePin.value === currentAccount.pin &&
    inputCloseUsername.value === currentAccount.nickname
  ) {
    const currentAccountIndex = accounts.findIndex(
      account => account.nickname === currentAccount.nickname
    );

    accounts.splice(currentAccountIndex, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Войдите в свой аккаунт`;
  }

  inputCloseUsername.value = ``;
  inputLoginPin.value = ``;
});
//Запрос займа

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(trans => trans >= (loanAmount * 10) / 100)
  ) {
    setTimeout(function () {
      currentAccount.transactions.push(loanAmount);
      currentAccount.transactionsDates.push(new Date().toISOString());
      updateUi(currentAccount);
    }, 5000);
  }
  inputLoanAmount.value = ' ';
  //Reset the timer
  clearInterval(currentLogoutTimer);
  currentLogoutTimer = startLogoutTimer();
});

//Sort transactions

let transactioinsSorted = false;

btnSort.addEventListener('click', function () {
  displayTransactions(currentAccount, !transactioinsSorted);
  transactioinsSorted = !transactioinsSorted;
  //Reset the timer
  clearInterval(currentLogoutTimer);
  currentLogoutTimer = startLogoutTimer();
});

//Colorfull
const logoImage = document.querySelector('.logo');
logoImage.addEventListener('click', function () {
  [...document.querySelectorAll('.transactions__row')].forEach(function (
    row,
    i
  ) {
    if (i % 2 === 0) {
      row.style.backgroundColor = 'green';
    }
  });
});
