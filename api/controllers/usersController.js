import prisma from "../lib/index.js";
import Jwt from "jsonwebtoken";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
import bcryptjs from "bcryptjs";

//-------------------------- USER REGISTRATION---------------------------------
export const registerAUser = async (req, res) => {
  const { firstName, lastName, image, email, password, phone } = req.body;
  const { role } = req.params;
  // check the role first (it should be student, instructor or admin)
  if (!(role === "admin" || role === "student" || role === "instructor")) {
    return res
      .status(400)
      .json({ message: "Your Registration path is not right " });
  }

  try {
    // check if the user already exist or not
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // hash the password
      const hashedPassword = await bcryptjs.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          image,
          email,
          password: hashedPassword,
          phone,
          role: req.params.role, // get the role from the request parameter
        },
      });

      res
        .status(200)
        .json({ message: "User created successfully", user: newUser });
    } else {
      res
        .status(400)
        .json({ message: `user with the email ${email} already exists` });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// --------------------------- USER LOGIN ---------------------------------
export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  // check if the user exists
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with the email ${email} does not exist` });
    }

    // check if password matches
    const isPasswordMatched = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // create token
    const token = Jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        role: user.role,
        enrolledCourses: user.enrolledCourses,
      },
      JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    // return the token
    return res.status(200).json({
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    // throw new Error("Broken");
    return res.status(500).json(error);
  }
};

// ---------------------------- GET ALL USERS ------------------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { enrolledCourses: true },
    });
    if (users) {
      return res.status(200).json({ message: "All Users Fetched", users });
    }
    return res.status(404).json({ message: "Users are not found" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//----------------------- GET ALL USERS BY ROLE -------------------------------
export const getAllUsersByRole = async (req, res) => {
  const { role } = req.params;

  try {
    const users = await prisma.user.findMany({ where: { role: role } });
    if (users) {
      return res
        .status(200)
        .json({ message: `All ${role}s are fetched`, users });
    }
    return res.status(404).json({ message: "Users are not found" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//! ------------UPDATE LOGGED IN USER PROFILE -----------
export const updateLoggedInUserProfile = async (req, res) => {
  const { email, role } = req.decoded;
  const { firstName, lastName, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    const user = await prisma.user.update({
      where: { email },
      data: {
        firstName,
        lastName,
        password: hashedPassword,
        role: role,
      },
    });
    if (user) {
      return res
        .status(200)
        .json({ message: "user profile updated successfully", user });
    }

    return res.status(404).json({ message: "user was not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//!--------------- UPDATE USER BY USING USER'S ID---------
export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    // get and update the user
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: req.body,
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with the id ${id} was  not found` });
    }
    res.status(200).json({ message: "user updated successfully", user });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
