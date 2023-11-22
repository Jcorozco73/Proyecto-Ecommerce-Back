export default {
    cart_list: (cart) => {
        return {
            _id: cart._id,
            user: cart.user,
           
            product: {
                id:cart.product.id,
                title:cart.product.title,
                categorie: cart.product.categorie,
                slug: cart.product.slug,
                sku:cart.product.sku,
                imagen:'http://localhost:3000/' + '/api/products/uploads/product/' + cart.product.portada, // ruta
                price: cart.product.price,
                price_USD: cart.product.price_USD
 
            },
            type_discount: cart.type_discount,
            discount: cart.discount,
            cantidad: cart.cantidad,
            variedad: cart.variedad,
            code_cupon: cart.code_cupon,
            code_discount: cart.code_discount,
            price_unitario: cart.price_unitario,
            subtotal: cart.subtotal,
            total: cart.total
            
            
            
            
            
            
            
            
           
        }   
    }
}
