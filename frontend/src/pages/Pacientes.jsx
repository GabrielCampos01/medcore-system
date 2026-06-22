import { useEffect, useState } from 'react';
import api from '../services/api';

function Pacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [busca, setBusca] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [editandoId, setEditandoId] = useState(null);
    const [filtroAtivo, setFiltroAtivo] = useState('true');

    const [form, setForm] = useState({
        nome_completo: '',
        cpf: '',
        data_nascimento: '',
        sexo: '',
        telefone: '',
        email: '',
        endereco: '',
        convenio: '',
        numero_carteirinha: ''
    });

    useEffect(() => {
        carregarPacientes();
    }, [filtroAtivo]);

    async function carregarPacientes() {
        setCarregando(true);

        try {
            let url = '/pacientes';

            if (filtroAtivo === 'true') {
                url = '/pacientes?ativo=true';
            }

            if (filtroAtivo === 'false') {
                url = '/pacientes?ativo=false';
            }

            const response = await api.get(url);
            setPacientes(response.data);
        } catch {
            setMensagem('Erro ao carregar pacientes.');
        }

        setCarregando(false);
    }

    function alterarCampo(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const pacientesFiltrados = pacientes.filter((paciente) => {
        const textoBusca = busca.toLowerCase();

        return (
            paciente.nome_completo?.toLowerCase().includes(textoBusca) ||
            paciente.cpf?.toLowerCase().includes(textoBusca)
        );
    });

    async function salvarPaciente(e) {
        e.preventDefault();

        if (!form.nome_completo || !form.cpf || !form.email) {
            setMensagem('Nome completo, CPF e email são obrigatórios.');
            return;
        }

        try {
            if (editandoId) {
                await api.put(`/pacientes/${editandoId}`, form);
                setMensagem('Paciente atualizado com sucesso!');
            } else {
                await api.post('/pacientes', form);
                setMensagem('Paciente cadastrado com sucesso!');
            }

            limparFormulario();
            carregarPacientes();
        } catch (error) {
            setMensagem(error.response?.data?.erro || 'Erro ao salvar paciente.');
        }
    }

    function editarPaciente(paciente) {
        setEditandoId(paciente.id);

        setForm({
            nome_completo: paciente.nome_completo || '',
            cpf: paciente.cpf || '',
            data_nascimento: paciente.data_nascimento ? paciente.data_nascimento.substring(0, 10) : '',
            sexo: paciente.sexo || '',
            telefone: paciente.telefone || '',
            email: paciente.email || '',
            endereco: paciente.endereco || '',
            convenio: paciente.convenio || '',
            numero_carteirinha: paciente.numero_carteirinha || ''
        });
    }

    function limparFormulario() {
        setEditandoId(null);

        setForm({
            nome_completo: '',
            cpf: '',
            data_nascimento: '',
            sexo: '',
            telefone: '',
            email: '',
            endereco: '',
            convenio: '',
            numero_carteirinha: ''
        });
    }

    async function desativarPaciente(id) {
        if (!window.confirm('Deseja realmente desativar este paciente?')) {
            return;
        }

        try {
            await api.delete(`/pacientes/${id}`);
            setMensagem('Paciente desativado com sucesso!');
            carregarPacientes();
        } catch {
            setMensagem('Erro ao desativar paciente.');
        }
    }

    async function ativarPaciente(id) {
        if (!window.confirm('Deseja realmente ativar este paciente novamente?')) {
            return;
        }

        try {
            await api.put(`/pacientes/${id}/ativar`);
            setMensagem('Paciente ativado com sucesso!');
            carregarPacientes();
        } catch {
            setMensagem('Erro ao ativar paciente.');
        }
    }

    return (
        <div className="container mt-4">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Pacientes</h1>
                    <p className="page-subtitle">
                        Gerencie os pacientes cadastrados
                    </p>
                </div>
            </div>

            {mensagem && <div className="alert alert-info">{mensagem}</div>}

            <div className="card mb-4">
                <div className="card-body">
                    <h5>{editandoId ? 'Editar paciente' : 'Cadastrar paciente'}</h5>

                    <form onSubmit={salvarPaciente}>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Nome completo</label>
                                <input
                                    name="nome_completo"
                                    className="form-control"
                                    value={form.nome_completo}
                                    onChange={alterarCampo}
                                />
                            </div>

                            <div className="col-md-2 mb-3">
                                <label className="form-label">CPF</label>
                                <input
                                    name="cpf"
                                    className="form-control"
                                    value={form.cpf}
                                    onChange={alterarCampo}
                                />
                            </div>

                            <div className="col-md-2 mb-3">
                                <label className="form-label">Nascimento</label>
                                <input
                                    type="date"
                                    name="data_nascimento"
                                    className="form-control"
                                    value={form.data_nascimento}
                                    onChange={alterarCampo}
                                />
                            </div>

                            <div className="col-md-2 mb-3">
                                <label className="form-label">Sexo</label>
                                <select
                                    name="sexo"
                                    className="form-select"
                                    value={form.sexo}
                                    onChange={alterarCampo}
                                >
                                    <option value="">Selecione</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>

                            <div className="col-md-2 mb-3">
                                <label className="form-label">Telefone</label>
                                <input
                                    name="telefone"
                                    className="form-control"
                                    value={form.telefone}
                                    onChange={alterarCampo}
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={form.email}
                                    onChange={alterarCampo}
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label">Endereço</label>
                                <input
                                    name="endereco"
                                    className="form-control"
                                    value={form.endereco}
                                    onChange={alterarCampo}
                                />
                            </div>

                            <div className="col-md-2 mb-3">
                                <label className="form-label">Convênio</label>
                                <input
                                    name="convenio"
                                    className="form-control"
                                    value={form.convenio}
                                    onChange={alterarCampo}
                                />
                            </div>

                            <div className="col-md-2 mb-3">
                                <label className="form-label">Carteirinha</label>
                                <input
                                    name="numero_carteirinha"
                                    className="form-control"
                                    value={form.numero_carteirinha}
                                    onChange={alterarCampo}
                                />
                            </div>
                        </div>

                        <button className="btn btn-primary me-2">
                            {editandoId ? 'Atualizar' : 'Cadastrar'}
                        </button>

                        {editandoId && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={limparFormulario}
                            >
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
                            <label className="form-label">Situação</label>
                            <select
                                className="form-select"
                                value={filtroAtivo}
                                onChange={(e) => setFiltroAtivo(e.target.value)}
                            >
                                <option value="true">Ativos</option>
                                <option value="false">Inativos</option>
                                <option value="todos">Todos</option>
                            </select>
                        </div>

                        <div className="col-md-8 mb-3">
                            <label className="form-label">Busca</label>
                            <div className="d-flex gap-2">
                                <input
                                    className="form-control"
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                    placeholder="Buscar paciente por nome ou CPF..."
                                />

                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => setBusca('')}
                                >
                                    Limpar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {carregando ? (
                <p>Carregando...</p>
            ) : (
                <div className="content-card">
                    <table className="table table-clean">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Telefone</th>
                                <th>Email</th>
                                <th>Convênio</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pacientesFiltrados.map((paciente) => (
                                <tr key={paciente.id}>
                                    <td>{paciente.id}</td>
                                    <td>{paciente.nome_completo}</td>
                                    <td>{paciente.cpf}</td>
                                    <td>{paciente.telefone}</td>
                                    <td>{paciente.email}</td>
                                    <td>{paciente.convenio}</td>
                                    <td>
                                        {Number(paciente.ativo) === 1 ? 'Ativo' : 'Inativo'}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-outline-primary btn-sm me-2"
                                            title="Editar"
                                            onClick={() => editarPaciente(paciente)}
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </button>

                                        {Number(paciente.ativo) === 1 ? (
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                title="Desativar"
                                                onClick={() => desativarPaciente(paciente.id)}
                                            >
                                                <i className="bi bi-x-circle"></i>
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-outline-success btn-sm"
                                                title="Ativar"
                                                onClick={() => ativarPaciente(paciente.id)}
                                            >
                                                <i className="bi bi-check-circle"></i>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="table-footer">
                        {pacientesFiltrados.length} pacientes encontrados
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pacientes;