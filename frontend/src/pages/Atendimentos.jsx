import { useEffect, useState } from 'react';
import api from '../services/api';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Atendimentos() {
    const [atendimentos, setAtendimentos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [profissionais, setProfissionais] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [editandoId, setEditandoId] = useState(null);
    const [detalhes, setDetalhes] = useState(null);

    const [filtros, setFiltros] = useState({
        data: '',
        status: ''
    });

    const [form, setForm] = useState({
        paciente_id: '',
        profissional_id: '',
        data_hora: '',
        tipo: '',
        status: '',
        diagnostico: '',
        observacoes: '',
        valor: ''
    });

    useEffect(() => {
        carregarAtendimentos();
        carregarPacientes();
        carregarProfissionais();
    }, []);

    async function carregarAtendimentos() {
        setCarregando(true);

        try {
            let url = '/atendimentos';

            const params = [];

            if (filtros.data) {
                params.push(`data=${filtros.data}`);
            }

            if (filtros.status) {
                params.push(`status=${filtros.status}`);
            }

            if (params.length > 0) {
                url += `?${params.join('&')}`;
            }

            const response = await api.get(url);
            setAtendimentos(response.data);
        } catch {
            setMensagem('Erro ao carregar atendimentos.');
        }

        setCarregando(false);
    }

    async function carregarPacientes() {
        const response = await api.get('/pacientes');
        setPacientes(response.data);
    }

    async function carregarProfissionais() {
        const response = await api.get('/profissionais');
        setProfissionais(response.data);
    }

    function alterarCampo(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function alterarFiltro(e) {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    }

    async function salvarAtendimento(e) {
        e.preventDefault();

        if (!form.paciente_id || !form.profissional_id || !form.data_hora || !form.tipo || !form.status) {
            setMensagem('Paciente, profissional, data/hora, tipo e status são obrigatórios.');
            return;
        }

        try {
            const dados = {
                ...form,
                valor: form.valor || 0
            };

            if (editandoId) {
                await api.put(`/atendimentos/${editandoId}`, dados);
                setMensagem('Atendimento atualizado com sucesso!');
            } else {
                await api.post('/atendimentos', dados);
                setMensagem('Atendimento cadastrado com sucesso!');
            }

            limparFormulario();
            carregarAtendimentos();
        } catch {
            setMensagem('Erro ao salvar atendimento.');
        }
    }

    function editarAtendimento(atendimento) {
        setEditandoId(atendimento.id);

        setForm({
            paciente_id: atendimento.paciente_id || '',
            profissional_id: atendimento.profissional_id || '',
            data_hora: atendimento.data_hora ? atendimento.data_hora.substring(0, 16) : '',
            tipo: atendimento.tipo || '',
            status: atendimento.status || '',
            diagnostico: atendimento.diagnostico || '',
            observacoes: atendimento.observacoes || '',
            valor: atendimento.valor || ''
        });
    }

    function limparFormulario() {
        setEditandoId(null);

        setForm({
            paciente_id: '',
            profissional_id: '',
            data_hora: '',
            tipo: '',
            status: '',
            diagnostico: '',
            observacoes: '',
            valor: ''
        });
    }

    async function cancelarAtendimento(atendimento) {
        if (!window.confirm('Deseja realmente cancelar este atendimento?')) {
            return;
        }

        try {
            await api.put(`/atendimentos/${atendimento.id}`, {
                paciente_id: atendimento.paciente_id,
                profissional_id: atendimento.profissional_id,
                data_hora: atendimento.data_hora,
                tipo: atendimento.tipo,
                status: 'Cancelado',
                diagnostico: atendimento.diagnostico,
                observacoes: atendimento.observacoes,
                valor: atendimento.valor
            });

            setMensagem('Atendimento cancelado com sucesso!');
            carregarAtendimentos();
        } catch {
            setMensagem('Erro ao cancelar atendimento.');
        }
    }

    function verDetalhes(atendimento) {
        setDetalhes(atendimento);
    }

    return (
        <div className="container mt-4">
            <h1 className="page-title">Atendimentos</h1>

            {mensagem && <div className="alert alert-info">{mensagem}</div>}

            {detalhes && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5>Detalhes do atendimento</h5>
                        <p><strong>Paciente:</strong> {detalhes.paciente}</p>
                        <p><strong>Profissional:</strong> {detalhes.profissional}</p>
                        <p><strong>Tipo:</strong> {detalhes.tipo}</p>
                        <p><strong>Status:</strong> {detalhes.status}</p>
                        <p><strong>Diagnóstico:</strong> {detalhes.diagnostico}</p>
                        <p><strong>Observações:</strong> {detalhes.observacoes}</p>
                        <p><strong>Valor:</strong> R$ {detalhes.valor}</p>

                        <button className="btn btn-secondary btn-sm" onClick={() => setDetalhes(null)}>
                            Fechar detalhes
                        </button>
                    </div>
                </div>
            )}

            <div className="card mb-4">
                <div className="card-body">
                    <h5>{editandoId ? 'Editar atendimento' : 'Cadastrar atendimento'}</h5>

                    <form onSubmit={salvarAtendimento}>
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Paciente</label>
                                <select name="paciente_id" className="form-select" value={form.paciente_id} onChange={alterarCampo}>
                                    <option value="">Selecione</option>
                                    {pacientes.map((paciente) => (
                                        <option key={paciente.id} value={paciente.id}>
                                            {paciente.nome_completo}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-3 mb-3">
                                <label className="form-label">Profissional</label>
                                <select name="profissional_id" className="form-select" value={form.profissional_id} onChange={alterarCampo}>
                                    <option value="">Selecione</option>
                                    {profissionais.map((profissional) => (
                                        <option key={profissional.id} value={profissional.id}>
                                            {profissional.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-3 mb-3">
                                <label className="form-label">Data e hora</label>
                                <input type="datetime-local" name="data_hora" className="form-control" value={form.data_hora} onChange={alterarCampo} />
                            </div>

                            <div className="col-md-3 mb-3">
                                <label className="form-label">Tipo</label>
                                <select name="tipo" className="form-select" value={form.tipo} onChange={alterarCampo}>
                                    <option value="">Selecione</option>
                                    <option value="Consulta">Consulta</option>
                                    <option value="Exame">Exame</option>
                                    <option value="Internação">Internação</option>
                                    <option value="Retorno">Retorno</option>
                                </select>
                            </div>

                            <div className="col-md-3 mb-3">
                                <label className="form-label">Status</label>
                                <select name="status" className="form-select" value={form.status} onChange={alterarCampo}>
                                    <option value="">Selecione</option>
                                    <option value="Agendado">Agendado</option>
                                    <option value="Concluído">Concluído</option>
                                    <option value="Cancelado">Cancelado</option>
                                </select>
                            </div>

                            <div className="col-md-3 mb-3">
                                <label className="form-label">Valor</label>
                                <input type="number" step="0.01" name="valor" className="form-control" value={form.valor} onChange={alterarCampo} />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Diagnóstico</label>
                                <input name="diagnostico" className="form-control" value={form.diagnostico} onChange={alterarCampo} />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="form-label">Observações</label>
                                <textarea name="observacoes" className="form-control" value={form.observacoes} onChange={alterarCampo}></textarea>
                            </div>
                        </div>

                        <button className="btn btn-primary me-2">
                            {editandoId ? 'Atualizar' : 'Cadastrar'}
                        </button>

                        {editandoId && (
                            <button type="button" className="btn btn-secondary" onClick={limparFormulario}>
                                Cancelar
                            </button>
                        )}
                    </form>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <h5>Filtros</h5>

                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Data</label>
                            <input type="date" name="data" className="form-control" value={filtros.data} onChange={alterarFiltro} />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label className="form-label">Status</label>
                            <select name="status" className="form-select" value={filtros.status} onChange={alterarFiltro}>
                                <option value="">Todos</option>
                                <option value="Agendado">Agendado</option>
                                <option value="Concluído">Concluído</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-3 d-flex align-items-end">
                            <button className="btn btn-primary me-2" onClick={carregarAtendimentos}>
                                Filtrar
                            </button>

                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setFiltros({ data: '', status: '' });
                                    setTimeout(carregarAtendimentos, 100);
                                }}
                            >
                                Limpar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {carregando ? (
                <p>Carregando...</p>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Paciente</th>
                            <th>Profissional</th>
                            <th>Data/Hora</th>
                            <th>Tipo</th>
                            <th>Status</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {atendimentos.map((atendimento) => (
                            <tr key={atendimento.id}>
                                <td>{atendimento.id}</td>
                                <td>{atendimento.paciente}</td>
                                <td>{atendimento.profissional}</td>
                                <td>{atendimento.data_hora}</td>
                                <td>{atendimento.tipo}</td>
                                <td>{atendimento.status}</td>
                                <td>R$ {atendimento.valor}</td>
                                <td>
                                   <button
                                        className="btn btn-info btn-sm me-2"
                                        title="Detalhes"
                                        onClick={() => verDetalhes(atendimento)}
                                    >
                                        <i className="bi bi-eye"></i>
                                    </button>

                                    {atendimento.status !== 'Cancelado' && (
                                        <>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                title="Editar"
                                                onClick={() => editarAtendimento(atendimento)}
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>

                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                title="Cancelar"
                                                onClick={() => cancelarAtendimento(atendimento)}
                                            >
                                                <i className="bi bi-x-circle"></i>
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Atendimentos;