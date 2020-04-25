const { Students } = require('../models/index');

exports.create = (body) => Students.create(body);