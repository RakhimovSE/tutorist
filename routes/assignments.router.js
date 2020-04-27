let express = require('express');
let router = express.Router();
const assignmentController = require('../db/controllers/assignment.controller')

router.get('/', (req, res, next) => {
    res.send('empty space');
});

router.post('/', (req, res, next) => {
    const info = {...req.body, archived: false, deleted: false, data: "Some data"}
    assignmentController.create(info)
        .then(() => res.status(200).json(info));
});

module.exports = router;
