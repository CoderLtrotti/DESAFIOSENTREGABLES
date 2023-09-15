


export function isAuth(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
}

export function isGuest(req, res, next) {
	if (!req.session.user) {
		next();
	} else {
		res.redirect('/');
	}
}

const isAdmin = (req, res, next) => {
    const { user } = req.session;
    if (user.role === ROLES.ADMIN) {
      next(); // El usuario es un administrador, permite el acceso a la siguiente ruta
    } else {
      res.redirect('/'); // El usuario no es un administrador, redirige a otra página (por ejemplo, el perfil de usuario)
    }
  };
  
  const isUser = (req, res, next) => {
    const { user } = req.session;
    if (user.role === ROLES.USER) {
      next(); // El usuario es un usuario regular, permite el acceso a la siguiente ruta
    } else {
      res.redirect('/'); // El usuario no es un usuario regular, redirige a otra página (por ejemplo, el perfil de usuario)
    }
  };
  
  export { isAdmin, isUser };