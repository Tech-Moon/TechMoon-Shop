module.exports = (application) => {
    application.post('/register', (req, res) => {
        application.app.controllers.auth.register(application, req, res);
    });
};
