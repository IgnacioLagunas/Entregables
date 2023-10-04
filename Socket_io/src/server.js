import express from 'express';
import { engine } from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import { __dirname } from './utils.js';

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//Handlebars
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/views', viewsRouter);
// app.use('/api/users', usersRouter);

app.listen(8080, () => {
  console.log('Escuchando al puerto 8080...');
});
