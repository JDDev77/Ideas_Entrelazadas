const mongoose = require("mongoose")
const mongoConn = mongoose.createConnection()

mongoConn.conectarMongoDB = async()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/Ideas_Entrelazadas")
}

mongoConn.establecerConexion = async()=>{
    try{
        await mongoConn.conectarMongoDB()
        .then(()=>{
            console.log("Conectado con MongoDB")
        })
        .catch((err)=>{
            console.log("Error 1 conectando con MongoDB: " + err)
            process.exit(0)
        })
    }catch(error){
        console.log("Error 2 conectando con MongoDB: " + error) 
        process.exit(0)
    }
}

module.exports = mongoConn