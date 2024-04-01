const mongoCon = require("../config/mongoDB.config")
const Publicacion = require("../models/publicaciones.model")

const ejecutar = async () => {
    await mongoCon
      .conectarMongoDB()
      .then(() => {
        console.log("Conectado")
      })
      .catch((err) => {
        console.log(err)
      })
  
    const publicaciones = [
      {
        comentario: "Me comes el pijo",
        imagen : "Fetido",
        video : "McFetido",
      },
      {
        comentario: "Tu mas",
        imagen : "Fetido",
        video : "McFetido",
      }
    ]
  
    await Publicacion
      .insertMany(publicaciones)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  
    await mongoCon.close()
    process.exit()
  }
  
  ejecutar()