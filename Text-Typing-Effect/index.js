//Type button
const btn = document.querySelector("#start-typing-btn");

//Type area
const typeArea = document.querySelector("#text-type");

btn.addEventListener("click", () => {
  // Text value
  const str = document.querySelector("#text").value;
  // Speed value
  let speed = document.querySelector("#type-speed").value;

  // Set the default speed to 250
  speed = speed ? Number(speed) : 250;

  // Empty the type area before starting to type again
  typeArea.innerHTML = "";

  // Start typing;
  type(str, speed);
});

const type = (str, speed) => {
  if (str === "") {
    //If we have typed everything then stop typing
    //By stopping the timer
    clearTimeout(interval);
  } else {
    //Keep typing each character
    var interval = setTimeout(() => {
      //Add the next character to the type area
      typeArea.innerHTML += str.substr(0, 1);

      //Call the function recursively
      //With the remaining text to be typed
      type(str.substr(1, str.length), speed);

    }, 1000 - speed);
  }
};
