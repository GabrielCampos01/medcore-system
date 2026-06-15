const express = require('express');
const router = express.Router();

const {
    listarEspecialidades,
    cadastrarEspecialidade,
    buscarEspecialidadePorId,
    atualizarEspecialidade,
    excluirEspecialidade
} = require('../controllers/especialidadeController');

router.get('/', listarEspecialidades);
router.post('/', cadastrarEspecialidade);
router.get('/:id', buscarEspecialidadePorId);
router.put('/:id', atualizarEspecialidade);
router.delete('/:id', excluirEspecialidade);

module.exports = router;