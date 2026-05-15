const express = require('express');
const router = express.Router();
const db = require('../db');


router.post('/', async (req, res) => {
    const { question_id, user_id, body } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO answers (question_id, user_id, body) VALUES ($1, $2, $3) RETURNING *',
            [question_id, user_id, body]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/:questionId', async (req, res) => {
    try {
        const { questionId } = req.params;
        const result = await db.query(
            'SELECT * FROM answers WHERE question_id = $1 ORDER BY created_at ASC',
            [questionId]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;