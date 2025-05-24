// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Function to initialize image panning
export function setupImagePanning() {
    // Select all showcase images except the "come in" image
    const showcaseImages = document.querySelectorAll('.showcase-image:not(#come-in)');
    
    showcaseImages.forEach((image, index) => {
        // Get the parent container
        const container = image.parentElement;
        
        // Debug dimensions
        console.log(`Image ${index}:`, {
            imageWidth: image.offsetWidth,
            containerWidth: container.offsetWidth,
            maxPan: image.offsetWidth - container.offsetWidth,
            screenWidth: window.innerWidth
        });
        
        // Set initial position
        gsap.set(image, {
            x: 0
        });
        
        // Create the panning animation
        gsap.to(image, {
            x: () => {
                // Calculate the maximum pan distance (image width - container width)
                const maxPan = image.offsetWidth - container.offsetWidth;
                return maxPan;
            },
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top bottom", // Start when the top of the container hits the bottom of the viewport
                end: "bottom top",   // End when the bottom of the container hits the top of the viewport
                scrub: 0.5,         // Smoother scrubbing effect
                invalidateOnRefresh: true, // Recalculate on window resize
                markers: false,     // Disable markers
                toggleActions: "play none none reverse", // Play on enter, reverse on leave
                onRefresh: () => {
                    // Force a recalculation of the animation
                    gsap.set(image, { x: 0 });
                }
            }
        });
    });
}

// Function to clean up ScrollTrigger instances
export function cleanupImagePanning() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', setupImagePanning);

// Reinitialize on window resize to handle responsive layouts
window.addEventListener('resize', () => {
    // Kill all existing ScrollTrigger instances
    cleanupImagePanning();
    // Reinitialize
    setupImagePanning();
});
