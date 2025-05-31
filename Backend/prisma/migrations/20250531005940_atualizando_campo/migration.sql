-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    CONSTRAINT "Files_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Files" ("consultationId", "filename", "id") SELECT "consultationId", "filename", "id" FROM "Files";
DROP TABLE "Files";
ALTER TABLE "new_Files" RENAME TO "Files";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
