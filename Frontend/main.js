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