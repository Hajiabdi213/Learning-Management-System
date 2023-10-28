/*
  Warnings:

  - You are about to alter the column `enrolls` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "price" DECIMAL NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "totalHours" TEXT,
    "enrolls" INTEGER NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" INTEGER,
    "userId" INTEGER
);
INSERT INTO "new_Course" ("categoryId", "createdAt", "description", "enrolls", "id", "image", "isFeatured", "paid", "price", "slug", "title", "totalHours", "updatedAt", "userId") SELECT "categoryId", "createdAt", "description", "enrolls", "id", "image", "isFeatured", "paid", "price", "slug", "title", "totalHours", "updatedAt", "userId" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
