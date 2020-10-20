//Prefetch all the elements required
const todoInput = document.querySelector("#todo");
const addBtn = document.querySelector(".btn");
const todoList = document.querySelector(".todo-list");

//Store list
let list = [];

//Interface for item
const listInterface = (value) => ({
  text: value,
  completed: false,
});

//Function to remove the item
const removeTodo = (index) => {
  list = list.filter((e, i) => i !== index);
  generateList();
};

//Function to toggle item status
const markCompleted = (index, status) => {
  list = list.map((e, i) => {
    //Change status of the item with index provided
    if (i === index) {
      e.completed = status;
    }
    return e;
  });
  generateList();
};

//Function to generate the list
const generateList = () => {
  todoList.innerHTML = "";

  const mappedList = list.reduce((a, b, i) => {
    const { text, completed } = b;

    //Add each list
    a = `${a} <div data-index="${i}">
          ${text}
          <span class="remove" onclick="removeTodo(${i})">X</span>
          <span class="${
            completed ? "completed" : "pending"
          }" onclick="markCompleted(${i}, ${!completed})">${
      completed ? "unmark" : "mark"
    }</span>
      </div>`;

    //return
    return a;
  }, "");

  todoList.innerHTML = mappedList;
};

//Function to add new item to the list
const addItem = () => {
  const { value } = todoInput;
  if (value === "") {
    return false;
  }

  list.push(listInterface(value)); // push the new item in list
  todoInput.value = ""; // clear the input area
  generateList(); //generate the list
};

//add item on button click
addBtn.addEventListener("click", () => {
  addItem();
});

//add input on enter press
todoInput.addEventListener("keydown", (e) => {
  const { code } = e;
  if (code === "Enter") {
    e.preventDefault();
    addItem();
  }
});
