const mongoose = require('mongoose');

const trabajadorSchema = new mongoose.Schema({
  numeroEmpleado: { type: Number, required: true, unique: true },
  nombreCompleto: { type: String, required: true },
  rol: {
    type: String,
    enum: ['Chofer', 'Cargador', 'Auxiliar'],
    required: true,
  },
  mes: {
    enero: { entregas: { type: Number, default: 0 } },
    febrero: { entregas: { type: Number, default: 0 } },
    marzo: { entregas: { type: Number, default: 0 } },
    abril: { entregas: { type: Number, default: 0 } },
    mayo: { entregas: { type: Number, default: 0 } },
    junio: { entregas: { type: Number, default: 0 } },
    julio: { entregas: { type: Number, default: 0 } },
    agosto: { entregas: { type: Number, default: 0 } },
    septiembre: { entregas: { type: Number, default: 0 } },
    octubre: { entregas: { type: Number, default: 0 } },
    noviembre: { entregas: { type: Number, default: 0 } },
    diciembre: { entregas: { type: Number, default: 0 } },
  },
});

const Trabajador = mongoose.model('Trabajador', trabajadorSchema);

module.exports = Trabajador;
