
import models from "../models"
import resource from "../resource"

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
                    for (const Product of ourProducts) {
                        let VARIEDADES = await models.Variedad.find({product: Product._id})
                        ObjectsOurProducts.push(resource.Product.product_list(Product,VARIEDADES))
                    }

                    /* OurProducts = OurProducts.map(async (product) =>{
                        let VARIEDADES = await models.Variedad.find({product: product_id})
                        return resource.Product.product_list(product,VARIEDADES)
                        }) */
                        let Campaign = await models.Discount.findOne({
                            type_campaign: 2,
                            start_date_num: {$lte: TIME_NOW},
                            end_date_num: {$gte: TIME_NOW}
                        })
                        let ProductList=[]
                        for (const product of Campaign.products) {
                            let ObjecT = await models.Product.findById({_id: product._id })
                            let VARIEDADES = await models.Variedad.find({product: product._id})
                            ProductList.push(resource.Product.product_list(ObjecT,VARIEDADES))
                        }
                        console.log(Campaign)
                        res.status(200).json({
                            categories: Categories,
                            sliders: Sliders,
                            bestProducts: BestProducts,
                            ourProducts: OurProducts,
                            objectsBestProducts: ObjectsBestProducts,
                            objectsOurProducts: ObjectsOurProducts,
                            campaign: Campaign,  
                            productList: ProductList

            })
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error al listar'
            })
            console.log(error)
        }
    },
}