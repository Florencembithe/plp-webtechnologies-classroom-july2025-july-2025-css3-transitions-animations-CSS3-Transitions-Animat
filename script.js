// =================== PART 2: JAVASCRIPT FUNCTIONS - SCOPE, PARAMETERS & RETURN VALUES ===================

// Global variables to demonstrate scope
let globalScore = 0;
let clickCount = 0;
const animations = ['pulse', 'glow', 'rotate'];
const colorPalette = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];

/**
 * Function demonstrating parameters and return values
 * Calculates a score based on clicks and multiplier
 * @param {number} clicks - Number of clicks
 * @param {number} multiplier - Score multiplier (default: 1)
 * @returns {number} Calculated score
 */
function calculateScore(clicks, multiplier = 1) {
    // Local variable - demonstrates local scope
    const baseScore = clicks * 10;
    const bonusScore = clicks > 5 ? 50 : 0;
    const finalScore = baseScore * multiplier + bonusScore;
    
    // Log to show function execution
    console.log(`Calculating score: ${clicks} clicks × ${multiplier} = ${finalScore}`);
    
    return finalScore;
}

/**
 * Function demonstrating local scope and parameters
 * Generates random numbers within a range
 * @param {number} min - Minimum value (default: 1)
 * @param {number} max - Maximum value (default: 100)
 * @returns {number} Random number in range
 */
function generateRandomNumber(min = 1, max = 100) {
    // Local variables - not accessible outside this function
    const range = max - min + 1;
    const randomValue = Math.floor(Math.random() * range) + min;
    
    console.log(`Generated random number between ${min}-${max}: ${randomValue}`);
    return randomValue;
}

/**
 * Function demonstrating scope and conditional logic
 * Returns a greeting based on time of day
 * @returns {string} Time-based greeting
 */
function getTimeBasedGreeting() {
    // Local variable
    const hour = new Date().getHours();
    let greeting; // Local variable with conditional assignment
    
    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 17) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }
    
    return greeting + "! 👋";
}

/**
 * Function demonstrating array manipulation and return values
 * Gets a random color from the global palette
 * @returns {string} Random color value
 */
function getRandomColor() {
    // Uses global variable 'colorPalette'
    const randomIndex = Math.floor(Math.random() * colorPalette.length);
    return colorPalette[randomIndex];
}

/**
 * Utility function for updating score display with animation
 * Demonstrates DOM manipulation and function parameters
 * @param {number} newScore - The new score to display
 */
function updateScoreDisplay(newScore) {
    // Local DOM element references
    const scoreDisplay = document.getElementById('scoreDisplay');
    const scoreValue = document.getElementById('scoreValue');
    
    // Update global variable
    globalScore = newScore;
    
    // Update DOM
    scoreValue.textContent = globalScore;
    scoreDisplay.classList.add('updated');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        scoreDisplay.classList.remove('updated');
    }, 300);
    
    console.log(`Score updated to: ${globalScore}`);
}

// =================== PART 3: COMBINING CSS ANIMATIONS WITH JAVASCRIPT ===================

/**
 * Handle interactive box clicks - demonstrates event handling and CSS class manipulation
 * Uses multiple functions and demonstrates scope
 */
function handleBoxClick() {
    // Update global variables
    clickCount++;
    
    // Use functions with parameters and return values
    const newScore = calculateScore(clickCount, 1.5);
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    
    // Get DOM element
    const box = document.getElementById('interactiveBox');
    
    // Trigger CSS animation by adding class
    box.classList.add('clicked');
    setTimeout(() => {
        box.classList.remove('clicked');
    }, 600);
    
    // Dynamic style changes
    box.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
    
    // Update content with function return value
    const greeting = getTimeBasedGreeting();
    box.innerHTML = `${greeting}<br>Clicks: ${clickCount}`;
    
    // Update score using utility function
    updateScoreDisplay(newScore);
    
    console.log(`Box clicked ${clickCount} times. Colors: ${color1}, ${color2}`);
}

