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

const hoverHandle = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = document.querySelector('.nav__logo');
        siblings.forEach(s => s.style.opacity = this)
        link.style.opacity = 1;
        logo.style.opacity = this
    }
}
document.querySelector('.nav__links').addEventListener('mouseover', hoverHandle.bind(0.5))
document.querySelector('.nav__links').addEventListener('mouseout', hoverHandle.bind(1))
// const h1 = document.querySelector('h1');


const header = document.querySelector('.header');
const stickyNav = function (entries) {
    const [entry] = entries
    // entries.forEach((e,i)=> {
    //     console.log(e)
    //     console.log(i)
    // })
    // console.log('entries', entry)
    if (!entry.isIntersecting) {
        // console.log('inter')
        document.querySelector('.nav').classList.add('sticky')
    } else {
        document.querySelector('.nav').classList.remove('sticky')
    }
}
const navHeight = document.querySelector('.nav').getBoundingClientRect().height
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: [0],
    rootMargin: `-${navHeight}px`
})

headerObserver.observe(header)


const sections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target)
    })


}
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    // threshold:[0, 0.1,.2,.3, 0.4 , .7 , .9, 1],
    threshold: 0.15
    // rootMargin:`10px`
})

sections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden')
})

const images = document.querySelectorAll('img[data-src]');

const loadImage = function (entries, observer) {
    // console.log(entries)

    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.src = entry.target.dataset.src
        entry.target.addEventListener('load', function () {
            entry.target.classList.remove('lazy-img')
            observer.unobserve(entry.target)
        })
    })

}
const imagerObserver = new IntersectionObserver(loadImage, {
    root: null,
    threshold: 0,
    rootMargin: '200px'
})

images.forEach(img => imagerObserver.observe(img))


const slides = document.querySelectorAll('.slide')
const btnSliderLeft = document.querySelector('.slider__btn--left')
const btnSliderRight = document.querySelector('.slider__btn--right')
const dotContainer = document.querySelector('.dots')



const goToSlide = function(slide){
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${(i-slide) * 100}%)`
    })
}

const activeDot = function(slide){
    document.querySelectorAll('.dots__dot').forEach(dot=>{
        dot.classList.remove('dots__dot--active')
    })
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}


const nextSlide = function(){
    currSlide++;
    if (currSlide === slideNumber) currSlide = 0;
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${(i - currSlide) * 100}%)`
    })
}

const preSlide = function (){
    currSlide--;
    if (currSlide === -1) currSlide = slideNumber - 1;
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${(i - currSlide) * 100}%)`
    })
}

const createDots = function(){
    slides.forEach((_,i)=>{
        document.querySelector('.dots').insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`)
    })
}

let currSlide = 0;
const slideNumber = slides.length;

goToSlide(0)
createDots()
activeDot(currSlide)


btnSliderRight.addEventListener('click', function () {
    nextSlide()
    activeDot(currSlide)
})

btnSliderLeft.addEventListener('click', function () {
   preSlide()
    activeDot(currSlide)
})



// const dots = document.querySelector('.dots__dot')


dotContainer.addEventListener('click', function (e){
    if(e.target.classList.contains('dots__dot')){
        const {slide} = e.target.dataset
        goToSlide(slide)
        activeDot(slide)
    }
})



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

document.addEventListener('DOMContentLoaded',function (e){
    console.log('HTML parsed and DOM tree build')
})

window.addEventListener('load',function(e){
    console.log('Page fully loaded', e)
})


window.addEventListener('beforeunload',function (e){
    e.preventDefault()
    console.log(e)
    // e.returnValue = '';  // pop up a message when user want to exit
})
