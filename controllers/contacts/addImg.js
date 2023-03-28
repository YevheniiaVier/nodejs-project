// // const { Contact } = require("../../models");
// // const { RequestError } = require("../../errorHandlers");
// const path = require("path");
// const fs = require("fs/promises");

// const tempDir = path.join(__dirname, "../../temp");
// console.log(tempDir);
// const contactsDir = path.join(__dirname, "../../public", "contacts");
// // console.log(contactsDir);

// const addImg = async (req, res) => {
//   console.log(req.file, "req.file");

//   const { path: tempUpload, originalname } = req.file;
//   const resultUpload = path.join(contactsDir, originalname);
//   try {
//     await fs.rename(tempUpload, resultUpload);
//   } catch (error) {
//     await fs.unlink(tempUpload);
//   }
// };

// module.exports = addImg;
