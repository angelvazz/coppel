import React, { useState } from 'react';
import { NewWorker } from '../components/NewWorker';
import { Month } from '../components/Month';
import { AllWorkers } from '../components/AllWorkers';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('nuevo-empleado');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'nuevo-empleado':
        return <NewWorker />;
      case 'movimientos-por-mes':
        return <Month />;
      case 'todos-los-trabajadores':
        return <AllWorkers />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('nuevo-empleado')}>
          Nuevo Empleado
        </button>
        <button onClick={() => setActiveTab('movimientos-por-mes')}>
          Movimientos por Mes
        </button>
        <button onClick={() => setActiveTab('todos-los-trabajadores')}>
          Todos los Trabajadores
        </button>
      </div>
      {renderActiveTab()}
    </div>
  );
}
