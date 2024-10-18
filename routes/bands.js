// routes/bands.js
const express = require('express');
const { Band, Musician } = require('../models');
const router = express.Router();

// GET /bands
router.get('/', async (req, res) => {
    try {
        const bands = await Band.findAll({ include: 'musicians' });
        res.json(bands);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve bands' });
    }
});

// GET /bands/:id
router.get('/:id', async (req, res) => {
    try {
        const band = await Band.findByPk(req.params.id, { include: 'musicians' });
        if (band) {
            res.json(band);
        } else {
            res.status(404).json({ error: 'Band not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve band' });
    }
});

module.exports = router;
