import * as usuarioService from '../services/usuarioService.js';
import Joi from 'joi';

// Schema para cadastro de usuário
export const usuarioCreateSchema = Joi.object({
  cpf: Joi.string().length(11).required(),
  nome: Joi.string().required().max(100),
  endereco: Joi.string().required().max(100),
  bairro: Joi.string().max(30).allow(''),
  cidade: Joi.string().max(30).allow(''),
  cep: Joi.string().required(),
  email: Joi.string().email().required().max(50),
  senha: Joi.string().min(6).required(),
});

// Schema para atualização de usuário
export const usuarioUpdateSchema = Joi.object({
  nome: Joi.string().max(100),
  endereco: Joi.string().max(100),
  bairro: Joi.string().max(30).allow(''),
  cidade: Joi.string().max(30).allow(''),
  cep: Joi.string(),
  email: Joi.string().email().max(50),
  senha: Joi.string().min(6),
}).min(1);

// Listar usuários
export const listarUsuarios = async (req, res) => {
  try {
    const { cpf, nome, email } = req.query;

    const usuarios = await usuarioService.findAll(
      cpf,
      nome,
      email
    );

    return res.status(200).json(usuarios);

  } catch (err) {
    console.error('Erro ao buscar usuários:', err);

    return res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
};

// Adicionar usuário
export const adicionarUsuarios = async (req, res) => {
  try {
    const novoUsuario = await usuarioService.create(req.body);

    return res.status(201).json({
      message: 'Usuário adicionado com sucesso',
      data: novoUsuario
    });

  } catch (err) {
    console.error('Erro ao adicionar usuário:', err);

    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        error: 'CPF ou e-mail já cadastrado.'
      });
    }

    return res.status(500).json({
      error: 'Erro ao adicionar usuário'
    });
  }
};

// Atualizar usuário
export const atualizarUsuario = async (req, res) => {
  try {
    const { cpf } = req.params;

    const updated = await usuarioService.update(cpf, req.body);

    if (!updated) {
      return res.status(404).json({
        error: 'Usuário não encontrado'
      });
    }

    return res.status(200).json({
      message: 'Usuário atualizado com sucesso'
    });

  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);

    return res.status(500).json({
      error: 'Erro ao atualizar usuário'
    });
  }
};

// Deletar usuário
export const deletarUsuario = async (req, res) => {
  try {
    const { cpf } = req.params;

    const deleted = await usuarioService.remove(cpf);

    if (!deleted) {
      return res.status(404).json({
        error: 'Usuário não encontrado'
      });
    }

    return res.status(200).json({
      message: 'Usuário deletado com sucesso'
    });

  } catch (err) {
    console.error('Erro ao deletar usuário:', err);

    return res.status(500).json({
      error: 'Erro ao deletar usuário'
    });
  }
};