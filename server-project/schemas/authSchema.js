const z = require('zod');

const registerSchema = z.object({
    userName: z.string({
        required_error: 'El nombre de usuario es requerido'
    }).min(3).max(20),
    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(6,{
        message: 'La contraseña debe tener al menos 6 caracteres'
    }),
    email: z.string({
        required_error: 'El correo es requerido'
    }).email({
        message: 'El correo no es válido'
    }),
    cellphone: z.string({
        required_error: 'El número de celular es requerido'
    }).min(10,{
        message: 'El número de celular debe tener al menos 10 dígitos'
    }),
});

const loginSchema = z.object({
    email: z.string({
        required_error: 'El correo es requerido'
    }).email({
        message: 'El correo no es válido'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(6,{
        message: 'La contraseña debe tener al menos 6 caracteres'
    }),
});

module.exports = {
    registerSchema,
    loginSchema
}