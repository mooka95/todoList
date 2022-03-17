const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    id: {
        type: String
    },
    title: {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
        required: true,
        
    }
  },{
    toJSON:{
        transform:function(doc,ret){
          delete ret.__v
        }
    }
  });

  const todo=mongoose.model('todo', todoSchema);
  module.exports =todo;