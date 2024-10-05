import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

interface ReservaCreateRequest {
  id_espacio_servicio: number;
  id_alumno: number;
  hora_inicio: string;
  hora_fin: string;
  estado: string;
  descripcion: string;
}

interface ReservaUpdateRequest extends Partial<ReservaCreateRequest> {}

router.post('/', async (req: Request, res: Response) => {
  const { id_espacio_servicio, id_alumno, hora_inicio, hora_fin, estado, descripcion }: ReservaCreateRequest = req.body;

  try {
    const nuevaReserva = await prisma.reserva.create({
      data: {
        id_espacio_servicio,
        id_alumno,
        hora_inicio: new Date(hora_inicio),
        hora_fin: new Date(hora_fin),
        estado,
        descripcion,
      },
    });
    res.status(201).json(nuevaReserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la reserva.' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const reservas = await prisma.reserva.findMany({
      include: {
        alumno: true,
        espacio_servicio: true,
      },
    });
    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las reservas.' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const reserva = await prisma.reserva.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        alumno: true,
        espacio_servicio: true,
      },
    });
    if (reserva) {
      res.status(200).json(reserva);
    } else {
      res.status(404).json({ error: 'Reserva no encontrada.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la reserva.' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id_espacio_servicio, id_alumno, hora_inicio, hora_fin, estado, descripcion }: ReservaUpdateRequest = req.body;

  try {
    const reservaActualizada = await prisma.reserva.update({
      where: { id: parseInt(id, 10) },
      data: {
        id_espacio_servicio,
        id_alumno,
        hora_inicio: hora_inicio ? new Date(hora_inicio) : undefined,
        hora_fin: hora_fin ? new Date(hora_fin) : undefined,
        estado,
        descripcion,
      },
    });
    res.status(200).json(reservaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la reserva.' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.reserva.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la reserva.' });
  }
});

export default router;