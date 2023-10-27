import prisma from "../lib/index.js";
import express from "express";
import Jwt from "jsonwebtoken";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
import bcryptjs from "bcryptjs";

// USER REGISTRATION
export const registerAUser = async (req, res) => {
  const { firstName, lastName, image, email, password, phone } = req.body;

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

// USER LOGIN
export const userLogin = async (req, res) => {
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
        //TODO: courses:user.courses (show the courses in which the user enrolled)
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
    res.status(500).json(error);
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    if (users) {
      return res.status(200).json({ message: "All Users Fetched", users });
    }
    return res.status(404).json({ message: "Users are not found" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// GET ALL USERS BY ROLE
export const getAllUsersByRole = async (req, res) => {
  const { role } = req.params;

  try {
    const users = await prisma.user.findMany({ where: { role: role } });
    if (users) {
      return res
        .status(200)
        .json({ message: ` All ${role}s users are fetched`, users });
    }
    return res.status(404).json({ message: "Users are not found" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
