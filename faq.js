function toggleAnswer(index) {
    const answerElement = document.getElementById(`answer-${index}`);
    const isVisible = answerElement.style.display === "block";

    // Hide all answers first
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.display = 'none';
    });

    // Toggle the clicked answer
    if (!isVisible) {
        answerElement.style.display = "block";
    } else {
        answerElement.style.display = "none";
    }
}
