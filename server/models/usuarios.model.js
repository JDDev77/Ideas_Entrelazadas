const mongoose = require("mongoose") //npm i mongoose

const usuarioSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:false
    },
    apellido1:{
        type:String,
        required:false
    },
    apellido2:{
        type:String,
        required:false
    },
    fechaNac:{
        type:Date,
        required:false
    },
    username:{
        type:String,
        required:false,
    },
    password:{
        type:String,
        required:false
    },
    profile: { // Implementación de roles
        type: String,
        required: false,
        enum: ["ADMIN", "USER"]
    },
    url: { // Para almacenar URL de fotos
        type: String,
        required: false // Si no todas las fotos son obligatorias, cambiar a false
    }

})

const Usuario = mongoose.model("Usuarios", usuarioSchema)

Usuario.findByUsername = async function(username_param, result){
    const userFound = await Usuario.findOne({ username: username_param})
    if(userFound){
        result(userFound,null)
    }else{
        result(null, {"err":"No hay usuarios con ese username"})
        
    }
}
module.exports = Usuario