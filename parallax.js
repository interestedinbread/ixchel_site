export const setupParallax = () => {
    const backTrees = document.querySelector('.layer-1')
    const frontTrees = document.querySelector('.layer-2')

    const triggerOffset = 500;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        
        const scrollFromBottom = docHeight - (scrollTop + windowHeight);

        if(scrollFromBottom <= triggerOffset){
            const progress = 1 - scrollFromBottom/triggerOffset;
            backTrees.style.transform = `translateY(${progress * 30}px)`;
            frontTrees.style.transform = `translateY(${progress * 60}px)`;
        } else {
            backTrees.style.transform = `translateY(0)`
            frontTrees.style.transform = `translateY(0)`
        }
    })
}