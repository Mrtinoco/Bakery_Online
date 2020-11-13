export const RedirectHomeIfIsAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
};