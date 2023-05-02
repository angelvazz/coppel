import React, { useState } from 'react';
import axios from 'axios';
import './css/Month.css';

const API_URL = process.env.REACT_APP_API_URL;

const months = [
  { value: 'enero', label: 'Enero' },
  { value: 'febrero', label: 'Febrero' },
  { value: 'marzo', label: 'Marzo' },
  { value: 'abril', label: 'Abril' },
  { value: 'mayo', label: 'Mayo' },
  { value: 'junio', label: 'Junio' },
  { value: 'julio', label: 'Julio' },
  { value: 'agosto', label: 'Agosto' },
  { value: 'septiembre', label: 'Septiembre' },
  { value: 'octubre', label: 'Octubre' },
  { value: 'noviembre', label: 'Noviembre' },
  { value: 'diciembre', label: 'Diciembre' },
];

interface MonthFormData {
  numeroEmpleado: number | string;
  nombreCompleto: string;
  rol: string;
  mes: {
    enero: { entregas: number };
    febrero: { entregas: number };
    marzo: { entregas: number };
    abril: { entregas: number };
    mayo: { entregas: number };
    junio: { entregas: number };
    julio: { entregas: number };
    agosto: { entregas: number };
    septiembre: { entregas: number };
    octubre: { entregas: number };
    noviembre: { entregas: number };
    diciembre: { entregas: number };
  };
}

export function Month() {
  const [formData, setFormData] = useState<MonthFormData>({
    numeroEmpleado: '',
    nombreCompleto: '',
    rol: '',
    mes: {
      enero: { entregas: 0 },
      febrero: { entregas: 0 },
      marzo: { entregas: 0 },
      abril: { entregas: 0 },
      mayo: { entregas: 0 },
      junio: { entregas: 0 },
      julio: { entregas: 0 },
      agosto: { entregas: 0 },
      septiembre: { entregas: 0 },
      octubre: { entregas: 0 },
      noviembre: { entregas: 0 },
      diciembre: { entregas: 0 },
    },
  });

  const [selectedMonthName, setSelectedMonthName] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'mes') {
      setSelectedMonthName(value);
      setFormData((formData) => ({
        ...formData,
        mes: {
          ...formData.mes,
          [value]: { entregas: 0 },
        },
      }));
    } else {
      setFormData((formData) => ({
        ...formData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { numeroEmpleado, nombreCompleto, rol, mes } = formData;
      const selectedMonthName = e.currentTarget.elements['mes'].value;
      const updatedMesData = {
        [selectedMonthName]: {
          entregas: formData.mes[selectedMonthName].entregas,
        },
      };
      console.log('Mes actualizado:', selectedMonthName);
      console.log(
        'Cantidad de entregas:',
        updatedMesData[selectedMonthName].entregas
      );

      const res = await axios.patch(`${API_URL}/worker/${numeroEmpleado}`, {
        mes: updatedMesData,
      });

      console.log('Data saved:', res.data);
      setFormData({
        numeroEmpleado: '',
        nombreCompleto: '',
        rol: '',
        mes: {
          enero: { entregas: 0 },
          febrero: { entregas: 0 },
          marzo: { entregas: 0 },
          abril: { entregas: 0 },
          mayo: { entregas: 0 },
          junio: { entregas: 0 },
          julio: { entregas: 0 },
          agosto: { entregas: 0 },
          septiembre: { entregas: 0 },
          octubre: { entregas: 0 },
          noviembre: { entregas: 0 },
          diciembre: { entregas: 0 },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="month-form">
      <h2>Captura de movimiento por mes</h2>

      <div className="form-group">
        <label htmlFor="numeroEmpleado">Número de empleado:</label>
        <input
          type="number"
          id="numeroEmpleado"
          name="numeroEmpleado"
          value={formData.numeroEmpleado}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="nombreCompleto">Nombre completo:</label>
        <input
          type="text"
          id="nombreCompleto"
          name="nombreCompleto"
          value={formData.nombreCompleto}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="rol">Rol:</label>
        <select
          id="rol"
          name="rol"
          value={formData.rol}
          onChange={handleInputChange}
          required
        >
          <option value="">--Seleccione un rol--</option>
          <option value="Chofer">Chofer</option>
          <option value="Cargador">Cargador</option>
          <option value="Auxiliar">Auxiliar</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="mes">Mes:</label>
        <select id="mes" name="mes" onChange={handleInputChange} required>
          <option value="">--Seleccione un mes--</option>
          {months.map((month: any) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="entregas">Cantidad de entregas:</label>
        <input
          type="number"
          id="entregas"
          name="entregas"
          value={formData.mes[selectedMonthName]?.entregas ?? ''}
          onChange={(e) =>
            setFormData((formData) => ({
              ...formData,
              mes: {
                ...formData.mes,
                [selectedMonthName]: { entregas: parseInt(e.target.value) },
              },
            }))
          }
          required
        />
      </div>

      <div className="form-buttons">
        <button type="submit">Guardar</button>
        <button type="button">Cancelar</button>
      </div>
    </form>
  );
}
