import { useEffect, useState } from 'react';
import api from '../services/api';

function Profissionais() {
    const [profissionais, setProfissionais] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [editandoId, setEditandoId] = useState(null);

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
    }, []);

    async function carregarProfissionais() {
        setCarregando(true);

        try {
            const response = await api.get('/profissionais');
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
        setForm({
            ...form,
            [e.target.name]: e.target.value
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
            ativo: profissional.ativo === 1 || profissional.ativo === true
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

    async function excluirProfissional(id) {
        if (!window.confirm('Deseja realmente excluir este profissional?')) {
            return;
        }

        try {
            await api.delete(`/profissionais/${id}`);
            setMensagem('Profissional excluído com sucesso!');
            carregarProfissionais();
        } catch {
            setMensagem('Erro ao excluir profissional.');
        }
    }

    return (
        <div className="container mt-4">
            <h1 className="page-title">Profissionais</h1>

            {mensagem && <div className="alert alert-info">{mensagem}</div>}

            <div className="card mb-4">
                <div className="card-body">
                    <h5>{editandoId ? 'Editar profissional' : 'Cadastrar profissional'}</h5>

                    <form onSubmit={salvarProfissional}>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Nome</label>
                                <input name="nome" className="form-control" value={form.nome} onChange={alterarCampo} />
                            </div>

                            <div className="col-md-2 mb-3">
                                <label className="form-label">Registro</label>
                                <input name="crm_coren_crf" className="form-control" value={form.crm_coren_crf} onChange={alterarCampo} />
                            </div>

                            <div className="col-md-3 mb-3">
                                <label className="form-label">Especialidade</label>
                                <select name="especialidade_id" className="form-select" value={form.especialidade_id} onChange={alterarCampo}>
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
                                <input name="cargo" className="form-control" value={form.cargo} onChange={alterarCampo} />
                            </div>

                            <div className="col-md-3 mb-3">
                                <label className="form-label">Turno</label>
                                <input name="turno" className="form-control" value={form.turno} onChange={alterarCampo} />
                            </div>

                            <div className="col-md-3 mb-3">
                                <label className="form-label">Telefone</label>
                                <input name="telefone" className="form-control" value={form.telefone} onChange={alterarCampo} />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" name="email" className="form-control" value={form.email} onChange={alterarCampo} />
                            </div>

                            <div className="col-md-2 mb-3">
                                <label className="form-label">Ativo</label>
                                <select name="ativo" className="form-select" value={form.ativo} onChange={alterarCampo}>
                                    <option value={true}>Sim</option>
                                    <option value={false}>Não</option>
                                </select>
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

            {carregando ? (
                <p>Carregando...</p>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Registro</th>
                            <th>Especialidade</th>
                            <th>Cargo</th>
                            <th>Turno</th>
                            <th>Email</th>
                            <th>Ativo</th>
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
                                <td>{profissional.ativo ? 'Sim' : 'Não'}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-primary btn-sm me-2"
                                        title="Editar"
                                        onClick={() => editarProfissional(profissional)}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>

                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        title="Excluir"
                                        onClick={() => excluirProfissional(profissional.id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Profissionais;