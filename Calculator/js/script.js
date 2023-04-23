// Get reference to elements
const padKeyEls = document.querySelectorAll(".pad__key");
const smallDisplayEl = document.querySelector(".display__operation");
const bigDisplayEl = document.querySelector(".display__result");

// Variables
let bigDisplay = "";
let number1;
let number2;
let operator = "";
let result = false;
let blocked = false;

// Set bigDisplay initial text value to zero
bigDisplayEl.textContent = "0";

// Use the fitty library to prevent overflowing
fitty(bigDisplayEl, { maxSize: 50 });
fitty(smallDisplayEl, { maxSize: 25, minSize: 11 });

// Detect when a button is pressed
padKeyEls.forEach((padKey) => {
  padKey.addEventListener("click", () => {
    const key = padKey.textContent;

    // A number was clicked
    if (!isNaN(key)) {
      if (result) {
        clear();
      }

      // Update big display
      if (bigDisplay.split("").length < 16) {
        // Prevent numbers like 05
        if (bigDisplay === "0") {
          bigDisplay = "";
        }

        // Update bigDisplay
        bigDisplay += key;

        // Update big display text
        setBigDisplay(bigDisplay);
      }
    }

    // A dot was clicked
    else if (key === ".") {
      // If a result was previously calculated, we start from scratch
      if (result) {
        clear();
      }

      if (!bigDisplay.includes(".")) {
        bigDisplay ? (bigDisplay += ".") : (bigDisplay += "0.");
      }

      setBigDisplay(bigDisplay);
    }

    // An operator was clicked
    else if (key === "+" || key === "-" || key === "x" || key === "÷") {
      // Set result to false if an operator is clicked after a result was calculated
      if (result) {
        result = false;
      }

      if (!operator) {
        // Store first number
        number1 = Number(bigDisplay);
      } else {
        if (bigDisplay) {
          // Store second number
          number2 = Number(bigDisplay);

          // Update number1 to the result of the operation
          number1 = operate(number1, number2, operator);

          // Clear number2
          number2 = undefined;
        }
      }

      // Update bigDisplay text contet
      setBigDisplay(number1);

      // Store operator
      operator = key;

      // Update small display text content
      if (!blocked) {
        setSmallDisplay();
      }

      // Clear bigDisplay
      bigDisplay = "";
    }

    // Percent was clicked
    else if (key === "%") {
      if (!number1) {
        bigDisplay = (bigDisplay / 100).toString();

        setBigDisplay(bigDisplay);
      }
    }

    // DEL was pressed
    else if (key === "DEL") {
      if (bigDisplay) {
        // Convert bigDisplay to array
        bigDisplayArr = bigDisplay.split("");

        // Delete last digit
        bigDisplayArr.pop();

        // Convert array to string and update bigDisplay
        bigDisplay = bigDisplayArr.join("");

        bigDisplayArr.length > 0
          ? setBigDisplay(bigDisplay)
          : setBigDisplay("0");
      }
    }

    // AC was pressed
    else if (key === "AC") {
      clear();
    }

    // Equals was pressed
    else {
      if (number1 !== undefined && bigDisplay !== "" && !result) {
        // Store number2
        number2 = Number(bigDisplay);

        // Update smallDisplay text content
        setSmallDisplay();

        // Operate and update bigDisplay
        number1 = operate(number1, number2, operator);
        setBigDisplay(number1);

        // Reset number2
        number2 = undefined;

        // Set result to true
        result = true;

        // Clear bigDisplay
        bigDisplay = "";
      }
    }
  });
});
