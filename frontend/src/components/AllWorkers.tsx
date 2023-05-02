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

type SueldoMensual = {
  sueldoBase: number;
  bono: number;
  sueldoEntregas: number;
  sueldoBruto: number;
  retencion: number;
  sueldoNeto: number;
  despensa: number;
};

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

const MONTH_OPTIONS: MonthOption[] = [
  { value: '', label: '-- Todos los meses --' },
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

const ROLE_OPTIONS: RoleOption[] = [
  { value: '', label: '-- Todos los roles --' },
  { value: 'Chofer', label: 'Chofer' },
  { value: 'Cargador', label: 'Cargador' },
  { value: 'Auxiliar', label: 'Auxiliar' },
];

type Filter = {
  month: string;
  role: string;
};

export const AllWorkers = () => {
  const [trabajadores, setTrabajadores] = useState<MonthFormData>([]);
  const [filter, setFilter] = useState<Filter>({
    month: '',
    role: '',
  });

  useEffect(() => {
    const fetchTrabajadores = async () => {
      try {
        const response = await axios.get(`${API_URL}/workers`);
        setTrabajadores(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrabajadores();
  }, [filter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const filteredTrabajadores = trabajadores.filter((trabajador) => {
    if (
      (filter.month === '' ||
        trabajador.mes.some((mes) => mes.nombre === filter.month)) &&
      (filter.role === '' || trabajador.rol === filter.role)
    ) {
      return true;
    }
    return false;
  });

  const calcularSueldoMensual = (
    entregas: number,
    rol: string,
    sueldoBase: number
  ): SueldoMensual => {
    const horas = 8 * 6 * 4; // horas trabajadas en 4 semanas
    let bonoHora = 0;
    if (rol === 'Chofer') {
      bonoHora = 10;
    } else if (rol === 'Cargador') {
      bonoHora = 5;
    }
    const sueldoEntregas = entregas * 5;
    const sueldoBono = bonoHora * horas;
    const sueldoBruto = sueldoBase + sueldoEntregas + sueldoBono;
    const retencion =
      sueldoBruto > 10000 ? sueldoBruto * 0.12 : sueldoBruto * 0.09;
    const sueldoDespensa = sueldoBruto * 0.04;
    const sueldoNeto = sueldoBruto - retencion + sueldoDespensa;
    return {
      sueldoBase,
      bono: sueldoBono,
      sueldoEntregas,
      sueldoBruto,
      retencion,
      sueldoNeto,
      despensa: sueldoDespensa,
    };
  };

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
            <th>Entregas por mes</th>
            <th>Sueldo base</th>
            <th>Bono</th>
            <th>Despensa</th>
            <th>Sueldo bruto</th>
            <th>Retencion</th>
            <th>Sueldo neto</th>
          </tr>
        </thead>
        <tbody>
          {filter.month !== '' &&
            filteredTrabajadores.map((worker) => {
              const monthData = worker.mes.find(
                (m) => m.nombre === filter.month
              );
              const {
                sueldoBase,
                bono,
                sueldoEntregas,
                sueldoBruto,
                retencion,
                sueldoNeto,
                despensa,
              } = calcularSueldoMensual(
                monthData?.entregas ?? 0,
                worker.rol,
                5760
              );

              return (
                <tr key={worker.numeroEmpleado}>
                  <td>{worker.numeroEmpleado}</td>
                  <td>{worker.nombreCompleto}</td>
                  <td>{worker.rol}</td>
                  <td>
                    {monthData ? (
                      <span key={monthData.nombre}>{monthData.entregas}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td>${sueldoBase.toFixed(2)}</td>
                  <td>${bono.toFixed(2)}</td>
                  <td>${despensa.toFixed(2)}</td>
                  <td>${sueldoBruto.toFixed(2)}</td>
                  <td>${retencion.toFixed(2)}</td>
                  <td>${sueldoNeto.toFixed(2)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
