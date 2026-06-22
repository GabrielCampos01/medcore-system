drop database if exists medcore;
create database medcore;
use medcore;

create table especialidades (
    id int auto_increment primary key,
    nome varchar(100) not null unique,
    descricao varchar(255),
    area varchar(100)
);

create table profissionais (
    id int auto_increment primary key,
    nome varchar(100) not null,
    crm_coren_crf varchar(50) unique,
    especialidade_id int,
    cargo varchar(100),
    turno varchar(50),
    telefone varchar(20),
    email varchar(100) unique,
    ativo boolean,
    foreign key (especialidade_id) references especialidades(id)
);

create table pacientes (
    id int auto_increment primary key,
    nome_completo varchar(150) not null,
    cpf varchar(14) unique,
    data_nascimento date,
    sexo varchar(20),
    telefone varchar(20),
    email varchar(100) unique,
    endereco varchar(255),
    convenio varchar(100),
    numero_carteirinha varchar(50),
    ativo boolean default true
);

create table atendimentos (
    id int auto_increment primary key,
    paciente_id int,
    profissional_id int,
    data_hora datetime,
    tipo varchar(50),
    status varchar(50),
    diagnostico text,
    observacoes text,
    valor decimal(10,2),
    foreign key (paciente_id) references pacientes(id),
    foreign key (profissional_id) references profissionais(id)
);

insert into especialidades (nome, descricao, area) values
('Clínica Geral', 'Atendimento clínico geral', 'Clínica'),
('Cardiologia', 'Especialidade relacionada ao coração', 'Clínica Médica'),
('Ortopedia', 'Especialidade relacionada aos ossos e articulações', 'Clínica');

insert into pacientes (
    nome_completo, cpf, data_nascimento, sexo, telefone, email, endereco, convenio, numero_carteirinha
) values
('João da Silva', '12345678900', '1990-01-01', 'Masculino', '(41) 99999-9999', 'joao@email.com', 'Rua Exemplo, 123', 'Unimed', '123456'),
('Maria Oliveira', '98765432100', '1995-08-20', 'Feminino', '(41) 98888-7777', 'maria@email.com', 'Rua das Flores, 456', 'Amil', '654321');

insert into profissionais (
    nome, crm_coren_crf, especialidade_id, cargo, turno, telefone, email, ativo
) values
('Carlos Mendes', '12345', 2, 'Médico', 'Manhã', '(41) 97777-1111', 'carlos@email.com', true),
('Fernanda Lima', '67890', 1, 'Médica', 'Tarde', '(41) 96666-2222', 'fernanda@email.com', true);

insert into atendimentos (
    paciente_id, profissional_id, data_hora, tipo, status, diagnostico, observacoes, valor
) values
(1, 1, '2026-06-15 09:00:00', 'Consulta', 'Agendado', 'Aguardando atendimento', 'Primeira consulta', 150.00),
(2, 2, '2026-06-15 10:30:00', 'Consulta', 'Cancelado', 'Atendimento cancelado', 'Paciente solicitou cancelamento', 0.00);