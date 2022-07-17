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

  function init() {
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
  const buttonUp = document.querySelector('[data-name="button-top"]')

  secFood.addEventListener('click', addToCard);

  function addToCard (event) {
    if(event.target.closest('.food-item__btn')) {
        let Item = event.target.closest('.item');
        let counterItem = Item.querySelector('.food-item__label');
        
        counterItem.classList.add('_active')
        
    }
  }

  hum.addEventListener('click', openMenu);
  // buttonUp.addEventListener('click', scrollToUp)

  function openMenu () {
    const menuHeader = document.querySelector('.menu-header__wrapper');
    const bodyLock = document.querySelector('body')

    menuHeader.classList.toggle('active')
    bodyLock.classList.toggle('lock') 
  }

 

  