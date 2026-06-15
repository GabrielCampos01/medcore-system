const connection = require('../config/db');

function listarPacientes(req, res) {
    connection.query('select * from pacientes', (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao listar pacientes' });
        res.status(200).json(results);
    });
}

function buscarPacientePorId(req, res) {
    const { id } = req.params;

    connection.query('select * from pacientes where id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar paciente' });
        if (results.length === 0) return res.status(404).json({ erro: 'Paciente não encontrado' });

        res.status(200).json(results[0]);
    });
}

function cadastrarPaciente(req, res) {
    const { nome_completo, cpf, data_nascimento, sexo, telefone, email, endereco, convenio, numero_carteirinha } = req.body;

    const sql = `
        insert into pacientes
        (nome_completo, cpf, data_nascimento, sexo, telefone, email, endereco, convenio, numero_carteirinha)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(sql, [nome_completo, cpf, data_nascimento, sexo, telefone, email, endereco, convenio, numero_carteirinha], (err) => {
        if (err) {

            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({
                erro: 'CPF ou email já cadastrado.'
                });
            }

            return res.status(500).json({
                erro: 'Erro ao cadastrar paciente'
            });
        }


        res.status(201).json({ mensagem: 'Paciente cadastrado com sucesso' });
    });
}

function atualizarPaciente(req, res) {
    const { id } = req.params;
    const { nome_completo, cpf, data_nascimento, sexo, telefone, email, endereco, convenio, numero_carteirinha } = req.body;

    const sql = `
        update pacientes
        set nome_completo = ?, cpf = ?, data_nascimento = ?, sexo = ?, telefone = ?,
            email = ?, endereco = ?, convenio = ?, numero_carteirinha = ?
        where id = ?
    `;

    connection.query(sql, [nome_completo, cpf, data_nascimento, sexo, telefone, email, endereco, convenio, numero_carteirinha, id], (err) => {
        if (err) return res.status(500).json({ erro: 'Erro ao atualizar paciente' });
        res.status(200).json({ mensagem: 'Paciente atualizado com sucesso' });
    });
}

function excluirPaciente(req, res) {
    const { id } = req.params;

    connection.query('delete from pacientes where id = ?', [id], (err) => {
        if (err) return res.status(500).json({ erro: 'Erro ao excluir paciente' });
        res.status(200).json({ mensagem: 'Paciente excluído com sucesso' });
    });
}

module.exports = {
    listarPacientes,
    buscarPacientePorId,
    cadastrarPaciente,
    atualizarPaciente,
    excluirPaciente
};