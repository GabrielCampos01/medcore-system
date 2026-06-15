const express = require('express');
const cors = require('cors');
const connection = require('./config/db');
const especialidadeRoutes = require('./routes/especialidadeRoutes');
const profissionalRoutes = require('./routes/profissionalRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const atendimentoRoutes = require('./routes/atendimentoRoutes');

const app = express();


app.use(cors());
app.use(express.json());
app.use('/api/especialidades', especialidadeRoutes);
app.use('/api/profissionais', profissionalRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/atendimentos', atendimentoRoutes);

app.get('/', (req, res) => {
    res.send('API MedCore funcionando!');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});