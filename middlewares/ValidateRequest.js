
const {  validationResult } = require('express-validator');
const CustomError = require('../helpers/CustomError');
const _ = require('lodash');


module.exports =(validateArray)=>async (req,res,next)=>{

    const promises=validateArray.map(validator=>validator.run(req));
    await Promise.all(promises);
    const {errors}= await validationResult(req);
    if(errors.length)
    throw new CustomError('validation Error',422,_.keyBy(errors, 'params'));

    next();



}