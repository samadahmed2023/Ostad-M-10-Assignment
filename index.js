let express = require("express");
let http = require("http");
let fs = require("fs");
let multer = require("multer");


http.createServer(function (req, res) {

    if(req.url === "/"){

    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("This is Home Page")
    res.end();
 }
   if(req.url === "/about"){

    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("This is About Page")
    res.end();
 }
   if(req.url === "/contact"){

    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("This is Contact Page")
    res.end();
 }

   // Write file

        if( req.url === "/file-write"){

        let error = fs.writeFileSync ("demo.txt","hello world");

        if(error){
            res.writeHead(200, {"Content-Type":"text/html"});
            res.write("file write fail");
            res.end();
        }
        else{
            res.writeHead(200, {"Content-type": "text/html"});
            res.write("file write success");
            res.end();
        }

    }

}).listen(5500, function () {
    console.log("server running...")
})




// file upload with multer.

let app = express();

let storage = multer.diskStorage({

    destination: function (req,file,callBack) {

            callBack(null, "./uploads");
    },
    filename: function (req,file,callBack) {

        callBack(null,file.originalname);
    }

})

let upload = multer({storage:storage}).single("myFile");

app.post("/", function (req, res) {

    upload(req,res,function (error) {
        if(error){
            res.send("file upload fail")
        }
        else{
            res.send("file upload success")

        }

    })

})

app.listen(8000, function () {
    console.log("server running...")
})
