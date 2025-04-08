import React, { useState } from 'react';

interface FormData {
  nombre: string;
  edad: number;
  genero: string;
  sexo: string;
}

const Formulario = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    edad: 0,
    genero: '',
    sexo: '',
  });

  const [mensaje, setMensaje] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'edad' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.edad || !formData.genero || !formData.sexo) {
      setMensaje('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/persons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensaje('Persona registrada correctamente');
        setFormData({ nombre: '', edad: 0, genero: '', sexo: '' }); // Reset form
      } else {
        setMensaje(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error de conexión con el servidor');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Registrar Persona</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Nombre: </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Edad: </label>
          <input
            type="number"
            name="edad"
            value={formData.edad || ''}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Género: </label>
          <input
            type="text"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Sexo: </label>
          <input
            type="text"
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button 
          type="submit" 
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Enviar
        </button>
      </form>

      {mensaje && (
        <p style={{ 
          marginTop: '15px', 
          color: mensaje.includes('correctamente') ? 'green' : 'red' 
        }}>
          {mensaje}
        </p>
      )}
    </div>
  );
};

export default Formulario;
