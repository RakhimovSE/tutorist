let express = require('express');
let router = express.Router();

const contactTypeController = require('~root/db/controllers/contact-type.controller')

router.get('/contacttypes', (req, res) => {
    setTimeout(() => {
        contactTypeController.findAll()
            .then((types) => res.status(200).json(types))
            .catch((err) => console.log(err))
    }, 1000);
})

module.exports = router;
