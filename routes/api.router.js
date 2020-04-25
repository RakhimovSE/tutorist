let express = require('express');
let router = express.Router();
const studentController = require('../db/controllers/student.controller')


router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

/*
router.get('/addstudent', (req, res) => {
    setTimeout(() => {
        res.status(200).json(student)
    }, 1000)
});*/

router.post('/addstudent', (req, res) => {
    let formData = req.body
    if (!formData.lastName)
        console.log('yes');
    studentController.create(formData)
    res.status(200).json(formData)
})

module.exports = router;
