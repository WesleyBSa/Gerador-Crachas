import React, { useState } from 'react';
import { Cracha } from '../types';

interface BadgePreviewProps {
  cracha: Cracha;
}

const BadgePreview: React.FC<BadgePreviewProps> = ({ cracha }) => {
  const [foto, setFoto] = useState<string | null>(cracha.foto);
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const formatarData = (data: Date | null): string => {
    if (!data) return '-';
    return data.toLocaleDateString('pt-BR');
  };
  
  return (
    <div className="badge">
      <div className="company-name">{cracha.empresa}</div>
      
      <div className="photo-container">
        {foto ? (
          <img src={foto} alt="Foto do funcionário" className="employee-photo" />
        ) : (
          <div className="photo-placeholder">
            <div className="photo-label">Foto do Funcionário</div>
          </div>
        )}
      </div>
      
      <div className="photo-upload no-print">
        <label htmlFor="photoInput" className="photo-upload-btn">
          Selecionar Foto
        </label>
        <input
          type="file"
          id="photoInput"
          className="photo-input"
          accept="image/*"
          onChange={handlePhotoUpload}
        />
      </div>
      
      <div className="user-info">
        <div className="info-row">
          <div className="info-label">Nome:</div>
          <div className="info-value">{cracha.usuario.nome}</div>
        </div>

        <div className="info-row">
          <div className="info-label">Matricula:</div>
          <div className="info-value">{cracha.usuario.matricula}</div>
        </div>
        
        <div className="info-row">
          <div className="info-label">Data de Nascimento:</div>
          <div className="info-value">{formatarData(cracha.usuario.dataNascimento)}</div>
        </div>
        
        <div className="info-row">
          <div className="info-label">Tipo Sanguíneo:</div>
          <div className="info-value">{cracha.usuario.tipoSanguineo}</div>
        </div>
        
        <div className="info-row">
          <div className="info-label">Função:</div>
          <div className="info-value">{cracha.usuario.funcao}</div>
        </div>
      </div>
    </div>
  );
};

export default BadgePreview;