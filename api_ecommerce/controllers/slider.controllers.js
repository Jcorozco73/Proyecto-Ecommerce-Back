
import models from "../models";
import resource from "../"
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
       
            const slider = await models.Slider.create(req.body);
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
    
         await models.Slider.findByIdAndUpdate({ _id: req.body._id}, req.body)

         let SliderT = await models.Slider.findOne({ _id: req.body._id })
      
            return res.status(200).json({
                message: "El Slider se ha actualizado correctamente",
                slider: resource.Slider.categorie_list(SliderT)
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
            let search = req.query.search
            const Sliders = await models.Slider.find({  
                    $or:[
                        
                        {title: new RegExp(search, "i")},
                    ]
            }).sort({'createAd': -1});

                Sliders = Sliders.map((user) =>{
                return resource.Slider.slider_list(user)

                })
                res.status(200).json({
                    sliders: Sliders
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


            fs.stat('./uploads/slider/'+img, function(err){
                if(!err){
                    let path_img = './uploads/slider/'+img;
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
            
            await models.Slider.findByIdAndDelete({_id : req.body.id})
            res.status(200).json({
                message: "El Slider se ha eliminado correctamente",
                
            })
        } catch (error) {
            res.status.send({
                message: "Error al eliminar el usuario"
            })
            console.log(error);
            
        }
    }
}
