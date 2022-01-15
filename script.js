'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

const randomInt = function (min = 0, max = 255) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const randomColor = function () {
    return `rgb(${randomInt()},${randomInt()},${randomInt()}) `
}


// document.querySelector('.nav__link').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor()
//   console.log('link target',e.target)
//   console.log('link currentTarget',e.currentTarget)
//   // e.stopPropagation()
// })
// document.querySelector('.nav__links').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor()
//   console.log('links target',e.target)
//   console.log('links currentTarget',e.currentTarget)
// },true)


document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'})
    }
})


document.querySelector('.operations__tab-container').addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab')

    if (!clicked) return;
    document.querySelector('.operations__tab--active').classList.remove('operations__tab--active')
    clicked.classList.add('operations__tab--active');


    document.querySelector('.operations__content--active').classList.remove('operations__content--active')
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')


})

const hoverHandle= function(e){
    if(e.target.classList.contains('nav__link')){
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = document.querySelector('.nav__logo');
        siblings.forEach(s=>s.style.opacity = this)
        link.style.opacity = 1;
        logo.style.opacity = this
    }
}
document.querySelector('.nav__links').addEventListener('mouseover', hoverHandle.bind(0.5))
document.querySelector('.nav__links').addEventListener('mouseout', hoverHandle.bind(1))
// const h1 = document.querySelector('h1');

// console.log(h1.childNodes)
// console.log(h1.children)
// console.log(h1.parentElement)
// console.log(h1.parentNode)

// console.log(h1.childNodes)
// console.log(h1.children)
//
// console.log(h1.parentElement)
// console.log(h1.parentNode)

// console.log(h1.previousElementSibling)
// console.log(h1.previousSibling)
//
// console.log(h1.nextElementSibling)
// console.log(h1.nextSibling)

// [...h1.parentElement.children].forEach(el=>{
//   if(el !==h1){
//     el.style.transform = 'scale(0.5)'
//   }
// })

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// btnScrollTo.onclick = function(e){
//   alert('hi')
// }
// const section1 = document.querySelector('#section--1');
//
// btnScrollTo.addEventListener('click', function (e) {
//   const s1Coords =  section1.getBoundingClientRect();
//   console.log(s1Coords)
//
//   console.log(e.target.getBoundingClientRect())
//
//   console.log('Current Scroll (X/Y):', window.pageYOffset, window.pageXOffset);
//   console.log('View Port Height and width: ', document.documentElement.clientHeight, document.documentElement.clientWidth)
//
//   // window.scrollTo(s1Coords.left + window.pageXOffset, s1Coords.top+pageYOffset)
//
//   section1.scrollIntoView({behavior:'smooth'})
// });


// const header = document.querySelector('.header');
// const message = document.createElement('div');
// message.innerHTML = 'We use cookies for improve functionality and analytics; <button class="btn btn--close-cookie">Got it!</button>'
// header.prepend(message)
// header.prepend(message.cloneNode(true))
// document.querySelector('.btn--close-cookie').addEventListener('click',function(){
//   // message.remove();
//   message.parentElement.removeChild(message)
// })

// document.documentElement.style.setProperty( ' --color-primary', 'red')
// document.documentElement.style.setProperty('--color-primary','red')

// const logo = document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.getAttribute('src'))
// console.log(logo.dataset.versionNumber)

