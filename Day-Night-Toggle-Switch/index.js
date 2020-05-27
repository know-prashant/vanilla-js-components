const switchBox = document.querySelector(".sun-moon");

document.querySelector("input").addEventListener("change", (e) => {
  const { checked } = e.target;
  if (checked) {
    switchBox.classList.add("move");
  } else {
    switchBox.classList.remove("move");
  }
});
