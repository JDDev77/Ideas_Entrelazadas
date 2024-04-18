const mongoConn = require("../config/mongoDB.config")
const Usuario = require("../models/usuarios.model")
const wrapAsync = require("../utils/wrapAsync")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("../middlewares/auth-google.mw")
const passport = require("passport")

exports.findAllUsers = wrapAsync(async (req, res, next) => {
  try {
    await mongoConn.conectarMongoDB()
    const usuarios = await Usuario.find()
    res.status(200).json(usuarios)
  } catch (error) {
    console.error("Error al obtener usuarios:", error)
    next(error)
  } finally {
    await mongoConn.close()
  }
})

exports.findUserByUsername = wrapAsync(async (req, res, next) => {
  try {
    const { username } = req.params
    await mongoConn.conectarMongoDB()
    const usuarios = await Usuario.findOne({ username: username })
    if (usuarios) {
      res.status(200).json(usuarios)
    } else {
      res.status(404).json({ msg: "Usuario no encontrado" })
    }
  } catch (error) {
    console.error("Error al buscar usuario por nombre de usuario:", error)
    next(error)
  } finally {
    await mongoConn.close()
  }
})

exports.createUser = wrapAsync(async (req, res, next) => {
  try {
    await mongoConn.conectarMongoDB()
    const nuevoUsuario = new Usuario(req.body)
    await nuevoUsuario.save()
    res.redirect("/area-personal")
  } catch (error) {
    console.error("Error al crear usuario:", error)
    next(error)
  } finally {
    await mongoConn.close()
  }
})

exports.updateUser = wrapAsync(async (req, res, next) => {
  try {
    const { nif } = req.params
    await mongoConn.conectarMongoDB()
    const usParaActualizar = req.body
    await Usuario.findOneAndUpdate({ nif: nif }, usParaActualizar)
    res.redirect("/area-personal")
  } catch (error) {
    console.error("Error al actualizar usuario:", error)
    next(error)
  } finally {
    await mongoConn.close()
  }
})

exports.deleteUser = wrapAsync(async (req, res, next) => {
  try {
    const { nif } = req.params
    await mongoConn.conectarMongoDB()
    await Usuario.findOneAndDelete({ nif: nif })
    res.redirect("/area-personal")
  } catch (error) {
    console.error("Error al eliminar usuario:", error)
    next(error)
  } finally {
    await mongoConn.close()
  }
})
//TODO VER DONDE IMPLEMENTAR EL RENDEREDITUSER
/*
exports.renderEditUserPage = wrapAsync(async (req, res, next) => {
  try {
    const { nif } = req.params
    await mongoConn.conectarMongoDB()
    const usuario = await Usuario.findOne({ nif: nif })
    res.render("editMongo.ejs", { usuario: usuario })
  } catch (error) {
    console.error("Error al obtener datos de edición del usuario:", error)
    res.status(500).send("Error al obtener datos de edición del usuario.")
  } finally {
    await mongoConn.close()
  }
})
*/


//TODO VER DONDE IMPLEMENTAR EL RENDERSHOWUSER
/*
exports.renderShowUserPage = wrapAsync(async (req, res, next) => {
  const { nif } = req.params
  try {
    await mongoConn.conectarMongoDB()
    const usuario = await Usuario.findOne({ nif: nif })
    res.render("showMongo.ejs", {
      usuario: usuario,
      Usuario: req.session.usLoginLogued,
    })
  } catch (error) {
    console.error("Error al obtener página del usuario:", error)
    res.status(500).send("Error al obtener página del usuario.")
  } finally {
    await mongoConn.close()
  }
})

exports.renderCreateUserPage = wrapAsync(async (req, res, next) => {
  try {
    await mongoConn.conectarMongoDB()
    res.render("newMongo.ejs")
  } catch (error) {
    console.error("Error al obtener página de creación de usuario:", error)
    res.status(500).send("Error al obtener página de creación de usuario.")
  } finally {
    await mongoConn.close()
  }
})
*/

exports.renderErrorPage = async (req, res) => {
  res.render("error.ejs")
}


