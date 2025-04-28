export const setupParallax = () => {
    const backTrees = document.querySelector('.layer-1')
    const frontTrees = document.querySelector('.layer-2')

    // Start the effect when the scene is about 30% into view
    const triggerOffset = 800;
    const maxBackMovement = 200; // Increased movement
    const maxFrontMovement = 400; // Increased movement

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        
        const scrollFromBottom = docHeight - (scrollTop + windowHeight);

        if(scrollFromBottom <= triggerOffset){
            const progress = 1 - scrollFromBottom/triggerOffset;
            backTrees.style.transform = `translateY(${progress * maxBackMovement}px)`;
            frontTrees.style.transform = `translateY(${progress * maxFrontMovement}px)`;
        } else {
            backTrees.style.transform = `translateY(0)`;
            frontTrees.style.transform = `translateY(0)`;
        }
    })
}