const { User } = require('../models/index');

exports.create = async (data) => {
  const res = await User.findOrCreate({
    where: { accountId: data.accountId, accountType: data.accountType },
    defaults: data
  });

  return res;
};