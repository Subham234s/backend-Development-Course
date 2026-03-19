// Ab improt kareenge From app.js/src folder
const express = require("express")
const app = require("./src/app");
// Ab Middleware banate hai jo Json data ko express read kr sake
app.use(express.json());
// Ab Temporary ke liye empty Array banayenge
let notes = [];
// Ab API HTTP method used honge CRUD
// ab new Notes ko banane ke liye (Post Method used karenge)
app.post('/notes', (req,res)=>{
    const{title,description} = req.body;
    const newNotes = {title,description};
    notes.push(newNotes);
    res.status(201).json({
        Message:"Notes Created Sucessfully",
        notes: newNotes
    });
});
// ab Notes ko fetched karane ke liye (GET Method used karenge)
app.get('/notes',(req,res)=>{
    res.status(200).json({
        Message:"Notes Fetched Successfully",
        notes: notes
    });
});
app.listen(3000,()=>{
    console.log("Server is Running on port:3000")
});
// ab notes ko Delete karne ke liye (DELETE Method uesd karenge)
app.delete('/notes/:index',(req,res)=>{
    const index = req.params.index;
    notes.splice(index, 1);
    res.status(200).json({
        Message:"Notes Deleted Successfully"
    });
});
// ab jo data Already hai usse update krne ke liye (PATCH Method ka used karenge)
app.patch('/notes/:index',(req, res)=>{
    const index = req.params.index;
    const { title, description } = req.body;
    if (notes[index]){
        if(title) notes[index].title = title;
        if(description) notes[index].description = description;
        res.status(201).json({
            Message:"Notes Updated Successfully",
            notes:notes[index]
        });
    }else{
        res.status(404).json({
            Message:"Notes not found"
        })
    };
});