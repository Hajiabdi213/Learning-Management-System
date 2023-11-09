import prisma from "../lib/index.js";

//! ----------------GET ALL THE SECTION ASSESSMENTS ---------------------
export const getAllAssessmentsOfSection = async (req, res) => {
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
        assessments: true,
      },
    });

    //check the section
    if (!section) {
      return res.status(404).json({
        message: `Section with the id ${section_id} does not exist in ${course_slug}`,
      });
    }

    const assessments = section.assessments;

    res.status(200).json({
      message: `assessments of the ${section.title} section`,
      assessments,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//! -------------- ADD AN ASSESSMENT ----------------
export const createAssessment = async (req, res) => {
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

    // get data from the request body and create the assessment

    const assessment = await prisma.assessment.create({
      data: {
        sectionId: Number(section_id),
        studentId: Number(req.decoded.id),
        ...req.body,
      },
    });
    if (!section) {
      res.status(400).json({ message: "Something is wrong!" });
    }
    res
      .status(201)
      .json({ message: "assessment created successfully", assessment });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//! ---------------- GET SPECIFIC ASSESSMENT  ------------------------
export const getSpecificAssessment = async (req, res) => {
  try {
    const { course_slug, section_id, assessment_id } = req.params;

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
        assessments: true,
      },
    });

    //check the section
    if (!section) {
      return res.status(404).json({
        message: `Section with the id ${section_id} does not exist in ${course_slug}`,
      });
    }

    const assessment = section.assessments.find(
      (assessment) => assessment.id === Number(assessment_id)
    );
    if (!assessment) {
      return res.status(404).json({
        message: `assessment with the id ${assessment_id} was not found`,
      });
    }

    res.status(200).json({
      message: `assessments with the id ${assessment_id} was found successfully`,
      assessment,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//!--------------- UPDATE AN ASSESSMENT----------------
export const updateAnAssessment = async (req, res) => {
  try {
    const { course_slug, section_id, assessment_id } = req.params;

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
        assessments: true,
      },
    });

    //check the section
    if (!section) {
      return res.status(404).json({
        message: `Section with the id ${section_id} does not exist in ${course_slug}`,
      });
    }

    const assessment = await prisma.assessment.findUnique({
      where: { id: Number(assessment_id) },
    });
    // check the assessment
    if (!assessment) {
      return res.status(404).json({
        message: `assessment with the id ${assessment_id} was not found`,
      });
    }

    const { id, sectionId, ...rest } = req.body;
    const updatedAssessment = await prisma.assessment.update({
      where: { id: Number(assessment_id) },
      data: {
        id: assessment.id,
        sectionId: assessment.sectionId,
        ...rest,
      },
    });
    res.status(200).json({
      message: `assessments with the id ${assessment_id} was updated successfully`,
      updatedAssessment,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//!--------------------- DELETE AN ASSESSMENT --------------------
export const deleteAssessment = async (req, res) => {
  try {
    const { course_slug, section_id, assessment_id } = req.params;

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
        assessments: true,
      },
    });

    //check the section
    if (!section) {
      return res.status(404).json({
        message: `Section with the id ${section_id} does not exist in ${course_slug}`,
      });
    }

    const assessment = await prisma.assessment.findUnique({
      where: { id: Number(assessment_id), sectionId: section.id },
    });
    // check the assessment
    if (!assessment) {
      return res.status(404).json({
        message: `assessment with the id ${assessment_id} was not found`,
      });
    }

    const targetAssessment = await prisma.assessment.delete({
      where: { id: Number(assessment_id) },
    });
    res.status(200).json({
      message: `assessments with the id ${assessment_id} was deleted successfully`,
      targetAssessment,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//! ---------------    SUBMIT AN ASSESSMENT  ----------------

export const submitAnAssessment = async (req, res) => {
  try {
    const { course_slug, section_id, assessment_id } = req.params;

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

    const assessment = await prisma.assessment.findUnique({
      where: { id: Number(assessment_id), sectionId: section.id },
    });
    // check the assessment
    if (!assessment) {
      return res.status(404).json({
        message: `assessment with the id ${assessment_id} was not found`,
      });
    }
    // get data from the request body and create the assessment

    const submission = await prisma.submission.create({
      data: {
        assessmentId: assessment.id,
        studentId: req.decoded.id,
        content: req.body.content,
      },
    });

    res.status(201).json({
      message: "You submitted the assessment successfully",
      submission,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//! --------------------GET ALL COURSE SUBMISSIONS ---------------
export const getAllSubmissions = async (req, res) => {
  try {
    const { course_slug, assessment_id } = req.params;

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

    // get all assessments for that course
    const assessment = await prisma.assessment.findUnique({
      where: { id: Number(assessment_id) },
      include: {
        submissions: true,
      },
    });

    if (!assessment) {
      return res.status(404).json({
        message: `No assessment found on the course ${course.title}`,
      });
    }
    console.log(assessment);
    const submissions = assessment.submissions;
    if (submissions.length < 0) {
      return res.status(404).json({
        message: `Submissions on the assessments of this course not found`,
      });
    }
    return res.status(200).json({
      message: `All submissions of ${assessment.title} found`,
      submissions,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//!---------------- GRADE A SUBMISSION -----------

export const gradeASubmission = async (req, res) => {
  try {
    const { course_slug, section_id, assessment_id, submission_id } =
      req.params;

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

    const assessment = await prisma.assessment.findUnique({
      where: { id: Number(assessment_id), sectionId: section.id },
    });
    // check the assessment
    if (!assessment) {
      return res.status(404).json({
        message: `assessment with the id ${assessment_id} was not found`,
      });
    }
    // get data from the request body and create the assessment

    const submission = await prisma.submission.update({
      where: { id: Number(submission_id) },
      data: {
        points: req.body.points,
      },
    });

    res.status(201).json({
      message: "You graded the assessment submission successfully",
      submission,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//! ------------- GET ALL GRADED SUBMISSIONS--------------
export const getAllGradedSubmissions = async (req, res) => {
  try {
    const { course_slug, assessment_id } = req.params;

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
    const assessment = await prisma.assessment.findUnique({
      where: { id: Number(assessment_id) },
      include: {
        submissions: {
          where: {
            points: { gt: 0 },
          },
        },
      },
    });

    if (!assessment) {
      return res.status(404).json({
        message: `No assessment found on the course ${course.title}`,
      });
    }

    const gradedSubmissions = assessment.submissions;

    if (gradedSubmissions.length < 0) {
      return res.status(404).json({
        message: `No graded submissions found on the assessment ${assessment.title}`,
      });
    }

    return res.status(200).json({
      message: `All graded submissions of ${assessment.title} assessment found`,
      gradedSubmissions,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//!------------------- GET THE DETAILS OF WHAT YOU SUBMITTED----------------

export const getMySubmissions = async (req, res) => {
  try {
    const { course_slug, assessment_id } = req.params;
    const { id } = req.decoded;

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
    const assessment = await prisma.assessment.findUnique({
      where: { id: Number(assessment_id) },
      include: {
        submissions: {
          where: {
            studentId: Number(id),
          },
        },
      },
    });

    if (!assessment) {
      return res.status(404).json({
        message: `No assessment found on the course ${course.title}`,
      });
    }

    const submissions = assessment.submissions;

    if (submissions.length < 0) {
      return res.status(404).json({
        message: `No submission ${assessment.title} found that you submitted`,
      });
    }

    return res.status(200).json({
      message: `All Your submissions of ${assessment.title} assessment `,
      submissions,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
