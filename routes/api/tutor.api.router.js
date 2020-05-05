const express = require('express')
const router = express()
let helpers = require('../helpers');
const userController = require('../../db/controllers/user.controller')


router.put('/update', helpers.ensureAuthenticatedApi, async (req, res) => {
     const user = await userController.update(req.user.id, req.body);
     res.status(200).json(user);
})



module.exports = router;