export default {
    product_list: (product, variedades = []) => {
        return {
            id:product.id,
            title:product.title,
            sku:product.sku,
            imagen:'http://localhost:5000/' + '/api/products/uploads/product/' + product.portada,// ruta
            state: product.state,
            stock: product.stock,
            description: product.description,
            resumen: product.description,
            tags: product.tags ? JSON.parse(product.tags) : [],
            type_inventario: product.type_inventario,
            slug: product.slug,
            categorie: product.categorie,
            price: product.price,
            price_USD: product.price_USD,
            variedades: variedades,
            galerias: product.galerias.map((galeria) => {
                galeria.imagen = 'http://localhost:5000/' + '/api/products/uploads/product/' + galeria.imagen
                return galeria

            })

           
        }
           
           
    }
}
