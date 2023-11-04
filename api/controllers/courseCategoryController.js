import slugify from "slugify";
import prisma from "../lib/index.js";
//! ---------------------Add New Course Category------------------
export const createCourseCategory = async (req, res) => {
  const { title } = req.body;
  try {
    const newCategory = await prisma.courseCategory.create({
      data: {
        title,
        slug: slugify(title.toLowerCase()),
      },
    });
    return res
      .status(200)
      .json({ message: "Course Category created successfully", newCategory });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//! ----------------Get All Course Categories---------------

export const getAllCourseCategories = async (req, res) => {
  try {
    const categories = await prisma.courseCategory.findMany();
    if (categories) {
      return res
        .status(200)
        .json({ message: "All categories Fetched", categories });
    }
    return res.status(404).json({ message: "categories are not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// !-----------------------Get Specific  Course Categories ---------------------

export const getSpecificCourseCategory = async (req, res) => {
  const { slug } = req.params;

  try {
    const category = await prisma.courseCategory.findUnique({
      where: {
        slug,
      },
    });

    // check if the course was found or not
    if (!category) {
      return res
        .status(404)
        .json({ message: `course category ${slug} was not found` });
    }

    return res.status(200).json({
      message: `course category ${slug} was successfully found`,
      category,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
