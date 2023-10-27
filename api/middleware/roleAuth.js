import prisma from "../lib/index.js";

export const isAdmin = async (req, res, next) => {
  const { email } = req.decoded;
  const admin = await prisma.user.findUnique({ where: { email } });
  if (admin.role !== "admin") {
    res.status(401).json({ message: "You are not an admin" });
  } else {
    next();
  }
};

export const isInstructor = async (req, res, next) => {
  const { email } = req.decoded;
  const instructor = await prisma.user.findUnique({ where: { email } });

  if (instructor.role !== "instructor") {
    res.status(401).json({ message: "You are not an Instructor" });
  } else {
    next();
  }
};
