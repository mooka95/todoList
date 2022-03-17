const express = require('express');
const Todo=require('../Model/todo');
const { param,body, validationResult } = require('express-validator');
const validateRequest=require('../middlewares/ValidateRequest');
const CustomError=require('../helpers/CustomError')

const router = express.Router();

router.post('/',validateRequest([
    body('title').exists(),
    body('description').exists()
]),async(req, res) => {
    const todo=new Todo({
        title:req.body.title,
        description:req.body.description
    });
    const addedTodo= await todo.save();
    res.status(200).json({
        addedTodo
    })

});

router.get('/',async(req,res) => {
    const todoList = await Todo.find();
    res.status(200).json(
        todoList
    )

})

router.delete('/:id',async(req,res) =>{
    const deletedTodo=await Todo.deleteOne({ _id: req.params.id});
    if(deletedTodo.deletedCount===0){
        throw new CustomError('todo not found',404);
    }
    res.status(200).json({
        'message':'Item deleted successfully'
    });
})

router.put('/:id',validateRequest([
    body('title').exists(),
    body('description').exists()
]),async(req,res,next)=>{
    const updatedTodo= await Todo.findOneAndUpdate({_id:req.params.id},{title:req.body.title,description:req.body.description});
    res.status(200).json({
        updatedTodo,
        "message":"item updated successfully"
    })

})




module.exports =router;