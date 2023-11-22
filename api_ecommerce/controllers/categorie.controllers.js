
import models from "../models";
import resource from "../DAO-resource/Classes"
import User from "../models/user";
import fs from 'fs'
import path from 'path'


export default {
    register: async(req, res) => {
         try{
            if(req.files && req.files.portada){
                let img_path = req.files.portada.path;
                let name = img_path.split('/');
                let portada_name = name[2];
                //console.log(avatar)
                req.body.iamgen = portada_name

                 
            }
       
            const categorie = await models.Categorie.create(req.body);
            res.status(200).json(user);

        }catch(error){
            res.status(500).send({
                message: "Error al registrar el usuario"
            });
            console.log(error)
            
        } 
      
    }, 

    update: async(req, res) => {
      try {
        if(req.files){
            let img_path = req.files.portada.path;
            let name = img_path.split('/');
            let portada_name = name[2];
            //console.log(avatar)
            req.body.iamgen = portada_name
             
        }
    
         await models.Categorie.findByIdAndUpdate({ _id: req.body._id}, req.body)

         let CategorieT = await models.Categorie.findOne({ _id: req.body._id })
      
            return res.status(200).json({
                message: "La Categoria se ha actualizado correctamente",
                categorie: resource.Categorie.categorie_list(CategorieT)
            })

        
      } catch (error) {
       res.status(500).send({
            message: "Error al registrar el usuario"
        });
        console.log(error)
        
      }

      },

    list: async(req, res) => {
        try {
            let search = req.body.search
            const Categories = await models.Categorie.find({  
                    $or:[
                        
                        {title: new RegExp(search, "i")},
                        
                      
                    ]
            }).sort({'createAd': -1});

                Categories = Categories.map((user) =>{
                return resource.Categorie.categorie_list(user)

                })
                res.status(200).json({
                    categories: Categories
                })
            } catch (error) {
             res.status(500).send({
                message: "Ocurrio un problema"
            });
            console.log(error)
            
        }
        
    },

    obtener_imagen: async(req, res) =>{
        try {
            let img = req.params['img'];


            fs.stat('./uploads/categorie/'+img, function(err){
                if(!err){
                    let path_img = './uploads/categorie/'+img;
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

    remove: async(req, res) => {
        try {
            
            await models.Categorie.findByIdAndDelete({_id : req.body.id})
            res.status(200).json({
                message: "La categoria  se ha eliminado correctamente",
                
            })
        } catch (error) {
            res.status.send({
                message: "Error al eliminar el usuario"
            })
            console.log(error);
            
        }
    }
}
