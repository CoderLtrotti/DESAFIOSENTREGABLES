import { Router } from 'express';
import passport from 'passport'; // Importa Passport
import { hashPassword, comparePassword } from '../utils/encript.js'; // Importa la función para generar tokens JWT
import userService from '../dao/user.service.js';

const usersRouter = Router();


usersRouter.post('/', async (req, res) => {
	const userData = { ...req.body, password: hashPassword(req.body.password) };
	console.log(userData);
	try {
		const newUser = await userService.createUser(userData);
		delete newUser.password;
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

usersRouter.post('/auth', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userService.getByEmail(email);

		// Chequeo de datos
		if (!user) throw new Error('Invalid data'); 
		console.log(comparePassword(user, password));
		if (!comparePassword(user, password)) throw new Error('Invalid data'); 

		// Si todo está bien, guardo el usuario en la sesión
		req.session.user = user;
		//res.status(201).json(user);
		res.redirect('/index');
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Ruta para autenticar al usuario localmente y generar un token JWT




usersRouter.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logged Out'});
    

});

 

export default usersRouter;