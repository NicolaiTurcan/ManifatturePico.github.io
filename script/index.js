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

if (isMobile.any()) {
    document.body.classList.add('_touch');
} else {
    document.body.classList.add('_pc');
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


//Product Popup
const products = document.querySelectorAll('.works__product');
products.forEach((product) => {
    product.addEventListener("click", (e) => {
        const element = e.currentTarget;

        if (element.classList.contains('_active')){
            element.classList.toggle('_active');
            document.body.classList.toggle('_lock');
            element.style.top = "unset";
            element.style.left = "unset";
        } else {
            element.classList.toggle('_active');
            document.body.classList.toggle('_lock');
            element.style.left = 0;
            element.style.top = window.pageYOffset + "px";
        }
        
    });
});
