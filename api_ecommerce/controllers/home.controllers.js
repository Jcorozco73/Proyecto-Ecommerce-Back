
import models from "../models"
import resource from "../DAO-resource/Classes"

export default {
    list: async (req, res) => {
        try {
            let TIME_NOW = req.query.TIME_NOW 

            let Sliders = await models.Slider.find({state: 1})
            
            Sliders = Sliders.map((slider) =>{
                return resource.Slider.slider_list(slider)
                })

                let Categories = await models.Categorie.find({state: 1})

                Categories = Categorie.map((categorie) =>{
                    return resource.Categorie.categorie_list(categorie)
                    })

                    let BestProducts = await models.Product.find({state: 2}).sort({"createdAt": -1})

                    let ObjectsBestProducts = []

                    for (const Product of BestProducts) {
                        let VARIEDADES = await models.Variedad.find({product: Product._id})
                        ObjectsBestProducts.push(resource.Product.product_list(Product,VARIEDADES))
                    }
                
                    let OurProducts = await models.Product.find({state: 2}).sort({"createdAt": 1})

                    let ObjectsOurProducts = []
                    for (const Product of OurProducts) {
                        let VARIEDADES = await models.Variedad.find({product: Product._id})
                        ObjectsOurProducts.push(resource.Product.product_list(Product,VARIEDADES))
                    }

                    /* OurProducts = OurProducts.map(async (product) =>{
                        let VARIEDADES = await models.Variedad.find({product: product_id})
                        return resource.Product.product_list(product,VARIEDADES)
                        }) */
                        
                        let FlashSale = await models.Discount.findOne({
                            type_campaign: 2,
                            start_date_num: {$lte: TIME_NOW},
                            end_date_num: {$gte: TIME_NOW}
                        })
                        let ProductList=[]
                        if(FlashSale){
                            
                                for (const product of FlashSale.products) {
                                let ObjecT = await models.Product.findById({_id: product._id })
                                let VARIEDADES = await models.Variedad.find({product: product._id})
                                ProductList.push(resource.Product.product_list(ObjecT,VARIEDADES))
                                }
                        }
                        console.log(FlashSale)
                        res.status(200).json({
                            categories: Categories,
                            sliders: Sliders,
                            bestProducts: BestProducts,
                            ourProducts: OurProducts,
                            objectsBestProducts: ObjectsBestProducts,
                            objectsOurProducts: ObjectsOurProducts,
                            flashSale: FlashSale,
                            productList: ProductList

            })
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error al listar'
            })
            console.log(error)
        }
    },
    show_landing_product: async(req, res) => {
        try {
            let slug = req.params.slug
            let Product = await models.Product.findOne({slug: slug, state: 2})
            let VARIEDADES = await models.Variedad.find({product: Product._id})
            let RelatedProducts = await models.Product.find({categorie: Product.categorie, state: 2})
            let ObjectsRelatedProducts = []
            for (const Product of RelatedProducts) {
                let VARIEDADES = await models.Variedad.find({product: Product._id})
                ObjectsRelatedProducts.push(resource.Product.product_list(Product,VARIEDADES))
            }
           
            res.status(200).json({
                product: resource.Product.product_list(Product, VARIEDADES),
                related_products: ObjectsRelatedProducts
            })
            
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error al listar'
            })
            console.log(error)
        }

    },
}