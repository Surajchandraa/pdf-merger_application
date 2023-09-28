
//required librarys 
const express = require('express');
const path = require('path');
const multer = require('multer')
const mergepdfs = require('./mergepdf');
const fs = require('fs');
const app = express();

//path of index.html file to make it live and take form data from it
path_of_html = path.join(__dirname,"public");


const upload = multer({dest:'upload/'}) //initialization of multer destination it will store files in upload folder
app.get('/',function(req,res){
    res.sendFile(path_of_html+"/index.html") //making index.html live on http://localhost:5000

})


app.post('/merge',upload.array('pdfs',5), async function(req,res,next){
    console.log(req.files)
    // res.send(req.files)
    console.log(req.body)
    if(req.files==''){
        res.sendFile(path.join(__dirname, 'public')+"/404_not_found.html");
        console.log("sorry you didnt choose any file")
    }else{
    let file1=(req.files[0].path);
    let file2=(req.files[1].path);
    console.log(file1,file2)
    let suraj = await mergepdfs(file1,file2);
    res.sendFile(path.join(__dirname, "mergered.pdf"));
    console.log("pdf have been merged")
    }
   
    

    //now we can perform the delete operation
    filedelete()
   
   

})



function filedelete(){
    let filess = path.join(__dirname,'upload');

   fs.readdir(filess,(err,files)=>{
    files.forEach((items)=>{
        fs.unlinkSync('upload/'+items)
        console.log(items);
    })
   })

}

app.listen(5000,function(){
    console.log("server is running at port http://localhost:5000");
})


