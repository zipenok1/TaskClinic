function initSlider(sliderSelector, prevBtnSelector, nextBtnSelector, slideSelector, gap) {
    const slider = document.querySelector(sliderSelector)
    const prevBtn = document.querySelector(prevBtnSelector)
    const nextBtn = document.querySelector(nextBtnSelector)
    
    function getSlideWidth() {
        const slides = document.querySelectorAll(slideSelector)
        if (slides.length > 0) {
            const firstSlide = slides[0]
            const width = firstSlide.offsetWidth
            return width + gap
        }
        return 340
    }
    
    nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: getSlideWidth(),
            behavior: 'smooth'
        })
    })
    
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -getSlideWidth(),
            behavior: 'smooth'
        })
    })
}
initSlider('.doctors__content-slader', '.slider-prev', '.slider-next', '.doctors__slader', 16)
initSlider('.license__content-slader', '.license-slider-prev', '.license-slider-next', '.license__slader-img', 16)

function openModal(){
    document.querySelector('.modal').classList.add('active')
    document.body.style.overflow = 'hidden'
}
function closeModal(){
    document.querySelector('.modal').classList.remove('active')
    document.body.style.overflow = ''
}

function burger() {
    const mobileNav = document.querySelector('.mobile-nav')
    const burgerBtn = document.querySelector('.burger')
    const burgerImg = burgerBtn.querySelector('img')

    if (window.innerWidth > 813) {
        mobileNav.classList.remove('active')
        burgerBtn.classList.remove('active')
        return;
    }
    mobileNav.classList.toggle('active')
    burgerBtn.classList.toggle('active')

    if (burgerBtn.classList.contains('active')) {
        burgerImg.src = 'assets/icon/burder-close.svg'
    } else {
        burgerImg.src = 'assets/icon/burger.svg'
    }
}
window.addEventListener('resize', function() {
    const mobileNav = document.querySelector('.mobile-nav')
    const burgerBtn = document.querySelector('.burger')
    const burgerImg = burgerBtn.querySelector('img')
    if (window.innerWidth > 813) {
        burgerImg.src = 'assets/icon/burger.svg'
        mobileNav.classList.remove('active')
        burgerBtn.classList.remove('active')
    }
})

const faqItems = document.querySelectorAll('.questions__faq-item')
faqItems.forEach(item => {
    const header = item.querySelector('.questions__faq-grup')
    
    header.addEventListener('click', () => {
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active')
            }
        })
        item.classList.toggle('active')
    })
})
