const express = require ('express');
const Joi = require('joi');

const app = express();
app.use(express.json())

const interpreters = [
    {id:1, name:'Elnaz',group:'persian',email:'elnaz@gmail.com'}
    ,{id:2, name:'Salim',group:'Rohingya',email:'salim@gmail.com'}
    ,{id:3, name:'tomas',group:'Myanmar',email:'tomas@gmail.com'}
    ,{id:4, name:'Abbas',group:'Germany',email:'abbas@gmail.com'}
]

app.put('/api/interpreters/:id',(req,res)=>{ //we have :id for reference
    console.log(req.params)
    //we look for the interpreter
    //if doesn't exist return 404 - doesn't exist
    const theInterpreter = interpreters.find((intp)=>{return intp.id.toString()===req.params.id.toString()})
    console.log(theInterpreter)
    if (!theInterpreter) {
        res.status(404).send('The Interpreter does not exist')
        res.send(interpreters)
        return
    }

    //we validate the request
    //if not valid return 400 - bad request
    const schema = Joi.object(
        {
            id:Joi.number().required(),
            name:Joi.string(),
            group:Joi.string().min(3),
        }
    )
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    }
        
    //we update the course
    // return updated course
    theInterpreter.name = req.body.name;
    res.send(theInterpreter)
})







app.listen(8000)

