  $('.owl-carousel').owlCarousel({
    stagePadding: 50,
    items: 4,
    margin: 15,
    responsiveClass: true,
    responsive:{
      0:{
          items:1,
          stagePadding: 20,
      },
      600:{
          items:2,
      },
      1000:{
          items:4,
          
      }
  }
});


  
  ymaps.ready(init);

  async function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.760824, 37.230857],
      zoom: 16,
      controls: []
    },
    

    {
      searchControlProvider: 'yandex#search'
  });


    myMap.behaviors
        .disable(['drag', 'rightMouseButtonMagnifier', 'scrollZoom'])


       

        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),
        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: 'Собственный значок метки',
                balloonContent: 'Это красивая метка'
        }, {
          iconLayout: 'default#image',
          iconImageHref: 'images/icons/map2.svg',
          iconImageSize: [80, 80],
          iconImageOffset: [100, 48]
        }
    ),



        
        myMap.geoObjects
        .add(myPlacemark)

  }
// ------------------------------------- mine scripts ---------------------------- // 

  const secFood = document.querySelector('.food')
  const hum = document.querySelector('.menu-header__icon');

  // listener 
  document.querySelector('body').addEventListener('click', (e) => {
    let target = e.target;
    if(target.closest('.food-item__btn')) {
        addToCard(target)
    }
  })
  // listener 
  hum.addEventListener('click', openMenu);

// --------------------------------------------------

  function addToCard (target) {
     let item = target.closest('.item');
     let counterItem = item.querySelector('.food-item__label')
         counterItem.classList.add('_active'); 
     let itemPrice = item.querySelector('.food-item__price').innerText;
     let itemWrapper = item.querySelector('.food-item__body');
     const itemBottom = item.querySelector('.food-item__bottom')  
     const counterTemplate = ` 

      <div class="food-item__counter counter">
      <button class="counter__btn" data-name="minus-btn"><img src="./images/icons/minus.svg" alt=""></button>
      <div class="counter__num" data-name="counter">${itemPrice}</div>
      <button class="counter__btn"data-name="plus-btn"><img src="./images/icons/plus.svg" alt=""></button>
    </div>

     `;
     itemBottom.classList.add('hidden-a') 
     itemWrapper.insertAdjacentHTML('beforeend', counterTemplate);

  }

  function openMenu () {
    const menuHeader = document.querySelector('.menu-header__wrapper');
    const bodyLock = document.querySelector('body')

    menuHeader.classList.toggle('active')
    bodyLock.classList.toggle('lock') 
  }

 

  