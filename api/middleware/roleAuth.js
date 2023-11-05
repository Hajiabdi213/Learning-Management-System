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

export const isAdminOrInstructor = async (req, res, next) => {
  const { email } = req.decoded;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user.role === "instructor" || user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "You are neither instructor nor admin" });
  }
};

export const isCourseCreator = async (req, res, next) => {
  const { id } = req.decoded;
  const { course_slug } = req.params;
  // check if the user is the owner of this course
  const course = await prisma.course.findUnique({
    where: { slug: course_slug, instructorId: id },
  });

  if (!course) {
    res.status(401).json({ message: "You are not the creator of this course" });
  } else {
    next();
  }
};

export const isAdminOrCourseCreator = async (req, res, next) => {
  const { email, id } = req.decoded;
  const { course_slug } = req.params;

  // check if the user is the owner of this course
  const course = await prisma.course.findUnique({
    where: { slug: course_slug, instructorId: id },
  });
  // check
  const user = await prisma.user.findUnique({ where: { email } });

  if (user.role === "admin" || course !== null) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You are neither the course creator nor admin" });
  }
};

export const isEnrolled = async (req, res, next) => {
  const { email, id } = req.decoded;
  const { course_slug } = req.params;

  // check if the user is the owner of this course
  const course = await prisma.course.findUnique({
    where: { slug: course_slug, userId: id },
  });

  if (course) {
    return console.log("You are enrolled this course");
  } else {
    return console.log("You are not enrolled this course");
  }
  // check
  const user = await prisma.user.findUnique({ where: { email } });

  if (user.role === "admin" || course !== null) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You are neither the course creator nor admin" });
  }
};