/**
 * Flip card animation - demonstrates CSS class toggling
 * Shows how JavaScript can trigger CSS transitions
 */
function flipCard() {
    const flipCard = document.getElementById('flipCard');
    
    // Toggle CSS class to trigger animation
    flipCard.classList.toggle('flipped');
    
    // Update score with bonus points
    const bonusPoints = 5;
    updateScoreDisplay(globalScore + bonusPoints);
    
    console.log('Card flipped!');
}

/**
 * Show modal with animations
 * Demonstrates adding CSS classes for complex animations
 */
function showModal() {
    const modal = document.getElementById('modal');
    
    // Add CSS class to trigger modal animation
    modal.classList.add('active');
    
    // Award points for interaction
    const modalPoints = 10;
    updateScoreDisplay(globalScore + modalPoints);
    
    console.log('Modal opened');
}

/**
 * Hide modal - demonstrates event parameter usage and conditional logic
 * @param {Event} event - Optional event object from click
 */
function hideModal(event) {
    const modal = document.getElementById('modal');
    
    // Only close if clicking outside modal content or on close button
    if (!event || event.target === modal || event.target.textContent === 'Close Modal') {
        // Remove CSS class to trigger hide animation
        modal.classList.remove('active');
        console.log('Modal closed');
    }
}

/**
 * Loading animation controller
 * Demonstrates setTimeout and dynamic content updates
 */
function startLoading() {
    const spinner = document.getElementById('loadingSpinner');
    const loadingText = document.getElementById('loadingText');
    
    // Add CSS class to start animation
    spinner.classList.add('active');
    loadingText.textContent = 'Loading...';
    
    // Use function to generate random loading time
    const loadingTime = generateRandomNumber(2000, 5000);
    
    console.log(`Starting loading for ${loadingTime}ms`);
    
    // Simulate loading with setTimeout
    setTimeout(() => {
        // Remove CSS class to stop animation
        spinner.classList.remove('active');
        loadingText.textContent = `Loading completed in ${loadingTime/1000}s!`;
        
        // Award completion points
        const loadingPoints = 15;
        updateScoreDisplay(globalScore + loadingPoints);
        
        console.log('Loading completed');
    }, loadingTime);
}

/**
 * Animate cards with staggered timing
 * Demonstrates querySelectorAll and forEach with timing
 */
function animateCards() {
    const cards = document.querySelectorAll('.card');
    
    console.log(`Animating ${cards.length} cards`);
    
    // Reset and animate each card with delay
    cards.forEach((card, index) => {
        // Remove existing animation class
        card.classList.remove('visible');
        
        // Add animation class with staggered timing
        setTimeout(() => {
            card.classList.add('visible');
            console.log(`Card ${index + 1} animated`);
        }, index * 200);
    });
    
    // Award points for triggering animation
    const animationPoints = 20;
    updateScoreDisplay(globalScore + animationPoints);
}

/**
 * Add pulse animation to element - demonstrates parameter usage and DOM traversal
 * @param {HTMLElement} buttonElement - The button that was clicked
 */
function addPulse(buttonElement) {
    // Find parent card using DOM traversal
    const card = buttonElement.closest('.card');
    
    // Add CSS animation class
    card.classList.add('pulse');
    
    console.log('Pulse animation added to card');
    
    // Remove pulse class after animation duration
    setTimeout(() => {
        card.classList.remove('pulse');
        console.log('Pulse animation removed');
    }, 2000);
    
    // Award points
    const pulsePoints = 8;
    updateScoreDisplay(globalScore + pulsePoints);
}

/**
 * Calculate and display random value - demonstrates multiple function calls
 * Shows how functions can work together
 */
