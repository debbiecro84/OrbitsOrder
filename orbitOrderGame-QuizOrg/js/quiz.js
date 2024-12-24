document.addEventListener("DOMContentLoaded", () => {
    /******************************* ELEMENT SELECTION ************************************/
    // Select quiz-related HTML elements
    const questionEl = document.getElementById("question"); // Question display area
    const answersEl = document.getElementById("answers"); // Container for answer buttons
    const feedbackEl = document.getElementById("feedback"); // Feedback message element
    const nextQuestionBtn = document.getElementById("next-question"); // Next question button
    const correctSound = document.getElementById("correct-sound"); // Correct answer sound
    const wrongSound = document.getElementById("wrong-sound"); // Wrong answer sound

    /********************************* QUIZ QUESTIONS *************************************/
    // Array containing all quiz questions, answer options, correct answers, and audio
    const questions = [{
            question: "What planet is closest to the Sun?",
            answers: [{
                    text: "Mercury",
                    hoverAudio: "audio/quiz-answers/mercury-quiz-voice.mp3"
                },
                {
                    text: "Venus",
                    hoverAudio: "audio/quiz-answers/venus-quiz-voice.mp3"
                },
                {
                    text: "Mars",
                    hoverAudio: "audio/quiz-answers/mars-quiz-voice.mp3"
                },
                {
                    text: "Earth",
                    hoverAudio: "audio/quiz-answers/earth-quiz-voice.mp3"
                }
            ],
            correct: "Mercury",
            audio: "audio/quiz-question/question-1voice.mp3"
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: [{
                    text: "Jupiter",
                    hoverAudio: "audio/quiz-answers/jupiter-quiz-voice.mp3"
                },
                {
                    text: "Mars",
                    hoverAudio: "audio/quiz-answers/mars-quiz-voice.mp3"
                },
                {
                    text: "Saturn",
                    hoverAudio: "audio/quiz-answers/saturn-quiz-voice.mp3"
                },
                {
                    text: "Neptune",
                    hoverAudio: "audio/quiz-answers/neptune-quiz-voice.mp3"
                }
            ],
            correct: "Mars",
            audio: "audio/quiz-question/question-2voice.mp3"
        },
        {
            question: "Which planet has a ring around it?",
            answers: [{
                    text: "Earth",
                    hoverAudio: "audio/quiz-answers/earth-quiz-voice.mp3"
                },
                {
                    text: "Mars",
                    hoverAudio: "audio/quiz-answers/mars-quiz-voice.mp3"
                },
                {
                    text: "Jupiter",
                    hoverAudio: "audio/quiz-answers/jupiter-quiz-voice.mp3"
                },
                {
                    text: "Saturn",
                    hoverAudio: "audio/quiz-answers/saturn-quiz-voice.mp3"
                }
            ],
            correct: "Saturn",
            audio: "audio/quiz-question/question-3voice.mp3"
        },
        {
            question: "Which planet is the furthest from the Sun?",
            answers: [{
                    text: "Earth",
                    hoverAudio: "audio/quiz-answers/earth-quiz-voice.mp3"
                },
                {
                    text: "Mars",
                    hoverAudio: "audio/quiz-answers/mars-quiz-voice.mp3"
                },
                {
                    text: "Jupiter",
                    hoverAudio: "audio/quiz-answers/jupiter-quiz-voice.mp3"
                },
                {
                    text: "Neptune",
                    hoverAudio: "audio/quiz-answers/neptune-quiz-voice.mp3"
                }
            ],
            correct: "Neptune",
            audio: "audio/quiz-question/question-4voice.mp3"
        },
        {
            question: "How many planets are there in the solar system?",
            answers: [{
                    text: "7",
                    hoverAudio: "audio/quiz-answers/7-voice.mp3"
                },
                {
                    text: "8",
                    hoverAudio: "audio/quiz-answers/8-voice.mp3"
                },
                {
                    text: "9",
                    hoverAudio: "audio/quiz-answers/9-voice.mp3"
                },
                {
                    text: "10",
                    hoverAudio: "audio/quiz-answers/10-voice.mp3"
                }
            ],
            correct: "8",
            audio: "audio/quiz-question/question-5voice.mp3"
        },
        {
            question: "What is the name of the planet you live on?",
            answers: [{
                    text: "Mars",
                    hoverAudio: "audio/quiz-answers/mars-quiz-voice.mp3"
                },
                {
                    text: "Venus",
                    hoverAudio: "audio/quiz-answers/venus-quiz-voice.mp3"
                },
                {
                    text: "Earth",
                    hoverAudio: "audio/quiz-answers/earth-quiz-voice.mp3"
                },
                {
                    text: "Neptune",
                    hoverAudio: "audio/quiz-answers/neptune-quiz-voice.mp3"
                }
            ],
            correct: "Earth",
            audio: "audio/quiz-question/question-6voice.mp3"
        }
    ];




    /****************************** GLOBAL VARIABLES **************************************/
    let currentQuestionIndex = 0; // Track the current question
    let score = 0; // Keep track of the score
    let attempts = 3; // Track attempts per question
    let questionAudio = null; // Variable to store question audio
    let hoverAudio = null; // Variable to manage hover audio

    /****************************** LOAD QUESTION *****************************************/
    // Function to load and display a question
    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex]; // Get the current question
        questionEl.textContent = currentQuestion.question; // Display the question text

        // Stop any previous question audio
        if (questionAudio) {
            questionAudio.pause();
            questionAudio.currentTime = 0;
        }

        // Play question audio
        questionAudio = new Audio(currentQuestion.audio);
        questionAudio.play().catch((error) => console.warn("Audio playback failed:", error));

        // Clear previous answers
        answersEl.innerHTML = "";

        // Create answer buttons dynamically
        currentQuestion.answers.forEach((answer) => {
            const button = document.createElement("button");
            button.classList.add("answer");
            button.textContent = answer.text;

            button.addEventListener("mouseenter", () => {
                // Check if the question audio is playing
                if (questionAudio && !questionAudio.paused) {
                    console.warn("Question audio is still playing. Hover audio cannot play.");
                    return; // Do not play hover audio if question audio is playing
                }
            
                // Stop previous hover audio
                if (hoverAudio) {
                    hoverAudio.pause();
                    hoverAudio.currentTime = 0;
                }
            
                // Play hover audio
                hoverAudio = new Audio(answer.hoverAudio);
                hoverAudio.play().catch((error) => console.warn("Hover audio playback failed:", error));
            });
            

            // Stop audio when hover ends
            button.addEventListener("mouseleave", () => {
                if (hoverAudio) {
                    hoverAudio.pause();
                    hoverAudio.currentTime = 0;
                }
            });

            // Handle answer click event
            button.addEventListener("click", () => checkAnswer(answer.text));
            answersEl.appendChild(button);
        });

        // Reset feedback and attempts
        feedbackEl.classList.add("hidden");
        nextQuestionBtn.classList.add("hidden");
        attempts = 3;
    }

    /************************** REPLAY QUESTION AUDIO *************************************/
    // Function to replay the question audio
    function replayQuestionAudio() {
        if (questionAudio) {
            questionAudio.currentTime = 0;
            questionAudio.play().catch((error) => console.warn("Replay audio failed:", error));
        }
    }

    /***************************** CHECK ANSWER ******************************************/
    // Function to check if the selected answer is correct
    function checkAnswer(answer) {
        const currentQuestion = questions[currentQuestionIndex];
        if (answer === currentQuestion.correct) {
            // Correct answer logic
            score++;
            feedbackEl.textContent = "Correct!";
            feedbackEl.style.color = "#00CE70";
            feedbackEl.classList.remove("hidden");
            correctSound.play();
            setTimeout(nextQuestion, 2000);
        } else {
            // Incorrect answer logic
            attempts--;
            feedbackEl.textContent = attempts > 0 ?
                `Try again, ${attempts} attempts left.` :
                `The correct answer was ${currentQuestion.correct}`;
            feedbackEl.style.color = "#fa0202";
            feedbackEl.classList.remove("hidden");
            wrongSound.play();
            if (attempts <= 0) setTimeout(nextQuestion, 2000);
        }
    }

    /************************** LOAD NEXT QUESTION ***************************************/
    // Function to move to the next question or finish the quiz
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            // Save quiz results to localStorage
            localStorage.setItem("quizScore", score);
            localStorage.setItem("totalQuestions", questions.length);
            localStorage.setItem("trophyEarned", score === questions.length ? "true" : "false");
            localStorage.setItem(
                "quizMessage",
                score === questions.length ?
                "Congratulations! You earned the Space Trophy!" :
                "Good effort! Try again to earn the Space Trophy!"
            );

            // Redirect to the quiz results page
            window.location.href = "quiz-endPage.html";
        }
    }

    /***************************** START THE QUIZ ****************************************/
    loadQuestion(); // Load the first question

    // Assign replay function to the replay audio button
    document.getElementById("replay-audio").onclick = replayQuestionAudio;
});
