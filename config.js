require('dotenv').config();
const requiredEnvs= ['MONGO_URI'];
const missingEnvs= requiredEnvs.filter(envName=>!process.env[envName]);

if(missingEnvs.length)
throw new Error(`missing Required envs ${missingEnvs}`);

module.exports= {
    mongoURI : process.env.MONGO_URI,
    port:process.env.PORT || 3000 
}