/*TODO REVISAR ESTE RENDER PARA SOLO USAR LOS DATOS DE MONGO
exports.renderIndexPage = wrapAsync(async (req, res) => {
    try {
      let alquileres
      let usuarios
  
      res.cookie("Pagina de inicio", "blue", { signed: true })
  
      alquileres = await Alquileres.findAll()
      usuarios = await Usuarios.find()
      res.render("index.ejs", {
        usuarios,
        alquileres,
        Usuario: req.session.usLoginLogued,
      })
    } catch (error) {
      console.log(error)
      res.render("error.ejs")
    }
  })
  */
  exports.renderAreaPersonalPage = wrapAsync(async (req, res, next) => {
    let usuarios
    usuarios = await Usuarios.find()
    res.render("area-personal.ejs", { usuarios })
  })
  
  exports.renderCookiePage = async (req, res) => {
    res.cookie("Pagina de la cookie", "green", { signed: true })
  }
  exports.renderLogin = (req, res) => {
    res.render("login.ejs")
  }
  exports.renderPrueba = (req,res) => {
    res.render("pruebas.ejs")
  }
  exports.registerLogin = (req, res) => {
    res.render("regUsu.ejs")
  }
  exports.renderMain = (req, res) => {
    res.render("main.ejs")
  }
  exports.createUserLogin = wrapAsync(async (req, res, next) => {
    try {
      await mongoConn.conectarMongoDB()
      const newUser = new Usuario(req.body)
      newUser.password = await bcrypt.hash(newUser.password, 12)
      //TODO al crear el usuario por defecto coge el rol user, cambiar a admin para crear uno
      newUser.profile = "USER"
      console.log(req.body)
      await newUser.save()
      res.redirect("/")
    } catch (error) {
      console.error("Error al crear usuario:", error)
      next(error)
    } finally {
      await mongoConn.close()
    }
  })
  /* TODO REVISAR
  exports.login = async function(req,res){
    const { username, password } = req.body   
  
    const pwd_textoPlano = password
    let usLoginFoundData = null
  
    await Usuario.findByUsername(username,function(usLoginFound,err){
        if(err){
            res.render("loginError.ejs")
        }else{
            usLoginFoundData = usLoginFound
        }
    })
  
    if(usLoginFoundData){
        const validado = await bcrypt.compare(pwd_textoPlano, usLoginFoundData.password)
  
  
        if(validado){
            //CREAR TOKEN JWT
            const token = jwt.sign(
                {check:true},
                "secretJWT",
                {expiresIn:1440}
            )
            req.session.jwtToken = token
            //req.session.Usuario = usLoginFoundData
            req.session.usLoginLogued = usLoginFoundData
            console.log(req.session.usLoginLogued)
            //res.status(200).json(usLoginFoundData)
            res.redirect("/main")
        }else{
            res.render("loginError.ejs")
        }
  
    }
  
  }
  */
  
  /*exports.logout = (req, res) => {
    jwt.sign(req.session.jwtToken, "", { expiresIn: 1 }, (logout, err) => {
      if (err) {
      }
    })
    req.session.destroy()
    res.redirect("/")
  }*/
  
  
/*exports.login = async function (req, res) {
    const { username, password } = req.body;
  
    try {
        const usLoginFoundData = await Usuario.findOne({ username: username });
  
        if (!usLoginFoundData) {
            return res.render("login.ejs", { errorMessage: "Usuario no encontrado" });
        }
  
        const validado = await bcrypt.compare(password, usLoginFoundData.password);
  
        if (!validado) {
            return res.render("login.ejs", { errorMessage: "Contraseña incorrecta" });
        }
  
        const token = jwt.sign({ check: true }, "secretJWT", { expiresIn: 1440 });
        req.session.jwtToken = token;
        req.session.usLoginLogued = usLoginFoundData;
        
        // Asegúrate de que la URL y el puerto coincidan con donde tu React App está corriendo
        res.redirect("http://localhost:3000");
    } catch (error) {
        console.error("Error en el proceso de login:", error);
        res.render("error.ejs", { errorMessage: "Error procesando el login" });
    }
}
*/
exports.login = async function (req, res) {
  const { username, password } = req.body;

  try {
      const usLoginFoundData = await Usuario.findOne({ username: username });

      if (!usLoginFoundData) {
          return res.render("login.ejs", { errorMessage: "Usuario no encontrado" });
      }

      const validado = await bcrypt.compare(password, usLoginFoundData.password);

      if (!validado) {
          return res.render("login.ejs", { errorMessage: "Contraseña incorrecta" });
      }

      // Aquí modificamos la línea donde se crea el token para incluir el username en el payload
      const token = jwt.sign({
          check: true,
          username: usLoginFoundData.username // Incluye el username en el payload del token
      }, "secretJWT", { expiresIn: 1440 });
      
      req.session.jwtToken = token;
      req.session.usLoginLogued = usLoginFoundData;
      
      // Asegúrate de que la URL y el puerto coincidan con donde tu React App está corriendo
      res.redirect("http://localhost:3000");
      console.log("Sesion iniciada correctamente")
  } catch (error) {
      console.error("Error en el proceso de login:", error);
      res.render("error.ejs", { errorMessage: "Error procesando el login" });
  }
}



