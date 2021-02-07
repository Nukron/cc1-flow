const express = require('express');
const router = express.Router();

const Event = require('../models/Event');

router.get('/', async (req, res) => {
    try {

        //TODO: Implement getting Event infos
    }

    catch {

    
    }
})

router.post('/', async (req, res) => {
    try {
        //TODO: Implement add event
    }

    catch {

    }
});

router.delete('/', async (req, res) => {
    try {
        //TODO: Implement remove event
    }

    catch {

    }
});

router.put('/', async (req, res) => {
    try {
        //TODO: Implement update event, for vetos
    }

    catch  {

    }
})

module.export = router;