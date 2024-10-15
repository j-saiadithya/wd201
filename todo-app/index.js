const{request,response}=require('express')
const express=require('express');
const app=express()
const {Todo}=require("./models")
const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.get("/todos",(request,response)=>{
    // response.send("hello world")
    console.log("Todo list") 
})

app.post("/todos",async(request,response)=>{
    console.log("Creating a todo",request.body)
    //Todo
    try {
        const Todo= await Todo.create({title:request.body.title,dueDate:request.body.dueDate,completed:false})
        return response.json(todo)
    } catch (error) {
        console.error(error);
        return response.status(422).json(error)
    }
 
})

app.put("/todos/:id/markAsCompleted",(request,response)=>{
    console.log("We have to update a todo with ID: ",request.params.id)
})

app.delete("/todos/:id",(request,response)=>{
  console.log("Delete a todo with ID:",request.params.id)  
})

app.listen(3000,()=>{
    console.log(("Started express server at port 3000"))
   
})

