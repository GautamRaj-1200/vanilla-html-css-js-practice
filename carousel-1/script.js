const track = document.querySelector('.carousel__track')
const slides = Array.from(track.children)
const nextButton =document.querySelector('.carousel__button--right');
const prevButton=document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children)

const slideWidth = slides[0].getBoundingClientRect().width;

/********************arrange slides next to one another***************************/
// slides[0].style.left=slideWidth*0+'px';
// slides[1].style.left=slideWidth*1+'px';
// slides[2].style.left=slideWidth*2+'px';
const setSlideposition = (slide,i)=>{
    slide.style.left=slideWidth*i+'px';
}
slides.forEach(setSlideposition);

/********************move slides to the left or right***************************/
const moveToSlide = (track,currentSlide,targetSlide)=>{
    track.style.transform='translateX(-'+targetSlide.style.left+')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide')
}
const updateDots = (currentDot,targetDot) =>{
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides,prevButton,nextButton,targetIndex)=>{
    if(targetIndex===0){
        prevButton.classList.add("is-hidden");
        nextButton.classList.remove("is-hidden");
    }else if(targetIndex===slides.length-1){
        prevButton.classList.remove("is-hidden");
        nextButton.classList.add("is-hidden");
    }else{
        prevButton.classList.remove("is-hidden");
        nextButton.classList.remove("is-hidden");
    }
}

// When I click left, move slides to the left
prevButton.addEventListener('click',e=>{
    const currentSlide = track.querySelector('.current-slide')
    const prevSlide = currentSlide.previousElementSibling;
    moveToSlide(track,currentSlide,prevSlide)

    const currentDot =  dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    updateDots(currentDot,prevDot);

    const prevIndex = slides.findIndex(slide=>slide===prevSlide)
    hideShowArrows(slides,prevButton,nextButton,prevIndex);
})
// When I click right, move slides to the right
nextButton.addEventListener('click',e=>{
    const currentSlide = track.querySelector('.current-slide')
    const nextSlide = currentSlide.nextElementSibling;
    moveToSlide(track,currentSlide,nextSlide)

    const currentDot =  dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    updateDots(currentDot,nextDot);

    const nextIndex = slides.findIndex(slide=>slide===nextSlide)
    hideShowArrows(slides,prevButton,nextButton,nextIndex);
})
// When I click the nav indicators, move to that slide
dotsNav.addEventListener('click',e=>{
    const targetDot = e.target.closest('button');
    if(!targetDot) return;
    const currentSlide = track.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot=>dot===targetDot);
    const targetSlide = slides[targetIndex];
    moveToSlide(track,currentSlide,targetSlide);

    const currentDot =  dotsNav.querySelector('.current-slide');
    updateDots(currentDot,targetDot);

    hideShowArrows(slides,prevButton,nextButton,targetIndex);
})