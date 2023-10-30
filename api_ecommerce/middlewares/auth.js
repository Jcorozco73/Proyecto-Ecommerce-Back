import token from "../services/token"

export default {
    verifyEcommerce: async(req, res, next) =>{
        if(!req.headers.token){
            return res.status(404).send({
                message: "No se envio el token"
            })
        }
        const response = await token.decode(req.headers.token);
        if(response){
            if(response.role == "Cliente" || response.role == "admin"){
                next();
            }else{
                return res.status(403).send({
                    message: "No esta permitido visitar esta ruta"
                })
            }
            
        }else{
            return res.status(404).send({
                message: "El token no es valido"
            })
        }
        

    },
    verifyAdmin: async(req, res, next) =>{
        verifyClient: async(req, res, next) =>{
            if(!req.headers.token){
                return res.status(404).send({
                    message: "No se envio el token"
                })
            }
            const response = await token.decode(req.headers.token);
            if(response){
                if(response.role == "admin"){
                    next();
                }else{
                    return res.status(403).send({
                        message: "No esta permitido visitar esta ruta"
                    })
                }
    
            }else{
                return res.status(404).send({
                    message: "El token no es valido"
                })
            }
    
    }
}
}