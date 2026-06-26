const connection = require('../config/db');

function normalizarAtivo(ativo) {
    if (ativo === true || ativo === 1 || ativo === '1' || ativo === 'true') {
        return 1;
    }

    return 0;
}

function listarProfissionais(req, res) {
    const { ativo } = req.query;

    let sql = `
        select profissionais.*, especialidades.nome as especialidade
        from profissionais
        left join especialidades
            on profissionais.especialidade_id = especialidades.id
    `;

    if (ativo === 'true') {
        sql += ' where profissionais.ativo = true';
    }

    if (ativo === 'false') {
        sql += ' where profissionais.ativo = false';
    }

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao listar profissionais' });
        }

        res.status(200).json(results);
    });
}

function buscarProfissionalPorId(req, res) {
    const { id } = req.params;

    connection.query(
        'select * from profissionais where id = ?',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ erro: 'Erro ao buscar profissional' });
            }

            if (results.length === 0) {
                return res.status(404).json({ erro: 'Profissional não encontrado' });
            }

            res.status(200).json(results[0]);
        }
    );
}

function cadastrarProfissional(req, res) {
    const {
        nome,
        crm_coren_crf,
        especialidade_id,
        cargo,
        turno,
        telefone,
        email,
        ativo
    } = req.body;

    const ativoNormalizado = normalizarAtivo(ativo);

    const sql = `
        insert into profissionais
        (nome, crm_coren_crf, especialidade_id, cargo, turno, telefone, email, ativo)
        values (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        sql,
        [nome, crm_coren_crf, especialidade_id, cargo, turno, telefone, email, ativoNormalizado],
        (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({
                        erro: 'Registro ou email já cadastrado.'
                    });
                }

                return res.status(500).json({
                    erro: 'Erro ao cadastrar profissional'
                });
            }

            res.status(201).json({ mensagem: 'Profissional cadastrado com sucesso' });
        }
    );
}

function atualizarProfissional(req, res) {
    const { id } = req.params;

    const {
        nome,
        crm_coren_crf,
        especialidade_id,
        cargo,
        turno,
        telefone,
        email,
        ativo
    } = req.body;

    const ativoNormalizado = normalizarAtivo(ativo);

    const sql = `
        update profissionais
        set nome = ?, crm_coren_crf = ?, especialidade_id = ?, cargo = ?,
            turno = ?, telefone = ?, email = ?, ativo = ?
        where id = ?
    `;

    connection.query(
        sql,
        [nome, crm_coren_crf, especialidade_id, cargo, turno, telefone, email, ativoNormalizado, id],
        (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({
                        erro: 'Registro ou email já cadastrado.'
                    });
                }

                return res.status(500).json({ erro: 'Erro ao atualizar profissional' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ erro: 'Profissional não encontrado' });
            }

            res.status(200).json({ mensagem: 'Profissional atualizado com sucesso' });
        }
    );
}

function excluirProfissional(req, res) {
    const { id } = req.params;

    const sql = `
        update profissionais
        set ativo = false
        where id = ?
    `;

    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao desativar profissional' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ erro: 'Profissional não encontrado' });
        }

        res.status(200).json({ mensagem: 'Profissional desativado com sucesso' });
    });
}

function ativarProfissional(req, res) {
    const { id } = req.params;

    const sql = `
        update profissionais
        set ativo = true
        where id = ?
    `;

    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao ativar profissional' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ erro: 'Profissional não encontrado' });
        }

        res.status(200).json({ mensagem: 'Profissional ativado com sucesso' });
    });
}

module.exports = {
    listarProfissionais,
    buscarProfissionalPorId,
    cadastrarProfissional,
    atualizarProfissional,
    excluirProfissional,
    ativarProfissional
};