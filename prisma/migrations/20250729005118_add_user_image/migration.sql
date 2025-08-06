/*
  Warnings:

  - Added the required column `overview` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster_path` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "poster_path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imagem" TEXT,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
