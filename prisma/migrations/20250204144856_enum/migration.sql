/*
  Warnings:

  - The `status` column on the `Gadget` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Available', 'Decommissioned', 'Deployed', 'Destroyed');

-- AlterTable
ALTER TABLE "Gadget" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Available';
