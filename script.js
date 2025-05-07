// Typing Animation for the Words
const words = ["MERN Developer.", "Tech Enthusiast.", "Programmer."];

let currentWordIndex = 0;
let letterIndex = 0;
let isTyping = true; // Flag to track typing or backspacing
const speed = 100; // Typing speed
const backspaceSpeed = 50; // Backspacing speed
const pauseTime = 1000; // Pause time before switching words
const element = document.querySelector(".animated-words");

// Function to handle typing and backspacing
function typeWord() {
    return new Promise((resolve) => {
        let interval;
        if (isTyping) {
            // Typing animation
            interval = setInterval(() => {
                element.textContent = words[currentWordIndex].substring(0, letterIndex);
                letterIndex++;

                if (letterIndex > words[currentWordIndex].length) {
                    clearInterval(interval);
                    setTimeout(() => {
                        isTyping = false; // Switch to backspacing
                        resolve();
                    }, pauseTime);
                }
            }, speed);
        } else {
            // Backspacing animation
            interval = setInterval(() => {
                element.textContent = words[currentWordIndex].substring(0, letterIndex);
                letterIndex--;

                if (letterIndex === 0) {
                    clearInterval(interval);
                    isTyping = true; // Switch to next word typing
                    currentWordIndex = (currentWordIndex + 1) % words.length; // Cycle through words
                    resolve();
                }
            }, backspaceSpeed);
        }
    });
}

// Start the typing animation loop
async function startTyping() {
    while (true) {
        await typeWord(); // Wait for each word's typing/backspacing cycle
    }
}
startTyping();

// Initialize EmailJS
// Initialize EmailJS
emailjs.init("AsIk_O_88xiAZiKqp"); // Replace with your EmailJS Public Key

// Add event listener for the form submission
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const name = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validate form fields
    if (!name || !email || !message) {
        alert("All fields are required. Please fill them in.");
        return;
    }

    // Debug: Log the data being sent
    console.log("Sending data:", { name, email, message });

    // Send the email using EmailJS
    emailjs
        .send("service_dgkj2kw", "template_ud3nb49", {
            user_name: name,
            user_email: email,
            user_message: message,
        })
        .then(
            function (response) {
                alert("Message sent successfully!");
                console.log("SUCCESS!", response.status, response.text);
                // Clear the form after successful submission
                document.getElementById("contact-form").reset();
            },
            function (error) {
                alert("Failed to send the message. Please try again.");
                console.error("EmailJS Error:", error);
            }
        );
});



