import React, { useState } from 'react';
import './App.css';
import BadgeForm from './components/BadgeForm';
import BadgePreview from './components/BadgePreview';
import { Usuario, Cracha } from './types';

const App: React.FC = () => {
  const [cracha, setCracha] = useState<Cracha>({
    empresa: '',
    usuario: {
      nome: '',
      matricula: '',
      dataNascimento: null,
      tipoSanguineo: '',
      funcao: ''
    },
    foto: null
  });

  const handleBadgeData = (dadosCracha: Cracha) => {
    setCracha(dadosCracha);
  };


const handlePrintBadgeOnly = () => {
  const badgeElement = document.querySelector('.badge');
  
  if (!badgeElement) {
    console.error('Elemento do crachá não encontrado');
    return;
  }
  
  const printWindow = window.open('', '_blank', 'width=650,height=600');
  
  if (!printWindow) {
    alert('Por favor, permita pop-ups para imprimir o crachá');
    return;
  }

  const styles = Array.from(document.styleSheets)
    .map(styleSheet => {
      try {
        return Array.from(styleSheet.cssRules)
          .map(rule => rule.cssText)
          .join('\n');
      } catch (e) {
        return '';
      }
    })
    .filter(Boolean)
    .join('\n');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Crachá para Impressão</title>
        <style>
          ${styles}
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: white;
          }
          .badge {
            box-shadow: none;
            border: 1px solid #000;
          }
          @media print {
            @page {
              size: auto;
              margin: 0mm;
            }
            body {
              margin: 0;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        ${badgeElement.outerHTML}
        <script>
          // Imprimir automaticamente assim que a página carregar
          window.onload = function() {
            setTimeout(function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 500);
            }, 300);
          };
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
};

  return (
    <div className="app-container">
      <h1>Confecção de Crachás</h1>
      
      <div className="container">
        <div className="form-container no-print">
          <BadgeForm onSubmit={handleBadgeData} initialData={cracha} />
        </div>
        
        <div className="badge-preview">
          <BadgePreview cracha={cracha} />
        </div>
      </div>
      
      <div className="print-container no-print">
        <button onClick={handlePrintBadgeOnly} className="print-button">
          Imprimir Crachá
        </button>
      </div>

    </div>
  );
};

export default App;