/******************************* BACKGROUND - MUSIC CODE ********************************************/
// Global variables: None directly declared but `music` is accessed globally in the DOM
// Functions: In-built functions (e.g., addEventListener, getElementById, play), DOM Manipulation
// Event Handling: DOMContentLoaded
//while loop
// Wait for the entire page content to load
document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("background-music");

    // Debugging: Check if the audio element exists
    if (!music) {
        console.error("Audio element not found!");
        return;
    }


    const musicPlaying = localStorage.getItem("musicPlaying") || "true";



    // If musicPlaying is true, attempt to play the music
    if (musicPlaying === "true") {
        music.volume = 0.5; // Set volume
        music.play().then(() => {
            console.log("Music started successfully");
            console.log("Is music playing?", !music.paused);
            console.log("Current playback time:", music.currentTime);
            console.log("Music started successfully");
        }).catch((error) => {
            console.error("Music playback failed:", error);
        });
    }

});
document.addEventListener('DOMContentLoaded', () => {
    const novaVoice = document.getElementById('nova-voice');

    // Play Nova's voice
    if (novaVoice) {
        novaVoice.play().catch((error) => {
            console.warn('Nova voice auto-play might be blocked:', error);
        });
    }
});


/************************** INSTRUCTIONS PAGE LOGIC ***************************************/

