const mongoose = require('mongoose');

const monthObj = {
  nombre: { type: String, unique: true },
  horasTrabajadas: { type: Number, default: 0 },
  entregas: { type: Number, default: 0 },
  pagoEntregas: { type: Number, default: 0 },
  bonoHora: { type: Number, default: 0 },
  retencionISR: { type: Number, default: 0 },
  retencionAdicionalISR: { type: Number, default: 0 },
  valesDespensa: { type: Number, default: 0 },
  sueldoTotal: { type: Number, default: 0 },
};

const trabajadorSchema = new mongoose.Schema({
  numeroEmpleado: { type: Number, required: true },
  nombreCompleto: { type: String, required: true },
  rol: {
    type: String,
    enum: ['Chofer', 'Cargador', 'Auxiliar'],
    required: true,
  },
  mes: {
    enero: monthObj,
    febrero: monthObj,
    marzo: monthObj,
    abril: monthObj,
    mayo: monthObj,
    junio: monthObj,
    julio: monthObj,
    agosto: monthObj,
    septiembre: monthObj,
    octubre: monthObj,
    noviembre: monthObj,
    diciembre: monthObj,
  },
});

const Trabajador = mongoose.model('Trabajador', trabajadorSchema);

module.exports = Trabajador;
