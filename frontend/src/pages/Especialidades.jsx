import { useEffect, useState } from 'react';
import api from '../services/api';

function Especialidades() {
    const [especialidades, setEspecialidades] = useState([]);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [area, setArea] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        carregarEspecialidades();
    }, []);

    async function carregarEspecialidades() {
        setCarregando(true);

        try {
            const response = await api.get('/especialidades');
            setEspecialidades(response.data);
        } catch {
            setMensagem('Erro ao carregar especialidades.');
        }

        setCarregando(false);
    }

    async function salvarEspecialidade(e) {
        e.preventDefault();

        if (!nome) {
            setMensagem('O nome da especialidade é obrigatório.');
            return;
        }

        try {
            if (editandoId) {
                await api.put(`/especialidades/${editandoId}`, {
                    nome,
                    descricao,
                    area
                });

                setMensagem('Especialidade atualizada com sucesso!');
            } else {
                await api.post('/especialidades', {
                    nome,
                    descricao,
                    area
                });

                setMensagem('Especialidade cadastrada com sucesso!');
            }

            limparFormulario();
            carregarEspecialidades();
        } catch (error) {
            setMensagem(error.response?.data?.erro || 'Erro ao salvar especialidade.');
        }
    }

    function editarEspecialidade(especialidade) {
        setEditandoId(especialidade.id);
        setNome(especialidade.nome || '');
        setDescricao(especialidade.descricao || '');
        setArea(especialidade.area || '');
    }

    function limparFormulario() {
        setEditandoId(null);
        setNome('');
        setDescricao('');
        setArea('');
    }

    async function excluirEspecialidade(id) {
        const confirmar = window.confirm('Deseja realmente excluir esta especialidade?');

        if (!confirmar) {
            return;
        }

        try {
            await api.delete(`/especialidades/${id}`);
            setMensagem('Especialidade excluída com sucesso!');
            carregarEspecialidades();
        } catch {
            setMensagem('Erro ao excluir especialidade.');
        }
    }

    return (
        <div className="container mt-4">
            <h1 className="page-title">Especialidades</h1>

            {mensagem && (
                <div className="alert alert-info">
                    {mensagem}
                </div>
            )}

            <div className="card mb-4">
                <div className="card-body">
                    <h5>{editandoId ? 'Editar especialidade' : 'Cadastrar especialidade'}</h5>

                    <form onSubmit={salvarEspecialidade}>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label">Descrição</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label">Área</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                />
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
                            <th>Descrição</th>
                            <th>Área</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {especialidades.map((especialidade) => (
                            <tr key={especialidade.id}>
                                <td>{especialidade.id}</td>
                                <td>{especialidade.nome}</td>
                                <td>{especialidade.descricao}</td>
                                <td>{especialidade.area}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-primary btn-sm me-2"
                                        title="Editar"
                                        onClick={() => editarEspecialidade(especialidade)}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>

                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        title="Excluir"
                                        onClick={() => excluirEspecialidade(especialidade.id)}
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

export default Especialidades;