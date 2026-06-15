import { Link } from 'react-router-dom';

function Menu() {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <h4>MedCore</h4>
                <span>Sistema Hospitalar</span>
            </div>

            <nav className="sidebar-menu">
                <Link to="/">Início</Link>
                <Link to="/pacientes">Pacientes</Link>
                <Link to="/profissionais">Profissionais</Link>
                <Link to="/especialidades">Especialidades</Link>
                <Link to="/atendimentos">Atendimentos</Link>
            </nav>
        </aside>
    );
}

export default Menu;