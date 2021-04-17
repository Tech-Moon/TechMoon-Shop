const connect = require('../../config/database');
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
};

module.exports = function () {
    return Auth;
};
