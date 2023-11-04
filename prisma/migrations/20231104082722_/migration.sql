/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `CourseCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CourseCategory_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "CourseCategory_slug_key" ON "CourseCategory"("slug");
