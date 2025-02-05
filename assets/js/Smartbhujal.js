document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const talkToUsBtns = document.querySelectorAll("#talkToUsBtn");
    const closeBtn = document.querySelector(".close-btn");
    const submitBtns = document.querySelectorAll(".submit-btn");

    // Open Modal for each "Talk to Us" button
    talkToUsBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            modal.style.display = "flex";
        });
    });

    // Close Modal
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Form Submission
    function submitForm() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (!name || !email || !message) {
            alert("Please fill all fields");
            return;
        }

        fetch("https://a6a3s2tnxe.execute-api.ap-south-1.amazonaws.com/prod/contact-us", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        })
        .then(response => response.json())
        .then(data => {
            alert("Message sent successfully!");
            modal.style.display = "none";
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to send message. Please try again later.");
        });
    }

    // Attach Submit Function to All Submit Buttons
    submitBtns.forEach(btn => {
        btn.addEventListener("click", submitForm);
    });
});
