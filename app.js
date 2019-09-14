const express = require('express');
const bodyParser = require('body-parser');
//const date = require(__dirname+"/date.js");
let left = 24;
let right = 0;
let message="";
const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
	res.render("agent",{Assign:left,Resume:right,messages:message});
});

app.post("/",function(req,res){
	if(req.body.Assbtn === "assign"){
		if(left>0){
			message="";
			left--;
			right++;			
		}else{
			message = "No more agent to assign!";
		}
	}else if(req.body.Resbtn === "resume"){
		if(right>0){
			message="";
			right--;
			left++;			
		}else{
			message = "No more agent to revoke!";
		}
	}
	res.redirect("/");
});

app.listen(process.env.PORT||3000,function(){
    console.log("server started");
});