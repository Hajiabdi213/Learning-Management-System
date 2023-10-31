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
    "userId" INTEGER,
    "instructorId" INTEGER NOT NULL DEFAULT 4,
    CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("categoryId", "createdAt", "description", "enrolls", "id", "image", "isFeatured", "paid", "price", "slug", "title", "totalHours", "updatedAt", "userId") SELECT "categoryId", "createdAt", "description", "enrolls", "id", "image", "isFeatured", "paid", "price", "slug", "title", "totalHours", "updatedAt", "userId" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
