import db from '../db/db.js';

// LISTAR TODOS OS VEÍCULOS
export const findAll = async () => {
    const [rows] = await db.query(
        'SELECT * FROM veiculo'
    );

    return rows;
};

// BUSCAR VEÍCULO PELA PLACA
export const findByPlaca = async (placa) => {
    const [rows] = await db.query(
        'SELECT * FROM veiculo WHERE placa = ?',
        [placa]
    );

    return rows[0];
};

// CADASTRAR VEÍCULO
export const create = async (veiculo) => {
    const [result] = await db.query(
        'INSERT INTO veiculo SET ?',
        [veiculo]
    );

    return result;
};

// ATUALIZAR VEÍCULO
export const update = async (placa, veiculo) => {
    const [result] = await db.query(
        'UPDATE veiculo SET ? WHERE placa = ?',
        [veiculo, placa]
    );

    return result;
};

// EXCLUIR VEÍCULO
export const remove = async (placa) => {
    const [result] = await db.query(
        'DELETE FROM veiculo WHERE placa = ?',
        [placa]
    );

    return result;
};