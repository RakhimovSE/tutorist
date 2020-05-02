const { User } = require('../models');

const getSerializedProfile = {
  'google': profile => (
    {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      middleName: null,
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
      middleName: null,
      email: profile.email,
      photoUrl: profile.photos[1].value,
      profileId: profile.id.toString(),
      profileProvider: profile.provider,
    }
  ),
  'yandex': profile => (
    {
      firstName: profile.name.familyName,
      lastName: profile.name.givenName,
      middleName: null,
      email: profile.emails[0].value,
      photoUrl: `https://avatars.mds.yandex.net/get-yapic/${profile._json.default_avatar_id}/islands-200`,
      profileId: profile.id,
      profileProvider: profile.provider,
    }
  ),
};

exports.get = (userId) => {
  return User.findByPk(userId);
}

exports.create = (profile) => {
  const profileSerialized = getSerializedProfile[profile.provider](profile);

  return User.findOrCreate({
    where: {
      profileId: profileSerialized.profileId,
      profileProvider: profileSerialized.profileProvider,
    },
    defaults: profileSerialized
  });
};