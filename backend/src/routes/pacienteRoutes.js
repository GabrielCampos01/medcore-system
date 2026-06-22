const express = require('express');
const router = express.Router();

const {
    listarPacientes,
    buscarPacientePorId,
    cadastrarPaciente,
    atualizarPaciente,
    excluirPaciente,
    ativarPaciente
} = require('../controllers/pacienteController');

router.get('/', listarPacientes);
router.get('/:id', buscarPacientePorId);
router.post('/', cadastrarPaciente);
router.put('/:id', atualizarPaciente);
router.delete('/:id', excluirPaciente);
router.put('/:id/ativar', ativarPaciente);

module.exports = router;