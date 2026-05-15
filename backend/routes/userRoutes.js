const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT id, username, email FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;