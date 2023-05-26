const jsonServer = require('json-server')
const cors = require('cors');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
require('dotenv').config();

server.use(cors());
server.use(middlewares);

server.use(jsonServer.rewriter({
    "/users/:id": "/users?id=:id",
    "/appointments/:id": "/appointments?id=:id"
}))

server.use(router)
server.use(jsonServer.bodyParser);

server.listen(process.env.PORT, () => {
  console.log('JSON Server is running')
})