import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './pages/Home';
import Especialidades from './pages/Especialidades';
import Pacientes from './pages/Pacientes';
import Profissionais from './pages/Profissionais';
import Atendimentos from './pages/Atendimentos';

function App() {
    return (
        <BrowserRouter>
            <div className="app-layout">
                <Menu />

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/especialidades" element={<Especialidades />} />
                        <Route path="/pacientes" element={<Pacientes />} />
                        <Route path="/profissionais" element={<Profissionais />} />
                        <Route path="/atendimentos" element={<Atendimentos />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;