import models from "../models"

export default {
    register: async(req,res) =>{
        try {
            let data = req.body
            let filter_a = []
            let filter_b = []

            if(data.type_segment == 1 ){
                filter_a.push({
                    "products": {$elemMatch: {_id:{$in: data.product_s}}}
                })
                filter_b.push({
                    "products": {$elemMatch: {_id:{$in: data.product_s}}}
                })
            }else{
                filter_a.push({
                    "categories": {$elemMatch: {_id:{$in: data.categorie_s}}}
                })
                filter_b.push({
                    "categories": {$elemMatch: {_id:{$in: data.categorie_s}}}
                })
            }
            filter_a.push({
                type_campaign: data.type_campaign,
                "start_date_num": {$gte: data.start_date_num, $lte: data.end_date_num}
            })
            filter_b.push({
                type_campaign: data.type_campaign,
                "end_date_num": {$gte: data.start_date_num, $lte: data.end_date_num}
            })

            const exist_start_date = await models.Discount.find({$and: filter_a})

            const exist_end_date = await models.Discount.find({$and: filter_b})

            if(exist_start_date > 0 || exist_end_date > 0 ){
                return res.status(200).json({
                    message:403,
                    message: "El descuento no se puede programar eliminar alguna opcion"
                })
            }
            const discount = await models.Discount.create({_id: data._id},data)

            res.status(200).json({
                message: 200,
                message: "El descuento se registro correctamente",
                discount: discount
            })
            
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un problema"
            });
        }

    },

    update: async(req,res) =>{
        try {
            let data = req.body
            let filter_a = []
            let filter_b = []

            if(data.type_segment == 1 ){
                filter_a.push({
                    "products": {$elemMatch: {_id:{$in: data.product_s}}}
                })
                filter_b.push({
                    "products": {$elemMatch: {_id:{$in: data.product_s}}}
                })
            }else{
                filter_a.push({
                    "categories": {$elemMatch: {_id:{$in: data.categorie_s}}}
                })
                filter_b.push({
                    "categories": {$elemMatch: {_id:{$in: data.categorie_s}}}
                })
            }
            filter_a.push({
                type_campaign: data.type_campaign,
                _id: {$ne: data._id},
                "start_date_num": {$gte: data.start_date_num, $lte: data.end_date_num}
            })
            filter_b.push({
                type_campaign: data.type_campaign,
                _id: {$ne: data._id},
                "end_date_num": {$gte: data.start_date_num, $lte: data.end_date_num}
            })

            const exist_start_date = await models.Discount.find({$and: filter_a})

            const exist_end_date = await models.Discount.find({$and: filter_b})

            if(exist_start_date > 0 || exist_end_date > 0 ) {
                return res.status(200).json({
                    message:403,
                    message: "El cupon no se puede programar eliminar alguna opcion"
                })
            }
            const discount = await models.Discount.findByIdAndUpdate({_id: data._id},data)

            res.status(200).json({
                message: 200,
                message: "El descuento se registro correctamente",
                discount: discount
            })
            
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un problema"
            });
        }

    },

    list: async(req,res) =>{
        try {
            //let search = req.query.search

            let discount = await models.Discount.find().sort({'createAd': -1});
            res.status(200).json({  
                message: 200,
                discount: discount
                
              }) 
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un problema"
            });
        }
    },

    show: async(req,res) =>{
        try {
            let discount_id = req.query.discount_id

            let discount = await models.Discount.findOne({_id: discount_id })
         
            res.status(200).json({  
                message: 200,
                discount: discount
                
              }) 
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un problema"
            });
        }
    },

    delete: async(req,res) =>{
        try {
            let_id = req.query._id

             await models.Discount.findByIdAndDelete({_id: _id})
            res.status(200).json({
                message: 200,
                message: "El descuento se elimino correctamente",
              
            })
            
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un problema"
            });
        }
    },

    config: async(req,res) => {
        try {
         
            let Products = await models.Product.find({state: 2})

            let Categories = await models.Categorie.find({state: 1})

            res.stauts(200).json({
                message: 200,
                products: Products,
                categories: Categories

            })

        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un problema"
            });
        }
    },

    }
