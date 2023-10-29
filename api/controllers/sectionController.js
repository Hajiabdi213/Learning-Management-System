import prisma from "../lib/index.js";

//! ----------------GET ALL SECTIONS ---------------------
export const getAllSections = async (req, res) => {
  try {
    const sections = await prisma.section.findMany({
      include: {
        lessons: true,
      },
    });
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// router.get("/:sectionId", async (req, res) => {
//   try {
//     const section = await prisma.section.findUnique({
//       where: {
//         id: Number(req.params.sectionId),
//       },

//       include: {
//         lessons: true,
//       },
//     });

//     if (!section) {
//       res.status(404).json({
//         message: `section with the Id: ${req.params.sectionId} was not found`,
//       });
//     }

//     res.status(200).json(section);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

//! -------------- ADD SECTION ----------------
export const createASection = async (req, res) => {
  try {
    const section = await prisma.section.create({
      data: req.body,
    });
    if (!section) {
      res.status(400).json({ message: "Something is wrong!" });
    }
    res.status(201).json(section);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//!--------------- Update a Section----------------
export const updateASection = async (req, res) => {
  try {
    const section = await prisma.section.update({
      where: {
        id: Number(req.params.sectionId),
      },
      data: req.body,
    });

    if (!section) {
      res.status(400).json({ message: "Something is wrong!" });
    }
    res.status(201).json(section);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// //DELETE section
// router.delete("/:sectionId", async (req, res) => {
//   try {
//     const section = await prisma.section.delete({
//       where: {
//         id: Number(req.params.sectionId),
//       },
//     });

//     if (!section) {
//       res.status(400).json({ message: "Something is wrong!" });
//     }
//     res.status(204).json(section);
//   } catch (error) {
//     console.log(error.message);
//   }
// })
