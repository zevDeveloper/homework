"use strict";
function createAccount() {
  return {
    balance: 0,
    performTransaction: function (amnt) {
      this.balance += amnt;
    },
  };
}

const instance1 = createAccount();
instance1.performTransaction(12);
const instance2 = createAccount();
instance2.performTransaction(100);
console.log(instance1.balance);
console.log(instance2.balance);

/////

function performTransaction2(amnt) {
  this.balance += amnt;
}
performTransaction2.call(instance1, 20);
console.log(instance1.balance);
performTransaction2.apply(instance2, [100]);
console.log(instance2.balance);

//////

const depositFiftyInSavings = performTransaction2.bind(instance2, 50);
depositFiftyInSavings();
console.log(instance2.balance);
