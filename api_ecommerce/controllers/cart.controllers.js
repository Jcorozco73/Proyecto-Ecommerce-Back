import models from "../models";
import resource from "../DAO-resource/Classes";


export default {
    list: async(req, res) =>{
        try {
            let user_id = req.query.user_id
            let CARTS = await models.Cart.find({
                user: user_id
            }).populate("variedad").populate({
                path: "product",
                populate:{
                    path: "categorie"
                },
            })
            CARTS = CARTS.map((cart) =>{
                return resource.Cart.cart_list(cart)
            })
            
            res.status(200).json({
                carts: CARTS,
            })
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
                
            })
            console.log(error)
            
        }
    },

    register: async(req, res) =>{
        try {
     // vamos a validar si el producto existe en el carrito
            let data = req.body
            if(data.variedad){
                let valid_cart = await models.Cart.findOne({
                    user: data.user,
                    variedad: data.variedad,
                    product: data.product
                })
                if(valid_cart){
                    res.status(200).json({
                        message: 403,
                        message: "El producto ya existe con esa variedad"
                    })
                    return
                }
            }else {
                let valid_cart = await models.Cart.findOne({
                    user: data.user,
                    product: data.product
            })
            if(valid_cart){
                res.status(200).json({
                    message: 403,
                    message: "El producto ya existe en el carrito de compra"
                })
                return
            }

            }
            if(data.variedad){
                let valid_variedad = await models.Variedad.findOne({
                    _id: data.variedad,
                })
                if(valid_variedad.stock < data.cantidad){
                    res.status(200).json({
                        message:403,
                        message_text: "El stock no esta disponible"
                    })
                    return
                    }
                } else {
                    let valid_product = await models.Product.findOne({
                        _id: data.product 
                 })
                 if(valid_product.stock < data.cantidad){
                    res.status(200).json({
                        message:403,
                        message_text: "El stock no esta disponible"
                    })
                    return
                    }
                 }

            let CART = await models.Cart.create(data)
            let NEW_CART = await models.Cart.findOne({_id: CART._id}).populate("variedad").populate({
                path: "product",
                populate:{
                    path: "categorie"
                },
            })  
            res.status(200).json({
                cart: resource.Cart.cart_list(NEW_CART),
                message_text: "El carrito se registro con exito"
            })
                
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
                
            })
            console.log(error)
            
        }
    },

    update: async(req, res) =>{
        try {
            let data = req.body

            if(data.variedad){
                let valid_variedad = await models.Variedad.findOne({
                    _id: data.variedad,
                })
                if(valid_variedad.stock < data.cantidad){
                    res.status(200).json({
                        message:403,
                        message_text: "El stock no esta disponible"
                    })
                    return
                    }
                } else {
                    let valid_product = await models.Product.findOne({
                        _id: data.product 
                 })
                 if(valid_product.stock < data.cantidad){
                    res.status(200).json({
                        message:403,
                        message_text: "El stock no esta disponible"
                    })
                    return
                    }
                 }
                 let CART = await models.Cart.findByIdAndUpdate({_id:data._id}, data)
                 let NEW_CART = await models.Cart.findOne({_id: CART._id}).populate("variedad").populate({
                    path: "product",
                    populate:{
                        path: "categorie"
                    },
                })  

                    res.status(200).json({
                    cart: resource.Cart.cart_list(NEW_CART),
                    message_text: "El carrito se actualizo con exito"
                })
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
                
            })
            console.log(error)
            
        }
    }, 

    delete: async(req, res) =>{
        try {
            let _id = res.params.id
            let CART = await models.Cart.findByIdAndDelete({_id: _id})

            res.status(200).json({
                message_text: "El carrito se elimino correctamente" 
            })
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
                
            })
            console.log(error)
            
        }
    }, 
    
    apllyCupon: async(req, res) => {
        try {
            let data = req.body
            let cupon = await models.Cupon.findOne({
                code: data.code
            })
            if(!cupon){
                res.status(200).json({
                    message: 403,
                    message_text: "El cupon no existe, digite otro nuevo"
                })
                return
                }
            
            let CART = await models.Cart.find({
                user: data.user._id
            }).populate("product")

            /* let total = 0 */
            /* CART.forEach((cart) =>{ */
            /*     total += cart.total */
            /* }) */
            /* let total_cupon = total - (total * (cupon.porcentaje / 100)) */
            /* res.status(200).json({ */
            /*     total: total_cupon, */
            /*     message_text: "El cupon se aplico correctamente" */
            /* }) */
            let products = []
            let categories = []

            cupon.products.forEach((product) =>{
                products.push(product._id)
                   
                   
            })
            cupon.categories.forEach((categorie) =>{
                categories.push(categorie._id)
            })

            for (const cart of CART) {
                if(products.length > 0){
                    if(products.includes(cart.product._id + "")) {
                        let subtotal = 0
                        let total = 0
                        if(cupon.type_discount == 1){// Por porcentaje
                            subtotal = cart.price_unitario - cart.price_unitario*(cupon.discount*0.01)

                        }else{
                            cart.price_unitario - cupon.discount
                        }
                        total = subtotal * cart.cantidad
                        await models.Cart.findByIdAndUpdate({_id: cart._id},{
                            subtotal: subtotal,
                            total: total,
                            code_cupon: cupon.code,
                            discount: cupon.discount,
                            type_discount: cupon.type_discount
                        })

                    }
                }
                if(categories.length > 0){
                    if(categories.length > 0){
                        if(products.includes(cart.product.categorie + "")) {
                            let subtotal = 0
                            let total = 0
                            if(cupon.type_discount == 1){// Por porcentaje
                                subtotal = cart.price_unitario - cart.price_unitario*(cupon.discount*0.01)
                            }else{
                                cart.price_unitario - cupon.discount
                            }
                            total = subtotal * cart.cantidad
                            await models.Cart.findByIdAndUpdate({_id: cart._id},{
                                subtotal: subtotal,
                                total: total,
                                code_cupon: cupon.code,
                                discount: cupon.discount,
                                type_discount: cupon.type_discount
                            })
                        }
                    }
                }
                
            }

        res.status(200).json({
            message: 200,
            message_text:"El cupon se aplico correctamente"
        })
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
                
            })
            console.log(error)
            
        }
    }

    
    
}