// Adds comma every 3 digits
const formatWithCommas = (number) => {
  return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};

// Solves issue when adding decimal numbers like 0.67 + 0.03
const formatNumber = (number) => {
  return Number((Math.round(number * 100) / 100).toFixed(2));
};

// Add
const add = (n1, n2) => {
  return formatNumber(n1 + n2);
};

// Subtract
const subtract = (n1, n2) => {
  return formatNumber(n1 - n2);
};

// Multiply
const multiply = (n1, n2) => {
  return formatNumber(n1 * n2);
};

// Divide
const divide = (n1, n2) => {
  // If user divided by zero
  if (n2 === 0) {
    // Clear small display
    smallDisplayEl.textContent = "";

    // Block calculator
    blockCalculator();

    // Return message to be displayed on bigDisplay
    return "∞";
  }

  return formatNumber(n1 / n2);
};

// Call a particular function depending on the operation
const operate = (n1, n2, operation) => {
  switch (operation) {
    case "+":
      return add(n1, n2);
    case "-":
      return subtract(n1, n2);
    case "x":
      return multiply(n1, n2);
    case "÷":
      return divide(n1, n2);
  }
};

// Reset everything
const clear = () => {
  bigDisplay = "";
  number1 = undefined;
  operator = "";
  result = false;

  bigDisplayEl.textContent = "0";

  smallDisplayEl.textContent = "";

  // If calculator is blocked
  if (blocked) {
    [...padKeyEls].forEach((key) => {
      key.style.removeProperty("pointer-events");
      key.style.removeProperty("opacity");
    });

    blocked = false;
  }
};

// Set bigDisplay
const setBigDisplay = (number) => {
  // Convert number to string
  let stringNumber = number.toString();

  // If the number is a decimal number, we only need to format the integer part
  if (stringNumber.includes(".")) {
    // Split stringNumber into its integer and decimal parts
    const numberArray = stringNumber.split(".");

    // Format the integer part
    numberArray[0] = formatWithCommas(numberArray[0]);

    // Join formatted array
    stringNumber = numberArray.join(".");

    // Update bigDisplay
    bigDisplayEl.textContent = stringNumber;
  } else {
    // Number is an integer, so we just update bigDisplay
    bigDisplayEl.textContent = formatWithCommas(stringNumber);
  }
};

// Sets the text for the small display
const setSmallDisplay = () => {
  smallDisplayEl.textContent =
    number2 !== undefined
      ? `${number1} ${operator} ${number2} =`
      : `${number1} ${operator}`;
};

// Blocks calculator when a number is divided by zero
const blockCalculator = () => {
  // Get every padKey except for AC
  const filteredKeys = [...padKeyEls].filter(
    (padKey) => padKey.textContent !== "AC"
  );

  // Block every key, except AC
  filteredKeys.forEach((key) => {
    key.style.pointerEvents = "none";
    key.style.opacity = "0.85";
  });

  blocked = true;
};
