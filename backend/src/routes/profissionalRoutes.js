const express = require('express');
const router = express.Router();

const {
    listarProfissionais,
    buscarProfissionalPorId,
    cadastrarProfissional,
    atualizarProfissional,
    excluirProfissional
} = require('../controllers/profissionalController');

router.get('/', listarProfissionais);
router.get('/:id', buscarProfissionalPorId);
router.post('/', cadastrarProfissional);
router.put('/:id', atualizarProfissional);
router.delete('/:id', excluirProfissional);

module.exports = router;