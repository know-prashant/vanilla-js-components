window.addEventListener("load", () => {
  document.querySelector("button").addEventListener("click", () => {
    startGame();
  });
});

const startGame = () => {
  const grounds = document.querySelectorAll(".ground");
  const length = grounds.length;

  const score = document.querySelector("#score > span");
  let count = 0;

  grounds.forEach((e) => {
    e.addEventListener("click", () => {
      //If ground has active class which means it has mole
      //So increase the count
      if (e.classList.contains("active")) {
        count++;
        score.innerHTML = count;
      }
    });
  });

  var interval = setInterval(() => {
    //Generate a random number
    const random = Math.floor(Math.random() * length);

    //Remove the active class from every ground
    grounds.forEach((e) => {
      e.classList.remove("active");
    });

    //Add the active class to random ground
    grounds[random].classList.add("active");
  }, 700);
};

const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
