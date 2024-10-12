// const { get } = require("fast-levenshtein");
// const {connect}=require("./connectDB");
// const Todo =require("./TodoModel");
// const createTodo=async()=>{
// try{
// await connect();
// const todo=await Todo.addTask({
//     title:"Second Item",
//     dueDate:new Date(),
//     completed:false,
// });
// console.log(`Created todo with id: ${todo.id}`);
// }catch(error)
// {
// console.error(error);
// }
// };
// const countItems=async ()=>{
//     try{
//         const totalCount=await Todo.count();
//         console.log(`Found ${totalCount} items in the table`);

//     }catch(error){
//         console.log(error);
//     }
// }
// const getAllTodos=async()=>{
//     try{
//         const todos=await Todo.findAll({
//             where:{
//                 completed:true
//             },
//             order:[
//                 ['id','DESC']
//             ]
//         });
//        const todoList= todos.map(todo=>todo.displayableString()).join("\n");
//         console.log(todoList);
//     }catch(error){
//         console.log(error);
//     }
// } 
// const getSingleTodo=async()=>{
//     try{
//         const todo=await Todo.findOne();
      
//         console.log(todo.displayableString());
//     }catch(error){
//         console.log(error);
//     }
// } 

// const updateItem=async (id)=>{
//     try{
// await Todo.update({completed:true},{
//             where:{
//                 id:id
//             }
//         });
        
//     }
//     catch(error){
//         console.error(error);
//     }
// }
// const deleteItem=async (id)=>{
//     try{
// const deleteRowCount= await Todo.destroy({
//             where:{
//                 id:id
//             }
//         });
//         console.log(`Deleted ${deletedRowCount} rows!`);
//     }
//     catch(error){
//         console.error(error);
//     }
// }
// (async()=>{
//     await createTodo();
// await getAllTodos();
// })();

// // run();
// // (async ()=>{
// //     // await createTodo();
// //     // await countItems();
// //     // await getAllTodos();
// //     await getSingleTodo();
// //     // await updateItem(1);
// //     await deleteItem(1);
// //     await getSingleTodo();
// // })();


const {connect}=require("./connectDB.js");
const Todo=require("./TodoModel.js");

// const createTodo=async()=>{
//     try{
//         await connect();
//         const todo=await Todo.create({
//             title:"first item",
//             dueDate:new Date(),
//             completed:false,
//         });
//         console.log(`Created todo with ID : ${todo.id}`);
//     }catch(error){
//         console.log(error);
//     }
// };

const createTodo=async()=>{
    try{
        await connect();
        const todo=await Todo.addTask({
            title:"second item",
            dueDate:new Date(),
            completed:false,
        });
        console.log(`Created todo with ID : ${todo.id}`);
    }catch(error){
        console.log(error);
    }
};
const countItems=async ()=>{
    try{
        const totalCount=await Todo.count();
        console.log(`Found ${totalCount} items in the table`);
    }catch(error){
        console.log(error);
    }
}

const getAllTodos=async ()=>{
    try{
        const todos=await Todo.findAll();
     const todoList=   todos.map(todo=> todo.displayableString()).join("\n");
        console.log(todoList);
    }catch(error){
        console.log(error);
    }
}
(async ()=>{
    // await createTodo();
    // await countItems();
    await getAllTodos();
})();