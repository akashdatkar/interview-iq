const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @route POST /api/auth/register
 * @desc Register a new user, expects username, email, and password in the request body
 * @access Public
 */

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ 
            message: "Please provide username, email, and password" 
        });
  }

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "Username or email already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

   const newUser = await userModel.create({
    username,
    email,
    password: hashPassword
  });

  const token = jwt.sign(
    { id: newUser._id, username: newUser.username },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token)

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
}

/**
 * @name loginUserController
 * @description login user controller, expects email and password in the request body
 *@access Public 
*/

async function loginUserController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({
            message: "User not found"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid password"
        });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}
    
module.exports = { registerUser, loginUserController };
