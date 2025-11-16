export const userDataFilterFunction = (user) => {
  if (!user) return null;

  const u = typeof user.toObject === "function" ? user.toObject() : user;

  const {
    _id,
    firstName,
    lastName,
    about,
    email,
    gender,
    profilePic,
    age,
    isVerified,
    createdAt,
    updatedAt,
  } = u;

  return {
    _id,
    firstName,
    lastName,
    about,
    email,
    gender,
    profilePic,
    age,
    isVerified,
    createdAt,
    updatedAt,
  };
};
