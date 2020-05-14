const { Contact, Student } = require('~root/db/models');

exports.get = (contactId) => {
    return Contact.findByPk(contactId, {
        where: {
            deleted: false,
            archived: false
        },
        include: [{
            model: Student,
            where: {
                deleted: false,
                archived: false
            }
        }]
    });
};

exports.create = (data) => {
    return Contact.create(data);
};

exports.bulkCreate = (data, options) => {
    return Contact.bulkCreate(data, options);
}

exports.update = (contactId, data) => {
    return Contact.update(data, {
        where: { id: contactId }
    });
};

exports.delete = async (contactId) => {
    await Student.update({ deleted: true }, {
        where: { id: contactId }
    });
    return true;
}