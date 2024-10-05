/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserToUserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_id_user_fkey";

-- DropForeignKey
ALTER TABLE "_UserToUserRole" DROP CONSTRAINT "_UserToUserRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToUserRole" DROP CONSTRAINT "_UserToUserRole_B_fkey";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserRole";

-- DropTable
DROP TABLE "_UserToUserRole";

-- CreateTable
CREATE TABLE "Alumno" (
    "id" SERIAL NOT NULL,
    "codigo" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido_pat" TEXT NOT NULL,
    "apellido_mat" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "DNI" TEXT NOT NULL,
    "ponderado" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "observado" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Alumno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "creditos" INTEGER NOT NULL,
    "cupos" INTEGER NOT NULL,
    "matriculados" INTEGER NOT NULL,
    "aprobados" INTEGER NOT NULL,
    "desaprobados" INTEGER NOT NULL,
    "id_salon" INTEGER NOT NULL,
    "prerequisito" TEXT NOT NULL,
    "curso_posterior" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "espacio_servicio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,

    CONSTRAINT "espacio_servicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reserva" (
    "id" SERIAL NOT NULL,
    "id_espacio_servicio" INTEGER NOT NULL,
    "id_alumno" INTEGER NOT NULL,
    "hora_inicio" TIMESTAMP(3) NOT NULL,
    "hora_fin" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aparato" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "id_espacio_servicio" INTEGER NOT NULL,

    CONSTRAINT "aparato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "worker" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "DNI" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,

    CONSTRAINT "worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reserva_unayoe" (
    "id" SERIAL NOT NULL,
    "id_alumno" INTEGER NOT NULL,
    "hora_inicio" TIMESTAMP(3) NOT NULL,
    "hora_fin" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "reserva_unayoe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Alumno_codigo_key" ON "Alumno"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Alumno_DNI_key" ON "Alumno"("DNI");

-- CreateIndex
CREATE UNIQUE INDEX "Curso_codigo_key" ON "Curso"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "worker_DNI_key" ON "worker"("DNI");

-- CreateIndex
CREATE INDEX "idx_id_alumno" ON "reserva_unayoe"("id_alumno");

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_espacio_servicio_fkey" FOREIGN KEY ("id_espacio_servicio") REFERENCES "espacio_servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aparato" ADD CONSTRAINT "aparato_id_espacio_servicio_fkey" FOREIGN KEY ("id_espacio_servicio") REFERENCES "espacio_servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva_unayoe" ADD CONSTRAINT "reserva_unayoe_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