/*
exports.logout = (req, res) => {
    jwt.sign(req.session.jwtToken, "", { expiresIn: 1 }, (logout, err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).send('Error al cerrar sesión');
        }
    });
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al destruir la sesión:', err);
        } else {
            console.log('Sesión cerrada correctamente');
            // Redirigir al usuario a la página de inicio con una alerta
            res.redirect("/?logout=true");
        }
    });
};
*/

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al destruir la sesión:', err);
      return res.status(500).send({ message: 'Error al cerrar sesión' });
    } else {
      console.log('Sesión cerrada correctamente');
      // Notifica al cliente que el logout fue exitoso
      res.status(200).send({ logoutSuccess: true });
    }
  });
};



  //AUHT GOOGLE
  exports.passportAuthenticate = passport.authenticate("google", {
    scope: ["email", "profile"],
  })
  
  exports.passportCallback = passport.authenticate("google", {
    successRedirect: "/auth/google/protected", 
    failureRedirect: "/auth/google/failure", 
  })
  
  exports.passportSuccess = async function (req, res, next) {
    console.log(req.user)
    console.log(req.user.displayName)
  
    let usuarioEncontrado = await Usuario.findOne({
      email: req.user.emails[0].value,
    })
  
    if (!usuarioEncontrado) {
      usuarioEncontrado = new Usuario({
        username: req.user.displayName,
        email: req.user.emails[0].value,
        profile: "USER",
        password: "usuario",
      })
      usuarioEncontrado.password = await bcrypt.hash(
        usuarioEncontrado.password,
        12
      )
      await usuarioEncontrado.save()
    } else {
    }
  
    const token = jwt.sign(
      {
        userId: usuarioEncontrado._id,
        email: usuarioEncontrado.email,
        profile: usuarioEncontrado.profile,
      },
      "secretJWT1234",
      { expiresIn: "1h" }
    )
  
    req.session.jwtToken = token
    req.session.usLoginLogued = usuarioEncontrado
  
    res.redirect("/pruebas")
  }
  
  exports.passportFailure = function (req, res) {
    res.status(500).json({ msg: "Error de Google" })
  }
  
  /*
  exports.passportLogout = function (req, res) {
    req.session.destroy()
    res.redirect("/login")
  }

   exports.login = async function (req, res) {
    const { username, password } = req.body
  
    try {
      const usLoginFoundData = await Usuario.findOne({ username: username })
  
      if (!usLoginFoundData) {
        
        return res.render("login.ejs", { errorMessage: "Usuario no encontrado" })
      }
  
      const validado = await bcrypt.compare(password, usLoginFoundData.password)
  
      if (!validado) {
        
        return res.render("login.ejs", { errorMessage: "Contraseña incorrecta" })
      }
  
      
      const token = jwt.sign({ check: true }, "secretJWT", { expiresIn: 1440 })
      req.session.jwtToken = token
      req.session.usLoginLogued = usLoginFoundData
      res.redirect("/pruebas")
    } catch (error) {
      console.error("Error en el proceso de login:", error)
      res.render("error.ejs", { errorMessage: "Error procesando el login" })
    }
  }
  
  */
  exports.passportLogout = function (req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al destruir la sesión:', err);
        } else {
            console.log('Sesión cerrada correctamente');
            // Redirigir al usuario a la página de login con una alerta
            res.redirect("/login?logout=true");
        }
    });
};

  
  