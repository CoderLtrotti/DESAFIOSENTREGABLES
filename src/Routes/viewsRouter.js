import express from 'express';
import Contenedor from '../Contenedor.js'; // Asegúrate de usar la ruta correcta aquí
import { Router } from "express";

const viewsRouter = express.Router();
const contenedor = new Contenedor('productos.json'); // Asegúrate del nombre del archivo



// Configurar el enrutador para la vista en tiempo real
viewsRouter.get('/realtimeproducts', (req, res) => {
  res.render('realtimeproducts'); // Asegúrate de tener la vista "realTimeProducts.handlebars"
});

viewsRouter.get('/home', (req, res) => {
    res.render('home'); // Asegúrate de tener la vista "realTimeProducts.handlebars"
  });


// Exportar el enrutador
export default viewsRouter;