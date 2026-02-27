import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const SECRET = "lpu123";
const signup = async (req, res) => {
  try {
    const body = req.body;
    
    // Validate required fields
    if (!body.name || !body.email || !body.password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }
    
    const hashPassword = await bcrypt.hash(body.password, 10);
    body.password = hashPassword;
    const result = await userModel.create(body);
    res.status(201).json({ message: "User Created", data: result });
  } catch (err) {
    console.log("Signup Error:", err);
    
    // Handle duplicate email error
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    
    res.status(400).json({ message: "Unable to create user", error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const found = await userModel.findOne({ email });
    if (found) {
      const chkPassword = await bcrypt.compare(password, found.password);
      if (chkPassword) {
        const user = {
          name: found.name,
          email: found.email,
          role: found.role,
        };
        const token = jwt.sign(user, SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Login Success", token });
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
const showUsers = async (req, res) => {
  try {
    const result = await userModel.find();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export { login, signup, showUsers, deleteUser };
