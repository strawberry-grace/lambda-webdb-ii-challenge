const express = require('express');

const db = require('./data/db-config.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
    try {
        const cars = await db('cars');
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Oops. Internal server error', error });
    }
});

server.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const car = await db('cars').where({ id });
        if (car) { 
            res.status(200).json(car);
        } else {
            res.status(404).json({ message: 'Couldn\'t find the car with this ID' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Oops. Internal server error.', error });
    }
});

server.post('/', async (req, res) => {
    const carData = req.body;
    try {
        const [ newCarId ] = await db('cars').insert(carData);
        const newCar = await db('cars').where('id', '=', newCarId);
        res.status(201).json(newCar);
    } catch (error) {
        res.status(500).json({ message: 'Oops. Internal server error.', error });
    }
});

module.exports = server;
