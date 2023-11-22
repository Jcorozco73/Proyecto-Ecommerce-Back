import models from "../models";
import resource from "../DAO-resource/Classes";
import fs from "fs"
import path from "path" 


export default {
    register: async(req,res) => {
        try {
            let data = req.body

            let validateproduct = await models.User.findOne({title :data.title})
            if(validateproduct){
                return res.status(400).json({
                    code: 403,
                    message: "El producto ya existe"
                })
                return
            }

            data.slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            if(req.files){
                let img_path = req.files.imagen.path;
                let name = img_path.split('/');
                let portada_name = name[2];
                data.portada = portada_name
                 
            }
        
            const product = await models.Product.create(data)
            res.status(200).json({
                message: 'El producto se registrocon exito'
            })
            
            
        } catch (error) {
            res.status(500).send({
                message: "Error al registrar el usuario"
            });
            
            
        }
    },
    
update: async(req, res) => {
    try {
        let data = req.body

        let validateproduct = await models.User.findOne({title :data.title, _id: {$ne: data._id}})

        if(validateproduct){
            return res.status(400).json({
                code: 403,
                message: "El producto ya existe"
            })
            return
        }

        data.slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        if(req.files && req.files.imagen){
            let img_path = req.files.imagen.path;
            let name = img_path.split('/');
            let portada_name = name[2];
            data.portada = portada_name
             
        }
    
         await models.Product.findByIdAndUpdate({_id: data._id}, data)
        res.status(200).json({
            message: 'El registro se actualizo con exito'
        })
        
        
    } catch (error) {
        res.status(500).send({
            message: "Error al registrar el producto"
        });
        
        
    }

},
list: async(req, res) => {
    try {
        let filter = []
        if(req.query.search){
            filter.push(
            {'title': new RegExp(eq.query.search, 'i')}
            )
        }
        if(req.query.categorie){
            filter.push(
            {'categorie':req.query.categorie }
            )
        }

        const products = await models.Product.find({
            $and: filter 
         }).populate('categorie')
        
        products = products.map(product =>{
            return resource.Product.product_list(product)

        })
        res.status(200).json({
            products: products
        })
        
    } catch (error) {
        res.status(500).send({
            message: "Error al actualizar  el producto"
        });
        
    }

},

remove: async(req, rez) => {
    try {
        let _id = req.query._id
        await models.Product.findByIdAndDelete({_id: _id})
        res.status(200).json({
            message: 'El registro se elimino con exito'
        })
        
    } catch (error) {
        res.status(500).send({
            message: "Ocurrio un problema"
        })
        console.log(error);
        
    }

},

obtener_imagen: async(req, res) => {
    try {
        let img = req.params['img'];


        fs.stat('./uploads/product/'+img, function(err){
            if(!err){
                let path_img = './uploads/product/'+img;
                res.status(200).sendFile(path.resolve(path_img));
            }else{
                let path_img = './uploads/default.jpg';
                res.status(200).sendFile(path.resolve(path_img));
            }
        })
        
    } catch (error) {
        res.status.send({
            message: "Ocurrio un problema"
        })
        console.log(error);
        
    }


},

show: async(req, res) =>{
    try {
        let product_id = req.params.id
        const product = await models.Product.findById({_id: product_id}).populate('categorie')
        let VARIDADES = await models.Variedad.find({product:product_id})

        res.status(200).json({
            product: resource.Product.product_list(product,VARIDADES)
        })
        
    } catch (error) {
        res.status.send({
            message: "Ocurrio un problema"
        })
        console.log(error);
        
    }
},

register_imagen:  async(req, res) => {
    try {
     
            let img_path = req.files.imagen.path;
            let name = img_path.split('//');
            let imagen_name = name[2];
  
            let product = await models.Product.findByIdAndUpdate({_id: req.body._id},{
           $push: {
                galerias: {
                     imagen: imagen_name,
                     _id: req.body._id

                    }
                }
           })
              res.status(200).json({
                message: 'La imagen se subiocon exito',
                imagen:{
                    imagen: imagen_name,
                    imagen_path: 'http://localhost:5000/' + 'api/products/uploads/product/'+ imagen_name,
                    _id: req.body._id
                }
              })
    } catch (error) {
        res.status.send({
            message: "Ocurrio un problema"
        })
        
    }

},


remove_imagen:  async(req, res) => {
    try {
       
       await models.Product.findByIdAndUpdate({_id: req.body._id},{
       $pull: {
            galerias: {
                 _id: req.body._id
                }
            }
       })
       res.status(200).json({
        message: 'La imagen se elimino con exito'
      })
        
    } catch (error) {
        res.status.send({
            message: "Ocurrio un problema"
        })
        
    }

}   

}
            
