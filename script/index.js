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

english.addEventListener("click", () =>{
    if(english.classList.contains('_active')){
        return;
    } else {
        english.classList.toggle('_active');
        italy.classList.toggle('_active');
    }
});

italy.addEventListener("click", () =>{
    if(italy.classList.contains('_active')){
        return;
    } else {
        italy.classList.toggle('_active');
        english.classList.toggle('_active');
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
