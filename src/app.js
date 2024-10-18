// src/app.js
const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")
const { where } = require("sequelize");

const router = require("./routes/musicians.js")
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET /musicians route
app.get('/musicians', async (req, res) => {
    try {
        const musicians = await Musician.findAll();
        res.json(musicians);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve musicians' });
    }
});

// GET /musicians/:id route
app.get('/musicians/:id', async (req, res) => {
    try {
        const musician = await Musician.findByPk(req.params.id);
        if (musician) {
            res.json(musician);
        } else {
            res.status(404).json({ error: 'Musician not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve musician' });
    }
});

// POST /musicians route
app.post('/musicians', async (req, res) => {
    try {
        const newMusician = await Musician.create(req.body);
        res.status(201).json(newMusician);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create musician' });
    }
});

// PUT /musicians/:id route
app.put('/musicians/:id', async (req, res) => {
    try {
        const musician = await Musician.findByPk(req.params.id);
        if (musician) {
            await musician.update(req.body);
            res.json(musician);
        } else {
            res.status(404).json({ error: 'Musician not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to update musician' });
    }
});

// DELETE /musicians/:id route
app.delete('/musicians/:id', async (req, res) => {
    try {
        const musician = await Musician.findByPk(req.params.id);
        if (musician) {
            await musician.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Musician not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete musician' });
    }
});



module.exports = app;
