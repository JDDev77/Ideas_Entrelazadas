const mongoose = require("mongoose") //npm i mongoose

const usuarioSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    apellido1:{
        type:String,
        required:true
    },
    apellido2:{
        type:String,
        required:true
    },
    fechaNac:{
        type:Date,
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    profile: { // Implementación de roles
        type: String,
        required: true,
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