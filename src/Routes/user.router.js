import { Router } from "express";
import userService from "../dao/user.service.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
    const userData = req.body;
    try {
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error : error.message});
    }
});

usersRouter.post('/auth', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.getByEmail(email);
        if (!user) throw new Error('Invalid data');
        if (user.password !== password) throw new Error('Invalid data');
        req.session.user = user;
        res.status(200).json({ message: 'Authentication successful', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



usersRouter.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logged Out'});
    

});

 

export default usersRouter;