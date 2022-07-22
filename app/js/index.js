$(".owl-carousel").owlCarousel({
  stagePadding: 50,
  items: 4,
  margin: 15,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      stagePadding: 20,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 4,
    },
  },
});

ymaps.ready(init);

async function init() {
  var myMap = new ymaps.Map(
    "map",
    {
      center: [55.760824, 37.230857],
      zoom: 16,
      controls: [],
    },

    {
      searchControlProvider: "yandex#search",
    }
  );

  myMap.behaviors.disable(["drag", "rightMouseButtonMagnifier", "scrollZoom"]);

  (MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
  )),
    (myPlacemark = new ymaps.Placemark(
      myMap.getCenter(),
      {
        hintContent: "Собственный значок метки",
        balloonContent: "Это красивая метка",
      },
      {
        iconLayout: "default#image",
        iconImageHref: "images/icons/map2.svg",
        iconImageSize: [80, 80],
        iconImageOffset: [100, 48],
      }
    )),
    myMap.geoObjects.add(myPlacemark);
}
// ------------------------------------- mine scripts ---------------------------- //

const menuHum = document.querySelector(".menu-header__icon");
const productItem = document.querySelectorAll(".item");
let productArr = [];

// Добавляем рандомный Id к каждому продукту
const randomId = () => {
  return (
    Math.random().toString.toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
// Генерируем рандомный ID для всех товаров
productItem.forEach((item) => {
  item.setAttribute("id", randomId());
});

// listener
document.querySelector("body").addEventListener("click", (e) => {
  let target = e.target;
  if (target.closest(".food-item__btn")) {
    // Функция добавления в корзину
    addToCard(target);
  }
  if (target.closest('[data-name="plus-btn"]')) {
    // Увелечение счетчика
    plusCounter(target);
  }
  if (target.closest('[data-name="minus-btn"]')) {
    // Уменьшение счетчика
    minusCounter(target);
  }
  if (target.closest(".cart__items")) {
    // Роутинг на страницу корзины если товаров больше 1
    rout();
  }
  if (target.closest('[data-name="modal-basket-close"]')) {
    // Закрытие модалки
    closeModalBasket(target);
  }
});


// listener
menuHum.addEventListener("click", openMenu);
// --------------------------------------------------

if(localStorage.getItem('product')) {
  productArr = JSON.parse(localStorage.getItem('product'))
}
showCounterBasket()


function addToCard ( target ) {
  let item = target.closest(".item");
  let counterItem = item.querySelector(".food-item__label");
  counterItem.classList.add("_active");

  addCounterTemplate(item);

  let itemId = item.id;
  let itemAmount = item.querySelector('.food-item__counter').textContent;
  let itemTitle = item.querySelector(".content-food__title").innerText;
  let itemDesc = item.querySelector(".content-food__desc").innerText;
  let itemPrice = item.querySelector(".food-item__price").textContent;

  const productData = {
    id: itemId,
    amount: itemAmount,
    Title: itemTitle,
    description: itemDesc,
    price: itemPrice,
  }

  productArr.push(productData);
  


  showCounterBasket();
  saveProduct();
  
 
}

function addCounterTemplate(item) {
  let itemPrice = item.querySelector(".food-item__price").innerText;
  let itemWrapper = item.querySelector(".food-item__body");
  const itemBottom = item.querySelector(".food-item__bottom");
  const counterTemplate = ` 

     <div class="food-item__counter counter">
     <button class="counter__btn" data-name="minus-btn"><img src="./images/icons/minus.svg" alt=""></button>
     <div class="counter__num" data-name="counter">${itemPrice}</div>
     <button class="counter__btn" data-name="plus-btn"><img src="./images/icons/plus.svg" alt=""></button>
   </div>

    `;
  itemBottom.classList.add("hidden-a");
  itemWrapper.insertAdjacentHTML("beforeend", counterTemplate);
}

function plusCounter(target) {
  let item = target.closest(".item");
  let itemCounter = item.querySelector(".food-item__label");
  let itemCounterNum = itemCounter.querySelector(".food-item__counter");

  const idItem = item.id;
  const index = productArr.findIndex(function(item) {
    if(item.id === idItem) {
      item.amount++;
    }
  })

  itemCounterNum.innerText++;
  saveProduct();
}

function minusCounter(target) {
  let item = target.closest(".item");
  let itemCounter = item.querySelector(".food-item__label");
  let itemCounterNum = itemCounter.querySelector(".food-item__counter");
  let itemAmount = item.querySelector(".counter");
  let itemBottom = item.querySelector(".food-item__bottom");

  const idItem = item.id;
  const index = productArr.findIndex(function(item) {
    if(item.id === idItem) {
      item.amount--;
    }
  })

 

  if (itemCounterNum.innerText <= 1) {
    itemCounter.classList.remove("_active");
    itemAmount.remove();
    itemBottom.classList.remove("hidden-a");
    productArr.splice(index, 1)
  } else {
    itemCounterNum.innerText--;
  }

  if(productArr.length < 1) {
    dropCounterBasket ();
  } 
  saveProduct();
}

function openMenu() {
  const menuHeader = document.querySelector(".menu-header__wrapper");
  const bodyLock = document.querySelector("body");

  menuHeader.classList.toggle("active");
  bodyLock.classList.toggle("lock");
}

function rout() {
  if (productArr.length === 0) {
    openmodalBasket();
  }
  if (productArr.length >= 1) {
    window.location.href = "basket.html";
  }
}

function openmodalBasket() {
  const modalBasket = document.querySelector(".modal-basket");
  const bodyPage = document.querySelector("body");
  modalBasket.classList.add("modal-basket-active");
  bodyPage.classList.add("overlay");
}

function closeModalBasket(event) {
  const modalBasket = event.closest(".modal-basket");
  const bodyPage = document.querySelector("body");
  modalBasket.classList.remove("modal-basket-active");
  bodyPage.classList.remove("overlay");
}

function showCounterBasket() {
  if(productArr.length >= 1) {
  const basketCounter = document.querySelector('.cart__counter');
  const basketIcon = document.querySelector('.cart__icon');
  basketCounter.classList.remove('hidden');
  basketIcon.classList.add('hidden')
  } 
}

function dropCounterBasket() {
  const basketCounter = document.querySelector('.cart__counter');
  const basketIcon = document.querySelector('.cart__icon');
  basketCounter.classList.add('hidden');
  basketIcon.classList.remove('hidden')
}

function saveProduct () {
  localStorage.setItem('product', JSON.stringify(productArr));
}