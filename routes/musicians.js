const express = require("express");
const app = express();
const Musician = require("../models/Musician.js")
const db = require("../db/connection.js");
const { where } = require("sequelize");

const router = express.Router();
const {check, validationResult} = require("express-validator")

app.use(express.json());
app.use(express.urlencoded({extended: true}));

router.get("/", 
    async (req, res) => {
    let musicians = await Musician.findAll()
    res.json(musicians)
})

router.get("/:id", async (req, res) => {
    let musician = await Musician.findByPk(req.params.id)
    res.json(musician)
})

router.post(
    '/',
    [
        check('name')
            .trim()
            .notEmpty().withMessage('Name is required.')
            .isLength({ min: 2, max: 20 }).withMessage('Name must be between 2 and 20 characters.'),
        check('instrument')
            .trim()
            .notEmpty().withMessage('Instrument is required.')
            .isLength({ min: 2, max: 20 }).withMessage('Instrument must be between 2 and 20 characters.')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const newMusician = await Musician.create(req.body);
            res.status(201).json(newMusician);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create musician' });
        }
    }
);

router.put("/:id",
    [
        check('name')
            .trim()
            .notEmpty().withMessage('Name is required.')
            .isLength({ min: 2, max: 20 }).withMessage('Name must be between 2 and 20 characters.'),
        check('instrument')
            .trim()
            .notEmpty().withMessage('Instrument is required.')
            .isLength({ min: 2, max: 20 }).withMessage('Instrument must be between 2 and 20 characters.')
    ], async (req, res) => {
    const updatedMusician = await Musician.update(req.body, {where: {id: req.params.id}});
    let musicians = await Musician.findAll()
    res.json(musicians)
})

router.delete("/:id", async (req, res) => {
    const deletedMusician = await Musician.destroy({where: {id: req.params.id}})
    let musicians = await Musician.findAll()
    res.json(musicians)
})

module.exports = router;
