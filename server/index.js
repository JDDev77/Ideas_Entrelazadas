const express = require("express")
const app = express()
const methodOverride = require("method-override")
const cors = require("cors")
const port = process.env.PORT || 9010
const path = require("path")
//const alquileresRoutes = require("./routes/alquileres.routes")
//const usersRoutes = require("./routes/usuarios.routes")
const rutasLogin = require("./routes/login.routes.js")
const version = "v1"
const cookieParser = require("cookie-parser")
const session = require("express-session")
const logger = require("./logger.js")
const fs = require("fs")
const morgan = require("morgan")
const mongoConn = require("./config/mongoDB.config")
//const dbConn = require("./config/mysqlDB.config.js")
const errorHandler = require("./middlewares/errorHandler.mw.js")
//const https = require("https")
//const motosRoutes = require("./routes/motos.routes.js")
require("dotenv").config()
const { generateApiKey } = require("generate-api-key")
const apiKey = require("./middlewares/apiKey.mw")
const passport = require("passport")
const { requireAdmin } = require("../server/middlewares/login.mw.js")
const Event = require("./models/calendario.model")
const whiteList = ["http://127.0.0.1:5500", "http://localhost:3000"] //IP FrontEnd
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1) {
      console.log(origin) //Si el origen (URL que ataca a mi BackEnd está dentro de la lista blanca)
      callback(null, true) //Continuar == NEXT
    } else {
      //callback(new AppError("CORS Solicitud Bloqueada", 401))
      callback(null, false) //Permitir llamadas desde el propio BackEnd
    }
  },
  credentials: true,
}

app.use(session({ secret: "123456789" }))
//app.use(cors()) //aceptar todo tipo de entrada a nuestro API REST
app.use(cors(corsOptions)) //aceptar entradas de la lista blanca
app.set("views", path.join(__dirname, "views"))
app.set("view_engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static("public"))

app.use(methodOverride("_method"))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//app.use(`/api/${version}/alquileres`, requireAdmin, alquileresRoutes)
//app.use(`/api/${version}/usuarios`, requireAdmin, usersRoutes)
app.use(`/`, rutasLogin)
//app.use("/api", motosRoutes)

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find()
    res.json(events)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.use(errorHandler)
app.listen(port, () => {
  console.log("http://localhost:" + port);
  mongoConn.establecerConexion()
    .then(() => {
    // Asumiendo que logger.access.debug es una función válida en tu configuración
      logger.access.debug(`Servidor corriendo en https://localhost:${port}`);
    })
    .catch((err) => {
      console.error("Error conectando con MongoDB:", err);
      process.exit(1);
    });
});
