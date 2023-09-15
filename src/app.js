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
import mongoose from 'mongoose';
import ContenedorManager from './dao/ContenedorManager.js';
import CartManager from './dao/cartsManajer.js';
import MessageManager from './dao/messajeManager.js';
import Product from './dao/models/product.js';
import Cart from './dao/models/cart.js';
import router from './Routes/cartRouter.js'
import cookieParser from 'cookie-parser';
import cookieRouter from './Routes/cookies.router.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import userRouter from './Routes/user.router.js';


/*import CartManager from './dao/cartsmanager.js';
import MessageManager from './dao/messageManager.js';*/





const app = express();
const contenedor = new Contenedor('productos.json');
const productosContenedor = new Contenedor('productos.json');
const carritosContenedor = new Carrito('carritos.json');
const contenedorManager = new ContenedorManager();
const cartManager = new CartManager();
const messageManager = new MessageManager();

const cart = new Cart();

 


app.use(express.urlencoded({ extended: true }));

app.use(express.json());




mongoose.connect('mongodb+srv://CoderLtrotti:TGtIEtoEcViniEQZ@codercluster.lbz1fl7.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
  });



 

// Configurar la carpeta de vistas y el motor de plantillas
app.engine('handlebars', handlerbars.engine());
app.set('views', 'views/');
/*app.set('views', '../views/');*/ //ruta alternativa para utilizar con node app.js
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


