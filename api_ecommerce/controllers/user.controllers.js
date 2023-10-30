import bcrypt from "bcryptjs";
import models from "../models";
import token from "../services/token";

export default {
    register: async(req, res) => {
         try{
          req.body.password =
            await bcrypt.hash(req.body.password, 10);
            const user = await models.User.create(req.body);
            res.status(200).json(user);

        }catch(error){
            res.status(500).send({
                message: "Error al registrar el usuario"
            });
            console.log(error)
            
        } 
      
    }, 

    login: async(req, res) => {
         try{
            const user= 
            await models.User.findOne({email: req.body.email, state: 1});
            if(user){
                let match = await bcrypt.compare(req.body.password, user.password);
                if(match){
                    let tokenT = await token.encode(user._id, user.role, user.email);
                    const USER_FRONTED = {
                        token: tokenT,
                        user: {
                            name: user.name,
                            surname: user.surname,
                            email: user.email,
                            avatar: user.avatar
                               
                        }
                    }
                    return res.status(200).send({
                      USER_FRONTEND:USER_FRONTED
                    })
                }

            }else{
                return res.status(404).send({
                    message: "El usuario no existe"
                });
            }
           
        } catch(error){
           res.status(500).send({
                message: "Error al registrar el usuario"
            });
            console.log(error);
        } 
        
    },
    update: async(req, res) => {
      try {
        if(req.files){
            let img_path = req.files.avatar.path;
            let name = img_path.split('/');
            let avatar = name[2];
            console.log(avatar)
             
        }
        if(req.body.password) {
         req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const UserT = await models.User.findByIdAndUpdate({ _id: req.body._id}, req.body)
      
            return res.status(200).json({
                message: "Usuario actualizado correctamente",
                user: UserT
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
            const Users = await models.User.find({  
                    $or:[
                        
                        {name: new RegExp(search, "i")},
                        {surname:new RegExp(search, "i")},
                        {email:new RegExp(search, "i")},
                      
                    ]
            }).sort({'createAd': -1});
            res.status(200).json({
                users: Users
            })
            } catch (error) {
             res.status(500).send({
                message: "Error al registrar el usuario"
            });
            console.log(error)
            
        }
        
    },

    remove: async(req, res) => {
        try {
            const User =
            await models.User.findByIdAndDelete({_id : req.body.id})
            res.status(200).json({
                message: "Usuario eliminado correctamente",
                
            })
        } catch (error) {
            res.status.send({
                message: "Error al eliminar el usuario"
            })
            console.log(error);
            
        }
    }
}
 

/* import bcrypt from "bcryptjs";
import models from "../models";
import token from "../services/token";

export default {
  register: async (req, res) => {
    try {
      const { password, ...userData } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await models.User.create({ ...userData, password: hashedPassword });
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Error al registrar el usuario",
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await models.User.findOne({ email, state: 1 });
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const tokenT = await token.encode(user._id, user.role, user.email);
          const userFrontend = {
            tokenT,
            user: {
              name: user.name,
              surname: user.surname,
              email: user.email,
            },
          };
          return res.status(200).send({
            userFrontend,
          });
        }
      }
      return res.status(404).send({
        message: "El usuario no existe",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Error al registrar el usuario",
      });
    }
  },

  update: async (req, res) => {
    try {
      if (req.files) {
        const imgPath = req.files.avatar.path;
        const name = imgPath.split("\\");
        const avatar = name[2];
        console.log(avatar);
      }
      const user = await models.User.findByIdAndUpdate(req.body._id, req.body);
      return res.status(200).json({
        message: "Usuario actualizado correctamente",
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Error al registrar el usuario",
      });
    }
  },

  list: async (req, res) => {
    try {
      const { search } = req.body;
      const users = await models.User.find({
        $text: { $search: search },
      }).sort({ createAd: -1 });
      res.status(200).json({
        users,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Error al registrar el usuario",
      });
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.body;
      await models.User.findByIdAndDelete(id);
      res.status(200).json({
        message: "Usuario eliminado correctamente",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Error al eliminar el usuario",
      });
    }
  },
}; */


