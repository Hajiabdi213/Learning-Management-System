import prisma from "../lib/index.js";

//! ----------------GET ALL THE LESSONS ---------------------
export const getAllLessonsOfSection = async (req, res) => {
  try {
    const { course_slug, section_id } = req.params;

    const course = await prisma.course.findUnique({
      where: {
        slug: course_slug,
      },
    });

    //check the course if it exists
    if (!course) {
      return res
        .status(404)
        .json({ message: `Course ${course_slug} does not exist` });
    }

    const courseId = course.id;

    const section = await prisma.section.findUnique({
      where: {
        courseId,
        id: Number(section_id),
      },
      include: {
        lessons: true,
      },
    });

    //check the section
    if (!section) {
      return res.status(404).json({
        message: `Section with the id ${section_id} does not exist in ${course_slug}`,
      });
    }

    const lessons = section.lessons;

    res
      .status(200)
      .json({ message: `Lessons of the ${section.title} section`, lessons });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//! -------------- ADD A LESSON ----------------
export const createALesson = async (req, res) => {
  try {
    const { course_slug, section_id } = req.params;

    const course = await prisma.course.findUnique({
      where: {
        slug: course_slug,
      },
    });

    //check the course if it exists
    if (!course) {
      return res
        .status(404)
        .json({ message: `Course ${course_slug} does not exist` });
    }

    const courseId = course.id;

    const section = await prisma.section.findUnique({
      where: {
        courseId,
        id: Number(section_id),
      },
    });

    // check the section
    if (!section) {
      return res.status(404).json({
        message: `Section with the id ${section_id} does not exist in ${course_slug}`,
      });
    }

    // get data from the request body and create the lesson

    const lesson = await prisma.lesson.create({
      data: {
        sectionId: Number(section_id),
        ...req.body,
      },
    });
    if (!section) {
      res.status(400).json({ message: "Something is wrong!" });
    }
    res.status(201).json({ message: "lesson created successfully", lesson });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//! ---------------- GET SPECIFIC LESSON  ------------------------
export const getSpecificLesson = async (req, res) => {
  try {
    const { course_slug, section_id, lesson_id } = req.params;

    const course = await prisma.course.findUnique({
      where: {
        slug: course_slug,
      },
    });

    //check the course if it exists
    if (!course) {
      return res
        .status(404)
        .json({ message: `Course ${course_slug} does not exist` });
    }

    const courseId = course.id;

    const section = await prisma.section.findUnique({
      where: {
        courseId,
        id: Number(section_id),
      },
      include: {
        lessons: true,
      },
    });

    //check the section
    if (!section) {
      return res.status(404).json({
        message: `Section with the id ${section_id} does not exist in ${course_slug}`,
      });
    }

    const lesson = section.lessons.find(
      (lesson) => lesson.id === Number(lesson_id)
    );
    if (!lesson) {
      return res
        .status(404)
        .json({ message: `Lesson with the id ${lesson_id} was not found` });
    }

    res.status(200).json({
      message: `Lessons with the id ${lesson_id} was found successfully`,
      lesson,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//!--------------- Update a Section----------------
export const updateALesson = async (req, res) => {
  try {
    const { course_slug, section_id, lesson_id } = req.params;

    const course = await prisma.course.findUnique({
      where: {
        slug: course_slug,
      },
    });

    //check the course if it exists
    if (!course) {
      return res
        .status(404)
        .json({ message: `Course ${course_slug} does not exist` });
    }

    const courseId = course.id;

    const section = await prisma.section.findUnique({
      where: {
        courseId,
        id: Number(section_id),
      },
      include: {
        lessons: true,
      },
    });

    //check the section
    if (!section) {
      return res.status(404).json({
        message: `Section with the id ${section_id} does not exist in ${course_slug}`,
      });
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: Number(lesson_id) },
    });
    // check the lesson
    if (!lesson) {
      return res
        .status(404)
        .json({ message: `Lesson with the id ${lesson_id} was not found` });
    }

    const { id, sectionId, ...rest } = req.body;
    const updatedLesson = await prisma.lesson.update({
      where: { id: Number(lesson_id) },
      data: {
        id: lesson.id,
        sectionId: lesson.sectionId,
        ...rest,
      },
    });
    res.status(200).json({
      message: `Lessons with the id ${lesson_id} was updated successfully`,
      updatedLesson,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//!--------------------- DELETE A LESSON --------------------
export const deleteALesson = async (req, res) => {
  try {
    const { course_slug, section_id, lesson_id } = req.params;

    const course = await prisma.course.findUnique({
      where: {
        slug: course_slug,
      },
    });

    //check the course if it exists
    if (!course) {
      return res
        .status(404)
        .json({ message: `Course ${course_slug} does not exist` });
    }

    const courseId = course.id;

    const section = await prisma.section.findUnique({
      where: {
        courseId,
        id: Number(section_id),
      },
      include: {
        lessons: true,
      },
    });

    //check the section
    if (!section) {
      return res.status(404).json({
        message: `Section with the id ${section_id} does not exist in ${course_slug}`,
      });
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: Number(lesson_id), sectionId: section.id },
    });
    // check the lesson
    if (!lesson) {
      return res
        .status(404)
        .json({ message: `Lesson with the id ${lesson_id} was not found` });
    }

    const { id, sectionId, ...rest } = req.body;
    const targetLesson = await prisma.lesson.delete({
      where: { id: Number(lesson_id) },
    });
    res.status(200).json({
      message: `Lessons with the id ${lesson_id} was deleted successfully`,
      targetLesson,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
