const Sequelize = require('sequelize');
const db = require('../../config/database');

const Student = db.define('Students', {
    archived: Sequelize.BOOLEAN,
    deleted: Sequelize.BOOLEAN,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    middleName: Sequelize.STRING,
    photoUrl: Sequelize.STRING,
    role: Sequelize.STRING
})

module.exports = Student;