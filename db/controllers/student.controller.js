const { Student } = require('../models/index');

exports.create = (body) => Student.create(body);