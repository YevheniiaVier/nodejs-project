const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { Contact } = require("../../models");
const { RequestError } = require("../../errorHandlers/");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const AVATAR_SIZE = 250;

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  console.log(req.params);
  const { contactId: id } = req.params;
  const avatarName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);

    const image = await Jimp.read(resultUpload);
    await image.cover(AVATAR_SIZE, AVATAR_SIZE).write(resultUpload);

    const avatarURL = path.join("public", "avatars", avatarName);

    await Contact.findByIdAndUpdate(req.params.contactId, { avatarURL });
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
