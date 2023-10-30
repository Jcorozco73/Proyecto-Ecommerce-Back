import jwt  from "jsonwebtoken"
import models from '../models'

export default{
    encode: async(_id, role, email) => {
        const tokenT = jwt.sign({
            _id: _id,
            role: role,
            email: email
            }, 'my_secret_key', {expiresIn: '1d'});
            return tokenT;      

        },
        decode: async(tokenT) => {
            try {
                const {_id}= await jwt.verify(tokenT, 'my_secret_key');
            const user = models.User.findOne({_id: _id, state: 1})
            if(user){
                return user;
                }
                else{
                    return false;
                }
        } catch (error) {
            console.log(error)
    }
}
}