const connect = require('../../config/database');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const { authSecret } = require('../../.env');

function Auth() {
    this._db = connect;
}

Auth.prototype.insert = async function (user, res) {
    const conn = await this._db(),
        sql = 'SELECT * FROM users WHERE email = ?',
        values = [user.email],
        [exists] = await conn.query(sql, values);

    if (exists.length) {
        return res.status(400).send('Email já cadastrado!');
    }

    try {
        const sql = 'INSERT INTO users (name, email, password, access) VALUES (?,?,?,?)',
            values = [user.name, user.email, user.password, user.access],
            response = await conn.query(sql, values);

        return res.status(200).json({ message: response });
    } catch (err) {
        return res.status(500).send('Erro inesperado: ' + err);
    }
}

Auth.prototype.login = async function (req, res) {
    const conn = await this._db(),
        sql = 'SELECT * FROM users WHERE email = ?',
        values = [req.email],
        [user] = await conn.query(sql, values);

    if (!user.length) {
        return res.status(400).send('Usuário não cadastrado!');
    }

    const isMatch = bcrypt.compareSync(req.password, user[0].password);

    if (!isMatch) {
        return res.status(401).send('Email/Senha inválidos!');
    }

    const now = Math.floor(Date.now() / 1000);

    const payload = {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        access: user[0].access,
        iat: now,
        exp: now + 60 * 60 * 24 * 3
    }

    return res.json({
        ...payload,
        token: jwt.encode(payload, authSecret)
    });
}

module.exports = function () {
    return Auth;
}
