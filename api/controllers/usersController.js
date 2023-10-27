import prisma from "../lib/index.js";
import express from "express";

import bcryptjs from "bcryptjs";

export const registerAUser = async (req, res) => {
  const { firstName, lastName, image, email, password, phone } = req.body;

  try {
    // check if the user already exist or not
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // hash the password
      const hashedPassword = await bcryptjs.hash(password, 10);
      const admin = await prisma.user.create({
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
        .json({ message: "User created successfully", user: admin });
    } else {
      res
        .status(400)
        .json({ message: `user with the email ${email} already exists` });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
