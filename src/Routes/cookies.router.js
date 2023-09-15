import { Router } from "express";

const cookieRouter = Router();

cookieRouter.get('/get', (req, res) =>{
    res.send(req.cookies);
});

cookieRouter.get('/set', (req, res) =>{
res,cookie('MyCookie', "esto es una cookie",{ 
    maxAge:10000,
    }).send('Se Guardo la Cookie');
});

cookieRouter.get('/getSigned', (req, res) =>{
    res.send(req.signedCookies);
});

cookieRouter.get('/setSigned', (req, res) =>{
res,cookie('theCookie', "esto es una super cookie",{ 
    maxAge:10000,
    
    }).send('Se Guardo la super Cookie');
});

cookieRouter.get('/delete', (req, res) => {
    res.clearCookie('CoderCookie').send('Cookie Removed')
});   

cookieRouter.post('/', (req, res) => {
    const email = req.body.email;
    res.cookie('user',email, {
        maxAge:10000,
    })

        .status(201)
        .send('se guardo el mail');


});

export default cookieRouter;