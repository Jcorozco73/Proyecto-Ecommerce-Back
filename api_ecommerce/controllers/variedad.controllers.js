import models from '../models'

export default {
    register: async(req,res) => {
        try {
            let data = req.body

            let variedad_exists = await models.Variedad.findOne({valor :data.valor, product: data.product})
            let variedad = null
            if(variedad_exists){
                await models.Variedad.findByIdAndUpdate({
                    _id: variedad_exists._id
                },{
                    stock: variedad_exists.stock + data.stock
                })
                variedad = await models.Variedad.findById({_id: variedad_exists._id})
                }else{
                     variedad = await models.Variedad.create(data)
                }
                
            res.status(200).json({
                variedad: variedad
            })
            
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un problema"
            });
            console.log(error)
            
        }
    },

    update: async(req,res) => {
        try {
            
            let data = req.body
            await models.Variedad.findByIdAndUpdate({_id:data_id},data)

           let variedad = await models.Variedad.findById({_id: variedad_exists._id})
           
            res.status(200).json({
                variedad: variedad
            })
            
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un problema"
            });
            console.log(error)
            
        }
    },

    delete: async(req,res) => {
        try {
            let _id = req.params.id
             await models.Variedad.findByIdAndDelete({_id:_id})
            res.status(200).json({

                message: 'Se Elimino la Variedad'
            })
            
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un problema"
            });
            console.log(error)
            
        }
    },

    

}