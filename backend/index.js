// Importamos las dependencias necesarias
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Trabajador = require('./models/trabajador.js');

// Cargamos las variables de entorno
dotenv.config();

// Configuramos la conexión a la base de datos de MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conexión a la base de datos establecida'))
  .catch((error) =>
    console.log(`Error al conectar a la base de datos: ${error.message}`)
  );

// Creamos la aplicación de Express
const app = express();

// Configuramos los middleware de la aplicación
app.use(express.json());
app.use(cors());

// Definimos las rutas de la aplicación
app.get('/workers', async (req, res) => {
  try {
    console.log('GET /workers');
    const trabajadores = await Trabajador.find({}, '-_id -__v');
    const trabajadoresConMeses = trabajadores.map((trabajador) => {
      const meses = Object.keys(trabajador.mes).map((nombre) => ({
        nombre,
        ...trabajador.mes[nombre],
      }));
      return { ...trabajador.toObject(), mes: meses };
    });
    res.send(trabajadoresConMeses);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.get('/worker/:id', async (req, res) => {
  try {
    console.log(`GET /worker/${req.params.id}`);
    const trabajador = await Trabajador.findById(req.params.id);
    if (!trabajador) {
      return res.status(404).send();
    }
    res.send(trabajador);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.post('/newWorker', async (req, res) => {
  try {
    console.log('POST /newWorker', req.body);
    const { numeroEmpleado, nombreCompleto, rol } = req.body;
    const trabajador = new Trabajador({ numeroEmpleado, nombreCompleto, rol });
    await trabajador.save();
    console.log(trabajador);
    res.json({ status: 'Creado' });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

app.patch('/worker/:numeroEmpleado', async (req, res) => {
  const { numeroEmpleado } = req.params;
  const { mes } = req.body;
  const monthName = Object.keys(mes)[0];
  const updatedEntregas = mes[monthName].entregas;

  try {
    const worker = await Trabajador.findOneAndUpdate(
      { numeroEmpleado },
      {
        $set: {
          [`mes.${monthName}.entregas`]: updatedEntregas,
        },
      },
      { new: true }
    );

    if (!worker) {
      return res.status(404).json({ error: 'Trabajador no encontrado' });
    }

    return res.json(worker);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al actualizar el trabajador');
  }
});

app.delete('/worker/:id', async (req, res) => {
  try {
    console.log(`DELETE /worker/${req.params.id}`);
    const trabajador = await Trabajador.findByIdAndDelete(req.params.id);
    if (!trabajador) {
      return res.status(404).send();
    }
    res.send(trabajador);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Iniciamos el servidor de Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

module.exports = app;
