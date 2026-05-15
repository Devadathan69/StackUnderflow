const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    const { title, body, user_id } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO questions (title, body, user_id) VALUES ($1, $2, $3) RETURNING *',
            [title, body, user_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM questions ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM questions WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;