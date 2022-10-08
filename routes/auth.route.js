const router = require("express").Router();
const {login, register} = require("../controllers/auth.controller");
const { sendMail } = require("../controllers/mail.controller");


router.post("/register", register);

router.post('/login', login);

module.exports = router;