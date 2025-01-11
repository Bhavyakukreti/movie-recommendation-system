const express = require('express');
const cors = require('cors');
const movies = require('./data/movies.json');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/recommend', (req, res) => {
    const { genre, duration, mood } = req.body;

    console.log("Received Input:", { genre, duration, mood });

    // Match user preferences with movies
    const recommendation = movies.find(
        movie =>
            movie.genre === genre &&
            movie.duration === duration &&
            movie.mood === mood
    );

    if (recommendation) {
        console.log("Recommendation Found:", recommendation);
        res.json({
            message: `Based on your preferences, we recommend watching "${recommendation.title}" — ${recommendation.description}.`
        });
    } else {
        console.log("No exact match found.");
        const fallback = movies[Math.floor(Math.random() * movies.length)];
        console.log("Fallback Recommendation:", fallback);
        res.json({
            message: `${fallback.title}" — ${fallback.description}.`
        });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
