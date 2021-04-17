const bcrypt = require('bcrypt-nodejs');

module.exports.register = (application, req, res) => {
    const data = req.body;

    req.assert('name', 'Nome é obrigatório.').notEmpty();
    req.assert('email', 'Email obrigatório.').notEmpty();
    req.assert('email', 'Email inválido.').isEmail();
    req.assert('password', 'Senha é obrigatória.').notEmpty();
    req.assert('password', 'Senha deve possuir no minímo 6 caracteres.').isLength({ min: 6 });
    req.assert('confirmPassword', 'Confirmação de senha é obrigatória.').notEmpty();
    req.assert('confirmPassword', 'Senhas não conferem.').equals(data.password);

    const errors = req.validationErrors();

    if (errors) {
        return res.status(400).json({ errors });
    }

    const encrypt = (password) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    };

    data.password = encrypt(data.password);
    delete data.confirmPassword;

    const repository = new application.app.repositories.Auth();
    repository.insert(data, res);
};
