/*
  Warnings:

  - Added the required column `taskOrder` to the `Columns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Columns" ADD COLUMN     "taskOrder" JSONB NOT NULL;
