import prisma from "../lib/index.js";

//! ----------------GET ALL SECTIONS ---------------------
export const getAllCourseSections = async (req, res) => {
  try {
    // get the course
    const { course_slug } = req.params;
    const course = await prisma.course.findUnique({
      where: {
        slug: course_slug,
      },
      include: {
        sections: true,
      },
    });

    // get the sections
    const sections = course.sections;
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//! -------------- ADD SECTION ----------------
export const createASection = async (req, res) => {
  try {
    // get the courseId
    const { course_slug } = req.params;
    const course = await prisma.course.findUnique({
      where: {
        slug: course_slug,
      },
    });

    const courseId = course.id;

    // get data from the request body and create the section

    const section = await prisma.section.create({
      data: {
        courseId,
        title: req.body.title,
      },
    });
    if (!section) {
      res.status(400).json({ message: "Something is wrong!" });
    }
    res.status(201).json({ message: "Section created successfully", section });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//! ---------------- GET SPECIFIC COURSE SECTION ------------------------
export const getSpecificCourseSection = async (req, res) => {
  try {
    // get the course
    const { course_slug, id } = req.params;
    const course = await prisma.course.findUnique({
      where: {
        slug: course_slug,
      },
      include: {
        sections: true,
      },
    });
    if (!course) {
      return res
        .status(404)
        .json({ message: `Course ${course_slug} was not found` });
    }

    // get the section
    const section = course.sections.find(
      (section) => section.id === Number(id)
    );

    if (!section) {
      return res
        .status(404)
        .json({ message: `Section with the id ${id} was not found` });
    }
    res.status(200).json({ message: "Section Found successfully", section });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//!--------------- Update a Section----------------
export const updateASection = async (req, res) => {
  try {
    // check if the section is in this course
    const { course_slug, id } = req.params;
    const course = await prisma.course.findUnique({
      where: {
        slug: course_slug,
      },
      include: {
        sections: true,
      },
    });

    if (!course) {
      return res
        .status(404)
        .json({ message: `Course ${course_slug} was not found` });
    }
    const section = course.sections.find(
      (section) => section.id === Number(id)
    );

    if (!section) {
      return res.status(404).json({
        message: `Section with the id ${id} was not found or it is not in this course`,
      });
    }

    // update the section
    const updatedSection = await prisma.section.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res
      .status(200)
      .json({ message: "Section was updated successfully", updatedSection });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//!--------------------- DELETE A SECTION --------------------
export const deleteASection = async (req, res) => {
  try {
    // check if the section is in this course
    const { course_slug, id } = req.params;
    const course = await prisma.course.findUnique({
      where: {
        slug: course_slug,
      },
      include: {
        sections: true,
      },
    });

    if (!course) {
      return res
        .status(404)
        .json({ message: `Course ${course_slug} was not found` });
    }
    const section = course.sections.find(
      (section) => section.id === Number(id)
    );

    if (!section) {
      return res.status(404).json({
        message: `Section with the id ${id} was not found or it is not in this course`,
      });
    }

    // update the section
    const targetSection = await prisma.section.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({
      message: `Section with the id ${id} was deleted successfully`,
      targetSection,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
