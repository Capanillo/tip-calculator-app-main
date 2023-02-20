const bill = document.getElementById("bill");
const tips = document.querySelectorAll(".tip");
const custom = document.getElementById("custom");
const people = document.getElementById("people-input");
const tipAmount = document.getElementById("tip-amount");
const total = document.getElementById("total");
const resetBtn = document.querySelector(".reset");
const msgError = document.getElementById("error");
const peopleDiv = document.querySelector(".people");

let billValue = 0.0; //default value
let tipValue = 0; //default value
let peopleValue = 0;

bill.addEventListener("input", setBillValue);
people.addEventListener("input", setPeopleValue);
tips.forEach((btn) => {
  btn.addEventListener("click", buttonClick);
});
custom.addEventListener("input", setCustomValue);

resetBtn.addEventListener("click", reset);
disableButton();

function validateFloat(s) {
  var rgx = /^[0-9]*\.?[0-9]*$/;
  return s.match(rgx);
}

function validateInt(s) {
  var rgx = /^[0-9]*$/;
  return s.match(rgx);
}

function setBillValue() {
  if (bill.value.includes(",")) {
    bill.value = bill.value.replace(",", ".");
  }

  if (!validateFloat(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }

  if (bill.value == "") {
    tipAmount.innerHTML = `$0.00`;
    total.innerHTML = `$0.00`;
  }

  billValue = parseFloat(bill.value);

  calculateTip();
  disableButton();
}

function buttonClick(e) {
  tips.forEach((btn) => {
    btn.classList.remove("active");
    if (e.target.innerHTML == btn.innerHTML) {
      btn.classList.add("active");
      tipValue = parseFloat(btn.innerHTML) / 100;
    }
  });

  custom.value = "";
  calculateTip();
}

function setCustomValue() {
  if (!validateInt(custom.value)) {
    custom.value = custom.value.substring(0, custom.value.length - 1);
  }

  tipValue = parseFloat(custom.value / 100);

  if (custom.value !== "") {
    calculateTip();
    disableButton();
  }
}

function setPeopleValue() {
  if (!validateInt(people.value)) {
    people.value = people.value.substring(0, people.value.length - 1);
  }

  peopleValue = parseFloat(people.value);

  if (peopleValue == 0) {
    peopleDiv.classList.add("error");
    setTimeout(() => {
      peopleDiv.classList.remove("error");
    }, 3000);
  }

  calculateTip();
  disableButton();
}

function calculateTip() {
  if (peopleValue >= 1 && bill.value != "") {
    let tipAmountValue = (billValue * tipValue) / peopleValue;
    let totalValue = (billValue * (tipValue + 1)) / peopleValue;
    tipAmount.innerHTML = `$${tipAmountValue.toFixed(2)}`;
    total.innerHTML = `$${totalValue.toFixed(2)}`;
    resetBtn.classList.remove("disabled");
  } else {
    tipAmount.innerHTML = `$0.00`;
    total.innerHTML = `$0.00`;
  }
}

function reset() {
  bill.value = "";
  people.value = "";
  peopleValue = 0;
  tips.forEach((btn) => {
    btn.classList.remove("active");
  });
  tipValue = 0;
  custom.value = "";
  tipAmount.innerHTML = `$0.00`;
  total.innerHTML = `$0.00`;
  resetBtn.classList.add("disabled");
}

function disableButton() {
  if (bill.value == "" && people.value == "" && custom.value == "") {
    resetBtn.classList.add("disabled");
  } else {
    resetBtn.classList.remove("disabled");
  }
}
