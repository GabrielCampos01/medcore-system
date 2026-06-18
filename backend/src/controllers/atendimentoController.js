const connection = require('../config/db');

function listarAtendimentos(req, res) {
    const { data, status } = req.query;

    let sql = `
        select atendimentos.*,
               pacientes.nome_completo as paciente,
               profissionais.nome as profissional
        from atendimentos
        left join pacientes on atendimentos.paciente_id = pacientes.id
        left join profissionais on atendimentos.profissional_id = profissionais.id
        where 1 = 1
    `;

    const params = [];

    if (data) {
        sql += ' and date(atendimentos.data_hora) = ?';
        params.push(data);
    }

    if (status) {
        sql += ' and atendimentos.status = ?';
        params.push(status);
    }

    connection.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao listar atendimentos' });
        res.status(200).json(results);
    });
}

function buscarAtendimentoPorId(req, res) {
    const { id } = req.params;

    connection.query('select * from atendimentos where id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar atendimento' });
        if (results.length === 0) return res.status(404).json({ erro: 'Atendimento não encontrado' });

        res.status(200).json(results[0]);
    });
}

function cadastrarAtendimento(req, res) {
    const {
        paciente_id,
        profissional_id,
        data_hora,
        tipo,
        status,
        diagnostico,
        observacoes,
        valor
    } = req.body;

    connection.query(
        'select ativo from profissionais where id = ?',
        [profissional_id],
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao verificar profissional'
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    erro: 'Profissional não encontrado'
                });
            }

            if (results[0].ativo !== 1) {
                return res.status(400).json({
                    erro: 'Não é possível cadastrar atendimento com profissional inativo.'
                });
            }

            const sql = `
                insert into atendimentos
                (paciente_id, profissional_id, data_hora, tipo, status, diagnostico, observacoes, valor)
                values (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            connection.query(
                sql,
                [paciente_id, profissional_id, data_hora, tipo, status, diagnostico, observacoes, valor],
                (err) => {
                    if (err) {
                        return res.status(500).json({
                            erro: 'Erro ao cadastrar atendimento'
                        });
                    }

                    res.status(201).json({
                        mensagem: 'Atendimento cadastrado com sucesso'
                    });
                }
            );
        }
    );
}

function atualizarAtendimento(req, res) {
    const { id } = req.params;

    const {
        paciente_id,
        profissional_id,
        data_hora,
        tipo,
        status,
        diagnostico,
        observacoes,
        valor
    } = req.body;

    const sql = `
        update atendimentos
        set paciente_id = ?, profissional_id = ?, data_hora = ?, tipo = ?,
            status = ?, diagnostico = ?, observacoes = ?, valor = ?
        where id = ?
    `;

    connection.query(
        sql,
        [paciente_id, profissional_id, data_hora, tipo, status, diagnostico, observacoes, valor, id],
        (err) => {
            if (err) return res.status(500).json({ erro: 'Erro ao atualizar atendimento' });
            res.status(200).json({ mensagem: 'Atendimento atualizado com sucesso' });
        }
    );
}

function excluirAtendimento(req, res) {
    const { id } = req.params;

    const sql = `
        update atendimentos
        set status = 'Cancelado'
        where id = ?
    `;

    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                erro: 'Erro ao cancelar atendimento'
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                erro: 'Atendimento não encontrado'
            });
        }

        res.status(200).json({
            mensagem: 'Atendimento cancelado com sucesso'
        });
    });
}

module.exports = {
    listarAtendimentos,
    buscarAtendimentoPorId,
    cadastrarAtendimento,
    atualizarAtendimento,
    excluirAtendimento
};