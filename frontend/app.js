document.getElementById('recommendationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Normalize dropdown values
    const normalizeDuration = (duration) => {
        if (duration.includes("90-120")) return "Medium";
        if (duration.includes("under 90")) return "Short";
        if (duration.includes("over 120")) return "Long";
        return duration;
    };

    // Fetch input values and normalize
    const genre = document.getElementById('genre').value;
    const rawDuration = document.getElementById('duration').value;
    const duration = normalizeDuration(rawDuration);
    const mood = document.getElementById('mood').value;

    console.log("Submitting:", { genre, duration, mood });

    try {
        const response = await fetch('http://localhost:5000/recommend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ genre, duration, mood })
        });

        const data = await response.json();
        console.log("Response from Server:", data);
        document.getElementById('result').textContent = data.message;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('result').textContent = "Something went wrong. Please try again later.";
    }
});
