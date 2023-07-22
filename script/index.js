"use strict";
// Checking device touch or pc.mouce
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};
const googleMap = document.querySelector('.contacts__map_frame');

if (isMobile.any()) {
    document.body.classList.add('_touch');
    googleMap.classList.add('no_filter');
} else {
    document.body.classList.add('_pc');
    googleMap.classList.remove('no_filter');
}

// Burger menu
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}

// one page navigation
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClock);
    });

    function onMenuLinkClock(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight - 10;

            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

//Language buttons
const english = document.querySelector('#english');
const italy = document.querySelector('#italy');
const enText = document.querySelectorAll('[data-language="en"]');
const itText = document.querySelectorAll('[data-language="it"]');
const subtitelCont = document.querySelector('#content__header_smooth');
const subtitelContPadding = window.getComputedStyle(subtitelCont, null).getPropertyValue('padding').replace(/[a-z]+/g, '');

itText.forEach((el) => {
    el.classList.add('hide', 'fade_out'); 
});

english.addEventListener("click", () =>{
    if(!english.classList.contains('_active')){
        english.classList.toggle('_active');
        italy.classList.toggle('_active');

        itText.forEach((el) => {
            el.classList.add('fade_out');
            setTimeout(() =>{
                el.classList.add('hide');
            }, 400);
        });

        enText.forEach((el) => {
            setTimeout(() =>{
                el.classList.add('fade_out');
                el.classList.remove('hide');
                setTimeout( () =>{
                    el.classList.remove('fade_out');
                }, 500);
            }, 450);
        });

    }
});

italy.addEventListener("click", () =>{
    if(!italy.classList.contains('_active')){
        italy.classList.toggle('_active');
        english.classList.toggle('_active');

        // subtitelCont.style.height = (subtitelCont.children[0].offsetHeight + (subtitelContPadding * 2)) + 'px';
        // console.log(subtitelCont.children[0].offsetHeight)
        // console.log(subtitelCont.style.height)


        // setTimeout(() =>{
        //     subtitelCont.style.height = (subtitelCont.children[1].offsetHeight + (subtitelContPadding * 2)) + 'px';
        //     console.log(subtitelCont.children[0].offsetHeight)
        //     console.log(subtitelCont.children[1].offsetHeight)
        // }, 800);

        enText.forEach((el) => {
            el.classList.add('fade_out');
            setTimeout(() =>{
                el.classList.add('hide');
            }, 400);
        });

        itText.forEach((el) => {
            setTimeout(() =>{
                el.classList.add('fade_out');
                el.classList.remove('hide');
                setTimeout(() =>{
                    el.classList.remove('fade_out');
                }, 500);
            }, 450);
        });
    }
});

//Product Popup + carousel
const products = document.querySelectorAll('.works__product');
products.forEach((product) => {
    product.addEventListener("click", (e) => {
        const element = e.currentTarget;

        if (element.classList.contains('_active')){
            element.classList.remove('_active');
            document.body.classList.remove('_lock');
            element.style.top = "unset";
            element.style.left = "unset";
            destroyCarouselButtons(element);
        } else {
            element.classList.add('_active');
            document.body.classList.add('_lock');
            element.style.left = 0;
            element.style.top = window.pageYOffset + "px";
            createCarouselButtons(element);
        }
    });
});

document.addEventListener('keydown', (event) => {
    const activeProductImage = document.querySelector('.works__product._active');
    if (activeProductImage){
        if(event.keyCode == 37){
            caroucelPrev(activeProductImage);
        } else if (event.keyCode == 39){
            caroucelNext(activeProductImage);
        } else if (event.keyCode == 27){
            activeProductImage.classList.remove('_active');
            document.body.classList.remove('_lock');
            activeProductImage.style.top = "unset";
            activeProductImage.style.left = "unset";
            destroyCarouselButtons(activeProductImage);
        }
    }
});

function createCarouselButtons (element) {
    const prevButton = document.createElement('BUTTON');
    const nextButton = document.createElement('BUTTON');

    prevButton.classList.add('img__button', 'imb__buton_prev', 'icon-arrow-left');
    nextButton.classList.add('img__button', 'imb__buton_next', 'icon-arrow-right');
    prevButton.setAttribute('type', 'button');
    nextButton.setAttribute('type', 'button');
    element.append(prevButton, nextButton);

    prevButton.addEventListener('click', (event) => {
        event.stopPropagation();
        caroucelPrev(element);
    });

    nextButton.addEventListener('click', (event) => {
        event.stopPropagation();
        caroucelNext(element);
    });
}

function caroucelNext (element){
    let indexOfEl = getIndex(element);
    if(indexOfEl != -1){
        let nextEleent;
        if(indexOfEl != (products.length - 1)){
            nextEleent = products[indexOfEl + 1];
        } else {
            nextEleent = products[0];
        }
        element.classList.remove('_active');
        element.style.top = "unset";
        element.style.left = "unset";
        destroyCarouselButtons(element);

        nextEleent.classList.add('_active');
        nextEleent.style.left = 0;
        nextEleent.style.top = window.pageYOffset + "px";
        createCarouselButtons(nextEleent);
    }
}

function caroucelPrev (element){
    let indexOfEl = getIndex(element);
    if(indexOfEl != -1){
        let prevElement;
        if(indexOfEl != 0){
            prevElement = products[indexOfEl - 1];
        } else {
            prevElement = products[products.length - 1];
        }
        element.classList.remove('_active');
        element.style.top = "unset";
        element.style.left = "unset";
        destroyCarouselButtons(element);

        prevElement.classList.add('_active');
        prevElement.style.left = 0;
        prevElement.style.top = window.pageYOffset + "px";
        createCarouselButtons(prevElement);
    }
}

function getIndex(el){
    for (let i = 0; i < products.length; i++) {
        if (products[i] == el) {
            return i;
        }
    }
    return -1;
}

function destroyCarouselButtons (element) {
    const buttons = element.querySelectorAll('.img__button');
    buttons.forEach((button) => {
        button.remove();
    });
}

////////////////////////////////////////////////////////////////////////
function animateProducts() {
    products.forEach((product) => {
        product.classList.add('animate');
        let random = Math.floor(Math.random() * (3 - 1 + 1) + 1);
        if (random == 1){
            product.classList.add('animate_to_left');
        } else if (random == 2) {
            product.classList.add('animate_to_right');
        } else if (random == 3){
            product.classList.add('animate_top');
        }
    });

    const animatedBoxes = document.querySelectorAll('.animate');
    console.log(animatedBoxes.length)
    function animateBoxes() {
        const triggerBottom = (window.innerHeight / 5) * 4.5;
    
        animatedBoxes.forEach((box) => {
            const boxTop = box.getBoundingClientRect().top;
            if(boxTop < triggerBottom) {
                if (box.classList.contains('animate_to_left')){
                    box.classList.add('js_slideToLeft');
                } else if (box.classList.contains('animate_to_right')){
                    box.classList.add('js_slideToRight');
                } else if (box.classList.contains('animate_top')){
                    box.classList.add('js_slideUp');
                }
            }
        });
    }
    window.addEventListener('scroll', throttle(animateBoxes, 300));
    animateBoxes();
}

function throttle(fn, wait) {
    var time = Date.now();
    return function() {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}

animateProducts();
