import * as reservaService from '../services/reservaService.js';
import Joi from 'joi';
 
 
export const reservaCreateSchema = Joi.object({
  cpf: Joi.string().required().max(25),
  formaPagamento: Joi.string().required().max(100),
  statusVaga: Joi.string().required().max(25),
  valorPrevisto: Joi.string().required().max(25),
  prazoCancelamento: Joi.string().required().max(100),
  dataHorario: Joi.string().required().max(100),
});
 
export const reservaUpdateSchema = Joi.object({
  cpf: Joi.string().required().max(25),
  formaPagamento: Joi.string().required().max(100),
  statusVaga: Joi.string().required().max(25),
  valorPrevisto: Joi.string().required().max(25),
  prazoCancelamento: Joi.string().required().max(100),
  dataHorario: Joi.string().required().max(100),
}).min(1);
 
export const listarReservas = async (req, res) => {
    try {
      const {cpf, formaPagamento, statusVaga, idReserva, idVaga, prazoCancelamento} = req.query;
      const reserva = await reservaService.findAll(cpf, formaPagamento, statusVaga, idReserva, idVaga, prazoCancelamento);
      res.json(reserva);
    } catch (err) {
      console.error('Erro ao buscar reserva:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
 
 
export const adicionarReserva = async (req, res) => {
  try {
    const novaReserva = await reservaService.create(req.body);
    res.status(201).json({ message: 'Reserva adicionado com sucesso', data: novaReserva });
  } catch (err) {
    console.error('Erro ao adicionar reserva:', err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'idReserva já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro ao adicionar reserva' });
  }
};
 
export const atualizarReserva = async (req, res) => {
  try {
    const { idReserva } = req.params;
    const updated = await reservaService.update(idReserva, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Reserva não encontrado' });
    }
    res.status(200).json({ message: 'Reserva atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar reserva:', err);
    res.status(500).json({ error: 'Erro ao atualizar reserva' });
  }
};
 
export const deletarReserva = async (req, res) => {
  try {
    const { idReserva } = req.params;
    const deleted = await reservaService.remove(idReserva);
    if (!deleted) {
      return res.status(404).json({ error: 'Reserva não encontrado' });
    }
    res.status(200).json({ message: 'Reserva deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar reserva:', err);
    res.status(500).json({ error: 'Erro ao deletar reserva' });
  }
};