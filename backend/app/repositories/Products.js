const connect = require('../../config/database');
function Products() {
    this._db = connect;
}

Products.prototype.get = async function (product, res) {
    try {
        const conn = await this._db(),
            [rows] = await conn.query('SELECT * FROM products');

        return res.json({ message: rows });
    } catch (err) {
        return res.json({ message: 'error: ' + err });
    }
};

Products.prototype.post = async function (product, res) {
    try {
        const conn = await this._db(),
            sql = 'INSERT INTO products (name, about, amount, value) VALUES (?,?,?,?)',
            values = [product.name, product.about, product.amount, product.value],
            response = await conn.query(sql, values);

        return res.json({ message: response });
    } catch (err) {
        return res.json({ message: 'error: ' + err });
    }
};

Products.prototype.edit = async function (product, res) {
    try {
        const sql = 'UPDATE products SET name = ?, about = ?, amount = ?, value = ? WHERE id = ?',
            conn = await this._db(),
            values = [product.name, product.about, product.amount, product.value, product.id];
        await conn.query(sql, values);

        const newProduct = await conn.query('SELECT * FROM products WHERE id = ?', product.id);

        return res.json({ message: newProduct });
    } catch (err) {
        return res.json({ message: 'error: ' + err });
    }
};

Products.prototype.delete = async function (product, res) {
    const id = product.id;
    try {
        const conn = await connect(),
            sql = 'DELETE FROM products WHERE id = ?',
            values = [id];
        await conn.query(sql, values);

        return res.json({ message: 'Product deleted' });
    } catch (err) {
        return res.json({ message: 'error: ' + err });
    }
};

module.exports = function () {
    return Products;
};
