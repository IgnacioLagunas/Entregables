import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import { __dirname } from './utils.js';

const app = express();
console.log(__dirname);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//Handlebars
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/views', viewsRouter);
app.use('/api/users', usersRouter);

const httpServer = app.listen(8080, () => {
  console.log('Escuchando al puerto 8080...');
});

//Socket io
const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
  console.log(`Conected client id: ${socket.id}`);

  // Producto agregado
  socket.on('new-product-added', async () => {
    socketServer.emit('product-refresh');
  });
  // Producto eliminado
  socket.on('new-product-deleted', async () => {
    socketServer.emit('product-refresh');
  });
});
