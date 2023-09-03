const express = require("express");
const apiControllers = require("../../controllers/api/userApiControllers");

const router = express.Router();

//@GET - /api/user
router.get("/", apiControllers.getAll);
//@GET - /api/user/:id
router.get("/:id", apiControllers.getUser);


module.exports = router;