const categories = document.querySelector(".all-prod__filter-list");
const filterItem = document.querySelectorAll(".filter-item");
const cardBlock = document.querySelector(".products__card-block");

const renderCards = (array) => {
  // const cardBlock = document.querySelector(".products__card-block");
  cardBlock.innerHTML = "";

  array.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <a href="#" class="card__link"></a>
    <div class="card-title-wrapper">
      <div class="card__title">${item.title}</div>
      <div class="card__label card__label_${item.category}">${item.category}</div>
    </div>
    <div>
    <span class="weight">${item.weight} грамм</span>
   
    <div class="card-main-wrapper">
      <div class="card__image"><img src="img/${item.image}" alt="card image"></div>
      <div class="card-descrip-wrapper">
        <span class="card__descrip">${item.subtitle}</span>
        <svg class="product-arrow" width="21" height="16">
          <use xlink:href="img/icons.svg#product-arrow"></use>
        </svg>
        <span class="card__price price">${item.price}₽</span>
      </div>
    </div>
    </div>
    `;

    cardBlock.append(card);
  });
};

const getData = (attribute) => {
  fetch("db/db.json")
    .then((res) => res.json())
    .then((data) => {
      const array = attribute ? data.filter((item) => item.category === attribute) : data;
      if (array.length > 0) {
        renderCards(array);
      } else {
        cardBlock.innerHTML = "";
      }
    });
};
//fetch("db/db.json").then((res) => console.log(res)) - получаем Response
//fetch("db/db.json").then((res) => console.log(res)) - получаем Promise

categories.addEventListener("click", (e) => {
  if (e.target.closest(".filter-item")) {
    filterItem.forEach((item) => {
      if (e.target.dataset.field === item.dataset.field) {
        if (item.classList.contains("filter-item_active")) {
          item.classList.remove("filter-item_active");
          //отрисовать все карточки
          getData();
        } else {
          item.classList.add("filter-item_active");
          const filterAttribute = item.dataset.field; //значение data-field
          getData(filterAttribute);
        }
      } else {
        item.classList.remove("filter-item_active");
      }
    });
  }
});

getData();

// sorting by price
const priceSortAsc = document.querySelector("#price-asc");
const priceSortDesc = document.querySelector("#price-desc");

priceSortAsc.addEventListener("click", () => {
  const cards = document.querySelectorAll(".card");
  const sorted = [...cards].sort((a, b) => {
    const priceA = a.querySelector(".card__price");
    const priceB = b.querySelector(".card__price");
    return parseFloat(priceA.innerHTML) - parseFloat(priceB.innerHTML);
  });
  cardBlock.innerHTML = "";
  sorted.forEach((elem) => {
    cardBlock.append(elem);
  });
});

priceSortDesc.addEventListener("click", () => {
  const cards = document.querySelectorAll(".card");
  const sorted = [...cards].sort((a, b) => {
    const priceA = a.querySelector(".card__price");
    const priceB = b.querySelector(".card__price");
    return parseFloat(priceB.innerHTML) - parseFloat(priceA.innerHTML);
  });
  cardBlock.innerHTML = "";
  sorted.forEach((elem) => {
    cardBlock.append(elem);
  });
});
