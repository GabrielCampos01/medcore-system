const connection = require('../config/db');

function listarEspecialidades(req, res) {
    connection.query('select * from especialidades', (err, results) => {
        if (err) {
            return res.status(500).json({
                erro: 'Erro ao listar especialidades'
            });
        }

        res.status(200).json(results);
    });
}

function cadastrarEspecialidade(req, res) {

    const { nome, descricao, area } = req.body;

    const sql = `
        insert into especialidades(nome, descricao, area)
        values (?, ?, ?)
    `;

    connection.query(
        sql,
        [nome, descricao, area],
        (err, result) => {

            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({
                        erro: 'Especialidade já cadastrada.'
                    });
                }

                return res.status(500).json({
                    erro: 'Erro ao cadastrar especialidade'
                });
            }

            res.status(201).json({
                mensagem: 'Especialidade cadastrada com sucesso'
            });
        }
    );
}

function buscarEspecialidadePorId(req, res) {

    const { id } = req.params;

    connection.query(
        'select * from especialidades where id = ?',
        [id],
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao buscar especialidade'
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    erro: 'Especialidade não encontrada'
                });
            }

            res.status(200).json(results[0]);
        }
    );
}

function atualizarEspecialidade(req, res) {

    const { id } = req.params;
    const { nome, descricao, area } = req.body;

    const sql = `
        update especialidades
        set nome = ?, descricao = ?, area = ?
        where id = ?
    `;

    connection.query(
        sql,
        [nome, descricao, area, id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao atualizar especialidade'
                });
            }

            res.status(200).json({
                mensagem: 'Especialidade atualizada com sucesso'
            });
        }
    );
}

function excluirEspecialidade(req, res) {

    const { id } = req.params;

    connection.query(
        'delete from especialidades where id = ?',
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao excluir especialidade'
                });
            }

            res.status(200).json({
                mensagem: 'Especialidade excluída com sucesso'
            });
        }
    );
}

module.exports = {
    listarEspecialidades,
    cadastrarEspecialidade,
    buscarEspecialidadePorId,
    atualizarEspecialidade,
    excluirEspecialidade
};