const Reservation = require('../models/reservation');
const { Op } = require('sequelize');

exports.createReservation = async (req, res) => {
  try {
    const { roomId, employeeId, startTime, endTime } = req.body;
    const existingReservation = await Reservation.findOne({
      where: {
        roomId,
        [Op.or]: [
          { startTime: { [Op.between]: [startTime, endTime] } },
          { endTime: { [Op.between]: [startTime, endTime] } },
          {
            [Op.and]: [
              { startTime: { [Op.lte]: startTime } },
              { endTime: { [Op.gte]: endTime } }
            ]
          }
        ]
      }
    });

    if (existingReservation) {
      return res.status(400).json({ error: 'Salle déjà réservée sur ce créneau' });
    }

    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getReservations = async (req, res) => {
  const reservations = await Reservation.findAll({ include: ['Room', 'Employee'] });
  res.json(reservations);
};