// Run the script after the entire DOM is fully loaded
$(document).ready(function () {
    // Select the image element
    const correctImg = document.getElementById('correctImg');

    // Add click event to toggle the 'enlarged' class
    if (correctImg) {
        correctImg.addEventListener('click', () => {
            correctImg.classList.toggle('enlarged');
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('instructions-voice');

    if (!audio) {
        console.error('Audio element not found!');
        return;
    }

    // Try to play the audio automatically
    audio.play().catch((error) => {
        console.warn('Auto-play might be blocked by the browser:', error);
    });
});

/******************************** BLAST OFF TIMER *********************************************/
// Variables: Local variables (e.g., continueButton, usernameInput)
// Functions: Event handler, countdown logic
// Event Handling: Button click
// DOM Manipulation: Modify the DOM elements dynamically
// Run the script after the entire DOM is fully loaded
// for loop added to countdown logic
$(document).ready(function () {
    // Select important DOM elements and assign them to variables for easy access
    const continueButton = document.getElementById("start-game"); // The button to start the countdown
    const usernameInput = document.getElementById("username-input"); // Input field for the username
    const countdownMessage = document.getElementById("countdown-message"); // Element to display countdown messages
    const timerDiv = document.getElementById("countdown-timer"); // Container for the countdown display
    const errorMessage = document.getElementById("error-message"); // Element to display error messages
    const userContainer = document.getElementById("user-container"); // Container for the user input and button
    const rocket = document.getElementById("rocket"); // The rocket element to animate
    const backgroundMusic = document.getElementById("background-music"); // Background music element
    const rocketSound = new Audio("audio/rocketSound.wav"); // Sound effect for the rocket launch

    // Set the volume for the rocket sound effect
    rocketSound.volume = 0.8;

    // Check if all required DOM elements are found; log an error and stop execution if not
    if (!continueButton && !usernameInput && !countdownMessage && !timerDiv) {

        return; // Exit the script if any critical element is missing
    }

    // Add an event listener to the "Continue" button to handle click events
    continueButton.addEventListener("click", function () {
        // Retrieve the trimmed value from the username input field
        const username = usernameInput.value.trim();

        // Validate the username: it must not be empty or contain numbers/spaces
        if (!username || /\d|\s/.test(username)) {
            errorMessage.textContent = username ?
                "Username cannot contain numbers or spaces. Please enter a valid name!" // Error for invalid username
                :
                "Username cannot be empty. Please enter a valid name!"; // Error for empty input
            errorMessage.style.color = "white"; // Set the error message color
            errorMessage.style.display = "block"; // Make the error message visible
            return; // Stop further execution if validation fails
        }

        // Save the username to local storage for later use
        localStorage.setItem("usernameInput", username);

        // Hide user input fields and error message after validation
        userContainer.style.display = "none";
        usernameInput.style.display = "none";
        continueButton.style.display = "none";
        errorMessage.style.display = "none";

        // Change the page background to a darker theme for the countdown phase
        document.body.style.background = "radial-gradient(circle, #000000, #2e2e2e, #0f0f0f)";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed";

        // Display the countdown timer
        timerDiv.style.display = "block";

        // Show an initial "Get Ready" message with the username
        countdownMessage.textContent = `Get Ready, ${username}...`;
        // Initialise the countdown timer starting at 5 seconds
        let countdown = 5;

        // Use a for loop to handle the countdown logic
        for (let i = countdown; i >= 0; i--) {
            (function (currentI) {
                // Schedule each countdown update using setTimeout
                setTimeout(function () {
                    if (currentI > 0) {
                        // Update the countdown message with the current number
                        countdownMessage.textContent = currentI;
                    } else {
                        // Once the countdown reaches 0, display "BLAST OFF!"
                        countdownMessage.textContent = "BLAST OFF!";

                        // Stop the background music and reset it
                        if (backgroundMusic) {
                            backgroundMusic.pause();
                            backgroundMusic.currentTime = 0; // Reset music to the beginning
                        }

                        // Play the rocket launch sound effect
                        rocketSound.play().catch((error) => {
                            console.error("Rocket sound playback failed:", error); // Log any playback errors
                        });

                        // Make the rocket visible and start its upward animation
                        rocket.style.display = "block";
                        rocket.style.animation = "moveRocketUp 4s linear forwards";

                        // After the rocket animation completes, redirect to the game page
                        setTimeout(function () {
                            window.location.href = "game-page.html"; // Redirect to the next page
                        }, 2000); // Wait 2 seconds for the animation to finish
                    }
                }, (countdown - currentI) * 1000); // Schedule each update with a 1-second delay
            })(i); // Call the function with the current value of `i`
        }
    });
});








/************************* GAME PAGE LOGIC ****************************************************/
// Global variables: planets array
// Local variables: timeLeft, correctCount, etc.
// Control Structures: Selection (if/else), Iteration (setInterval)
// Arrays: planets array
// Functions: startCountdown, displaySuccessMessage, displayUnsuccessfulMessage
// Event Handling: Drag and drop events
// DOM Manipulation: Update DOM dynamically

// Run the script after the entire DOM is fully loaded
$(document).ready(function () {
    // Initialise game variables
    let timeLeft = 180; // Total time for the game in seconds (3 minutes)
    let timerInterval; // Reference to the countdown timer interval, used to stop or clear the timer
    let correctCount = 0; // Counter to track the number of correctly placed planets
    const totalPlanets = 8; // Total number of planets to be placed correctly to win the game

    // Array containing all planet names (IDs of draggable elements)
    const planets = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"];

    // Function to start the countdown timer
    function startCountdown() {
        // Get a reference to the timer element in the HTML using its ID
        const timer = document.getElementById("timer");

        // Check if the timer element exists; if not, exit the function
        if (!timer) {
            return; // Prevents errors if the timer element is not found
        }

        // Set up an interval to update the timer every second (1000 milliseconds)
        const timerInterval = setInterval(() => {
            // Check if the countdown has reached zero
            if (timeLeft <= 0) {
                // Stop the interval to prevent further updates
                clearInterval(timerInterval);

                // Update the timer element's text to indicate the countdown is finished
                timer.textContent = "Time's up!";
                return; // Exit the interval function
            }

            // Decrease the remaining time by 1 second
            timeLeft--;

            // Calculate the number of whole minutes remaining
            const minutes = Math.floor(timeLeft / 60);

            // Calculate the remaining seconds after accounting for the minutes
            const seconds = timeLeft % 60;

            // Update the timer element's text with the formatted time
            // If seconds < 10, a leading '0' is added for proper formatting (e.g., "2:05")
            timer.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            if (timeLeft <= 0) {
                timer.textContent = "Time's up!";
                displayUnsuccessfulMessage();
            }

        }, 1000); // The function runs every 1000 milliseconds (1 second)
    }

    // Start the countdown when the game begins   
    startCountdown(); // Call the function only after the DOM is ready


    // Make all planets draggable using jQuery
    $(".planet").draggable({
        revert: "invalid", // Return the planet to its original position if not dropped correctly
        containment: "#solarImage", // Restrict dragging within the game area to prevent out-of-bounds movement
        cursor: "grab" // Change the cursor to indicate draggable functionality
    });

    // Make drop zones accept specific planets
    $(".drop-zone").droppable({
        // Only allow specific planets to be dropped in each zone
        accept: function (draggable) {
            // Check if the dragged planet matches the drop zone's expected planet
            return planets.includes($(draggable).attr("id")) && $(draggable).attr("id") === $(this).data("planet");
            // planets.includes: Checks if the dragged planet's ID is in the list of valid planet names.
            // $(draggable): Makes the dragged planet easy to work with using jQuery.
            // .attr("id"): Grabs the ID of the dragged planet (like "venus").
            // &&: Both conditions have to be true for this to work.
            // $(this): Refers to the drop zone where the planet is being dropped.
            // .data("planet"): Gets the planet name that this drop zone is expecting.
        },
        hoverClass: "drop-hover", // Add a hover effect when a draggable planet is over a drop zone
        drop: function (event, ui) {
            // Handle what happens when a planet is dropped into a drop zone
            const draggedPlanet = ui.helper[0]; // Get the HTML element of the dragged planet
            const dropZone = $(this); // Reference the drop zone element
            const planetId = $(draggedPlanet).attr("id"); // Get the ID of the dragged planet

            // Check if the planet was dropped in the correct zone
            if (dropZone.data("planet") === planetId) {
                // Correct placement logic
                dropZone.addClass("correct-drop"); // Add a visual glow effect to the drop zone
                setTimeout(() => dropZone.removeClass("correct-drop"), 500); // Remove the glow effect after 500ms

                const correctSound = document.getElementById("correct-sound"); // Reference the correct sound element
                correctSound.play(); // Play the success sound

                dropZone.css("background-color", "#FFD700"); // Highlight the drop zone with a gold color
                dropZone.append(draggedPlanet); // Move the planet into the drop zone
                $(draggedPlanet).attr("draggable", "false");
                $(draggedPlanet).css({
                    position: "absolute", // Absolute positioning within the drop zone
                    top: "50%", // Center vertically
                    left: "50%", // Center horizontally
                    transform: "translate(-50%, -50%)", // Adjust alignment for true centering
                    width: "140%", // Scale the planet as needed (optional)
                    height: "140%" // Maintain aspect ratio (optional)
                });

                correctCount++; // Increment the counter for correctly placed planets

                // Check if all planets have been placed correctly
                if (correctCount === totalPlanets) {
                    clearInterval(timerInterval); // Stop the timer as the game is completed
                    displaySuccessMessage(); // Call the function to show the success message
                }
            } else {
                // Incorrect placement logic
                dropZone.addClass("wrong-drop"); // Add a visual shake effect to the drop zone
                setTimeout(() => dropZone.removeClass("wrong-drop"), 300); // Remove the shake effect after 300ms

                const wrongSound = document.getElementById("wrong-sound"); // Reference the error sound element
                wrongSound.play(); // Play the error sound

                dropZone.css("background-color", "red"); // Highlight the drop zone with a red color
                setTimeout(() => dropZone.css("background-color", ""), 300); // Reset the color after 300ms
            }
        }
    });



    // Function to display the success message when all planets are placed correctly
    function displaySuccessMessage() {
        const completionTime = 180 - timeLeft; // Calculate the time taken to complete the game
        localStorage.setItem("completionTime", completionTime); // Save the completion time in local storage
        localStorage.setItem("gameResult", "successful"); // Save the game result as successful

        // Display a "Well Done" message overlay (optional)
        const overlay = document.getElementById("game-textbox");
        overlay.innerHTML = "<h2>Well Done! You've completed the game!</h2>"; // Add a success message
        overlay.style.display = "block"; // Make the overlay visible
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; // Add a semi-transparent background to the overlay

        // Wait a few seconds before navigating to the end page
        setTimeout(() => {
            window.location.href = "end-page.html"; // Redirect to the end page
        }, 5000); // Delay of 5 seconds
    }

    // Function to display the unsuccessful message when time runs out
    function displayUnsuccessfulMessage() {
        localStorage.setItem("gameResult", "unsuccessful"); // Save the game result as unsuccessful
        window.location.href = "end-page.html"; // Redirect to the end page immediately
    }




});
