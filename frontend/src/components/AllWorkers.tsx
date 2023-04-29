import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/AllWorkers.css';

const API_URL = process.env.REACT_APP_API_URL;

type MonthOption = {
  value: string;
  label: string;
};

type RoleOption = {
  value: string;
  label: string;
};

const MONTH_OPTIONS: MonthOption[] = [
  { value: '', label: '-- Todos los meses --' },
  { value: 'Enero', label: 'Enero' },
  { value: 'Febrero', label: 'Febrero' },
  { value: 'Marzo', label: 'Marzo' },
  { value: 'Abril', label: 'Abril' },
  { value: 'Mayo', label: 'Mayo' },
  { value: 'Junio', label: 'Junio' },
  { value: 'Julio', label: 'Julio' },
  { value: 'Agosto', label: 'Agosto' },
  { value: 'Septiembre', label: 'Septiembre' },
  { value: 'Octubre', label: 'Octubre' },
  { value: 'Noviembre', label: 'Noviembre' },
  { value: 'Diciembre', label: 'Diciembre' },
];

const ROLE_OPTIONS: RoleOption[] = [
  { value: '', label: '-- Todos los roles --' },
  { value: 'Chofer', label: 'Chofer' },
  { value: 'Cargador', label: 'Cargador' },
  { value: 'Auxiliar', label: 'Auxiliar' },
];

type Worker = {
  numeroEmpleado: number;
  nombreCompleto: string;
  rol: string;
  mes: {
    nombre: string;
    horasTrabajadas: number;
    entregas: number;
    pagoEntregas: number;
    bonoHora: number;
    retencionISR: number;
    retencionAdicionalISR: number;
    valesDespensa: number;
    sueldoTotal: number;
  }[];
};

type Filter = {
  month: string;
  role: string;
};

export const AllWorkers = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [filter, setFilter] = useState<Filter>({
    month: '',
    role: '',
  });

  useEffect(() => {
    const fetchWorkers = async () => {
      const { data } = await axios.get(`${API_URL}/workers`);
      setWorkers(data);
    };
    fetchWorkers();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter((filter) => ({
      ...filter,
      [name]: value,
    }));
  };

  const filteredWorkers = workers.filter(
    (worker) =>
      (!filter.month || worker.mes.nombre === filter.month) &&
      (!filter.role || worker.rol === filter.role)
  );

  return (
    <div className="all-workers">
      <h2>Información de trabajadores</h2>
      <div className="filter">
        <select name="month" onChange={handleFilterChange} value={filter.month}>
          {MONTH_OPTIONS.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
        <select name="role" onChange={handleFilterChange} value={filter.role}>
          {ROLE_OPTIONS.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Número de empleado</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Horas trabajadas</th>
            <th>Pago por entregas</th>
            <th>Pago por bonos</th>
            <th>Retenciones</th>
            <th>Vales de despensa</th>
            <th>Sueldo total</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorkers.map((worker) => (
            <tr key={worker.numeroEmpleado}>
              <td>{worker.numeroEmpleado}</td>
              <td>{worker.nombreCompleto}</td>
              <td>{worker.rol}</td>
              <td>
                {worker.mes.length > 0
                  ? worker.mes.reduce(
                      (acc, curr) => acc + curr.horasTrabajadas,
                      0
                    )
                  : 0}
              </td>
              <td>
                {worker.mes.length > 0
                  ? worker.mes
                      .reduce(
                        (acc, curr) => acc + curr.entregas * curr.pagoEntregas,
                        0
                      )
                      .toFixed(2)
                  : 0}
              </td>
              <td>
                {worker.mes.length > 0
                  ? worker.mes
                      .reduce(
                        (acc, curr) =>
                          acc + curr.horasTrabajadas * curr.bonoHora,
                        0
                      )
                      .toFixed(2)
                  : 0}
              </td>
              <td>
                {worker.mes.length > 0
                  ? worker.mes
                      .reduce(
                        (acc, curr) =>
                          acc + curr.retencionISR + curr.retencionAdicionalISR,
                        0
                      )
                      .toFixed(2)
                  : 0}
              </td>
              <td>
                {worker.mes.length > 0
                  ? worker.mes
                      .reduce((acc, curr) => acc + curr.valesDespensa, 0)
                      .toFixed(2)
                  : 0}
              </td>
              <td>
                {worker.mes.length > 0
                  ? worker.mes
                      .reduce((acc, curr) => acc + curr.sueldoTotal, 0)
                      .toFixed(2)
                  : 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
