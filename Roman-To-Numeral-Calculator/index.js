const heading = document.querySelector("h1");
const romanToNumeral = document.querySelector("input[type='checkbox']");
const conversionInput = document.querySelector("input[type='text']");
const outputArea = document.querySelector(".output");
const convertButton = document.querySelector(".btn");

romanToNumeral.addEventListener("change", (e) => {
  const { checked } = e.target;
  if (checked) {
    heading.innerHTML = "Convert Integer To Roman";
  } else {
    heading.innerHTML = "Convert Roman To Integer";
  }
});

//Call the appropriate conversion function
const calc = () => {
  const { checked } = romanToNumeral;

  if (checked) {
    convertIntegerToRoman();
  } else {
    convertRomanToInteger();
  }
};

//Calculate on convert button click
convertButton.addEventListener("click", () => {
  calc();
});

//Calculate when enter is pressed.
window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    calc();
  }
});

//Converts roman numeral to integer
const convertRomanToInteger = () => {
  //Regex to validate roman numberal
  const romanNumeralRegex = new RegExp(
    /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/
  );

  let { value: roman } = conversionInput;
  roman = roman.toUpperCase();
  const regexResult = romanNumeralRegex.test(roman);

  if (!regexResult) {
    alert("Please enter a valid roman numeral");
    return false;
  }

  //sequence of roman letters
  let arr = ["I", "V", "X", "L", "C", "D", "M"];

  //value of the respective roman letters
  let values = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let sum = 0;

  //keep track of the previous index
  let prevIndex = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    //if the current letter is having greater index than previous letter then add values
    if (arr.indexOf(roman[i]) >= prevIndex) {
      sum = sum + values[roman[i]];
    } else {
      //if the current letter is having lesser index than previous letter then sub values
      sum = sum - values[roman[i]];
    }

    //store the index of the previous roman letters
    prevIndex = arr.indexOf(roman[i]);
  }

  //Add the result to the output area
  outputArea.innerHTML = sum;
};

//Converts integer to roman numeral
const convertIntegerToRoman = () => {
  //Regex to validate if there are only numbers
  const numberRegex = new RegExp(/^\d+$/);

  let { value: num } = conversionInput;
  const regexResult = numberRegex.test(num);

  if (!regexResult) {
    alert("Please enter a valid integer");
    return false;
  }

  if (Number(num) > 4999) {
    alert("Out of range. Please enter a integer less than 5000.");
    return false;
  }

  //Mapping
  const mapping = {
    1: "I",
    5: "V",
    10: "X",
    50: "L",
    100: "C",
    500: "D",
    1000: "M",
  };

  let count = 1;
  let str = "";
  while (num > 0) {
    let last = parseInt(num % 10);
    last *= count;
    if (last < 10) {
      str += lessThan9(last, mapping);
    } else {
      str = greaterThan9(last, mapping) + str;
    }

    count *= 10;
    num = parseInt(num / 10);
  }
  outputArea.innerHTML = str;
};

//If the integer is less than one
//Generte the roman numeral
const lessThan9 = (num, obj) => {
  if (num === 9) {
    return obj[1] + obj[10];
  } else if (num >= 5 && num < 9) {
    return obj[5] + obj[1].repeat(num % 5);
  } else if (num === 4) {
    return obj[1] + obj[5];
  } else {
    return obj[1].repeat(num);
  }
};

//If integer is greater than 9
//Generate the roman numeral
const greaterThan9 = (num, obj) => {
  if (num >= 10 && num < 50) {
    if (num === 10) {
      return obj[10];
    }

    if (num === 40) {
      return obj[10] + obj[50];
    } else {
      return obj[10].repeat(parseInt(num / 10));
    }
  } else if (num >= 50 && num < 100) {
    if (num === 50) {
      return obj[50];
    }

    if (num === 90) {
      return obj[10] + obj[100];
    } else {
      return obj[50] + obj[10].repeat(parseInt((num - 50) / 10));
    }
  } else if (num >= 100 && num < 500) {
    if (num === 100) {
      return obj[100];
    }

    if (num === 400) {
      return obj[100] + obj[500];
    } else {
      return obj[100].repeat(parseInt(num / 100));
    }
  } else if (num >= 500 && num < 1000) {
    if (num === 500) {
      return obj[500];
    }

    if (num === 900) {
      return obj[100] + obj[1000];
    } else {
      return obj[500] + obj[100].repeat(parseInt(num - 500) / 100);
    }
  } else if (num >= 1000 && num < 5000) {
    if (num === 1000) {
      return obj[1000];
    }

    return obj[1000].repeat(parseInt(num / 1000));
  }
};
