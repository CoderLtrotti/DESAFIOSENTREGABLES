import express from 'express';
 // Asegúrate de usar la ruta correcta aquí
import { Router } from "express";
import { isAuth, isGuest , isAdmin, isUser } from '../middleware/auth.middleware.js';


const viewsRouter = express.Router();



const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
  };



viewsRouter.get('/cookies', (req, res) =>{
    res.render('cookies');
});

viewsRouter.get('/', (req, res) => {
  const { user } = req.session;

  // Comprueba si el usuario está autenticado (req.session.user está configurado)
  if (user) {
    // Muestra el mensaje de bienvenida y el botón de cierre de sesión
    res.render('index', {
      title: 'Perfil de Usuario',
      user,
      showLogoutButton: true,
      showWelcomeMessage: true, // Agregar esta línea para mostrar el mensaje de bienvenida
    });
  } else {
    // No se ha iniciado sesión, muestra el contenido normal sin el mensaje de bienvenida
    res.render('index', {
      title: 'Página de Inicio',
      user: null,
      showLogoutButton: false,
      showWelcomeMessage: false, // Agregar esta línea para ocultar el mensaje de bienvenida
    });
  }
});

viewsRouter.get('/', isAuth, (req, res) => {
    const { user } = req.session;
  
    if (user.email === 'adminCoder@coder.com' && user.password === 'adminCod3r123') {
      user.role = ROLES.ADMIN;
    } else {
      user.role = ROLES.USER;
    }
  
    delete user.password;
  
    res.render('index', {
      title: 'Perfil de Usuario',
      user,
    });
  });


viewsRouter.get('/admin', isAdmin, (req, res) => {
    res.render('admin', {
      title: 'Panel de Administración',
    });
  });
  
  viewsRouter.get('/user', isUser, (req, res) => {
    res.render('user', {
      title: 'Panel de Usuario',
    });
  });

viewsRouter.get('/register', isGuest, (req, res) => {
	res.render('register', {
		title: 'Registrar Nuevo Usuario',
	});
});

viewsRouter.get('/login', isGuest, (req, res) => {
	res.render('login', {
		title: 'Inicio de Sesión',
	});
});

viewsRouter.get('/logout', (req, res) => {
    const message = 'Has cerrado sesión exitosamente.';
    res.render('logout', { message });
});

viewsRouter.get('/', (req , res) =>{
    const { user } = req.session;
    delete user.password;
    res.render('index' , {
        title: 'Home',
        user,
    });   
 });

 viewsRouter.get('/register', (req , res) =>{
    res.render('register' , {
        title: 'registrar nuevo Usuario',
    });   
 });



 viewsRouter.get('/product-details', (req, res) =>{
    res.render('product-details');
});

viewsRouter.post('/add-to-cart/:id', (req, res) => {
    // Aquí obtendrías el id del producto desde la URL y la cantidad desde el cuerpo de la solicitud (req.body.quantity)
    const productId = req.params.id;
    const quantity = req.body.quantity;
  
    // Aquí podrías agregar el producto al carrito según el id y la cantidad
  
    res.redirect('/cart');
  });

viewsRouter.get('/cart-details', (req, res) =>{
    res.render('cart-details');
});
  

  

// Configurar el enrutador para la vista en tiempo real
viewsRouter.get('/realtimeproducts', (req, res) => {
  res.render('realtimeproducts'); // Asegúrate de tener la vista "realTimeProducts.handlebars"
});

viewsRouter.get('/home', (req, res) => {
    res.render('home'); // Asegúrate de tener la vista "realTimeProducts.handlebars"
  });
  
viewsRouter.get('/chat', (req, res) => {
    res.render('chat'); // Renderiza la vista "chat.handlebars"
  });




// Exportar el enrutador
export default viewsRouter;