const { User } = require('../models/index');

const getSerializedProfile = {
  'google': profile => (
    {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      photoUrl: profile.photos[0].value,
      profileId: profile.id,
      profileProvider: profile.provider,
    }
  ),
  'vkontakte': profile => (
    {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.email,
      photoUrl: profile.photos[1].value,
      profileId: profile.id.toString(),
      profileProvider: profile.provider,
    }
  ),
};

exports.create = async (profile) => {
  const profileSerialized = getSerializedProfile[profile.provider](profile);

  const res = await User.findOrCreate({
    where: {
      profileId: profileSerialized.profileId,
      profileProvider: profileSerialized.profileProvider,
    },
    defaults: profileSerialized
  });

  return res;
};