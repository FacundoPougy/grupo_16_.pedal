const path = require("path");
const express = require("express");
const registerController = require("../controllers/registerController.js");
const userValidation = require("../middlewares/Validations/userValidations.js");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/users/");
  },
  filename: (req, file, cb) => {
    console.log(path.extname(file.originalname));
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});

router.get("/", registerController.getRegister);

module.exports = router;

// @POST - /register
router.post(
  "/",
  [upload.any("image")],
  [userValidation.registerValidation] /* cambió el nombre del middleware */,
  registerController.registerUser
);
