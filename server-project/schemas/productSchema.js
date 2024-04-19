const z = require('zod');

const createProductSchema = z.object({
    productName: z.string({
        required_error: 'El nombre del producto es requerido'
    }).min(3).max(20),
    price: z.number({
        required_error: 'El precio del producto es requerido'
    }).min(1),
    discount: z.number({
        required_error: 'El descuento del producto es requerido'
    }).min(1),
    stock: z.number({
        required_error: 'El stock del producto es requerido'
    }).min(1),
});

module.exports = {
    createProductSchema
}