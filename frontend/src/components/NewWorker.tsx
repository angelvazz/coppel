import React, { useState } from 'react';
import axios from 'axios';
import './css/NewWorkers.css';

const API_URL = process.env.REACT_APP_API_URL;

type Empleado = {
  numeroEmpleado: number;
  nombreCompleto: string;
  rol: 'Chofer' | 'Cargador' | 'Auxiliar';
};

export const NewWorker = () => {
  const [numero, setNumero] = useState('');
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState<'Chofer' | 'Cargador' | 'Auxiliar'>('Chofer');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const empleado: Empleado = {
      numeroEmpleado: Number(numero),
      nombreCompleto: nombre,
      rol,
    };
    try {
      const response = await axios.post(`${API_URL}/newWorker`, empleado);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="nuevo-empleado-form" onSubmit={handleSubmit}>
      <h2>Empleados</h2>
      <label>
        Número:
        <input
          type="number"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
        />
      </label>
      <label>
        Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </label>
      <label>
        Rol:
        <select value={rol} onChange={(e) => setRol(e.target.value as any)}>
          <option value="Chofer">Chofer</option>
          <option value="Cargador">Cargador</option>
          <option value="Auxiliar">Auxiliar</option>
        </select>
      </label>
      <div className="form-buttons">
        <button type="submit">Guardar</button>
        <button type="button">Cancelar</button>
      </div>
    </form>
  );
};
