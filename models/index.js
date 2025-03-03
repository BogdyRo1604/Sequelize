const Room = require('./room');
const Employee = require('./employee');
const Reservation = require('./reservation');

Employee.hasMany(Reservation);
Reservation.belongsTo(Employee);
Room.hasMany(Reservation);
Reservation.belongsTo(Room);

module.exports = { Room, Employee, Reservation };