const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); 

app.use(express.urlencoded({ extended: true }));







app.get('/', (req, res, next)=>{

    res.status(200).json('whatchu du (Husker du)');
})



// reformat
// app.post(    , (req, res, next)=>{

//     path.join(__dirname,  )

//     res.status(200).json();
// })

app.get('/', (req, res, next, err)=> {

console.error('You are mistaken', err);
})













app.listen(PORT, ()=> {
    console.log(`server is listening on port ${PORT}`)
});




module.exports = app;