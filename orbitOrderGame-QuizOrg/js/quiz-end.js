document.addEventListener("DOMContentLoaded", () => {
    /******************************* PLAY BACKGROUND MUSIC *******************************/
    // Play background music on page load
    const backgroundMusic = document.getElementById("background-music");
    if (backgroundMusic) {
        backgroundMusic.volume = 0.5; // Set music volume to 50%
        backgroundMusic.loop = true; // Loop the background music indefinitely
        backgroundMusic.play().catch((error) => {
            console.warn("Background music playback failed:", error); // Handle playback error
        });
    }

    /****************************** ELEMENT SELECTION ************************************/
    // Select the HTML elements where results will be displayed
    const novaMessage = document.getElementById("nova-message"); // Custom message area
    const scoreMessage = document.getElementById("score-message"); // Quiz score display area
    const trophyImage = document.getElementById("space-trophy"); // Trophy image element

    /**************************** CHECK FOR ELEMENTS ************************************/
    // Ensure the required elements exist before proceeding
    if (novaMessage && scoreMessage) {
        /************************ RETRIEVE DATA FROM LOCALSTORAGE **************************/
        // Retrieve username or set a default value
        const username = localStorage.getItem("usernameInput") || "Astronomer";
        // Retrieve the user's score and total questions
        const score = parseInt(localStorage.getItem("quizScore"), 10) || 0;
        const totalQuestions = parseInt(localStorage.getItem("totalQuestions"), 10) || 0;
        // Check if the user earned the trophy
        const trophyEarned = localStorage.getItem("trophyEarned") === "true";
        // Retrieve the custom quiz completion message
        const quizMessage = localStorage.getItem("quizMessage");

        /************************** DISPLAY RESULTS ***************************************/
        // Display a custom message for the user
        novaMessage.innerHTML = `${username}!<br><br>${quizMessage}`;
        // Display the user's score and total questions
        scoreMessage.textContent = `You scored ${score} out of ${totalQuestions} on the quiz!`;

        // Show the trophy image if the user earned it
        if (trophyEarned && trophyImage) {
            trophyImage.classList.remove("hidden"); // Remove 'hidden' class to display the trophy
        }

        /*********************** CLEAR QUIZ DATA FROM LOCALSTORAGE ************************/
        // Remove quiz-related data to ensure a clean slate for future attempts
        localStorage.removeItem("quizScore");
        localStorage.removeItem("totalQuestions");
        localStorage.removeItem("trophyEarned");
        localStorage.removeItem("quizMessage");
    }
});
