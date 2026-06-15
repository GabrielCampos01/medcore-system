const express = require('express');
const router = express.Router();

const {
    listarAtendimentos,
    buscarAtendimentoPorId,
    cadastrarAtendimento,
    atualizarAtendimento,
    excluirAtendimento
} = require('../controllers/atendimentoController');

router.get('/', listarAtendimentos);
router.get('/:id', buscarAtendimentoPorId);
router.post('/', cadastrarAtendimento);
router.put('/:id', atualizarAtendimento);
router.delete('/:id', excluirAtendimento);

module.exports = router;