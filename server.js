const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
app.use(express.json());

app.use(cors());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movies'
});

conn.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected to the database');
});

app.get('/', (req, res) => {
    const sqlQuery = "SELECT * FROM movie";
    conn.query(sqlQuery, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(data);
    });
});

app.get('/movie/:id', (req, res) => {
    const movieId = req.params.id;
    const sqlQuery = "SELECT * FROM movie WHERE director_id = ?";
    conn.query(sqlQuery, [movieId], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(data[0]);
    });
});

app.post('/create', (req, res) => {
    const sqlQuery = "INSERT INTO movie(director_id, movie_name, lead_actor) VALUES (?)";
    const values = [
        req.body.id,
        req.body.name,
        req.body.actor
    ];

    conn.query(sqlQuery, [values], (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    });
});

app.put('/edit/:id', (req, res) => {
    const movieId = req.params.id;
    const { director_id, movie_name, lead_actor } = req.body;
    const sqlQuery = "UPDATE movie SET director_id = ?, movie_name = ?, lead_actor = ? WHERE director_id = ?";
    conn.query(sqlQuery, [director_id, movie_name, lead_actor, movieId], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(data);
    });
});

// DELETE endpoint
app.delete('/movie/:id', (req, res) => {
    const sqlQuery = "DELETE FROM movie WHERE director_id = ?";
    const directorId = req.params.id;

    conn.query(sqlQuery, [directorId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Movie deleted successfully' });
    });
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
