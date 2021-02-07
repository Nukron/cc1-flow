const express = require('express');
const router = express.Router();

const Session = require('../models/Session');
const Event = require('../models/Event');

router.get('/', async (req, res) => {

    try
    {
        //TODO: Implement load events & render/serve Webpage?
    }
    catch (err)
    {
        console.error('ERROR: ', err.message);
        res.render('index', {errors: [{text: 'Couldn\'t load a story, sorry.'}]});
    }
});

module.exports = router;