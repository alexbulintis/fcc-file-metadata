var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer({dest: __dirname + "/temp"});
var fs = require('fs');

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.post("/upload", upload.single('upl'), function(req, res, next){
  var data;
  if(req.file) {
    data = {
      "size": req.file.size
    };
    fs.unlink(__dirname + "/temp/" + req.file.filename);
  }
  else {
    data = {
      "error": "file wasn't uploaded"
    }
  }
  res.send(data);
});

app.get("/", function(req, res){
  res.render("index");
});

app.listen(process.argv[2] || 1337);
