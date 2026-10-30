import express from 'express';
import * as reservaController from '../controllers/reservaController.js';
import validate from '../middlewares/validate.js';
import { reservaCreateSchema, reservaUpdateSchema } from '../controllers/reservaController.js';
 
import authMiddleware from '../middlewares/authMiddleware.js';
 
const router = express.Router();
 
router.post('/', validate(reservaCreateSchema), reservaController.adicionarReserva);
 
router.use(authMiddleware);
 
router.get('/', reservaController.listarReservas);
 
router.put('/:idReserva', validate(reservaUpdateSchema), reservaController.atualizarReserva);
 
router.delete('/:idReserva', reservaController.deletarReserva);
export default router;
