let express = require('express');
let router = express.Router();
const studentsAssignmentController = require('../db/controllers/studentAssignment.controller')

router.get('/', (req, res, next) => {
    res.send('empty space');
});

router.post('/', (req, res, next) => {
    const info = {...req.body, archived: false, deleted: false, note: "Some data"}
    studentsAssignmentController.create(info)
        .then(() => res.status(200).json(info));
});

module.exports = router;
