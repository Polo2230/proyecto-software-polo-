const jwt = require('jsonwebtoken');
const {TOKEN_SECRET} = require ('../config.js');
const User = require('../models/userModel.js');


const authRequiredSecretary = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "No token, autorización denegada" });
    }

    try {
        const user = jwt.verify(token, TOKEN_SECRET);
        req.user = user;

        const foundUser = await User.findById(user.id);

        if (!foundUser) {
            return res.status(403).json({ message: "Usuario no encontrado" });
        }

        if (!foundUser.state) {
            return res.status(403).json({ message: "El usuario está inactivo" });
        }

        if (foundUser.rol !== "admin" && foundUser.rol !== "secretary") {
            return res.status(403).json({ message: "No tienes permisos para esta acción" });
        }

        next();
    } catch (err) {
        return res.status(403).json({ message: "El token no es válido" });
    }
};

const authRequiredAdmin = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "No token, autorización denegada" });
    }

    try {
        const user = jwt.verify(token, TOKEN_SECRET);
        req.user = user;

        const foundUser = await User.findById(user.id);

        if (!foundUser) {
            return res.status(403).json({ message: "Usuario no encontrado" });
        }

        if (!foundUser.state) {
            return res.status(403).json({ message: "El usuario está inactivo" });
        }

        if (foundUser.rol !== "admin") {
            return res.status(403).json({ message: "No tienes permisos para esta acción" });
        }

        next();
    } catch (err) {
        return res.status(403).json({ message: "El token no es válido" });
    }
};


module.exports = {
    authRequiredSecretary,
    authRequiredAdmin,
}