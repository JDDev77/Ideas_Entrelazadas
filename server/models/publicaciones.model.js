/*
TODO FALTA INVESTIGAR LOS CAMPOS NECESARIOS E INVESTIGAR COMO INTEGRARLO
*/ 
const mongoose = require("mongoose")

const publicacionesSchema = new mongoose.Schema({
    comentario:{
        type:String,
        required:true
    },
    imagen:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    }

})

const Publicacion = mongoose.model("Publicaciones", publicacionesSchema)
module.exports = Publicacion
