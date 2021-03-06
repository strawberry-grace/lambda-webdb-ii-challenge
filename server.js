const express = require('express');

const db = require('./data/db-config.js');

const server = express();

server.use(express.json());

// FOR CARS

server.get('/cars', async (req, res) => {
    try {
        const cars = await db('cars');
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Oops. Internal server error', error });
    }
});

server.get('/cars/:id', async (req, res) => {
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

server.post('/cars', async (req, res) => {
    const carData = req.body;
    try {
        const [ newCarId ] = await db('cars').insert(carData);
        const newCar = await db('cars').where('id', '=', newCarId);
        res.status(201).json(newCar);
    } catch (error) {
        res.status(500).json({ message: 'Oops. Internal server error.', error });
    }
});

server.put('/cars/:id', async (req, res) => {
    const { id } = req.params;
    const carData = req.body;
    try {
        const count = await db('cars').where({ id }).update(carData);
        if (count) {
            res.status(200).json({ updated: count });
        } else {
            res.status(404).json({ message: 'Couldn\'t find the car with this ID' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Oops. Internal server error', error });
    }
});

server.delete('/cars/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const count = await db('accounts').where({ id }).del();
        if (count) {
            res.status(200).json({ deleted: count });
        } else {
            res.status(404).json({ message: 'Couldn\'t find the post with this ID' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Oops. Internal server error', error });
    }
});

// FOR SALES

server.get('/sales', async (req, res) => {
    try {
        const sales = await db('sales');
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Oops. Internal server error', error });
    }
});

module.exports = server;
