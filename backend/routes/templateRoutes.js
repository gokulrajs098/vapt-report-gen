// backend/routes/templateRoutes.js
const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Template routes
    router.get('/templates', (req, res) => {
        res.json(db.templates);
    });

    router.post('/templates', (req, res) => {
        const newTemplate = { id: Date.now().toString(), ...req.body, createdAt: new Date().toISOString() };
        db.templates.push(newTemplate);
        res.status(201).json(newTemplate);
    });
    
    return router;
};
