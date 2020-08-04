const express = require('express');
const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname,'build')));

app.get("/",(req,res)=>{
    console.log(req.url);
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/propiedades",(req,res)=>{
    console.log(req.url);
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/categorias",(req,res)=>{
    console.log(req.url);
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/ubicaciones",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
})
app.get("/operaciones",(req,res)=>{
    console.log(req.url);
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/nosotros",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/partidos",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/nosotros/modificar/:id",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});

app.get("/propiedad/add",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/propiedad/edit/:id",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/categoria/add",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/categoria/edit/:id",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/ubicacion/add",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/ubicacion/edit/:id",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/operacion/add",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/partido/add",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/partido/edit/:id",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/contacto",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/contacto/edit/:id",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});
app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});


app.listen(8080);

