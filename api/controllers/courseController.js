import prisma from "../lib/index.js";

//! Add New Course
export const createCourse = async (req, res) => {
  try {
    const newCourse = await prisma.course.create({ data: req.body });
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
    const courses = await prisma.course.findMany();
    if (courses) {
      return res.status(200).json({ message: "All courses Fetched", courses });
    }
    return res.status(404).json({ message: "courses are not found" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//!-----------------------Get Specific  Course ---------------------

export const getSpecificRouter = async (req, res) => {
  const { slug } = req.params;
  try {
    const course = await prisma.course.findUnique({
      where: {
        slug,
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
    return res.status(500).json(error);
  }
};

//TODO: ------------------ Update Specific Course
