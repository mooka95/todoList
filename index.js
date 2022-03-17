const express = require('express');
const app = express();
const {port}=require('./config');
require('express-async-errors');
require('./db');

const todoRoute=require('./Routes/todo');

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.use('/todo',todoRoute);
app.use((err,req,res,next)=>{
    err.statusCode=err.statusCode|| 500;
    const handleError=err.statusCode<500 ? err.message :'Something Went Wrong';
    res.status(err.statusCode).json({
      message:handleError,
      errors:err.errors || {}
    })
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})