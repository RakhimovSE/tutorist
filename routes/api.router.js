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

router.post('/addcontact', (req, res) => {
    contactController.create(req.body)
        .then(() => res.status(200).json(req.body))
})

router.get('/contacts', (req, res) => {
    setTimeout(() => {
        contactController.findAll({
            where: {
                deleted: false,
                archived: false
            }
            // Нужен фильтр для оптимизации, по массиву студентов не выгодно, придется сравнивать контакт с каждым id
            // студента. Предлагаю добавить в contacts поле tutorId, чтобы все за раз выкачать
        })
            .then((contacts) => res.status(200).json(contacts))
            .catch((err) => console.log(err))
    }, 1000);
})

router.put('/changecontact/:id', (req, res) => {
    contactController.update(
        {value: req.body.value},
        {where: {id: req.params.id}}
    )
        .then(() => res.status(200).json({message: 'Contact has been changed'}))
        .catch(err => console.log(err));
})

router.delete('/removecontact/:id', (req, res) => {
    contactController.update(
        {deleted: true},
        {where: {id: req.params.id}}
    )
        .then(() => res.status(200).json({message: 'Contact has been deleted'}))
        .catch(err => console.log(err));
})

module.exports = router;
