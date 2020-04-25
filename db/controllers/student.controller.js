const env = process.env.NODE_ENV || 'development';
const config = require('../../config/database.js')[env];
const Sequelize = require('sequelize');

let connection = new Sequelize(config.database, config.username, config.password, config)
let Student = connection.define('Students', {
    archived: Sequelize.BOOLEAN,
    deleted: Sequelize.BOOLEAN,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    middleName: Sequelize.STRING,
    photoUrl: Sequelize.STRING,
    role: Sequelize.STRING,
})

exports.create = (body) => Student.create(body)