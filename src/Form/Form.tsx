import React, { useState } from 'react';

// Definir el tipo de los datos del formulario
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

  // Manejar cambios en los inputs del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'edad' ? Number(value) : value,  // Asegurar que 'edad' sea un número
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar que todos los campos sean válidos antes de enviar
    if (!formData.nombre || !formData.edad || !formData.genero || !formData.sexo) {
      setMensaje('Por favor, completa todos los campos.');
      return;
    }

    try {
      // Realizar la solicitud POST con fetch
      const response = await fetch('http://localhost:8080/api/persons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Asegurarse de que se envíe como JSON
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje('Persona registrada correctamente');
        console.log(data);
      } else {
        setMensaje('Error al registrar persona');
      }
    } catch (error) {
      console.error(error);
      setMensaje('Error al registrar persona');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Registrar Persona</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Edad:</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Género:</label>
          <input
            type="text"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Sexo:</label>
          <input
            type="text"
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Enviar</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Formulario;
