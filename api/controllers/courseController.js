import slugify from "slugify";
import prisma from "../lib/index.js";

//! ---------------------Add New Course------------------
export const createCourse = async (req, res) => {
  try {
    const { slug, title, instructorId, ...userInput } = req.body;
    const formattedSlug = slugify(title).toLowerCase();
    const newCourse = await prisma.course.create({
      data: {
        ...userInput,
        title,
        slug: formattedSlug,
        instructorId: req.decoded.id,
      },
    });
    return res
      .status(200)
      .json({ message: "Course created successfully", newCourse });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//! ----------------Get All Courses---------------

export const getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        instructor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    if (courses) {
      return res.status(200).json({ message: "All courses Fetched", courses });
    }
    return res.status(404).json({ message: "courses are not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//! -----------------------Get Specific  Course ---------------------

export const getSpecificCourse = async (req, res) => {
  const { slug } = req.params;
  try {
    const course = await prisma.course.findUnique({
      where: {
        slug,
      },
      include: {
        instructor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    // check if the course was found or not
    if (!course) {
      return res.status(404).json({ message: `Course ${slug} was not found` });
    }

    return res
      .status(200)
      .json({ message: `Course ${slug} was successfully found`, course });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// TODO: ----------------ENROLL COURSE----------
// Course Enrollment
export const enrollCourse = async (req, res) => {
  // get the email of the logged in user
  const { slug } = req.params;
  const { email } = req.decoded;
  try {
    // get the course
    const course = await prisma.course.findUnique({
      where: {
        slug,
      },
    });

    // Update the user Enrolled Courses and add the new Course
    const user = await prisma.user.update({
      where: { email },
      data: {
        enrolledCourses: {
          connect: {
            id: course.id,
          },
        },
      },
      // include the enrolled courses in the response
      include: {
        enrolledCourses: true,
      },
    });

    return res
      .status(200)
      .json({ message: `You enrolled ${slug} course`, user });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//! ----------------- Update Specific Course-----------------------

export const updateACourse = async (req, res) => {
  try {
    const { slug } = req.params;
    const course = await prisma.course.update({
      where: { slug },
      data: req.body,
    });

    if (!course) {
      return res.status(404).json({ message: `Course ${slug} was not found` });
    }
    return res.status(200).json({
      message: `Course ${slug} has been updated successfully`,
      course,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//!--------------------DELETE A COURSE------------------------
export const deleteACourse = async (req, res) => {
  const { slug } = req.params;
  try {
    const course = await prisma.course.delete({ where: { slug } });
    if (!course) {
      return res.status(404).json({ message: "User was not found" });
    }

    return res
      .status(200)
      .json({ message: `Course ${slug} has been deleted successfully` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//!-------------------------------  GET THE COURSES YOU'VE CREATED-----------------------

export const getMyCourses = async (req, res) => {
  const { id } = req.decoded;

  try {
    const myCourses = await prisma.course.findMany({
      where: { instructorId: id },
      include: { sections: true },
    });
    if (!myCourses) {
      return res.status(404).json({ message: "There's no course found" });
    }

    return res
      .status(200)
      .json({ message: "Your courses found successfully", myCourses });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//! -------------- GET THE DETAILS OF SPECIFIC COURSE YOU'VE CREATED-----------
export const getMySpecificCourse = async (req, res) => {
  const { id } = req.decoded;
  const { slug } = req.params;

  try {
    const myCourse = await prisma.course.findUnique({
      where: { instructorId: id, slug },
      include: { sections: true },
    });
    if (!myCourse) {
      return res.status(404).json({
        message: `Course ${slug} was not found or it is not a course you own`,
      });
    }

    return res
      .status(200)
      .json({ message: `Your ${slug} course  successfully`, myCourse });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//! --------- UPDATE SPECIFIC COURSE YOU'VE CREATED----------------

export const updateMyCourse = async (req, res) => {
  const { id } = req.decoded;
  const { slug } = req.params;

  try {
    const myCourse = await prisma.course.update({
      where: { instructorId: id, slug },
      data: req.body,
    });
    if (!myCourse) {
      return res.status(404).json({ message: "Course Not Found" });
    }

    return res
      .status(200)
      .json({ message: "Your course updated successfully", myCourse });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//! ------------------ DELETE THE COURSE YOU'VE CREATED -------------------

export const deleteMyCourse = async (req, res) => {
  const { id } = req.decoded;
  const { slug } = req.params;

  try {
    const myCourse = await prisma.course.delete({
      where: { instructorId: id, slug },
    });
    if (!myCourse) {
      return res.status(404).json({ message: "Course Not Found" });
    }

    return res
      .status(200)
      .json({ message: "You Deleted The Course Successfully", myCourse });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//!-------------- GET ALL THE COURSES YOU'VE ENROLLED -------------
export const getMyEnrolledCourses = async (req, res) => {
  const { id } = req.decoded;
  try {
    const userWithCourse = await prisma.user.findMany({
      where: { id },
      include: {
        enrolledCourses: {
          include: {
            instructor: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json(userWithCourse[0].enrolledCourses);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//! -----------------------------  GET SPECIFIC COURSE YOU'VE Enrolled  -------------------
export const getSpecificCourseLoggedInUserEnrolled = async (req, res) => {
  const { id } = req.decoded;
  const { slug } = req.params;
  try {
    const userWithCourse = await prisma.user.findMany({
      where: { id },
      include: {
        enrolledCourses: {
          include: {
            instructor: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                image: true,
              },
            },
            sections: {
              include: {
                lessons: true,
                assessments: true,
              },
            },
          },
        },
      },
    });

    if (userWithCourse.length > 0) {
      const targetCourse = userWithCourse[0].enrolledCourses.find(
        (course) => course.slug === slug
      );

      return res.status(200).json(targetCourse);
    }
    return res.status(404).json({ message: `Course was not found` });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
