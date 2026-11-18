import Joi from 'joi';
import * as veiculoService from '../services/veiculoServices.js';

// VALIDAÇÃO PARA CADASTRO
export const veiculoCreateSchema = Joi.object({
    placa: Joi.string().trim().required(),
    modelo: Joi.string().trim().required(),
    cor: Joi.string().trim().required(),
    documento: Joi.string().trim().required(),
    cpf: Joi.string().trim().required()
});

// VALIDAÇÃO PARA ATUALIZAÇÃO
export const veiculoUpdateSchema = Joi.object({
    placa: Joi.string().trim(),
    modelo: Joi.string().trim(),
    cor: Joi.string().trim(),
    documento: Joi.string().trim(),
    cpf: Joi.string().trim()
}).min(1);

// LISTAR VEÍCULOS
export const listarVeiculos = async (req, res) => {
    try {
        const veiculos = await veiculoService.findAll();

        res.status(200).json(veiculos);

    } catch (error) {
        res.status(500).json({
            error: 'Erro ao listar veículos'
        });
    }
};

// BUSCAR VEÍCULO
export const buscarVeiculo = async (req, res) => {
    try {
        const { placa } = req.params;

        const veiculo = await veiculoService.findByPlaca(placa);

        if (!veiculo) {
            return res.status(404).json({
                error: 'Veículo não encontrado'
            });
        }

        res.status(200).json(veiculo);

    } catch (error) {
        res.status(500).json({
            error: 'Erro ao buscar veículo'
        });
    }
};

// CADASTRAR VEÍCULO
export const cadastrarVeiculo = async (req, res) => {
    try {
        const resultado = await veiculoService.create(req.body);

        res.status(201).json({
            message: 'Veículo cadastrado com sucesso!',
            data: resultado
        });

    } catch (error) {
        res.status(500).json({
            error: 'Erro ao cadastrar veículo'
        });
    }
};

// ATUALIZAR VEÍCULO
export const atualizarVeiculo = async (req, res) => {
    try {
        const { placa } = req.params;

        const resultado = await veiculoService.update(
            placa,
            req.body
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: 'Veículo não encontrado'
            });
        }

        res.status(200).json({
            message: 'Veículo atualizado com sucesso!'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Erro ao atualizar veículo'
        });
    }
};

// EXCLUIR VEÍCULO
export const excluirVeiculo = async (req, res) => {
    try {
        const { placa } = req.params;

        const resultado = await veiculoService.remove(placa);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: 'Veículo não encontrado'
            });
        }

        res.status(200).json({
            message: 'Veículo excluído com sucesso!'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Erro ao excluir veículo'
        });
    }
};