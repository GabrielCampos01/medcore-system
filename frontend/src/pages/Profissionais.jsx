import { useEffect, useState } from 'react';
import api from '../services/api';

function Profissionais() {
    const [profissionais, setProfissionais] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [editandoId, setEditandoId] = useState(null);
    const [filtroAtivo, setFiltroAtivo] = useState('true');

    const [form, setForm] = useState({
        nome: '',
        crm_coren_crf: '',
        especialidade_id: '',
        cargo: '',
        turno: '',
        telefone: '',
        email: '',
        ativo: true
    });

    useEffect(() => {
        carregarProfissionais();
        carregarEspecialidades();
    }, [filtroAtivo]);

    async function carregarProfissionais() {
        setCarregando(true);

        try {
            let url = '/profissionais';

            if (filtroAtivo === 'true') {
                url = '/profissionais?ativo=true';
            }

            if (filtroAtivo === 'false') {
                url = '/profissionais?ativo=false';
            }

            const response = await api.get(url);
            setProfissionais(response.data);
        } catch {
            setMensagem('Erro ao carregar profissionais.');
        }

        setCarregando(false);
    }

    async function carregarEspecialidades() {
        try {
            const response = await api.get('/especialidades');
            setEspecialidades(response.data);
        } catch {
            setMensagem('Erro ao carregar especialidades.');
        }
    }

    function alterarCampo(e) {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: name === 'ativo' ? value === 'true' : value
        });
    }

    async function salvarProfissional(e) {
        e.preventDefault();

        if (!form.nome || !form.crm_coren_crf || !form.email || !form.especialidade_id) {
            setMensagem('Nome, registro, email e especialidade são obrigatórios.');
            return;
        }

        try {
            if (editandoId) {
                await api.put(`/profissionais/${editandoId}`, form);
                setMensagem('Profissional atualizado com sucesso!');
            } else {
                await api.post('/profissionais', form);
                setMensagem('Profissional cadastrado com sucesso!');
            }

            limparFormulario();
            carregarProfissionais();
        } catch (error) {
            setMensagem(error.response?.data?.erro || 'Erro ao salvar profissional.');
        }
    }

    function editarProfissional(profissional) {
        setEditandoId(profissional.id);

        setForm({
            nome: profissional.nome || '',
            crm_coren_crf: profissional.crm_coren_crf || '',
            especialidade_id: profissional.especialidade_id || '',
            cargo: profissional.cargo || '',
            turno: profissional.turno || '',
            telefone: profissional.telefone || '',
            email: profissional.email || '',
            ativo: Number(profissional.ativo) === 1
        });
    }

    function limparFormulario() {
        setEditandoId(null);

        setForm({
            nome: '',
            crm_coren_crf: '',
            especialidade_id: '',
            cargo: '',
            turno: '',
            telefone: '',
            email: '',
            ativo: true
        });
    }

    async function desativarProfissional(id) {
        if (!window.confirm('Deseja realmente desativar este profissional?')) {
            return;
        }

        try {
            await api.delete(`/profissionais/${id}`);
            setMensagem('Profissional desativado com sucesso!');
            carregarProfissionais();
        } catch {
            setMensagem('Erro ao desativar profissional.');
        }
    }

    async function ativarProfissional(id) {
        if (!window.confirm('Deseja realmente ativar este profissional novamente?')) {
            return;
        }

        try {
            await api.put(`/profissionais/${id}/ativar`);
            setMensagem('Profissional ativado com sucesso!');
            carregarProfissionais();
        } catch {
            setMensagem('Erro ao ativar profissional.');
        }
    }

    return (
        <div className="container mt-4">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Profissionais</h1>
                    <p className="page-subtitle">
                        Gerencie os profissionais cadastrados
                    </p>
                </div>
            </div>

            {mensagem && <div className="alert alert-info">{mensagem}</div>}

            <div className="card mb-4">
                <div className="card-body">
                    <h5>{editandoId ? 'Editar profissional' : 'Cadastrar profissional'}</h5>

                    <form onSubmit={salvarProfissional}>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Nome</label>
                                <input
                                    name="nome"
                                    className="form-control"
                                    value={form.nome}
                                    onChange={alterarCampo}
                                />
                            </div>

                            <div className="col-md-2 mb-3">
                                <label className="form-label">Registro</label>
                                <input
                                    name="crm_coren_crf"
                                    className="form-control"
                                    value={form.crm_coren_crf}
                                    onChange={alterarCampo}
                                />
                            </div>

                            <div className="col-md-3 mb-3">
                                <label className="form-label">Especialidade</label>
                                <select
                                    name="especialidade_id"
                                    className="form-select"
                                    value={form.especialidade_id}
                                    onChange={alterarCampo}
                                >
                                    <option value="">Selecione</option>
                                    {especialidades.map((especialidade) => (
                                        <option key={especialidade.id} value={especialidade.id}>
                                            {especialidade.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-3 mb-3">
                                <label className="form-label">Cargo</label>
                                <input
                                    name="cargo"
                                    className="form-control"
                                    value={form.cargo}
                                    onChange={alterarCampo}
                                />
                            </div>

                            <div className="col-md-3 mb-3">
                                <label className="form-label">Turno</label>
                                <input
                                    name="turno"
                                    className="form-control"
                                    value={form.turno}
                                    onChange={alterarCampo}
                                />
                            </div>

                            <div className="col-md-3 mb-3">
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

                            <div className="col-md-2 mb-3">
                                <label className="form-label">Ativo</label>
                                <select
                                    name="ativo"
                                    className="form-select"
                                    value={String(form.ativo)}
                                    onChange={alterarCampo}
                                >
                                    <option value="true">Sim</option>
                                    <option value="false">Não</option>
                                </select>
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
                                <th>Registro</th>
                                <th>Especialidade</th>
                                <th>Cargo</th>
                                <th>Turno</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {profissionais.map((profissional) => (
                                <tr key={profissional.id}>
                                    <td>{profissional.id}</td>
                                    <td>{profissional.nome}</td>
                                    <td>{profissional.crm_coren_crf}</td>
                                    <td>{profissional.especialidade}</td>
                                    <td>{profissional.cargo}</td>
                                    <td>{profissional.turno}</td>
                                    <td>{profissional.email}</td>
                                    <td>
                                        {Number(profissional.ativo) === 1 ? 'Ativo' : 'Inativo'}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-outline-primary btn-sm me-2"
                                            title="Editar"
                                            onClick={() => editarProfissional(profissional)}
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </button>

                                        {Number(profissional.ativo) === 1 ? (
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                title="Desativar"
                                                onClick={() => desativarProfissional(profissional.id)}
                                            >
                                                <i className="bi bi-x-circle"></i>
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-outline-success btn-sm"
                                                title="Ativar"
                                                onClick={() => ativarProfissional(profissional.id)}
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
                        {profissionais.length} profissionais encontrados
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profissionais;