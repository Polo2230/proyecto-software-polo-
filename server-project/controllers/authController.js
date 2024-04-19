const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../utils/jwt.js");

const register = async (req, res) => {
  try {
    const { userName, password, email, cellphone, rol } = req.body;
    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({ message: "el email ya existe" });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      cellphone,
      rol,
      password: passwordHash,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.json({
      id: userSaved._id,
      name: userSaved.userName,
      email: userSaved.email,
      cellphone: userSaved.cellphone,
      rol: userSaved.rol,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound.rol !== "admin" && userFound.rol !== "secretary") {
      return res.status(403).json({ message: "No tienes permisos para iniciar sesión" });
  }
    if (!userFound)
      return res.Status(400).json({ message: "el usuario no se encuentra" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "contraseña incorrecta" });

    const token = await createAccessToken({
      id: userFound._id,
    });

    res.cookie("token", token);

    res.json({
      id: userFound._id,
      userName: userFound.userName,
      email: userFound.email,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

const profile  = async (req, res) => {
  const useFound = await User.findById(req.user.id);

  if (!userFound) return res.status(404).json({ message: "usuario no existe" });

  return res.json({
    id: userFound._is,
    userName: userFound.userName,
    email: userFound.email,
    cellphone: userFound.cellphone,
    rol: userFound.rol,

  });
};

module.exports = {
  register,
  login,
  logout,
  profile,
};
