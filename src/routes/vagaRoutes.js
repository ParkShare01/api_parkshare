import express from 'express';
import * as vagaController from '../controllers/vagaController.js';
import validate from '../middlewares/validate.js';
import { vagaCreateSchema, vagaUpdateSchema } from '../controllers/vagaController.js';
 
import authMiddleware from '../middlewares/authMiddleware.js';
 
const router = express.Router();
 
router.post('/', validate(vagaCreateSchema), vagaController.adicionarvaga);
 
router.use(authMiddleware);
 
router.get('/', vagaController.listarvagas);
 
router.put('/:idVaga', validate(vagaUpdateSchema), vagaController.atualizarVaga);
 
router.delete('/:idVaga', vagaController.deletarVaga);
export default router;