import models from "../models"

export default {
    register: async(req,res) =>{
        try {
            let data= req.body

            const exist_cupone = await models.Cupone.findOne({code: data.code})
            if(exist_cupone){
                return res.status(200).json({
                    message:403,
                    message: "El cupon ya existe"
                })
            }
            const cupone = await models.Cupone.create(data)
            res.status(200).json({
                message: 200,
                message: "El cupon se registro correctamente",
                cupone: cupone
            })
            
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un problema"
            });
        }

    },

    update: async(req,res) =>{
        try {
            let data= req.body

            const exist_cupone = await models.Cupone.findOne({code: data.code, _id:{$ne: data._id }})
            if(exist_cupone){
                return res.status(200).json({
                    message:403,
                    message: "El cupon ya existe"
                })
            }
            const cupone = await models.Cupone.findByIdAndUpdate({_id: data._id}, data)

            const cuponeT = await models.Cupone.findById({_id: data._id})

            res.status(200).json({
                message: 200,
                message_text: "El cupon se actualizo correctamente",
                cupone: cuponeT
            })
            
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un problema"
            });
        }

    },

    list: async(req,res) =>{
        try {
            let search = req.query.search

            let cupones = await models.Cupone.find({
                $or:[
                        
                    {code: new RegExp(search, "i")},
                ]
                }).sort({'createAd': -1});
            res.status(200).json({  
                message: 200,
                cupones: cupones
                
              }) 
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un problema"
            });
        }
    },

    show: async(req,res) =>{
        try {
            let cupone_id = req.query.search

            let cupon = await models.Cupone.findOne({_id: cupone_id })
         
            res.status(200).json({  
                message: 200,
                cupon: cupon
                
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

             await models.Cupone.findByIdAndDelete({_id: _id})
            res.status(200).json({
                message: 200,
                message: "El cupon se elimino correctamente",
              
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
