module.exports = (application) => {
    application.post('/register', (req, res) => {
        application.app.controllers.auth.register(application, req, res);
    });

    application.post('/login', (req, res) => {
        application.app.controllers.auth.login(application, req, res);
    });
}
