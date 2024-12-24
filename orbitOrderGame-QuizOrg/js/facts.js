/******************************* SHOW FACT FUNCTION ***************************************/
/**
 * Displays a fact with a title, text, image, and audio.
 * Hides the facts container and other UI elements while showing the fact details.
 *
 * @param {string} title - The title of the fact to display.
 * @param {string} text - The description or details about the fact.
 * @param {string} imagePath - The path to the image associated with the fact.
 * @param {HTMLElement} cardElement - The card element containing the audio for the fact.
 */
function showFact(title, text, imagePath, cardElement) {
    // Hide the facts container, back-to-game button, and the <h2> element
    document.getElementById('facts-container').style.display = 'none';
    document.getElementById('back-to-game-btn').style.display = 'none';
    document.getElementById('hide-h2').style.display = 'none';

    // Display the fact display container and populate it dynamically with content
    const factDisplay = document.getElementById('fact-display');
    factDisplay.style.display = 'block';
    factDisplay.innerHTML = `
        <h2>${title}</h2>
        <img src="${imagePath}" alt="${title}" class="fact-image">
        <p>${text}</p>
        <button id="goBack" onclick="goBack()">Back</button>
    `;

    /*********************** ADD SMOOTH ANIMATION TO THE IMAGE **************************/
    // Select the image element within the fact display
    const factImage = factDisplay.querySelector('.fact-image');
    setTimeout(() => {
        factImage.style.display = 'block'; // Ensure the image is displayed
        factImage.style.opacity = 0; // Set initial opacity to 0
        factImage.style.transition = 'opacity 0.5s ease-in-out'; // Define a smooth fade-in effect
        factImage.style.opacity = 1; // Gradually set opacity to 1 for the animation
    }, 100); // Short delay to ensure animation starts properly after rendering

    /**************************** PLAY ASSOCIATED AUDIO *********************************/
    // Find and play the audio element (if it exists) in the provided card element
    const audioElement = cardElement.querySelector("audio");
    if (audioElement) {
        audioElement.currentTime = 0; // Restart the audio from the beginning
        audioElement.play().catch((error) => {
            console.warn("Audio playback failed:", error); // Handle playback errors
        });
    } else {
        console.warn("Audio element not found in this card."); // Log a warning if no audio is found
    }
}

/********************************** GO BACK FUNCTION *************************************/
/**
 * Returns to the facts container view by hiding the fact display section.
 * Stops any currently playing audio.
 * Shows the facts container, back-to-game button, and the <h2> title.
 */
function goBack() {
    // Stop any currently playing audio
    const allAudioElements = document.querySelectorAll('audio'); // Select all audio elements
    allAudioElements.forEach(audio => {
        if (!audio.paused) { // Check if audio is playing
            audio.pause();   // Pause the audio
            audio.currentTime = 0; // Reset audio to the beginning
        }
    });

    // Hide the fact display section
    document.getElementById('fact-display').style.display = 'none';

    // Show the facts container, back-to-game button, and the <h2> element
    document.getElementById('facts-container').style.display = 'flex';
    document.getElementById('back-to-game-btn').style.display = 'inline-block';
    document.getElementById('hide-h2').style.display = 'block';
}

/******************************* GO TO GAME FUNCTION *************************************/
/**
 * Navigates the user back to the main game page (index.html).
 */
function goToGame() {
    window.location.href = 'index.html'; // Redirect to the main game page
}
