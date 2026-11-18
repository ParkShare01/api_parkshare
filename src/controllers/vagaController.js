import * as vagaService from '../services/vagaService.js';
import Joi from 'joi';
 
 
export const vagaCreateSchema = Joi.object({
  statusVaga: Joi.string().required().max(100),
  endereco: Joi.string().required().max(250),
  cep: Joi.string().required().max(15),
  tipoVaga: Joi.string().required().max(50),
  dataHorario: Joi.string().required().max(15),
});
 
export const vagaUpdateSchema = Joi.object({
  statusVaga: Joi.string().required().max(100),
  endereco: Joi.string().required().max(250),
  cep: Joi.string().required().max(15),
  tipoVaga: Joi.string().required().max(50),
  dataHorario: Joi.string().required().max(15),
});
 
export const listarVagas = async (req, res) => {
    try {
      const {idVaga, statusVaga, endereco, cep, tipoVaga, dataHorario} = req.query;
      const vaga = await vagaService.findAll(idVaga, statusVaga, endereco, cep, tipoVaga, dataHorario);
      res.json(vaga);
    } catch (err) {
      console.error('Erro ao buscar vaga:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
 
 
export const adicionarvaga = async (req, res) => {
  try {
    const novaVaga = await vagaService.create(req.body);
    res.status(201).json({ message: 'Vaga adicionado com sucesso', data: novaVaga});
  } catch (err) {
    console.error('Erro ao adicionar vaga:', err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'idVaga já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro ao adicionar vaga' });
  }
};
 
export const atualizarVaga = async (req, res) => {
  try {
    const { idVaga } = req.params;
    const updated = await vagaService.update(idVaga, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Vaga não encontrada' });
    }
    res.status(200).json({ message: 'Vaga atualizada com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar vaga:', err);
    res.status(500).json({ error: 'Erro ao atualizar vaga' });
  }
};
 
export const deletarVaga = async (req, res) => {
  try {
    const { idVaga } = req.params;
    const deleted = await vagaService.remove(idVaga);
    if (!deleted) {
      return res.status(404).json({ error: 'Vaga não encontrada' });
    }
    res.status(200).json({ message: 'Vaga deletada com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar vaga:', err);
    res.status(500).json({ error: 'Erro ao deletar vaga' });
  }
};

