import { useEffect, useState } from 'react';
import api from '../services/api';

function Home() {
    const [pacientes, setPacientes] = useState(0);
    const [profissionaisAtivos, setProfissionaisAtivos] = useState(0);
    const [atendimentosHoje, setAtendimentosHoje] = useState(0);
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        carregarDados();
    }, []);

    function dataHoje() {
        const hoje = new Date();
        return hoje.toISOString().split('T')[0];
    }

    async function carregarDados() {
        setCarregando(true);

        try {
            const pacientesResponse = await api.get('/pacientes');
            const profissionaisResponse = await api.get('/profissionais');
            const atendimentosResponse = await api.get(`/atendimentos?data=${dataHoje()}`);

            setPacientes(pacientesResponse.data.length);

            const ativos = profissionaisResponse.data.filter((profissional) => {
                return profissional.ativo === 1 || profissional.ativo === true;
            });

            setProfissionaisAtivos(ativos.length);
            setAtendimentosHoje(atendimentosResponse.data.length);
        } catch (error) {
            console.log('Erro ao carregar dashboard', error);
        }

        setCarregando(false);
    }

    return (
        <div className="container mt-4">
            <h1 className="page-title">Início</h1>
            <p className="page-subtitle">
                Visão geral do sistema hospitalar
            </p>

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