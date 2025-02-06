//ANIMATE ON SCROLL
const cards = document.querySelectorAll(".card")

const observer = new IntersectionObserver(enteries=>{
    enteries.forEach(entry=>{
        entry.target.classList.toggle('show',entry.isIntersecting)
        if (entry.isIntersecting) observer.unobserve(entry.target);
    })
},{threshold:0.5})

cards.forEach(card=>{
    observer.observe(card)
})

// INFINITE SCROLL
const cardContainer = document.querySelector(".card-container")

function loadNewCards(){
    for(let i=1; i<=10; i++){
        const card = document.createElement("div")
        card.textContent =`New Card ${i}`
        card.classList.add("card")
        observer.observe(card)
        cardContainer.append(card)
    }
}

const lastCardObserver = new IntersectionObserver(entries=>{
    const lastCard = entries[0];
    if(!lastCard.isIntersecting) return
    loadNewCards()
    lastCardObserver.unobserve(lastCard.target)
    lastCardObserver.observe(document.querySelector(".card:last-child"))
},{rootMargin:"100px"})

lastCardObserver.observe(document.querySelector(".card:last-child"))
