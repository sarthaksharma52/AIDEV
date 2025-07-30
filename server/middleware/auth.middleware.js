import jwt from 'jsonwebtoken';
import redisClient from '../services/redis.services.js';

export const authUser = async (req,res,next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        if (!token){
            return res.status(401).send({error : 'unathorised user'});
        }

        const blackListed = await redisClient.get(token);

        if(blackListed) {
            res.cookie('token', '');

            return res.status(401).send({error: "Unathorized user"});
        }

        const decode = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decode;
        next();
        
    }
     catch (error) {
        console.log(error)
            res.status(401).send({error : 'unathorised user'});
    }
}