/*
  Warnings:

  - Added the required column `fecha_hora` to the `rectificacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rectificacion" ADD COLUMN     "fecha_hora" TIMESTAMP(3) NOT NULL;
