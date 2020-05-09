const { ContactType } = require('~root/db/models');

exports.list = () => {
  return ContactType.findAll();
}