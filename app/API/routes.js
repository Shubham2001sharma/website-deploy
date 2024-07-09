const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
const your_jwt_secret="shubhamsharma"

const DB =
  "mongodb+srv://sharmashubu4600:stGcTtagc2MrlZtM@cluster0.nrryujz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

app.post("/adminSignup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post('/adminLogin',async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if a user with the provided email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            your_jwt_secret, // Replace with your secret key
            { expiresIn: "1h" }
          );

        // If credentials are correct, login successful
        res.status(200).json({ message: "Login successful", user,token });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Server error" });
    }
});


app.listen(4000, () => {
  console.log("app is listening on 4000");
});
