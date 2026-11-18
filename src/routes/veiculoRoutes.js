import express from 'express';

import * as veiculoController from '../controllers/veiculoController.js';

import validate from '../middlewares/validate.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// LISTAR VEÍCULOS
router.get(
    '/',
    authMiddleware,
    veiculoController.listarVeiculos
);

// BUSCAR VEÍCULO PELA PLACA
router.get(
    '/:placa',
    authMiddleware,
    veiculoController.buscarVeiculo
);

// CADASTRAR VEÍCULO
router.post(
    '/',
    authMiddleware,
    validate(veiculoController.veiculoCreateSchema),
    veiculoController.cadastrarVeiculo
);

// ATUALIZAR VEÍCULO
router.put(
    '/:placa',
    authMiddleware,
    validate(veiculoController.veiculoUpdateSchema),
    veiculoController.atualizarVeiculo
);

// EXCLUIR VEÍCULO
router.delete(
    '/:placa',
    authMiddleware,
    veiculoController.excluirVeiculo
);

export default router;