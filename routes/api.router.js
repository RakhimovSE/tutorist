let express = require('express');
let router = express.Router();

const contactTypeController = require('../db/controllers/contact-type.controller')
const contactController = require('../db/controllers/contact.controller')

router.get('/contacttypes', (req, res) => {
    setTimeout(() => {
        contactTypeController.findAll()
            .then((types) => res.status(200).json(types))
            .catch((err) => console.log(err))
    }, 1000);
})

module.exports = router;
