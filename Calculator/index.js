//Where inputs are displayed
const calcArea = document.querySelector("textarea");

//operators
const oprList = ["+", "-", "*", "/", "%", "."];

//Add input
const addNums = text => {
  let { value } = calcArea;

  //Rules to add .
  const ruleA = value.length === 0 && text === ".";
  //Add  only if both rules apply
  if (!ruleA) {
    calcArea.value += text;
  }
};

//Add operators
const addOpr = text => {
  const { value } = calcArea;
  const lastCharacter = value[value.length - 1];

  //Don't add repeated operators and initially without numbers
  if (lastCharacter !== text) {
    if (value.length > 0) {
      calcArea.value += text;
    }
  }

  //If last character is operator then replace it with new operator
  if (oprList.includes(lastCharacter)) {
    calcArea.value = value.substr(0, value.length - 1) + text;
  }
};

//Delete inputs on backspace
const delNums = () => {
  const { value } = calcArea;
  if (value.length > 0) {
    calcArea.value = value.substr(0, value.length - 1);
  }
};

//Clear whole area
const clear = () => {
  calcArea.value = "";
};

//Perform calculation
const calc = () => {
  const { value } = calcArea;
  const result = eval(value);

  if (!isNaN(result)) {
    calcArea.value = result;
  } else {
    alert("Wrong expression, Please check your input");
  }
};

//Add event listeners to the button
document.querySelectorAll(".button-group > span").forEach(e => {
  e.addEventListener("click", f => {
    const { classList, innerText } = f.target;

    if (classList.contains("num")) {
      //Number buttons clicked including .
      addNums(innerText);
    } else if (classList.contains("opr")) {
      //Opertor buttons clicked
      addOpr(innerText);
    } else if (classList.contains("calc")) {
      //Equal button clicked
      calc();
    } else if (classList.contains("delete")) {
      //Backspace button clicked
      delNums();
    } else if (classList.contains("clear")) {
      //Clear button clicked
      clear();
    }
  });
});

//Add key events
document.addEventListener("keydown", e => {
  switch (e.key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
    case ".":
      addNums(e.key);
      break;
    case "/":
    case "*":
    case "+":
    case "-":
    case "%":
      addOpr(e.key);
      break;
    case "Enter":
      calc();
      break;
    case "Backspace":
      delNums();
    case "c":
      clear();
    default:
  }
});
