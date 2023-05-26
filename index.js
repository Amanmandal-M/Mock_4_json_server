const jsonServer = require('json-server')
const cors = require('cors');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
require('dotenv').config();

server.use(cors());
server.use(middlewares);

server.delete('/appointments/:id', (req, res) => {
  const appointmentId = parseInt(req.params.id);
  const db = router.db; // Access the underlying lowdb instance

  // Find the index of the doctor in the 'doctors' collection
  const appointmentIndex = db.get('appointments').findIndex({ id: appointmentId }).value();


  if (appointmentIndex !== -1) {
    // Remove the doctor from the 'doctors' collection
    db.get('appointments').remove({ id: appointmentId }).write();
    res.sendStatus(200);
  } else {
    res.sendStatus(404); // Doctor not found
  }
});

// server.patch('/appointments/:id', (req, res) => {
//   const appointmentsId = parseInt(req.params.id);
//   const updatedAppointment = req.body; // Assuming the updated doctor data is sent in the request body
//   const db = router.db; // Access the underlying lowdb instance

//   // Find the doctor in the 'doctors' collection
//   const appointmentIndex = db.get('appointments').findIndex({ id: appointmentsId }).value();

//   console.log(appointmentIndex);

//   if (appointmentIndex !== -1) {
//     // Update the doctor with the new data
//     db.get('appointments').find({ id: appointmentsId }).assign(updatedAppointment).write();
//     console.log(updatedAppointment);
//     res.sendStatus(200);
//   } else {
//     res.sendStatus(404); // Doctor not found
//   }
// });


server.use(jsonServer.rewriter({
    "/users/:id": "/users?id=:id",
    "/appointments/:id": "/appointments?id=:id"
}))



server.use(router)
server.use(jsonServer.bodyParser);

server.listen(process.env.PORT, () => {
  console.log('JSON Server is running')
})