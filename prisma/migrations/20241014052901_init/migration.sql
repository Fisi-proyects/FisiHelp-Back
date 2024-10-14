/*
  Warnings:

  - You are about to drop the column `id_salon` on the `Curso` table. All the data in the column will be lost.
  - You are about to drop the `reserva_unayoe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "reserva_unayoe" DROP CONSTRAINT "reserva_unayoe_id_alumno_fkey";

-- AlterTable
ALTER TABLE "Curso" DROP COLUMN "id_salon",
ALTER COLUMN "prerequisito" DROP NOT NULL,
ALTER COLUMN "curso_posterior" DROP NOT NULL;

-- DropTable
DROP TABLE "reserva_unayoe";

-- CreateTable
CREATE TABLE "seccion" (
    "id" SERIAL NOT NULL,
    "id_curso" INTEGER NOT NULL,
    "nro_seccion" INTEGER NOT NULL,
    "profesor" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "aprobados" INTEGER NOT NULL,
    "desaprobados" INTEGER NOT NULL,
    "retirados" INTEGER NOT NULL,

    CONSTRAINT "seccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rectificacion" (
    "id" SERIAL NOT NULL,
    "id_alumno" INTEGER NOT NULL,
    "nro_mat" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    "justificacion" TEXT NOT NULL,
    "id_curso_entra" INTEGER NOT NULL,
    "id_curso_sale" INTEGER NOT NULL,

    CONSTRAINT "rectificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matricula" (
    "id" SERIAL NOT NULL,
    "id_alumno" INTEGER NOT NULL,
    "id_seccion" INTEGER NOT NULL,
    "total_creditos" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "matricula_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rectificacion_nro_mat_key" ON "rectificacion"("nro_mat");

-- AddForeignKey
ALTER TABLE "rectificacion" ADD CONSTRAINT "rectificacion_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rectificacion" ADD CONSTRAINT "rectificacion_id_curso_entra_fkey" FOREIGN KEY ("id_curso_entra") REFERENCES "seccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rectificacion" ADD CONSTRAINT "rectificacion_id_curso_sale_fkey" FOREIGN KEY ("id_curso_sale") REFERENCES "seccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
