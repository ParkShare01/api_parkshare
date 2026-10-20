// src/routes/clienteRoutes.env
import express from 'express';
import * as usuarioController from '../controllers/usuarioController.js';
import validate from '../middlewares/validate.js';
import { usuarioCreateSchema, usuarioUpdateSchema } from '../controllers/usuarioController.js';

// // 1. Importa o middleware de login. Descomentar para carregar
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// A rota de criação de cliente (registro) continua pública
router.post('/', validate(usuarioCreateSchema), usuarioController.adicionarUsuario);// Rota final: POST /api/clientes

 //2. Aplica o proteção do login em todas as rotas abaixo desta linha
router.use(authMiddleware);

// O caminho base '/api/clientes' já foi definido no index.js
// Agora definimos apenas as partes relativas: '/', etc.
router.get('/', usuarioController.listarUsuarios); // Rota final: GET /api/clientes

router.put('/:cpf', validate(usuarioUpdateSchema), usuarioController.atualizarUsuario); // Rota final: PUT /api/clientes/:cpf

router.delete('/:cpf', usuarioController.deletarUsuario); // Rota final: DELETE /api/clientes/:cpf
export default router;