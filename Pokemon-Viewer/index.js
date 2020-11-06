const pokeContainer = document.getElementById("pokemon-container");

const pageConfig = {
  start: 0,
  limit: 28,
};

const emptyContainer = () => {
  pokeContainer.innerHTML = "";
};

const startLoading = () => {
  emptyContainer();
  pokeContainer.innerHTML = `<h3>Loading....</h3>`;
};

const stopLoading = () => {
  emptyContainer();
};

const throwError = ({ message }) => {
  emptyContainer();
  pokeContainer.innerHTML = `<p>${message}</p>`;
};

const fetchURL = async (url) => {
  startLoading();
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (e) {
    throwError(e);
  } finally {
    stopLoading();
  }
};

const getPokemonList = async (start, limit) => {
  const list = await fetchURL(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${start}`
  );

  const details = [];
  const { results } = list;
  for (let i = 0; i < results.length; i++) {
    const x = await fetchURL(results[i].url);
    details.push(x);
  }

  return details;
};

const generateList = async () => {
  const { start, limit } = pageConfig;
  const pokemonListWithStats = await getPokemonList(start, limit);

  const mappedList = pokemonListWithStats.reduce((a, b) => {
    const { id, name, types, abilities } = b;

    const str = `<div class="list">
        <div>
            <img src="${`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}" alt="${name}"/>
            <div>
                <p>Id: ${id}</p>
                <p>Name: ${name}</p>
                <p>Types: ${types.reduce((a, b) => {
                  const { type } = b;
                  const { name } = type;
                  return `${a} ${name}`;
                }, "")}</p>
                <p>Abilities: ${abilities.reduce((a, b) => {
                  const { ability } = b;
                  const { name } = ability;
                  return `${a} ${name}`;
                }, "")}</p>
            </div>
        </div>
      </div>`;
    return `${a} ${str}`;
  }, "");

  //   Pagination
  const pagination = document.createElement("div");
  pagination.classList.add("pagination");
  const nextButton = document.createElement("button");
  nextButton.innerHTML = "Next";
  nextButton.addEventListener("click", () => {
    navigate("next");
  });

  const prevButton = document.createElement("button");
  prevButton.innerHTML = "Prev";
  prevButton.addEventListener("click", () => {
    navigate("prev");
  });
  pagination.appendChild(prevButton);
  pagination.appendChild(nextButton);

  pokeContainer.innerHTML = mappedList;
  pokeContainer.appendChild(pagination);
};

const navigate = (type) => {
  let { start, limit } = pageConfig;
  if (type === "next") {
    start = start + limit;
    pageConfig.start = start;
    generateList();
  } else {
    start = start - limit;
    pageConfig.start = start < 0 ? 0 : start;
    generateList();
  }
};

generateList();
