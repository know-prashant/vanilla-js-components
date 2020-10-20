const listArea = document.querySelector("#list-area");
const searchBox = document.querySelector(".searchBox");

const getMoviesTitlesList = async (query) => {
  showMessage("loading");
  try {
    const response = await fetch(
      `https://imdb8.p.rapidapi.com/title/auto-complete?q=${query}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
          "x-rapidapi-key":
            "1ea0728d75msh4481c9246eff589p1e591djsnef03398ab0f0",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (e) {
    showMessage(e);
  }
};

const clearList = () => {
  listArea.innerHTML = "";
};

const showMessage = (msg) => {
  clearList();
  const elm = document.createElement("p");
  elm.className = "errorMessage";
  elm.innerText = msg;
  listArea.append(elm);
};

const generateList = (list) => {
  const mapped = list.map(
    (e) => `<div class="lists">
     ${e.i ? `<img src="${e.i.imageUrl}" alt="${e.l}" />` : ""}
     <p>${e.l}</p>
  </div>`
  );
  clearList();
  listArea.innerHTML = mapped.join("");
};

const search = async () => {
  const { value } = searchBox;
  const { d } = await getMoviesTitlesList(value);
  generateList(d);
};

const searchOnEnter = (e) => {
  const { key } = e;
  if (key === "Enter") {
    e.preventDefault();
    search();
  }
};
