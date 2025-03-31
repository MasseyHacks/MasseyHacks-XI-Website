gsap.timeline()
.to("#sprayCircle", {
    cx: "20%", // Starting X position of the circle
    cy: "30%", // Starting Y position of the circle
    duration: 0.8,
    ease: "power2.out"
})
.to("#sprayCircle", {
    cx: "40%", // Second position
    cy: "60%", // Second position
    duration: 0.8,
    ease: "power2.out"
})
.to("#sprayCircle", {
    cx: "60%", // Third position
    cy: "40%", // Third position
    duration: 0.8,
    ease: "power2.out"
})
.to("#sprayCircle", {
    cx: finalXPosition + "px", // Fully across the logo's width and a bit beyond
    cy: finalYPosition, // Middle vertically
    duration: 0.8,
    ease: "power2.out"
});
