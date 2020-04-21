const { User } = require('../models/index');

exports.create = async (profile) => {
  const res = await User.findOrCreate({
    where: { profileId: profile.id, profileProvider: profile.provider },
    defaults: {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      profileUrl: profile.photos[0].value,
      profileId: profile.id,
      profileProvider: profile.provider,
    }
  });

  return res;
};