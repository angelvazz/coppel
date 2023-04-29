import React, { useState } from 'react';
import axios from 'axios';
import './css/Month.css';

const API_URL = process.env.REACT_APP_API_URL;

type MonthFormData = {
  numeroEmpleado: number | string;
  nombreCompleto: string;
  rol: string;
  mes: {
    enero: {
      nombre: string;
      horasTrabajadas: number;
      entregas: number | string;
      pagoEntregas: number;
      bonoHora: number;
      retencionISR: number;
      retencionAdicionalISR: number;
      valesDespensa: number;
      sueldoTotal: number;
    };
    febrero: {
      nombre: string;
      horasTrabajadas: number;
      entregas: number | string;
      pagoEntregas: number;
      bonoHora: number;
      retencionISR: number;
      retencionAdicionalISR: number;
      valesDespensa: number;
      sueldoTotal: number;
    };
    marzo: {
      nombre: string;
      horasTrabajadas: number;
      entregas: number | string;
      pagoEntregas: number;
      bonoHora: number;
      retencionISR: number;
      retencionAdicionalISR: number;
      valesDespensa: number;
      sueldoTotal: number;
    };
    abril: {
      nombre: string;
      horasTrabajadas: number;
      entregas: number | string;
      pagoEntregas: number;
      bonoHora: number;
      retencionISR: number;
      retencionAdicionalISR: number;
      valesDespensa: number;
      sueldoTotal: number;
    };
    mayo: {
      nombre: string;
      horasTrabajadas: number;
      entregas: number | string;
      pagoEntregas: number;
      bonoHora: number;
      retencionISR: number;
      retencionAdicionalISR: number;
      valesDespensa: number;
      sueldoTotal: number;
    };
    junio: {
      nombre: string;
      horasTrabajadas: number;
      entregas: number | string;
      pagoEntregas: number;
      bonoHora: number;
      retencionISR: number;
      retencionAdicionalISR: number;
      valesDespensa: number;
      sueldoTotal: number;
    };
    julio: {
      nombre: string;
      horasTrabajadas: number;
      entregas: number | string;
      pagoEntregas: number;
      bonoHora: number;
      retencionISR: number;
      retencionAdicionalISR: number;
      valesDespensa: number;
      sueldoTotal: number;
    };
    agosto: {
      nombre: string;
      horasTrabajadas: number;
      entregas: number | string;
      pagoEntregas: number;
      bonoHora: number;
      retencionISR: number;
      retencionAdicionalISR: number;
      valesDespensa: number;
      sueldoTotal: number;
    };
    septiembre: {
      nombre: string;
      horasTrabajadas: number;
      entregas: number | string;
      pagoEntregas: number;
      bonoHora: number;
      retencionISR: number;
      retencionAdicionalISR: number;
      valesDespensa: number;
      sueldoTotal: number;
    };
    octubre: {
      nombre: string;
      horasTrabajadas: number;
      entregas: number | string;
      pagoEntregas: number;
      bonoHora: number;
      retencionISR: number;
      retencionAdicionalISR: number;
      valesDespensa: number;
      sueldoTotal: number;
    };
    noviembre: {
      nombre: string;
      horasTrabajadas: number;
      entregas: number | string;
      pagoEntregas: number;
      bonoHora: number;
      retencionISR: number;
      retencionAdicionalISR: number;
      valesDespensa: number;
      sueldoTotal: number;
    };
    diciembre: {
      nombre: string;
      horasTrabajadas: number;
      entregas: number | string;
      pagoEntregas: number;
      bonoHora: number;
      retencionISR: number;
      retencionAdicionalISR: number;
      valesDespensa: number;
      sueldoTotal: number;
    };
  };
};

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

