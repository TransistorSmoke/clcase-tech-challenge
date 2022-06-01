// Disable input of non-numeric character, makes it easier to control the numeric input for income
const inputIncomeField = document.querySelector('.input-income');

inputIncomeField.addEventListener('keydown', (event) => {
  const allowedKeys = [ "Backspace", "Enter", "ArrowRight", "ArrowLeft", ".", "Delete", "Meta", "v", "Tab" ];
  const patternNumbers = /^\d+$/;

  if (
    (!patternNumbers.test(event.key) &&
      allowedKeys.indexOf(event.key) === -1) ||
    ((event.key === "0" || event.key === ".") &&
      (event.target.value.length === 0 ||
        event.target.selectionStart === 0))
  ) {
    event.preventDefault();
  }
});


// Set the handler for the submit, to process the calculation of tax and superannuation
const onSubmitHandler = (event) => {
  event.preventDefault();
  const inputValue = document.querySelector('.input-income')?.value;
  const calculatedData = calculateTaxAndSuper(inputValue);
  const elTax = document.querySelector('.calculated-tax');
  const elSuper = document.querySelector('.calculated-super');

  elTax.textContent = `$${calculatedData.tax.toFixed(2)}`;
  elSuper.textContent = `$${calculatedData.superannuation.toFixed(2)}`;
}


// Method to calculate the tax and superannuation
const calculateTaxAndSuper = (income) => {
  const calculations = {
    tax: 0,
    superannuation: income ? (income * 0.1) : 0
  }

  if (income < 18200) {
    calculations.tax = 0;
  } else if (income > 18200 && income <= 37000) {
    calculations.tax = (income - 18200) * 0.19;
  } else if (income > 37000 && income <= 90000) {
    calculations.tax = 3572 + ((income - 37000) * 0.325);
  } else if (income > 90000 && income <= 180000) {
    calculations.tax = 20797 + ((income - 90000) * 0.37);
  } else if (income > 180000) {
    calculations.tax = 54097 + ((income - 180000) * 0.45);
  }

  return calculations;
}



