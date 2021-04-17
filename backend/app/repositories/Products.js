const connect = require('../../config/database');
function Products() {
    this._db = connect;
}

Products.prototype.select = async function (product, res) {
    try {
        const conn = await this._db(),
            [rows] = await conn.query('SELECT * FROM products');

        return res.status(200).json({ message: rows });
    } catch (err) {
        return res.status(500).json({ message: 'error: ' + err });
    }
};

Products.prototype.insert = async function (product, res) {
    try {
        const conn = await this._db(),
            sql = 'INSERT INTO products (name, about, amount, value) VALUES (?,?,?,?)',
            values = [product.name, product.about, product.amount, product.value],
            response = await conn.query(sql, values);

        return res.status(200).json({ message: response });
    } catch (err) {
        return res.status(500).json({ message: 'error: ' + err });
    }
};

Products.prototype.update = async function (product, res) {
    try {
        const sql = 'UPDATE products SET name = ?, about = ?, amount = ?, value = ? WHERE id = ?',
            conn = await this._db(),
            values = [product.name, product.about, product.amount, product.value, product.id];
        await conn.query(sql, values);

        const newProduct = await conn.query('SELECT * FROM products WHERE id = ?', product.id);

        return res.status(200).json({ message: newProduct });
    } catch (err) {
        return res.status(500).json({ message: 'error: ' + err });
    }
};

Products.prototype.delete = async function (product, res) {
    const id = product.id;
    try {
        const conn = await connect(),
            sql = 'DELETE FROM products WHERE id = ?',
            values = [id];
        await conn.query(sql, values);

        return res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        return res.status(500).json({ message: 'error: ' + err });
    }
};

module.exports = function () {
    return Products;
};
