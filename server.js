const express = require('express');

const db = require('./data/db-config.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
    try {
        const cars = await db('cars');
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Couldn\'t get the cars.' });
    }
});

module.exports = server;