function calculateAndDisplay() {
    // Use multiple functions with different parameters
    const randomNum = generateRandomNumber(1, 1000);
    const smallRandom = generateRandomNumber(2, 5);
    const multipliedResult = randomNum * smallRandom;
    const greeting = getTimeBasedGreeting();
    
    // Create message using function return values
    const message = `${greeting}\nRandom number: ${randomNum}\nMultiplied by ${smallRandom}: ${multipliedResult}`;
    
    // Display result
    alert(message);
    
    // Award points based on calculation
    const calculationPoints = Math.floor(randomNum / 50);
    updateScoreDisplay(globalScore + calculationPoints);
    
    console.log(`Calculation: ${randomNum} × ${smallRandom} = ${multipliedResult}`);
}

/**
 * Trigger special effect - demonstrates complex animation sequencing
 * @param {HTMLElement} buttonElement - The button that triggered the effect
 */
function triggerSpecialEffect(buttonElement) {
    const card = buttonElement.closest('.card');
    
    // Get random colors using function
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    
    console.log(`Special effect with colors: ${color1}, ${color2}`);
    
    // Sequence of CSS transformations
    card.style.transform = 'scale(1.1) rotateY(10deg)';
    card.style.background = `linear-gradient(45deg, ${color1}20, ${color2}20)`;
    
    // First stage of animation
    setTimeout(() => {
        card.style.transform = 'scale(1) rotateY(-5deg)';
    }, 200);
    
    // Final stage - reset
    setTimeout(() => {
        card.style.transform = 'scale(1) rotateY(0deg)';
        card.style.background = '';
        console.log('Special effect completed');
    }, 400);
    
    // Award special effect points
    const specialPoints = 25;
    updateScoreDisplay(globalScore + specialPoints);
}

// =================== INITIALIZATION AND EVENT LISTENERS ===================

/**
 * Initialize the page when DOM is loaded
 * Demonstrates event listeners and initial setup
 */
function initializePage() {
    console.log('=== PAGE INITIALIZATION ===');
    console.log(getTimeBasedGreeting());
    console.log(`Initial global score: ${globalScore}`);
    console.log(`Available animations: ${animations.join(', ')}`);
    console.log(`Color palette: ${colorPalette.join(', ')}`);
    
    // Auto-animate cards on page load
    setTimeout(() => {
        animateCards();
    }, 500);
    
    console.log('Page initialization complete');
}

/**
 * Add keyboard event listeners
 * Demonstrates event handling and scope
 */
function setupKeyboardEvents() {
    document.addEventListener('keydown', function(event) {
        console.log(`Key pressed: ${event.key}`);
        
        // Close modal with Escape key
        if (event.key === 'Escape') {
            hideModal();
        }
        
        // Trigger random effect with spacebar
        if (event.key === ' ') {
            event.preventDefault(); // Prevent page scroll
            const randomPoints = generateRandomNumber(5, 20);
            updateScoreDisplay(globalScore + randomPoints);
            console.log(`Spacebar bonus: ${randomPoints} points!`);
        }
    });
    
    console.log('Keyboard events initialized');
}

// =================== EVENT LISTENERS AND PAGE LOAD ===================

// Initialize everything when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupKeyboardEvents();
    
    // Log function scope demonstration
    console.log('=== SCOPE DEMONSTRATION ===');
    console.log('Global variables accessible here:');
    console.log(`globalScore: ${globalScore}`);
    console.log(`clickCount: ${clickCount}`);
    console.log(`animations array: ${animations}`);
    
    // Test local scope
    function testLocalScope() {
        let localVariable = "I'm local!";
        const anotherLocal = "Me too!";
        console.log('Local variables in testLocalScope():');
        console.log(`localVariable: ${localVariable}`);
        console.log(`anotherLocal: ${anotherLocal}`);
        return localVariable + " " + anotherLocal;
    }
    
    const scopeResult = testLocalScope();
    console.log(`Function return value: ${scopeResult}`);
    
    // Demonstrate that local variables are not accessible here
    try {
        console.log(localVariable); // This will cause an error
    } catch (error) {
        console.log('localVariable is not accessible outside its function scope');
    }
    
    console.log('=== INITIALIZATION COMPLETE ===');
});