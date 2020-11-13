export function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    req.flash('error', ['Debes estar autenticado para acceder a esta ruta.']);
    res.redirect(`/login?redirectTo=${req.originalUrl}`);
}

export function isLoggedInAPI(req, res, next) {

    if (req.isAuthenticated())
        return next();

    req.flash('error', ['Debes estar autenticado para acceder a esta ruta.']);
    res.status(401).json({message: 'Posiblemente tu sesion expiro, debes iniciar sesion de nuevo!'})
}
