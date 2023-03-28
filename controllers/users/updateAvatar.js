const path = require("path");
const fs = require("fs/promises");

const { User } = require("../../models");
const { RequestError } = require("../../errorHandlers/");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const avatarName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", avatarName);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({
      status: "success",
      code: 200,
      message: "Avatar is uploaded",
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw new RequestError(401, `Not authorized`);
  }
};

module.exports = updateAvatar;