export function Month() {
  const [formData, setFormData] = useState<MonthFormData>({
    numeroEmpleado: '',
    nombreCompleto: '',
    rol: '',
    mes: {
      nombre: '',
      horasTrabajadas: 0,
      entregas: '',
      pagoEntregas: 0,
      bonoHora: 0,
      retencionISR: 0,
      retencionAdicionalISR: 0,
      valesDespensa: 0,
      sueldoTotal: 0,
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'mes') {
      // Actualizar los valores de los demás inputs en base al mes seleccionado
      const selectedMonthName = value;
      const selectedMonthData = formData.mesAnual[selectedMonthName];

      const updatedFormData = {
        numeroEmpleado: formData.numeroEmpleado,
        nombreCompleto: formData.nombreCompleto,
        rol: selectedMonthData.rol,
        mes: {
          nombre: selectedMonthName,
          horasTrabajadas: selectedMonthData.horasTrabajadas,
          entregas: selectedMonthData.entregas,
          pagoEntregas: selectedMonthData.pagoEntregas,
          bonoHora: selectedMonthData.bonoHora,
          retencionISR: selectedMonthData.retencionISR,
          retencionAdicionalISR: selectedMonthData.retencionAdicionalISR,
          valesDespensa: selectedMonthData.valesDespensa,
          sueldoTotal: selectedMonthData.sueldoTotal,
        },
      };

      setFormData(updatedFormData);
    } else {
      // Actualizar el estado del formulario en base al input que ha cambiado
      let horasTrabajadas = formData.mes.horasTrabajadas;
      let entregas = formData.mes.entregas;
      let rol = formData.rol;
      let bonoHora = 0;

      switch (formData.rol) {
        case 'Chofer':
          bonoHora = 10;
          break;
        case 'Cargador':
          bonoHora = 5;
          break;
        default:
          bonoHora = 0;
          break;
      }

      if (name === 'mes.entregas') {
        entregas = Number(value);
        // Actualizar el valor de entregas en el mes seleccionado
        const updatedMes = {
          ...formData.mesAnual[formData.mes.nombre],
          entregas: Number(value),
        };
        const updatedMeses = {
          ...formData.mesAnual,
          [formData.mes.nombre]: updatedMes,
        };
        setFormData((formData) => ({
          ...formData,
          mes: {
            ...formData.mes,
            entregas: Number(value),
          },
          mesAnual: updatedMeses,
        }));
      } else if (name === 'mes.horasTrabajadas') {
        horasTrabajadas = Number(value);
        // Actualizar el valor de horas trabajadas en el mes seleccionado
        const updatedMes = {
          ...formData.mesAnual[formData.mes.nombre],
          horasTrabajadas: Number(value),
        };
        const updatedMeses = {
          ...formData.mesAnual,
          [formData.mes.nombre]: updatedMes,
        };
        setFormData((formData) => ({
          ...formData,
          mes: {
            ...formData.mes,
            horasTrabajadas: Number(value),
          },
          mesAnual: updatedMeses,
        }));
      } else if (name === 'rol') {
        rol = value;
        // Actualizar el valor de rol en el mes seleccionado
        const updatedMes = {
          ...formData.mesAnual[formData.mes.nombre],
          rol: value,
        };
        // Actualizar el valor de rol en el mes seleccionado
        const updatedMes = {
          ...formData.mesAnual[formData.mes.nombre],
          rol: value,
        };
        const updatedMeses = {
          ...formData.mesAnual,
          [formData.mes.nombre]: updatedMes,
        };
        setFormData((formData) => ({
          ...formData,
          rol: value,
          mesAnual: updatedMeses,
          bonoHora,
          retencionISR,
          retencionAdicionalISR,
          valesDespensa,
          sueldoTotal,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { numeroEmpleado, nombreCompleto, rol, mes } = formData;
    const { horasTrabajadas, entregas, nombre } = mes;

    // Convertir la cantidad de entregas en un número
    const cantidadEntregas = Number(entregas);

    // Calcular el pago por entregas
    const pagoEntregas = cantidadEntregas * 5.0;

    // Calcular el bono por hora
    let bonoHora = 0;
    switch (rol) {
      case 'Chofer':
        bonoHora = 10.0;
        break;
      case 'Cargador':
        bonoHora = 5.0;
        break;
      default:
        break;
    }

    // Calcular el pago total del trabajador
    const sueldoBase = horasTrabajadas * 30.0;
    const sueldoTotal = sueldoBase + pagoEntregas + bonoHora * horasTrabajadas;

    // Calcular las retenciones de ISR y vales de despensa
    const retencionISR =
      sueldoTotal > 10000 ? sueldoTotal * 0.12 : sueldoTotal * 0.09;
    const retencionAdicionalISR =
      sueldoTotal > 10000 ? sueldoTotal * 0.03 : 0.0;
    const valesDespensa = sueldoTotal * 0.04;

    // Actualizar el estado del formulario con los valores calculados
    const updatedMes = {
      nombre,
      horasTrabajadas,
      entregas: cantidadEntregas,
      pagoEntregas,
      bonoHora,
      retencionISR,
      retencionAdicionalISR,
      valesDespensa,
      sueldoTotal,
    };

    // Cambiar updatedMeses de un arreglo a un objeto
    const updatedMeses = { [nombre]: updatedMes };

    const updatedFormData = {
      numeroEmpleado,
      nombreCompleto,
      rol,
      mes: updatedMeses,
    };

    try {
      await axios.put(
        `${API_URL}/worker/${formData.numeroEmpleado}`,
        updatedFormData
      );
      alert('Movimiento registrado correctamente');
      setFormData({
        numeroEmpleado: '',
        nombreCompleto: '',
        rol: '',
        mes: {
          nombre: '',
          horasTrabajadas: 0,
          entregas: '',
          pagoEntregas: 0,
          bonoHora: 0,
          retencionISR: 0,
          retencionAdicionalISR: 0,
          valesDespensa: 0,
          sueldoTotal: 0,
        },
      });
    } catch (error) {
      alert('Error al registrar el movimiento');
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
        <select
          id="mes"
          name="mes"
          value={formData.mes.nombre}
          onChange={handleInputChange}
          required
        >
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
          value={formData.mes.entregas}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-buttons">
        <button type="submit">Guardar</button>
        <button
          type="button"
          onClick={() =>
            setFormData({
              numeroEmpleado: '',
              nombreCompleto: '',
              rol: '',
              mes: {
                nombre: '',
                horasTrabajadas: 0,
                entregas: '',
                pagoEntregas: 0,
                bonoHora: 0,
                retencionISR: 0,
                retencionAdicionalISR: 0,
                valesDespensa: 0,
                sueldoTotal: 0,
              },
            })
          }
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
