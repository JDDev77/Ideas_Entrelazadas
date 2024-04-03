const mongoCon = require("../config/mongoDB.config");
const Usuario = require("../models/usuarios.model");
const bcrypt = require("bcrypt");

const ejecutar = async () => {
    await mongoCon
        .conectarMongoDB()
        .then(() => {
            console.log("Conectado");
        })
        .catch((err) => {
            console.log(err);
        });

   
    const usuarios = [
        {
            nombre: "Juan",
            apellido1: "Fetido",
            apellido2: "McFetido",
            //TODO mirar como hacer que la hora al insertar la fecha no sea todo 00
            fechaNac: new Date("1993-07-07"),
            username: "juan",
            password: "juan123",
            profile: "ADMIN",
            url: "http://example.com/juan.jpg",
        },
        {
            nombre: "Alejandro",
            apellido1: "Fetido",
            apellido2: "McFetido",
            fechaNac: new Date("2003-11-26"),
            username: "alejandro",
            password: "alejandro123",
            profile: "USER",
            url: "http://example.com/alejandro.jpg",
        },
    ];

    // Encripta las contraseñas antes de insertar
    for (let usuario of usuarios) {
        const hashedPassword = await bcrypt.hash(usuario.password, 12);
        usuario.password = hashedPassword;
    }

    await Usuario
        .insertMany(usuarios)
        .then((res) => {
            console.log("Usuarios insertados", res);
        })
        .catch((err) => {
            console.error("Error insertando usuarios", err);
        });

    await mongoCon.close();
    console.log("Usuarios agregados correctamente")
    console.log("Conexión cerrada");
    process.exit();
};

ejecutar();
