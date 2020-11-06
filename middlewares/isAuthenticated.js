const isAuthenticated = (req, res, next) => {
    if (req.session.username !== '' || typeof req.session.username !== 'undefined') {
        next()
    } else {
        next(new Error('Failed to authenticate'))
    }
}

module.exports = isAuthenticated

