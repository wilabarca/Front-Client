import React, { useEffect, useState } from 'react';

interface Persona {
  id: number;
  nombre: string;
  edad: number;
  genero: string;
  sexo: string;
}

const TablaPersonas = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/persons');
        const data = await response.json();
        setPersonas(data);
      } catch (error) {
        console.error('Error al cargar personas:', error);
      }
    };

    fetchPersonas();
  }, []);

  return (
    <div style={containerStyle}>
      <h2 style={tituloStyle}>Personas Registradas</h2>
      <table style={tablaStyle}>
        <thead style={theadStyle}>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Edad</th>
            <th style={thStyle}>Género</th>
            <th style={thStyle}>Sexo</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona) => (
            <tr key={persona.id} style={filaStyle}>
              <td style={tdStyle}>{persona.id}</td>
              <td style={tdStyle}>{persona.nombre}</td>
              <td style={tdStyle}>{persona.edad}</td>
              <td style={tdStyle}>{persona.genero}</td>
              <td style={tdStyle}>{persona.sexo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const containerStyle: React.CSSProperties = {
  maxWidth: '800px',
  margin: '40px auto',
  padding: '20px',
};

const tituloStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '20px',
};

const tablaStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
};

const theadStyle: React.CSSProperties = {
  backgroundColor: '#4CAF50',
  color: 'white',
};

const thStyle: React.CSSProperties = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};

const tdStyle: React.CSSProperties = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
};

const filaStyle: React.CSSProperties = {
  backgroundColor: '#f9f9f9',
};

export default TablaPersonas;
