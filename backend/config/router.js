const router = require('express').Router()

const productsInteractions = require('../database/products')


router.get('/list-products', async (req, res) => {
    try {
        const products = await productsInteractions.getData(`SELECT * FROM products`)

        return res.json({ message: products})

    } catch(err) {
        console.log(err)
        return res.json({ message: 'error'})
    }
})

router.post('/create-product', (req, res) => {
    const fields = req.body

    try {
        productsInteractions.postProduct(fields)

        return res.json({ message: fields})

    } catch(err) {
        console.log(err)
        return res.json({ message: 'error'})
    }
})

router.put('/update-product', async (req, res) => {
    const fields = req.body

    try {

        productsInteractions.updateProduct(fields)

        const product = await productsInteractions.getData(`SELECT * FROM products WHERE id = ${fields.id}`)

        return res.json({ message: product})

    } catch(err) {
        console.log(err)
        return res.json({ message: 'error'})
    }
})

router.delete('/delete-product/:id', (req, res) => {
    const id = req.params.id
    try {
        productsInteractions.deleteProduct(id)

        return res.json({ message: "Product deleted"})

    } catch(err) {
        console.log(err)
        return res.json({ message: 'error'})
    }
})


module.exports = router