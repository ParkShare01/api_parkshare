import express from 'express';
import * as vagaController from '../controllers/vagaController.js';
import validate from '../middlewares/validate.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Cadastro de vaga
router.post(
  '/',
  validate(vagaController.vagaCreateSchema),
  vagaController.adicionarvaga
);

// Proteção das rotas abaixo
router.use(authMiddleware);

// Listar vagas
router.get(
  '/',
  vagaController.listarVagas
);

// Atualizar vaga
router.put(
  '/:idVaga',
  validate(vagaController.vagaUpdateSchema),
  vagaController.atualizarVaga
);

// Excluir vaga
router.delete(
  '/:idVaga',
  vagaController.deletarVaga
);

export default router;