/*
  Warnings:

  - A unique constraint covering the columns `[codename]` on the table `Gadget` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codename` to the `Gadget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gadget" ADD COLUMN     "codename" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Gadget_codename_key" ON "Gadget"("codename");
