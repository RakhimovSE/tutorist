let express = require('express');
let router = express.Router();
const studentController = require('../db/controllers/student.controller')

let student = [{archived: false,
    deleted: false,
    firstName: '',
    lastName: '',
    middleName: '',
    photoUrl: '',
    role: ''}]

router.get('/addstudent', (req, res) => {
    setTimeout(() => {
        res.status(200).json(student)
    }, 1000)
});

router.post('/addstudent', (req, res) => {
    student = req.body;
    studentController.create(student)
    res.redirect('/');
})

module.exports = router;
