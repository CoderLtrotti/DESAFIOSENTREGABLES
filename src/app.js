import express from 'express';
import Contenedor from './Contenedor.js';
import productsRouter from './Routes/productsRouter.js';
import carritosRouter from './Routes/carritosRouter.js';
import Carrito from './carrito.js';
import { Router } from 'express';
import handlerbars from 'express-handlebars';
import { create } from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './Routes/viewsRouter.js';
import __dirname from './utils.js';




const app = express();
const contenedor = new Contenedor('productos.json');
const productosContenedor = new Contenedor('productos.json');
const carritosContenedor = new Carrito('carritos.json');

 


app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Ruta para obtener todos los productos
app.get('/productos', async (req, res) => {
  const products = await contenedor.getAll();
  res.json(products);
});

app.get('/productoRandom', async (req, res) => {
  const products = await contenedor.getAll();
  const randomIndex = Math.floor(Math.random() * products.length);
  res.json(products[randomIndex]);
});

app.post('/productos', async (req, res) => {
  const newProduct = req.body;
  const productId = await contenedor.save(newProduct);
  res.json({ id: productId });
});

app.delete('/productos/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  const deleteResult = await contenedor.deleteById(productId);
  if (deleteResult === "Producto eliminado") {
    res.json({ message: "Producto eliminado" });
  } else {
    res.status(404).json({ error: "Error al eliminar el producto" });
  }
});



app.use('/api/productos', productsRouter);

// Rutas para los carritos
app.use('/api/carts', carritosRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de productos y carritos!');
});




// Configurar el motor de plantillas Handlebars


// Configurar la carpeta de vistas y el motor de plantillas
app.engine('handlebars', handlerbars.engine());
  app.set('views', '../views/');
  app.set('view engine', 'handlebars');
  const hbs = create({
	defaultLayout: '',
	runtimeOptions: {
	  allowProtoPropertiesByDefault: true,
	  allowProtoMethodsByDefault: true,
	}
  });
  
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');

app.get('/realtimeproducts', async (req, res) => {
  const products = await contenedor.getAll(); // Obtener los productos desde el contenedor
  res.render('realtimeproducts', { products }); // Pasar los productos a la vista
});

  app.get('/home', (req, res) => {
    res.render('home'); // Asegúrate de que el nombre coincide con el archivo "home.handlebars"
  });
// Usar el enrutador de vistas
app.use('/', viewsRouter);

const webServer = app.listen(8080, () => {
  console.log('Escuchando 8080');
});

// Inicialización de socket.io
const io = new Server(webServer);

// Eventos de socket.io
io.on('connection', (socket) => {
console.log('A user connected');

// Handle 'addProduct' event
socket.on('addProduct', (product) => {
  products.push(product);

  // Broadcast the updated products to all connected clients
  io.emit('newProduct', product);
});

// Handle 'disconnect' event
socket.on('disconnect', () => {
  console.log('A user disconnected');
});
});


