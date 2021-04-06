const connect = require('./db-connect')

async function getData(path) {
    const conn = await connect()
    const [rows] = await conn.query(path)
    
    return rows
}

async function postProduct({name, about, amount, value}) {
    const conn = await connect()
    const sql = "INSERT INTO products (name, about, amount, value) VALUES (?,?,?,?)"
    const values = [name, about, amount, value]
    
    await conn.query(sql, values)
}

async function updateProduct({name, about, amount, value, id}) {
    const conn = await connect()
    const sql = "Update products SET name = ?, about = ?, amount = ?, value = ? WHERE id = ?"
    const values = [name, about, amount, value, id]

    await conn.query(sql, values)
}

async function deleteProduct(id) {
    const conn = await connect()
    const sql = "DELETE FROM products WHERE id = ?"
    const values = [id]
    
    await conn.query(sql, values)
}


module.exports = {
    getData,
    postProduct, 
    updateProduct,
    deleteProduct,
}