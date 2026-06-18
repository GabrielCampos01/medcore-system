import { useEffect, useState } from 'react';
import api from '../services/api';

function Home() {
    const [pacientes, setPacientes] = useState(0);
    const [profissionaisAtivos, setProfissionaisAtivos] = useState(0);
    const [atendimentosHoje, setAtendimentosHoje] = useState(0);
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        carregarDados();

        window.addEventListener('focus', carregarDados);

        return () => {
            window.removeEventListener('focus', carregarDados);
        };
    }, []);

    function dataHoje() {
        const hoje = new Date();

        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const dia = String(hoje.getDate()).padStart(2, '0');

        return `${ano}-${mes}-${dia}`;
    }

    async function carregarDados() {
        setCarregando(true);

        try {
            const pacientesResponse = await api.get('/pacientes');
            const profissionaisResponse = await api.get('/profissionais');
            const atendimentosResponse = await api.get(`/atendimentos?data=${dataHoje()}`);

            setPacientes(pacientesResponse.data.length);

            const ativos = profissionaisResponse.data.filter((profissional) => {
                return Number(profissional.ativo) === 1;
            });

            setProfissionaisAtivos(ativos.length);
            setAtendimentosHoje(atendimentosResponse.data.length);
        } catch (error) {
            console.log(error);
        }

        setCarregando(false);
    }

    return (
        <div className="container mt-4">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Início</h1>
                    <p className="page-subtitle">Visão geral do sistema hospitalar</p>
                </div>

                <button className="btn btn-primary" onClick={carregarDados}>
                    Atualizar
                </button>
            </div>

            {carregando ? (
                <p>Carregando...</p>
            ) : (
                <div className="row mt-4">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5>Pacientes cadastrados</h5>
                                <h2 className="text-primary">{pacientes}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5>Atendimentos hoje</h5>
                                <h2 className="text-primary">{atendimentosHoje}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5>Profissionais ativos</h5>
                                <h2 className="text-primary">{profissionaisAtivos}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;