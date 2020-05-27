const Front = document.querySelector(".front");
const Close = document.querySelector(".close-btn > span");
const Profile = document.querySelector(".profile");

//Add open class
Front.addEventListener("click", () => {
  profile.classList.add("open");
});

//Remove the class
Close.addEventListener("click", () => {
  profile.classList.remove("open");
});
