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

  if (user.role === "instructor" || user.role === "admin" || !user.isBlocked) {
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

  if (user.role === "admin" || course !== null || !user.isBlocked) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You are neither the course creator nor admin" });
  }
};

export const isEnrolled = async (req, res, next) => {
  const { email } = req.decoded;
  const { course_slug } = req.params;

  // Check if the user is enrolled in the specified course
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      enrolledCourses: {
        where: { slug: course_slug },
      },
    },
  });

  if (!user || user.enrolledCourses.length === 0 || user.isBlocked) {
    res.status(401).json({ message: "You are not enrolled in this course" });
  } else {
    next();
  }
};

export const isCourseCreatorOrAdminOrEnrolled = async (req, res, next) => {
  const { email, id } = req.decoded;
  const { course_slug } = req.params;

  // Check if the user is the owner of this course
  const course = await prisma.course.findUnique({
    where: { slug: course_slug, instructorId: id },
  });

  // Check if the user is an admin
  const user = await prisma.user.findUnique({ where: { email } });

  // Check if the user is enrolled in the specified course
  const enrolled = await prisma.user.findFirst({
    where: {
      email,
      enrolledCourses: {
        some: { slug: course_slug },
      },
    },
  });

  if (
    user.role === "admin" ||
    course !== null ||
    enrolled !== null ||
    user.isBlocked
  ) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized access" });
  }
};