app.use('/api/cart', router);

  app.get('/api/products', async (req, res) => {
    try {
      const { category, availability, sort, limit = 10, page = 1 } = req.query;
    
      // Construir el objeto de filtro para la consulta
      const filter = {};
    
      // Agregar filtro por categoría si se proporciona
      if (category) {
      filter.category = category;
      }
    
      // Agregar filtro por disponibilidad si se proporciona
      if (availability) {
      filter.availability = availability;
      }
    
      // Construir el objeto de opciones para la consulta
      const options = {
      limit: parseInt(limit, 10),
      skip: (parseInt(page, 10) - 1) * parseInt(limit, 10),
      };
    
      // Aplicar el ordenamiento si se proporciona
      if (sort) {
      const sortOrder = sort === 'asc' ? 1 : -1;
      options.sort = { price: sortOrder };
      }
    
      // Realizar la consulta a la base de datos
      const products = await productManagers.find(filter, null, options);
      const totalProducts = await productManagers.countDocuments(filter);
      const totalPages = Math.ceil(totalProducts / parseInt(limit, 10));
  
      
    
      // Construir el objeto de respuesta
    
  
  
    
      res.json(response);
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
    });
  
  
  
    app.delete('/carts/:cid/products/:pid', async (req, res) => {
    try {
      const { cid, pid } = req.params;
    
      const cart = await Cart.findById(cid);
    
      if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Cart not found' });
      }
    
      cart.products = cart.products.filter((product) => product.toString() !== pid);
    
      await cart.save();
    
      res.json({ status: 'success', message: 'Product removed from cart' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
    });
    
    // Actualizar el carrito con un arreglo de productos
    app.put('/carts/:cid', async (req, res) => {
    try {
      const { cid } = req.params;
      const { products } = req.body;
    
      const cart = await Cart.findById(cid);
    
      if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Cart not found' });
      }
    
      cart.products = products;
    
      await cart.save();
    
      res.json({ status: 'success', message: 'Cart updated successfully' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
    });
  
    app.get('/api/carts/:cid', async (req, res) => {
    try {
      const { cid } = req.params;
    
      // Buscar el carrito por su ID y realizar el populate en la propiedad 'products'
      const cart = await Cart.findById(cid).populate('products');
    
      if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Cart not found' });
      }
    
      res.json({ status: 'success', payload: cart });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
    });
    
    // Actualizar la cantidad de ejemplares
  
    app.get('/products', async (req, res) => {
    try {
      const { page = 1, limit = 10, category, availability, sort } = req.query;
    
      const filters = {
      category,
      availability,
      };
    
      const sortOptions = {};
    
      if (sort) {
      const [sortField, sortOrder] = sort.split(':');
      sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
      }
    
      const skip = (page - 1) * limit;
    
      const products = await Product.find(filters)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
  
      const totalProducts = await Product.countDocuments(filters);
        const totalPages = Math.ceil(totalProducts / limit);
  
      const response = {
        status: 'success',
        payload: products,
        totalPages,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
        page: parseInt(page),
        hasPrevPage: page > 1,
        prevLink: page > 1 ? `/products?limit=${limit}&page=${page - 1}` : null,
        nextLink: page < totalPages ? `/products?limit=${limit}&page=${page + 1}` : null,
        };
  
        
        
    
      res.render('product-details', {
      products,
      hasPrevPage: page > 1,
      prevPage: page > 1 ? page - 1 : null,
      hasNextPage: products.length === limit,
      nextPage: page + 1,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
    });
  
    app.get('/products/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
    });
    
    // Ruta para crear un nuevo producto
    app.post('/products', async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el producto' });
    }
    });
    
    // Ruta para actualizar un producto existente
    app.put('/products/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
    });
    
    // Ruta para eliminar un producto
    app.delete('/products/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndRemove(req.params.id);
      if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
    });
  
    app.get('/products', (req, res) => {
    const { category, availability, minPrice, maxPrice, sort } = req.query;
    
    const filter = {};
    
    if (category && category !== 'Todas') {
      filter.category = category;
    }
    
    if (availability) {
      // Validar si availability tiene un valor válido ('true' o 'false')
      if (availability === 'true' || availability === 'false') {
      filter.availability = availability === 'true';
      }
    }
    
    if (minPrice) {
      filter.price = { $gte: parseFloat(minPrice) };
    }
    
    if (maxPrice) {
      if (filter.price) {
      filter.price.$lte = parseFloat(maxPrice);
      } else {
      filter.price = { $lte: parseFloat(maxPrice) };
      }
    }
    
    const query = Product.find(filter);
    
    // Ordenamiento
    if (sort === 'asc') {
      query.sort({ price: 1 });
    } else if (sort === 'desc') {
      query.sort({ price: -1 });
    }
    
    query.exec((err, products) => {
      if (err) {
      console.error('Error al obtener los productos:', err);
      return res.status(500).send('Error interno del servidor');
      }
    
      res.render('products', { products });
    });
    });
    
    app.get('/cart', async (req, res) => {
      try {
        // Obtener los productos del carrito
        const cartId = req.session.cartId; // Supongamos que el ID del carrito se almacena en la sesión
        const cartProducts = await obtenerProductosDelCarrito(cartId);
        
        // Renderizar la vista 'cart-details' con los productos del carrito
        res.render('cart-details', { cartProducts });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    });

    app.post('/api/cart/add/:productId', async (req, res) => {
      try {
        // Obtén el ID del producto que se agregará al carrito desde la solicitud POST
        const productId = req.params.productId; // El ID del producto está en los parámetros de la URL
    
        // Realiza una búsqueda en la base de datos para obtener los detalles del producto
        const product = await Product.findById(productId);
    
        // Verifica si el producto existe
        if (!product) {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
    
        // Asume que tienes una estructura de datos para mantener el carrito en el servidor
        // Puede ser un objeto, una base de datos, o cualquier otra estructura que elijas
        if (!cart) {
          cart = [];
        }
    
        // Agrega el producto al carrito
        cart.push(product);
    
        res.status(200).json({ message: 'Producto agregado al carrito con éxito' });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    

    app.delete('/api/cart/:cartId', async (req, res) => {
      try {
        const { cartId } = req.params;
    
        // Aquí deberías tener lógica para buscar y eliminar el carrito por su ID
        const deletedCart = await Cart.findByIdAndRemove(cartId);
    
        if (!deletedCart) {
          return res.status(404).json({ error: 'Carrito no encontrado' });
        }
    
        return res.status(204).json({ message: 'Carrito eliminado con éxito' });
      } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
    });


    app.put('/api/cart/:productId', async (req, res) => {
      try {
        const productId = req.params.productId; // Obtén el productId de los parámetros de la URL
        const newQuantity = req.body.quantity; // Obtén la nueva cantidad del producto del cuerpo de la solicitud
        
        // Lógica para actualizar la cantidad del producto en el carrito (actualiza la base de datos o la sesión)
        await actualizarCantidadDelProducto(productId, newQuantity);
    
        res.status(200).json({ message: 'Cantidad del producto actualizada con éxito' });
      } catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    });

   
    app.get('/cart/:cartId', async (req, res) => {
      try {
        const { cartId } = req.params;
    
        // Llama al método obtenerProductosDelCarrito del CartManager
        const cartProducts = await cartManager.obtenerProductosDelCarrito(cartId);
    
        res.render('cart-details', { cartProducts });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    });

    app.get('/cart', (req, res) => {
      // Recupera todos los carritos desde la base de datos (supongamos que están en la variable 'carts')
      const carts = [
        {
          _id: new ObjectId("648d1416ab724db565dc0784"),
          products: [null],
          __v: 6
        },
        // Agrega otros carritos aquí...
      ];
    
      // Extrae solo los IDs de los carritos
      const cartIds = carts.map(cart => cart._id);
    
      // Renderiza la plantilla de Handlebars y pasa los IDs de los carritos
      res.render('cart-details', { cartIds });
    });
    app.use(cookieParser('')); // Aquí puedes agregar una clave secreta si lo deseas

    app.use(
      session({
        store: MongoStore.create({
          mongoUrl:
            'mongodb+srv://CoderLtrotti:TGtIEtoEcViniEQZ@codercluster.lbz1fl7.mongodb.net/?retryWrites=true&w=majority',
          mongoOptions: {
            useNewUrlParser: true,
          },
          ttl: 15,
        }),
        secret: '124',
        resave: true,
        saveUninitialized: true,
      })
    );
    
// Usar el enrutador de vistas
app.use('/', viewsRouter);
//Middleware cookies
app.use('/cookies', cookieRouter);
app.use('/',viewsRouter);
app.use('/api/users', userRouter);
app.get('/register', (req, res) => {
  res.render('register', {
    title: 'Registrar nuevo Usuario'
  });
});
// Ruta principal para mostrar la página de inicio
app.get('/index', (req, res) => {
  const { user } = req.session;

  // Renderiza la vista "index" con el mensaje de bienvenida y el botón de cierre de sesión
  res.render('index', {
    title: 'Página de Inicio',
    user,
    showWelcomeMessage: !!user, // Muestra el mensaje de bienvenida si el usuario está autenticado
    showLogoutButton: !!user, // Muestra el botón de cierre de sesión si el usuario está autenticado
  });
});



const webServer = app.listen(8080, () => {
  console.log('Escuchando 8080');
});

// Inicialización de socket.io
const io = new Server(webServer);

io.on('connection', (socket) => {
  console.log('A user connected');


// Lógica para manejar mensajes de chat
socket.on('sendMessage', async (message) => {
  try {
    const { user, messageContent } = message; // Asegúrate de que estás recibiendo los valores correctamente
    const newMessage = await messageManager.createMessage(user, messageContent);
    io.emit('newMessage', newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
  }
});




  // Handle 'addProduct' event
  socket.on('addProduct', async (product) => {
    try {
      const productId = await contenedor.save(product);
      const newProduct = await contenedor.getById(productId);

      io.emit('newProduct', newProduct);
    } catch (error) {
      console.error('Error:', error);
    }
  });

  socket.on('deleteProduct', async (productId) => {
    try {
      const deletedProduct = await productosContenedor.deleteById(productId);
      if (deletedProduct) {
        io.emit('productDeleted', productId);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  socket.on('deleteProduct', async (productId) => {
    try {
      const deletedProduct = await productosContenedor.deleteById(productId);
      if (deletedProduct) {
        io.emit('productDeleted', productId); // Emite el evento de eliminación
      }
    } catch (error) {
      console.error('Error:', error);
    }
  })
  // Ruta para eliminar productos


  // Handle 'disconnect' event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

