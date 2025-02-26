import React, { useState, useEffect } from 'react';
import { Cracha } from '../types';

interface BadgeFormProps {
  onSubmit: (data: Cracha) => void;
  initialData: Cracha;
}

const BadgeForm: React.FC<BadgeFormProps> = ({ onSubmit, initialData }) => {
  const [empresa, setEmpresa] = useState(initialData.empresa);
  const [nome, setNome] = useState(initialData.usuario.nome);
  const [matricula, setMatricula] = useState(initialData.usuario.matricula);
  const [dataNascimento, setDataNascimento] = useState<string>('');
  const [tipoSanguineo, setTipoSanguineo] = useState(initialData.usuario.tipoSanguineo);
  const [funcao, setFuncao] = useState(initialData.usuario.funcao);

  useEffect(() => {
    if (initialData.usuario.dataNascimento) {
      const date = new Date(initialData.usuario.dataNascimento);
      setDataNascimento(date.toISOString().split('T')[0]);
    }
  }, [initialData]);

  const [printMode, setPrintMode] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data: Cracha = {
      empresa: empresa || 'Nome da Empresa',
      usuario: {
        nome: nome || '-',
        matricula: matricula,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
        tipoSanguineo: tipoSanguineo || '-',
        funcao: funcao || '-'
      },
      foto: initialData.foto
    };
    
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Dados do Funcionário</h2>
      
      <div className="form-group">
        <label htmlFor="empresa">Nome da Empresa</label>
        <input
          type="text"
          id="empresa"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          placeholder="Nome da empresa"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="nome">Nome Completo</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome completo do funcionário"
        />
      </div>

      <div className="form-group">
        <label htmlFor="matricula">Matricula</label>
        <input
          type="text"
          id="matricula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          placeholder="matricula"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="dataNascimento">Data de Nascimento</label>
        <input
          type="date"
          id="dataNascimento"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="tipoSanguineo">Tipo Sanguíneo</label>
        <select
          id="tipoSanguineo"
          value={tipoSanguineo}
          onChange={(e) => setTipoSanguineo(e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="funcao">Função</label>
        <input
          type="text"
          id="funcao"
          value={funcao}
          onChange={(e) => setFuncao(e.target.value)}
          placeholder="Função/Cargo"
        />
      </div>
      
      <button type="submit" className="submit-button">
        Gerar Crachá
      </button>
    </form>
  );
};

export default BadgeForm;