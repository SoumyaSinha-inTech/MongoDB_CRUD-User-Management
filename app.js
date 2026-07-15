const express = require("express");
const app=express();
const path = require("path")
const user=require('./model/user');
const { name } = require("ejs");

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,"public")))

app.get('/',(req,res)=>{
    res.render("index")
})

app.post('/create',(req,res)=>{
    let {name,email,image} = req.body;
    user.create({
        name,
        email,
        image
    })
    res.redirect("/read")
})

app.get("/read",async (req,res)=>{
   let users = await user.find();
   res.render('read',{users})
})

app.get("/remove/:_id",async (req,res)=>{
    await user.findOneAndDelete({_id:req.params._id})
    res.redirect("/read")
})

app.get("/edit/:_id", async (req, res) => {
    let edit = await user.findById(req.params._id);
    res.render("edit", { edit });
});

app.post("/update/:_id",async (req,res)=>{
    let{name,email,image}=req.body
    let update = await user.findOneAndUpdate(
        {_id:req.params._id},
        {name,email,image}
    ) 
     res.redirect("/read")
})


app.listen(3000);