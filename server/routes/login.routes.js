
const controladorLogin = require("../controllers/login.controller");
const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const fs = require("fs");
const verificar = require("../middlewares/verificar.mw");
const AppError = require("../AppError");
const errorHandler = require("../middlewares/errorHandler.mw");
//const sessionMiddleware = require("../middlewares/session.mw");
//const cookieParserMiddleware = require("../middlewares/cookie-parser.mw");
const { requireLogin, requireAdmin } = require("../middlewares/login.mw")
const basicAuth = require("../middlewares/basicAuth.mw")

  morgan("combined", {
    stream: fs.createWriteStream("./logs/access.log", { flags: "a" }),
  })


//router.use(cookieParserMiddleware)
//router.use(sessionMiddleware)

//router.get("/index", controladorLogin.renderIndexPage)
//router.get("/area-personal",requireAdmin, controladorLogin.renderAreaPersonalPage)
router.get("/usuarios", controladorLogin.findAllUsers)
router.get("/", controladorLogin.renderLogin)
router.post("/", controladorLogin.login)
router.get("/pruebas", controladorLogin.renderPrueba)

router.get("/reg", controladorLogin.registerLogin)
router.post("/reg", controladorLogin.createUserLogin)

//router.get("/logout", controladorLogin.logout)

//router.get("/main", controladorLogin.renderMain)
/*router.use((req, res, next) => {
    throw new AppError("Ruta no existente", 404) 
}) 
*/
router.get("/auth/google", controladorLogin.passportAuthenticate)
router.get("/auth/google/callback", controladorLogin.passportCallback)
router.get("/auth/google/protected", controladorLogin.passportSuccess)
router.get("/auth/google/failure", controladorLogin.passportFailure)
router.get("/auth/google/logout", controladorLogin.passportLogout)

module.exports = router;