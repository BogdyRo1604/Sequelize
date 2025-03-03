const express = require('express');
const sequelize = require('./config/database');
const roomRoutes = require('./routes/rooms');
const employeeRoutes = require('./routes/employees');
const reservationRoutes = require('./routes/reservations');

const app = express();
app.use(express.json());

app.use('/rooms', roomRoutes);
app.use('/employees', employeeRoutes);
app.use('/reservations', reservationRoutes);

sequelize.sync({ force: true }).then(() => {
  console.log('Base de données synchronisée');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});