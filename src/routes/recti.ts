const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/rectificaciones', async (req, res) => {
  try {
    const rectificaciones = await prisma.rectificacion.findMany({
      include: {
        alumno: true,
        seccion_entra: true,
        seccion_sale: true
      }
    });

    const result = rectificaciones.map((rectificacion) => ({
      id: rectificacion.id,
      apellidos: `${rectificacion.alumno.apellido_pat} ${rectificacion.alumno.apellido_mat}`,
      nombre: rectificacion.alumno.nombre,
      codigo: rectificacion.alumno.codigo,
      promedio: rectificacion.alumno.ponderado,
      curso_sale: rectificacion.seccion_sale.id_curso,
      curso_entra: rectificacion.seccion_entra.id_curso,
      fecha_hora: rectificacion.fecha_hora,
      tipo: rectificacion.estado
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al obtener las rectificaciones.' });
  }
});

router.get('/rectificaciones/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rectificacion = await prisma.rectificacion.findUnique({
      where: { id: parseInt(id) },
      include: {
        alumno: true,
        seccion_entra: true,
        seccion_sale: true
      }
    });

    if (!rectificacion) {
      return res.status(404).json({ error: 'Rectificación no encontrada' });
    }

    const result = {
      id: rectificacion.id,
      apellidos: `${rectificacion.alumno.apellido_pat} ${rectificacion.alumno.apellido_mat}`,
      nombre: rectificacion.alumno.nombre,
      codigo: rectificacion.alumno.codigo,
      promedio: rectificacion.alumno.ponderado,
      curso_sale: rectificacion.seccion_sale.id_curso,
      curso_entra: rectificacion.seccion_entra.id_curso,
      fecha_hora: rectificacion.fecha_hora,
      tipo: rectificacion.estado
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al obtener la rectificación.' });
  }
});

router.post('/rectificaciones', async (req, res) => {
  const {
    id_alumno,
    nro_mat,
    estado,
    justificacion,
    id_curso_entra,
    id_curso_sale,
    fecha_hora
  } = req.body;

  try {
    const nuevaRectificacion = await prisma.rectificacion.create({
      data: {
        id_alumno,
        nro_mat,
        estado,
        justificacion,
        id_curso_entra,
        id_curso_sale,
        fecha_hora: new Date(fecha_hora)
      }
    });
    res.status(201).json(nuevaRectificacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al crear la rectificación.' });
  }
});

router.patch('/rectificaciones/:id/aprobar', async (req, res) => {
  const { id } = req.params;

  try {
    const rectificacionExistente = await prisma.rectificacion.findUnique({
      where: { id: parseInt(id) }
    });

    if (!rectificacionExistente) {
      return res.status(404).json({ error: 'Rectificación no encontrada' });
    }

    const rectificacionAprobada = await prisma.rectificacion.update({
      where: { id: parseInt(id) },
      data: {
        estado: 'aprobado'
      }
    });

    res.json(rectificacionAprobada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al aprobar la rectificación.' });
  }
});

router.patch('/rectificaciones/:id/desaprobar', async (req, res) => {
  const { id } = req.params;

  try {
    const rectificacionExistente = await prisma.rectificacion.findUnique({
      where: { id: parseInt(id) }
    });

    if (!rectificacionExistente) {
      return res.status(404).json({ error: 'Rectificación no encontrada' });
    }

    const rectificacionDesaprobada = await prisma.rectificacion.update({
      where: { id: parseInt(id) },
      data: {
        estado: 'rechazado'
      }
    });

    res.json(rectificacionDesaprobada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al rechazar la rectificación.' });
  }
});

module.exports = router;